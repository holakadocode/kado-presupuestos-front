import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import { Link } from 'react-router-dom';

 /**
  * @return [type]
  */
export default function BudgetHomeScreen() {
  const [budgets, setBudgets] = useState();

  const getBudgets = useCallback(() => {
    axios
      .get(`${ProjectDefaultRoute}/api/budget/list`)
      .then((r) => setBudgets(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getBudgets();
  }, []);

  const handleDeleteBudget = useCallback((budgetID) => {
    axios
      .delete(`${ProjectDefaultRoute}/api/budget/delete`, {
        data: { budgetID },
      })
      .then(() => getBudgets());
  }, []);

  return (
    <>
      <Link
        to="/admin/budget/0/add"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
      >
        Nuevo Presupuesto
      </Link>

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
                    <th>Cliente</th>
                    <th>Nombre</th>
                    <th>Iva</th>
                    <th>Total</th>
                    <th className="text-center">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {budgets?.map((budget) => (
                    <tr key={budget.id}>
                      <td>{budget.id}</td>
                      <td>{budget.dateTime}</td>
                      <td>{budget.clientName}</td>
                      <td>{budget.title}</td>
                      <td>{budget.iva}</td>
                      <td>{budget.total}</td>
                      <td className="d-flex justify-content-center">
                        <div className="d-inline-flex justify-content-center align-items-center">
                          <Link
                            to={`/admin/budget/${budget.clientID}/show/${budget.id}`}
                            // className={`nav-link ms-3 ${
                            //   actualRoute.pathname === '/admin'
                            //     ? 'linkInRoute'
                            //     : ''
                            // }`}
                          >
                            <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
                              <AppRemixIcons
                                icon="ri-eye-line"
                                title="Ver presupuesto"
                              />
                            </button>
                          </Link>

                          <Link
                            to={`/admin/budget/${budget.clientID}/update/${budget.id}`}
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
