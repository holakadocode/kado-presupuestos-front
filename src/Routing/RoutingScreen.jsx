import { Routes, Route } from 'react-router-dom';
import AdminLoginScreen from '../../templates/AdminLoginScreen';
import AdminSidebar from '../../templates/Admin/Layout/Sidebar/AdminSidebar';
import AdminHomeScreen from '../../templates/Admin/Screen/AdminHomeScreen';
import AdminStorage from '../../templates/Admin/Screen/Store/AdminStorage';
import ProviderHomeScreen from '../../templates/Admin/Screen/Provider/ProviderHomeScreen';
import ShitTest from '../../templates/Admin/Screen/test/ShitTest';
import ClientHomeScreen from '../../templates/Admin/Screen/Client/ClientHomeScreen';
import BudgetHomeScreen from '../../templates/Admin/Screen/Budget/BudgetHomeScreen';
import BudgetAddScreen from '../../templates/Admin/Screen/Budget/BudgetAddScreen';
import BudgetUpdateScreen from '../../templates/Admin/Screen/Budget/BudgetUpdateScreen';
import BudgetShowScreen from '../../templates/Admin/Screen/Budget/BudgetShowScreen';
import CompanyHomeScreen from '../../templates/Admin/Screen/Company/CompanyHomeScreen';
import ClientBudgetHomeScreen from '../../templates/Admin/Screen/Client/ClientBudgetHomeScreen';

export default function RoutingScreen() {
  return (
    <Routes>
      <Route path="/" element={<AdminLoginScreen />} />

      <Route path="/admin" element={<AdminSidebar />}>
        <Route path="/admin" element={<AdminHomeScreen />} />
        <Route path="/admin/users" element={<AdminHomeScreen />} />
        <Route path="/admin/company" element={<CompanyHomeScreen />} />
        <Route path="/admin/clients" element={<ClientHomeScreen />} />
        <Route
          path="/admin/clients/:clientID/budget/list"
          element={<ClientBudgetHomeScreen />}
        />
        <Route path="/admin/almacen" element={<AdminStorage />} />
        <Route path="/admin/provider" element={<ProviderHomeScreen />} />
        <Route path="/admin/shitTest" element={<ShitTest />} />
        <Route path="/admin/budget" element={<BudgetHomeScreen />} />
        <Route path="/admin/budget/:clientID/add" element={<BudgetAddScreen />} />
        <Route path="/admin/budget/:clientID/show/:budgetID" element={<BudgetShowScreen />} />
        <Route path="/admin/budget/:clientID/update/:budgetID" element={<BudgetUpdateScreen />} />
      </Route>
    </Routes>
  );
}
