/* eslint-disable react/prop-types */
import axios from 'axios';
import { Form, Formik, useFormikContext } from 'formik';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppModal from '../../Form/AppModal';
import AppInput from '../../Form/AppInput';
import AppNumber from '../../Form/AppNumber';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import AppSelect from '../../Form/AppSelect';

export default function BudgetAdd(props) {
  const { onSubmit } = props;
  const [budgetData, setBudgetData] = useState();
  const newArticle = {
    code: '',
    article: '',
    quantity: '',
    price: '',
    total: '',
  };

  const getData = useCallback((values) => {
    axios
      .get('http://localhost/public/index.php/api/budget/get-data/', values)
      .then((r) => {
        setBudgetData(r.data);
        console.log(r.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddClient = useCallback((values) => {
    axios
      .put('http://localhost/public/index.php/api/client/add', values)
      .then((r) => onSubmit())
      .catch((err) => console.log(err))
      .finally(() => budgetData(undefined));
  }, []);

  const handleAddNewArticle = useCallback(
    (values, setFieldValue) => {
      let tempArticles = values.articles;
      let add = [...tempArticles, newArticle];
      setFieldValue('articles', add);
    },
    [newArticle]
  );

  const handleDeleteArticle = useCallback(
    (index, values, setFieldValue) => {
      let tempArticles = values.articles;
      tempArticles.splice(index, 1);

      setFieldValue('articles', tempArticles);
    },
    [newArticle]
  );

  const handleAddInSelectedArticle = useCallback(
    (type, v, i, values, setFieldValue) => {
      let tempArticles = values.articles;

      tempArticles[i][type] = v;
      setFieldValue('articles', tempArticles);
    },
    [newArticle]
  );

  return (
    <>
      {!budgetData && (
        <button
          type="button"
          className="btn btn-outline-secondary d-inline-flex align-items-center"
          onClick={() => getData()}
        >
          <AppRemixIcons icon="ri-article-line" />
          Nuevo Presupuesto
        </button>
      )}

      {budgetData && (
        <Formik
          initialValues={{
            name: '',
            client: '',
            articles: [
              {
                code: 'X-asd43',
                article: 'Consolador orbital mononucleico arcaico y apepinado',
                quantity: '2',
                price: '100',
                total: '200',
              },
              {
                code: 'X-asd43',
                article:
                  'Sistema de succión cuantico inverosimil monotematico para el nabo',
                quantity: '2',
                price: '100',
                total: '200',
              },
            ],
          }}
          // validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          // enableReinitialize
          onSubmit={handleAddClient}
        >
          {({ setFieldValue, values, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <AppModal
                target={budgetData}
                onClose={() => setBudgetData(undefined)}
                title="Nuevo Presupuesto"
                isCloseButton
                closeButtonText="Cerrar"
                isSuccessButton
                successButtonText="Alta"
                width={'90%'}
                onAccept={handleSubmit}
              >
                {/* Datos de empresa propia */}
                <h2>{budgetData.ownCompany.name}</h2>
                <div className="ms-3">
                  <div>CIF: {budgetData.ownCompany.taxIdentification}</div>
                  <div>
                    {budgetData.ownCompany.address}, cp:{' '}
                    {budgetData.ownCompany.cp}, {budgetData.ownCompany.city}
                  </div>
                  <div>
                    {budgetData.ownCompany.phone}, {budgetData.ownCompany.email}
                  </div>
                </div>
                {/* Datos del cliente */}
                <div className="row  mt-3">
                  <div className="col-6">
                    <h4>Cliente</h4>
                    <AppSelect
                      title={'Seleccione cliente'}
                      options={budgetData.clients}
                      placeholder="placeholder"
                      value={values.client}
                      onChange={(v) => setFieldValue('client', v)}
                    />
                    <div className="ms-3" style={{ height: '100px' }}>
                      {values.client && (
                        <>
                          <div>
                            {
                              budgetData?.clients[values.client]
                                .taxIdentification
                            }
                          </div>
                          <div>
                            {budgetData.clients[values.client].adress},
                            {budgetData.clients[values.client].cp},{' '}
                            {budgetData.clients[values.client].city}
                          </div>
                          <div>
                            {budgetData.clients[values.client].phone},{' '}
                            {budgetData.clients[values.client].email}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Datos del cliente */}
                  <div className="col-6">
                    <div>
                      <h4>Presupuesto</h4>
                      <div>Fecha y numero de ID</div>
                      {/* Detalles del presupuesto */}
                    </div>
                  </div>
                </div>
                {/* Tabla */}
                <button
                  type="button"
                  className="btn btn-outline-secondary d-inline-flex align-items-center"
                  onClick={() => handleAddNewArticle(values, setFieldValue)}
                >
                  <AppRemixIcons icon="ri-user-line" className="me-2" />
                  Añadir nuevo item
                </button>

                <TableHeader>
                  <div>Codigo</div>
                  <div>Articulo</div>
                  <div>Cantidad</div>
                  <div>Precio</div>
                  <div>Total</div>
                  <div>Opciones</div>
                </TableHeader>
                {values.articles.map((article, i) => (
                  <TableArticle key={i}>
                    <div>
                      <AppInput
                        value={values.code}
                        required
                        // error=""
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
                      {article.code}
                    </div>
                    <div>
                      <AppInput
                        value={values.article}
                        required
                        // error=""
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
                      {article.article}
                    </div>
                    <div>
                      <AppNumber
                        value={values.quantity}
                        required
                        // error=""
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
                      {article.quantity}
                    </div>
                    <div>
                      <AppNumber
                        value={values.price}
                        required
                        // error=""
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
                      {article.price}
                    </div>
                    <div>
                      {parseFloat(article.quantity) * parseFloat(article.price)}
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
                    {/* Aquí asumimos que IVA se calcula sobre el subtotal calculado */}
                    {(
                      values.articles.reduce(
                        (sum, article) =>
                          sum +
                          parseFloat(article.quantity) *
                            parseFloat(article.price),
                        0
                      ) * 0.21
                    ).toFixed(2)}
                  </div>
                  <div>
                    {/* Cálculo del subtotal "inline" */}
                    {values.articles
                      .reduce(
                        (sum, article) =>
                          sum +
                          parseFloat(article.quantity) *
                            parseFloat(article.price),
                        0
                      )
                      .toFixed(2)}
                  </div>
                  <div>
                    {(
                      values.articles.reduce(
                        (sum, article) =>
                          sum +
                          parseFloat(article.quantity) *
                            parseFloat(article.price),
                        0
                      ) * 1.21
                    ).toFixed(2)}
                  </div>
                </ResultTable>
              </AppModal>
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
  /* height: 160px; */

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
      text-align: center;
    }
  }
`;
const TableArticle = styled.div`
  border: 1px solid;
  border-color: #b6b4b4;
  display: flex;
  align-items: center;
  /* height: 160px; */
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

const ResultTableHead = styled.div`
  border: 1px solid;
  background-color: #373837;
  color: white;
  display: flex;
  align-items: end;
  /* height: 160px; */
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
  /* height: 160px; */
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
