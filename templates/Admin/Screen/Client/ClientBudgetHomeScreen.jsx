import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import { Link, useLocation, useParams } from 'react-router-dom';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';

export default function ClientBudgetHomeScreen() {
  const actualRoute = useLocation();

  const { clientID } = useParams();
  const [client, setClient] = useState();
  const [clientBudgets, setClientBudgets] = useState([]);

  const getClientBudgets = useCallback(() => {
    axios
      .post(`${ProjectDefaultRoute}/api/client/get`, {
        clientID,
      })
      .then((r) => {
        console.log(r.data);
        setClient(r.data);
        setClientBudgets(r.data.budgets);
      })
      .catch((e) => console.log('E', e));
  }, [clientID]);

  useEffect(() => {
    getClientBudgets();
  }, [getClientBudgets]);

  const handleDeleteBudget = useCallback((budgetID) => {
    axios
      .delete('http://localhost/public/index.php/api/budget/delete', {
        data: { budgetID },
      })
      .then(() => getClientBudgets());
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
                      <th className='text-center'>Opciones</th>
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
                              onClick={() =>
                                window.open(
                                  `${ProjectDefaultRoute}/api/xls/test`
                                )
                              }
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
