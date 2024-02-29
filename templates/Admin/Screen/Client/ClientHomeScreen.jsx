import { useCallback, useEffect, useState } from 'react';
import ClientAdd from '../../Layout/Component/Specific/Client/ClientAdd';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import AppModal from '../../Layout/Component/Form/AppModal';
import ClientEdit from '../../Layout/Component/Specific/Client/ClientEdit';

export default function ClientHomeScreen() {
  const [clients, setClients] = useState();
  // const [selectedClientID, setSelectedClientID] = useState();

  const getClients = useCallback(() => {
    axios
      .get('http://localhost/public/index.php/api/client/list')
      .then((r) => setClients(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  const deleteClient = useCallback(
    (client) => {
      axios
        .delete('http://localhost/public/index.php/api/client/delete', {
          data: client
        })
        .then(() => getClients());
    },
    [getClients]
  );


  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#targetModaClientAdd"
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Nuevo Cliente
      </button>
      <AppModal
        target="targetModaClientAdd"
        title="Nuevo Cliente"
        isCloseButton
        isCloseButtonText="Cerrar"
        isSuccessButton
        isSuccessButtonText="Alta"
        // onAccept={handleSubmit}
        content={<ClientAdd />}
      />
      {/* > Tabla */}
      <div id="container">
        <div className="mt-5">
          {clients ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Email contacto</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">C.P</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">NIF</th>
                  <th colspan="3"></th>
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
                    <td>{client.nif}</td>
                    <td>
                      <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
                        {/* <AppRemixIcons icon="ri-search-line" /> */}
                        <AppRemixIcons icon="ri-file-list-3-line" />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target={`#editClient-${client.id}`}
                        // onClick={() => {
                        //   setSelectedClientID(client.id);
                        // }}
                      >
                        <AppRemixIcons icon="ri-pencil-line" />
                      </button>
                      <AppModal
                        target={`editClient-${client.id}`}
                        title={`Editar info de:  ${client.name} ${client.surname}`}
                        isCloseButton
                        isCloseButtonText="Cerrar"
                        isSuccessButton
                        isSuccessButtonText="Alta"
                        // onAccept={handleSubmit}
                        content={
                          <ClientEdit
                            client={client}
                            onSubmit={() => {
                              getClients();
                            }}
                          />
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                        onClick={() => deleteClient(client)}
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
          )}
        </div>
      </div>
    </>
  );
}