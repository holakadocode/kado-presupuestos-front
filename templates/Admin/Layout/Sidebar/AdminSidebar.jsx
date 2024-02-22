import { Outlet } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <>
      <div className="d-flex">
        <div
          className="bg-light d-none d-md-block flex-grow-0 vh-100 rounded-end shadow"
          style={{ width: '200px' }}
        >
          <div className="ms-3 mt-3">
            <div>{/* Icono con Cabecera */}</div>
            <i className="ri-article-line"></i>
            <ul
              className="mt-5"
              style={{ listStyleType: 'none', padding: 0, margin: 0 }}
            >
              <li className="mt-3">
                <button type="button" className="btn btn-primary btn-sm">
                  Warning
                </button>
              </li>
              <li className="mt-3">nabo</li>
              <li className="mt-3">nabo</li>
            </ul>
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="container mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
