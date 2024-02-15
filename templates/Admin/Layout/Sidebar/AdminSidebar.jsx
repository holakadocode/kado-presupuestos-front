import { Outlet } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <>
      adminBase <Outlet />
    </>
  );
}
