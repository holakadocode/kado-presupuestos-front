import { useCallback, useEffect, useState } from 'react';
import ClientAdd from '../../Layout/Component/Specific/Client/ClientAdd';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import AppModal from '../../Layout/Component/Form/AppModal';
import ClientEdit from '../../Layout/Component/Specific/Client/ClientEdit';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import { Link, useLocation } from 'react-router-dom';

export default function ClientHomeScreen() {
  const [clients, setClients] = useState();
  const actualRoute = useLocation();

  // const [selectedClientID, setSelectedClientID] = useState();

  const getClients = useCallback(() => {
    axios
      .get(`${ProjectDefaultRoute}/api/client/list`)
      .then((r) => setClients(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  const deleteClient = useCallback(
    (clientID) => {
      axios
        .delete(`${ProjectDefaultRoute}/api/client/delete`, {
          data: { clientID },
        })
        .then(() => getClients());
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
                    <th></th>
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
                      <td>
                        <Link
                          to={`/admin/clients/${client.id}/budget/list`}
                          className={`nav-link ${
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
                      </td>
                      <td>
                        <ClientEdit
                          client={client}
                          onSubmit={() => {
                            getClients();
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                          onClick={() => deleteClient(client.id)}
                        >
                          <AppRemixIcons icon="ri-delete-bin-line" />
                        </button>
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
