import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import BudgetAdd from '../../Layout/Component/Specific/Budget/BudgetAdd';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';

export default function BudgetHomeScreen() {
  const [budgets, setBudgets] = useState();
  // const [selectedClientID, setSelectedClientID] = useState();

  const getClients = useCallback(() => {
    axios
      .get(`${ProjectDefaultRoute}/api/budget/list`)
      .then((r) => setBudgets(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  // const deleteClient = useCallback(
  //   (clientID) => {
  //     axios
  //       .delete('http://localhost/public/index.php/api/client/delete', {
  //         data: { clientID },
  //       })
  //       .then(() => getClients());
  //   },
  //   [getClients]
  // );

  return (
    <>
      <BudgetAdd onSubmit={() => getClients()} />

      {/* > Tabla */}
      <div id="container">
        <div className="mt-5">
          {budgets ? (
            budgets.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Iva</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {budgets?.map((budget) => (
                    <tr key={budget.id}>
                      <td>{budget.id}</td>
                      <td>{budget.dateTime}</td>
                      <td>{budget.title}</td>
                      <td>{budget.iva}</td>
                      <td>{budget.total}</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
                          {/* <AppRemixIcons icon="ri-search-line" /> */}
                          <AppRemixIcons icon="ri-arrow-up-circle-line" />
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
              <div>No hay presupuestos</div>
            )
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      </div>
    </>
  );
}
