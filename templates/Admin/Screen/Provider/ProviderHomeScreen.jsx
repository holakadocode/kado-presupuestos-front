
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import ProviderAdd from '../../Layout/Specific/Provider/ProviderAdd';
import ProviderEdit from '../../Layout/Specific/Provider/ProviderEdit';


export default function ProviderHomeScreen() {
  const [providers, setProviders] = useState();

  const getProviders = useCallback(async () => {
    axios
      .get('http://localhost/public/index.php/api/provider/list/')
      .then((r) => setProviders(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getProviders();
  }, []);

  const deleteProvider = useCallback(
    (providerID) => {
      axios
        .delete('http://localhost/public/index.php/api/client/delete',{
          data: {providerID},
        })
        .then(()=> getProviders());
    },
    [getProviders]

  );

  
  return (
    <>
      <ProviderAdd onSubmit={() => getProviders()} />
      <div id="container">
        <div className="mt-5">
          {providers ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">codigo</th>
                <th scope="col">Nombre Empresa</th>
                <th scope="col">Razon Social</th>
                <th scope="col">Nif</th>
                <th scope="col">Contacto</th>
                <th scope="col">Email</th>
                <th scope="col">Direccion</th>
                <th scope="col">FechaAlta</th>
              </tr>
            </thead>
            <tbody>
              {providers?.map((provider) => (
                <tr key={provider.id}>
                  <th scope="row">{provider.idProvider}</th>
                  <td>{provider.nameCompany}</td>
                  <td>{provider.businessName}</td>
                  <td>{provider.nif}</td>
                  <td>{provider.contactPerson}</td>
                  <td>{provider.email}</td>
                  <td>{provider.address}</td>
                  <td>{provider.fechaAlta}</td>
                  <td>
                    <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">

                      <AppRemixIcons icon="ri-arrow-up-circle-line" />
                    </button>
                  </td>
                  <td>
                    <ProviderEdit
                     provider={provider}
                     onSubmit={() => {
                      getProviders();
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                      onClick={()=> deleteProvider(provider.id)}
                    >
                      <AppRemixIcons icon="ri-delete-bin-line" />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ):(
          <div>No hay proveedores dados de alta</div>
        )} 
        </div>
      </div>
    </>
  );
}
