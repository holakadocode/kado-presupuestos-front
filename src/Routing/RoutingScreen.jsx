import { Routes, Route } from 'react-router-dom';
import AdminLoginScreen from '../../templates/AdminLoginScreen';
import AdminSidebar from '../../templates/Admin/Layout/Sidebar/AdminSidebar';
import AdminHomeScreen from '../../templates/Admin/Screen/AdminHomeScreen';
import AdminAlmacen from '../../templates/Admin/Screen/Store/AdminAlmacen';
import AdminProvider from '../../templates/Admin/Screen/AdminProvider';
import ClientHomeScreen from '../../templates/Admin/Screen/Client/ClientHomeScreen';

export default function RoutingScreen() {
  return (
    <Routes>
      <Route path="/" element={<AdminLoginScreen />} />

      <Route path="/admin" element={<AdminSidebar />}>
        <Route path="/admin" element={<AdminHomeScreen />} />
        <Route path="/admin/users" element={<AdminHomeScreen />} />
        <Route path="/admin/clients" element={<ClientHomeScreen />} />
        <Route path="/admin/clients/:clientID/budget/list" element={'¡holi!'} />
        <Route path="/admin/almacen" element={<AdminAlmacen />} />
        <Route path="/admin/provider" element={<AdminProvider />} />
      </Route>
    </Routes>
  );
}
