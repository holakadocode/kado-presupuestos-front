import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import { useNavigate } from 'react-router-dom';
import AdminAdd from '../../Layout/Component/Specific/Admin/AdminAdd';
import AdminEdit from '../../Layout/Component/Specific/Admin/AdminEdit';

export default function AdminHomeScreen() {
  const [admins, setAdmins] = useState();
  const navigate = useNavigate();

  const getAdmins = useCallback(async () => {
    axios
      .get(`${ProjectDefaultRoute}/api/admin/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((r) => setAdmins(r.data))
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, []);

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteAdmin = useCallback(
    (adminID) => {
      axios
        .delete(`${ProjectDefaultRoute}/api/admin/delete`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          data: { adminID },
        })
        .then(() => getAdmins())
        .catch((errors) => {
          console.log(errors);
          if (errors.response?.status === 401) {
            localStorage.removeItem('authToken', null);
            navigate('/');
          }
        });
    },
    [getAdmins]
  );

  return (
    <>
      <AdminAdd admins={admins} onSubmit={() => getAdmins()} />

      <div id="container">
        <div className="mt-5">
          {admins ? (
            admins.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th className="text-center">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {admins?.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.name}</td>
                      <td>{admin.surname}</td>
                      <th>{admin.email}</th>
                      <td className="d-flex justify-content-center">
                        <div className="d-inline-flex justify-content-center align-items-center">
                          <AdminEdit
                            admin={admin}
                            onSubmit={() => {
                              getAdmins(admin.id);
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center ms-2"
                            onClick={() => deleteAdmin(admin.id)}
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
              <div>No hay usuarios dados de alta</div>
            )
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      </div>
    </>
  );
}
