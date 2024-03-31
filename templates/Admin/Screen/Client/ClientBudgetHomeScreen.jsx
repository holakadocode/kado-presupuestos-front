import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';

export default function ClientBudgetHomeScreen() {
  const { clientID } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState();
  const [clientBudgets, setClientBudgets] = useState([]);

  const getClientBudgets = useCallback(() => {
    axios
      .post(
        `${ProjectDefaultRoute}/api/client/get`,
        { clientID },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then((r) => {
        setClient(r.data);
        setClientBudgets(r.data.budgets);
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, [clientID]);

  const getExcelBudget = useCallback((budgetID) => {
    axios
      .post(
        `${ProjectDefaultRoute}/api/xls/test`,
        { clientID, budgetID },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          responseType: 'blob',
        }
      )
      .then((r) => {
        const url = window.URL.createObjectURL(new Blob([r.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `P-000${budgetID}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, [clientID]);

  useEffect(() => {
    getClientBudgets();
  }, [getClientBudgets]);

  const handleDeleteBudget = useCallback((budgetID) => {
    axios
      .delete(
        `${ProjectDefaultRoute}/api/budget/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          data: { budgetID },
        }
      )
      .then(() => getClientBudgets())
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, []);

  return (
    <>
      {client && clientBudgets && (
        <>
          {/* Datos Cliente */}
          <div id="container">
            <h2>
              Presupuestos de : {client?.name} {client?.surname}
            </h2>
            <div className="m-5">
              <div>CIF: {client?.taxIdentification}</div>
              <div>
                <AppRemixIcons icon="ri-user-line" className="me-2" />
                {client?.name} {client?.surname}
              </div>
              <div>
                <AppRemixIcons icon="ri-phone-line" className="me-2" />
                {client?.tlf} -{' '}
                <AppRemixIcons icon="ri-mail-line" className="me-2" />
                {client?.contactEmail}
              </div>
            </div>
          </div>

          <Link
            to={`/admin/budget/${client.id}/add`}
            className="btn btn-outline-secondary d-inline-flex align-items-center"
          >
            Nuevo Presupuesto
          </Link>

          {/* > Tabla */}
          <div id="container">
            <div className="mt-5">
              {clientBudgets && clientBudgets.length ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>IVA</th>
                      <th>Total</th>
                      <th className="text-center">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientBudgets?.map((budget) => (
                      <tr key={budget.id}>
                        <td>{budget.id}</td>
                        <td>{budget.title}</td>
                        <td>{budget.iva}</td>
                        <td>{budget.total}</td>
                        <td className="d-flex justify-content-center">
                          <div className="d-inline-flex justify-content-center align-items-center">
                            <button
                              className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                              onClick={() => getExcelBudget(budget.id)}
                            >
                              <AppRemixIcons icon="ri-file-excel-line" />
                            </button>
                            
                            <Link
                              to={`/admin/budget/${client.id}/update/${budget.id}`}
                            >
                              <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center ms-2">
                                <AppRemixIcons
                                  icon="ri-pencil-line"
                                  title="Editar presupuesto"
                                />
                              </button>
                            </Link>
                            <button
                              className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center ms-2"
                              onClick={() => handleDeleteBudget(budget.id)}
                            >
                              <AppRemixIcons icon="ri-delete-bin-line" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>Este cliente no tiene presupuestos</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
