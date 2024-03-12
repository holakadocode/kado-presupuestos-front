import { Routes, Route } from 'react-router-dom';
import AdminLoginScreen from '../../templates/AdminLoginScreen';
import AdminSidebar from '../../templates/Admin/Layout/Sidebar/AdminSidebar';
import AdminHomeScreen from '../../templates/Admin/Screen/AdminHomeScreen';
import AdminStorage from '../../templates/Admin/Screen/Store/AdminStorage';
import ProviderHomeScreen from '../../templates/Admin/Screen/Provider/ProviderHomeScreen';
import ShitTest from '../../templates/Admin/Screen/test/ShitTest';
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
        <Route path="/admin/almacen" element={<AdminStorage />} />
        <Route path="/admin/provider" element={<ProviderHomeScreen />} />
        <Route path="/admin/shitTest" element={<ShitTest />} />
      </Route>
    </Routes>
  );
}
