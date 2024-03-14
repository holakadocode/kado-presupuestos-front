import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import ProviderAdd from '../../Layout/Component/Specific/Provider/ProviderAdd';
import ProviderEdit from '../../Layout/Component/Specific/Provider/ProviderEdit';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';

export default function ProviderHomeScreen() {
  const [providers, setProviders] = useState();

  const getProviders = useCallback(async () => {
    axios
      .get(`${ProjectDefaultRoute}/api/provider/list`)
      .then((r) => setProviders(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getProviders();
  }, []);

  const deleteProvider = useCallback(
    (providerID) => {
      axios
        .delete(`${ProjectDefaultRoute}/api/provider/delete`, {
          data: { providerID },
        })
        .then(() => getProviders());
    },
    [getProviders]
  );

  return (
    <>
      <ProviderAdd providers={providers} onSubmit={() => getProviders()} />

      <div id="container">
        <div className="mt-5">
          {providers ? (
            providers.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Cod.Prov</th>
                    <th>Empresa</th>
                    <th>Razon Social</th>
                    <th>Nif</th>
                    <th>Contacto</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                  </tr>
                </thead>
                <tbody>
                  {providers?.map((provider) => (
                    <tr key={provider.id}>
                      {/* <th>{provider.id}</th> */}
                      <th>{provider.codProvider}</th>
                      <td>{provider.nameCompany}</td>
                      <td>{provider.businessName}</td>
                      <td>{provider.nif}</td>
                      <td>{provider.contactPerson}</td>
                      <td>{provider.email}</td>
                      <td>{provider.phone}</td>
                      <td>{provider.address}</td>

                      <td>
                        <ProviderEdit
                          provider={provider}
                          onSubmit={() => {
                            getProviders(provider.id);
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                          onClick={() => deleteProvider(provider.id)}
                        >
                          <AppRemixIcons icon="ri-delete-bin-line" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No hay proveedores dados de alta</div>
            )
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      </div>
    </>
  );
}
