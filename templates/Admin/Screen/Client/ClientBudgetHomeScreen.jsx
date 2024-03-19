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

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientBudgets?.map((budgets) => (
                      <tr key={budgets.id}>
                        <td>{budgets.id}</td>
                        <td>{budgets.title}</td>
                        <td>{budgets.iva}</td>
                        <td>{budgets.total}</td>
                        <td>
                          <button
                            className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                            onClick={() =>
                              window.open(`${ProjectDefaultRoute}/api/xls/test`)
                            }
                          >
                            <AppRemixIcons icon="ri-file-excel-line" />
                          </button>
                        </td>

                        <td>
                          <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
                            <AppRemixIcons icon="ri-pencil-line" />
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
                            <AppRemixIcons icon="ri-delete-bin-line" />
                          </button>
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
