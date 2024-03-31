import { useCallback, useEffect, useState } from 'react';
import ClientAdd from '../../Layout/Component/Specific/Client/ClientAdd';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import AppModal from '../../Layout/Component/Form/AppModal';
import ClientEdit from '../../Layout/Component/Specific/Client/ClientEdit';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ClientHomeScreen() {
  const [clients, setClients] = useState();
  const actualRoute = useLocation();
  const navigate = useNavigate();

  // const [selectedClientID, setSelectedClientID] = useState();

  const getClients = useCallback(() => {
    axios
      .get(`${ProjectDefaultRoute}/api/client/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((r) => setClients(r.data))
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  const deleteClient = useCallback(
    (clientID) => {
      axios
        .delete(`${ProjectDefaultRoute}/api/client/delete`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          data: { clientID },
        })
        .then(() => getClients())
        .catch((errors) => {
          console.log(errors);
          if (errors.response?.status === 401) {
            localStorage.removeItem('authToken', null);
            navigate('/');
          }
        });
    },
    [getClients]
  );

  return (
    <>
      <ClientAdd onSubmit={() => getClients()} />

      {/* > Tabla */}
      <div id="container">
        <div className="mt-5">
          {clients ? (
            clients.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Teléfono</th>
                    <th>Email contacto</th>
                    <th>Dirección</th>
                    <th>C.P</th>
                    <th>Ciudad</th>
                    <th>NIF</th>
                    <th className="text-center">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients?.map((client) => (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.name}</td>
                      <td>{client.surname}</td>
                      <td>{client.tlf}</td>
                      <td>{client.contactEmail}</td>
                      <td>{client.address}</td>
                      <td>{client.cp}</td>
                      <td>{client.city}</td>
                      <td>{client.taxIdentification}</td>
                      <td className="d-flex justify-content-center">
                        <div className="d-inline-flex justify-content-center align-items-center">
                          <Link
                            to={`/admin/clients/${client.id}/budget/list`}
                            title="Ver presupuestos del cliente"
                            className={`nav-link me-2 ${
                              actualRoute.pathname ===
                              `/admin/clients/${client.id}/budget/list`
                                ? 'linkInRoute'
                                : ''
                            }`}
                          >
                            <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
                              <AppRemixIcons icon="ri-arrow-up-circle-line" />
                            </button>
                          </Link>

                          <ClientEdit
                            client={client}
                            onSubmit={() => {
                              getClients();
                            }}
                          />

                          <button
                            className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center ms-2"
                            onClick={() => deleteClient(client.id)}
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
              <div>No hay clientes dados de alta</div>
            )
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      </div>
    </>
  );
}
