import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminLoginScreen from '../../templates/AdminLoginScreen';
import AdminSidebar from '../../templates/Admin/Layout/Sidebar/AdminSidebar';
import AdminStorage from '../../templates/Admin/Screen/Store/AdminStorage';
import ProviderHomeScreen from '../../templates/Admin/Screen/Provider/ProviderHomeScreen';
import ShitTest from '../../templates/Admin/Screen/test/ShitTest';
import ClientHomeScreen from '../../templates/Admin/Screen/Client/ClientHomeScreen';
import BudgetHomeScreen from '../../templates/Admin/Screen/Budget/BudgetHomeScreen';
import BudgetAddScreen from '../../templates/Admin/Screen/Budget/BudgetAddScreen';
import BudgetUpdateScreen from '../../templates/Admin/Screen/Budget/BudgetUpdateScreen';
import BudgetShowScreen from '../../templates/Admin/Screen/Budget/BudgetShowScreen';
import ClientBudgetHomeScreen from '../../templates/Admin/Screen/Client/ClientBudgetHomeScreen';
import AdminHomeScreen from '../../templates/Admin/Screen/Admin/AdminHomeScreen';
import CompanyUpdateScreen from '../../templates/Admin/Screen/Company/CompanyUpdateScreen';

export default function RoutingScreen() {
  const navigate = useNavigate();

  const handleSetToken = (value) => {
    localStorage.setItem('authToken', value);
  };

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [localStorage.getItem('authToken')]);

  return (
    <Routes>
      <Route
        path="/"
        element={<AdminLoginScreen onLogin={(v) => handleSetToken(v)} />}
      />

      <Route path="/admin" element={<AdminSidebar />}>
        <Route path="/admin" element={<CompanyUpdateScreen />} />
        <Route path="/admin/users" element={<AdminHomeScreen />} />
        <Route path="/admin/company" element={<CompanyUpdateScreen />} />
        <Route path="/admin/clients" element={<ClientHomeScreen />} />
        <Route
          path="/admin/clients/:clientID/budget/list"
          element={<ClientBudgetHomeScreen />}
        />
        <Route path="/admin/almacen" element={<AdminStorage />} />
        <Route path="/admin/provider" element={<ProviderHomeScreen />} />
        <Route path="/admin/shitTest" element={<ShitTest />} />
        <Route path="/admin/budget" element={<BudgetHomeScreen />} />
        <Route
          path="/admin/budget/:clientID/add"
          element={<BudgetAddScreen />}
        />
        <Route
          path="/admin/budget/:clientID/show/:budgetID"
          element={<BudgetShowScreen />}
        />
        <Route
          path="/admin/budget/:clientID/update/:budgetID"
          element={<BudgetUpdateScreen />}
        />
      </Route>
    </Routes>
  );
}
