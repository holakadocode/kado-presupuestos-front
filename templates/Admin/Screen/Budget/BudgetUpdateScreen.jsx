import axios from 'axios';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import AppModal from '../../Layout/Component/Form/AppModal';
import AppInput from '../../Layout/Component/Form/AppInput';
import AppNumber from '../../Layout/Component/Form/AppNumber';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import AppSelect from '../../Layout/Component/Form/AppSelect';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import { Snackbar } from '@mui/material';

export default function BudgetUpdateScreen() {
  const { clientID, budgetID } = useParams();
  const navigate = useNavigate();
  const [ownCompany, setOwnCompany] = useState();
  const [clientSelector, setClientSelector] = useState([]);
  const [client, setClient] = useState();
  const [articles, setArticles] = useState();
  const [articlesSelector, setArticlesSelector] = useState();
  const [budget, setBudget] = useState();
  const [showArticlesModal, setShowArticlesModal] = useState();
  const [showWarning, setShowWarning] = useState();
  const [validationSchema] = useState(
    Yup.object().shape({
      client: Yup.string().required('Requerido'),
    })
  );

  const getData = useCallback(() => {
    axios
      .post(
        `${ProjectDefaultRoute}/api/budget/update/get-data`,
        { clientID, budgetID },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then((r) => {
        setOwnCompany(r.data.ownCompany);
        setClient(r.data.client);
        setClientSelector(r.data.clients);
        setBudget(r.data.budget);
        setArticles(r.data.articles);
        setArticlesSelector(r.data.articlesSelector);
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, [clientID, budgetID]);

  useState(() => {
    getData();
  });

  const getSelectedClient = useCallback((selectedClientID) => {
    axios
      .post(
        `${ProjectDefaultRoute}/api/budget/client/get`,
        { clientID: selectedClientID },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then((r) => {
        setClient(r.data);
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, []);

  const handleSetSavedItem = useCallback(
    (articleID, values, index, setFieldValue) => {
      axios
        .post(
          `${ProjectDefaultRoute}/api/budget/article/get`,
          { articleID },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        )
        .then((r) => {
          let tempValues = { ...values };
          tempValues.articles[index].code = r.data.code;
          tempValues.articles[index].article = r.data.name;
          tempValues.articles[index].quantity = 1;
          tempValues.articles[index].price = r.data.price;
          setFieldValue('articles', tempValues.articles);
        })
        .catch((errors) => {
          console.log(errors);
          if (errors.response?.status === 401) {
            localStorage.removeItem('authToken', null);
            navigate('/');
          }
        });
    },
    []
  );

  const handleAddClient = useCallback(
    (payload) => {
      axios
        .post(
          `${ProjectDefaultRoute}/api/budget/update`,
          { payload, clientID, budgetID },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        )
        .then(() => navigate(`/admin/clients/${clientID}/budget/list`))
        .catch((errors) => {
          console.log(errors);
          if (errors.response?.status === 401) {
            localStorage.removeItem('authToken', null);
            navigate('/');
          }
        });
    },
    [clientID, budgetID]
  );

  const handleAddNewArticle = useCallback((values, setFieldValue) => {
    let tempArticles = values.articles;
    let lastArticle = tempArticles[tempArticles.length - 1];

    if (
      lastArticle.article !== '' &&
      lastArticle.quantity !== '' &&
      lastArticle.price !== null
    ) {
      setShowWarning(undefined);
      let add = [
        ...tempArticles,
        {
          code: '',
          article: '',
          quantity: 1,
          price: '',
          total: '',
        },
      ];
      setFieldValue('articles', add);
    } else {
      setShowWarning('Rellene los parametros de su ultimo articulo añadido');
    }
  }, []);

  const handleDeleteArticle = useCallback((index, values, setFieldValue) => {
    let tempArticles = values.articles;
    tempArticles.splice(index, 1);

    setFieldValue('articles', tempArticles);
  }, []);

  const handleAddInSelectedArticle = useCallback(
    (type, v, i, values, setFieldValue) => {
      let tempArticles = values.articles;

      tempArticles[i][type] = v;
      setFieldValue('articles', tempArticles);
    },
    []
  );

  return (
    <>
      {client && budget && (
        <Formik
          initialValues={{
            title: budget.title,
            budgetID: `P-000${budget?.id}`,
            iva: 21,
            client: client.id,
            articles: articles,
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleAddClient}
        >
          {({ setFieldValue, values, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <h2>{ownCompany?.name}</h2>
              <div className="ms-3">
                <div>CIF: {ownCompany?.taxIdentification}</div>
                <div>
                  {ownCompany?.address}, cp: {ownCompany?.cp},{' '}
                  {ownCompany?.city}
                </div>
                <div>
                  {ownCompany?.phone}, {ownCompany?.email}
                </div>
              </div>

              <div className="row  mt-3">
                <div className="col-6">
                  <h4>Cliente</h4>
                  {clientSelector.length > 0 && (
                    <AppSelect
                      title={'Seleccione cliente'}
                      options={clientSelector}
                      placeholder="placeholder"
                      value={values.client}
                      onChange={(v) => {
                        setFieldValue('client', v);
                        getSelectedClient(v);
                      }}
                    />
                  )}
                  <div className="ms-3" style={{ height: '100px' }}>
                    {client?.name && (
                      <>
                        <b>
                          {client?.name} {client?.surname}
                        </b>
                        <div>{client?.taxIdentification}</div>
                        <div>
                          {client?.address?.name}, {client?.address?.cp},
                          {client?.address?.city}
                        </div>
                        <div>
                          {client?.phone} - {client?.email}
                        </div>
                      </>
                    )}
                  </div>
                  {errors.client &&
                    setShowWarning('Faltan los datos del cliente')}
                </div>

                <div className="col-6">
                  <div>
                    <h3>Presupuesto</h3>{' '}
                    <h5 className="text-primary">{values.budgetID}</h5>
                    <div>{budget?.dateStamp}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <AppInput
                  title={'Nombre de presupuesto'}
                  placeholder="placeholder"
                  value={values.title}
                  onChange={(v) => setFieldValue('title', v)}
                />
              </div>

              <button
                type="button"
                className="btn btn-outline-secondary d-inline-flex align-items-center mt-4"
                onClick={() => handleAddNewArticle(values, setFieldValue)}
              >
                <AppRemixIcons icon="ri-git-commit-line" className="me-2" />
                Añadir nuevo item
              </button>

              <TableHeader>
                <div>Selec.Art</div>
                <div>Codigo</div>
                <div>Articulo</div>
                <div>Cantidad</div>
                <div>Precio</div>
                <div>Total</div>
                <div>Opciones</div>
              </TableHeader>

              {values?.articles?.map((article, i) => (
                <TableArticle key={i}>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary "
                      onClick={() => setShowArticlesModal(i)}
                    >
                      <AppRemixIcons icon="ri-add-line" />
                    </button>
                    <AppModal
                      target={showArticlesModal === i}
                      onClose={() => setShowArticlesModal(undefined)}
                      title={`Añadir articulo creado`}
                    >
                      <AppSelect
                        title={'Articulos'}
                        options={articlesSelector}
                        onChange={(v) => {
                          handleSetSavedItem(v, values, i, setFieldValue);
                          setShowArticlesModal(undefined);
                        }}
                      />
                    </AppModal>
                  </div>
                  <div>
                    <AppInput
                      value={values.articles[i].code}
                      required
                      onChange={(v) =>
                        handleAddInSelectedArticle(
                          'code',
                          v,
                          i,
                          values,
                          setFieldValue
                        )
                      }
                    />
                  </div>
                  <div>
                    <AppInput
                      value={values.articles[i].article}
                      required
                      onChange={(v) =>
                        handleAddInSelectedArticle(
                          'article',
                          v,
                          i,
                          values,
                          setFieldValue
                        )
                      }
                    />
                  </div>
                  <div>
                    <AppNumber
                      value={values.articles[i].quantity}
                      required
                      onChange={(v) =>
                        handleAddInSelectedArticle(
                          'quantity',
                          v,
                          i,
                          values,
                          setFieldValue
                        )
                      }
                    />
                  </div>
                  <div>
                    <AppNumber
                      value={values.articles[i].price}
                      required
                      onChange={(v) =>
                        handleAddInSelectedArticle(
                          'price',
                          v,
                          i,
                          values,
                          setFieldValue
                        )
                      }
                    />
                  </div>
                  <div>
                    {parseFloat(article.quantity) * parseFloat(article.price)} €
                  </div>
                  <div>
                    <button className="btn btn-outline-secondary d-inline-flex align-items-center">
                      <AppRemixIcons
                        icon="ri-add-line"
                        title="Agregar articulo"
                      />
                    </button>

                    <button
                      className="btn btn-outline-secondary d-inline-flex align-items-center ms-2"
                      onClick={() =>
                        handleDeleteArticle(i, values, setFieldValue)
                      }
                    >
                      <AppRemixIcons
                        icon="ri-delete-bin-line"
                        title="Eliminar articulo"
                      />
                    </button>
                  </div>
                </TableArticle>
              ))}

              <ResultTableHead>
                <div></div>
                <div></div>
                <div>IVA %</div>
                <div>IVA TOTAL</div>
                <div>SUBTOTAL</div>
                <div>TOTAL</div>
              </ResultTableHead>
              <ResultTable>
                <div></div>
                <div></div>
                <div>21%</div>
                <div>
                  {(
                    values.articles?.reduce(
                      (sum, article) => sum + article.quantity * article.price,
                      0
                    ) * 0.21
                  ).toFixed(2)} €
                </div>
                <div>
                  {values.articles
                    ?.reduce(
                      (sum, article) => sum + article.quantity * article.price,
                      0
                    )
                    .toFixed(2)} €
                </div>
                <div>
                  {(
                    values.articles?.reduce(
                      (sum, article) =>
                        sum +
                        parseFloat(article.quantity) *
                          parseFloat(article.price),
                      0
                    ) * 1.21
                  ).toFixed(2)} €
                </div>
              </ResultTable>

              <button
                type="button"
                className="btn btn-outline-secondary d-inline-flex align-items-center mt-4"
                onClick={handleSubmit}
                disabled={values.articles.some(
                  (article) =>
                    article.article.trim() === '' ||
                    article.quantity <= 0 ||
                    article.price <= 0
                )}
                title={
                  values.articles.some(
                    (article) =>
                      article.article.trim() === '' ||
                      article.quantity <= 0 ||
                      article.price <= 0
                  )
                    ? 'Debe rellenar todos los campos de los articulos'
                    : 'Finalizar'
                }
              >
                <AppRemixIcons icon="ri-upload-line" className="me-2" />
                Finalizar presupuesto
              </button>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={showWarning}
                autoHideDuration={6000}
                onClose={() => setShowWarning(undefined)}
                message={showWarning}
                key={('top', 'center')}
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

const TableHeader = styled.div`
  border: 1px solid;
  border-color: #b6b4b4;
  background-color: #373837;
  color: white;
  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.1fr 0.5fr 0.1fr 0.1fr 0.1fr 120px;

  & > div {
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: left;
    }
  }
`;
const TableArticle = styled.div`
  border: 1px solid;
  border-color: #b6b4b4;
  display: flex;
  align-items: center;
  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.1fr 0.5fr 0.1fr 0.1fr 0.1fr 120px;

  & > div {
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(6) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ResultTableHead = styled.div`
  border: 1px solid;
  background-color: #373837;
  color: white;
  display: flex;
  align-items: end;
  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.6fr 0.1fr 0.1fr 0.1fr 120px;

  & > div {
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: center;
    }
    &:nth-child(5) {
      text-align: center;
    }
    &:nth-child(6) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const ResultTable = styled.div`
  border: 1px solid;
  display: flex;
  align-items: end;
  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.6fr 0.1fr 0.1fr 0.1fr 120px;

  & > div {
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: center;
    }
    &:nth-child(5) {
      text-align: center;
    }
    &:nth-child(6) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
