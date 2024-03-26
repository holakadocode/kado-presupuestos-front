import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import CompanyAdd from '../../Layout/Component/Specific/Company/CompanyAdd';
import CompanyEdit from '../../Layout/Component/Specific/Company/CompanyEdit';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';

export default function CompanyHomeScreen() {
  const [company, setCompany] = useState();

  const getCompany = useCallback(async () => {
    axios
      .get(`${ProjectDefaultRoute}/api/company/list/`)
      .then((r) => setCompany(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getCompany();
  }, []);

  const deleteCompany = useCallback(
    (companyID) => {
      axios
        .delete(`${ProjectDefaultRoute}/api/company/delete`, {
          data: { companyID },
        })
        .then(() => getCompany());
    },
    [getCompany]
  );

  return (
    <>
      <CompanyAdd company={company} onSubmit={() => getCompany()} />

      <div id="container">
        <div className="mt-5">
          {company ? (
            company.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Nombre</th>
                    <th>CIF</th>
                    <th>Direccion</th>
                    <th>CP</th>
                    <th>Ciudad</th>
                    <th>Telefono</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {company?.map((company) => (
                    <tr key={company.id}>
                      {/* <th>{provider.id}</th> */}
                      <th>{company.name}</th>
                      <td>{company.taxIdentification}</td>
                      <td>{company.address}</td>
                      <td>{company.cp}</td>
                      <td>{company.city}</td>
                      <td>{company.phone}</td>
                      <td>{company.email}</td>

                      <td>
                        <CompanyEdit
                          company={company}
                          onSubmit={() => {
                            getCompany(company.id);
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                          onClick={() => deleteCompany(company.id)}
                        >
                          <AppRemixIcons icon="ri-delete-bin-line" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No hay empresa dada de alta</div>
            )
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      </div>
    </>
  );
}
