import { Link, Outlet, useLocation } from 'react-router-dom';
import AppRemixIcons from '../Component/Icon/AppRemixIcons';
import styled from 'styled-components';

 /**
  * @return [type]
  */
export default function AdminSidebar() {
  const actualRoute = useLocation();

  return (
    <Sidebar>
      <div className="d-flex">
        <div
          className="bg-light d-none d-md-block flex-grow-0 vh-100 rounded-end shadow"
          style={{ width: '250px' }}
        >
          <div className="ms-3 mt-3">
            <LogoHead>
              <AppRemixIcons icon="ri-article-line" />
              <Link
                to="/admin"
                className={`nav-link ms-3 ${
                  actualRoute.pathname === '/admin' ? 'linkInRoute' : ''
                }`}
              >
                Presupuestos
              </Link>
            </LogoHead>

            <ul
              className="mt-5"
              style={{ listStyleType: 'none', padding: 0, margin: 0 }}
            >
              <li>
                <Link
                  to="/admin/company"
                  className={`nav-link ms-3 ${
                    actualRoute.pathname === '/admin/company'
                      ? 'linkInRoute'
                      : ''
                  }`}
                >
                  <AppRemixIcons icon="ri-building-3-line" />
                  <span>Mi Compañia</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={`nav-link ms-3 ${
                    actualRoute.pathname === '/admin/users' ? 'linkInRoute' : ''
                  }`}
                >
                  <AppRemixIcons icon="ri-shield-user-line" />
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/clients"
                  className={`nav-link ms-3 ${
                    actualRoute.pathname === '/admin/clients'
                      ? 'linkInRoute'
                      : ''
                  }`}
                >
                  <AppRemixIcons icon="ri-user-line" />
                  <span>Clientes</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/provider"
                  className={`nav-link ms-3 ${
                    actualRoute.pathname === '/admin/provider'
                      ? 'linkInRoute'
                      : ''
                  }`}
                >
                  <AppRemixIcons icon="ri-truck-line" />
                  <span>Proveedores</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/almacen"
                  className={`nav-link ms-3 ${
                    actualRoute.pathname === '/admin/almacen'
                      ? 'linkInRoute'
                      : ''
                  }`}
                >
                  <AppRemixIcons icon="ri-box-1-line" />
                  <span>Almacen</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/shitTest"
                  className={`nav-link ms-3 ${
                    actualRoute.pathname === '/admin/shitTest'
                      ? 'linkInRoute'
                      : ''
                  }`}
                >
                  <AppRemixIcons icon="ri-recycle-line" />
                  <span>Pruebas de mierda</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/budget"
                  className={`nav-link ms-3 ${
                    actualRoute.pathname === '/admin/budget'
                      ? 'linkInRoute'
                      : ''
                  }`}
                >
                  <AppRemixIcons icon="ri-article-line" />
                  <span>Presupuestos</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="container mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
const LogoHead = styled.div`
  display: inline-flex;
  font-size: 20px;
`;
const Sidebar = styled.div`
  .linkInRoute {
    color: red;
  }
  ul li {
    margin-top: 20px;
    span {
      margin-left: 10px;
    }
  }
`;
