/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Login from './pages/Login';
import Bind from './pages/Bind';
import Dashboard from './pages/Dashboard';
import Control from './pages/Control';
import Health from './pages/Health';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Maintenance from './pages/Maintenance';
import RobotSettings from './pages/RobotSettings';
import ElderlyProfile from './pages/ElderlyProfile';
import SecuritySettings from './pages/SecuritySettings';
import FamilySharing from './pages/FamilySharing';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, hasRobotBound } = useAppContext();
  
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!hasRobotBound) return <Navigate to="/bind" replace />;
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/bind" element={<Bind />} />
      <Route
        path="/*"
        element={
          <AuthGuard>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/control" element={<Control />} />
              <Route path="/health" element={<Health />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/robot-settings" element={<RobotSettings />} />
              <Route path="/elderly-profile" element={<ElderlyProfile />} />
              <Route path="/security" element={<SecuritySettings />} />
              <Route path="/family-sharing" element={<FamilySharing />} />
            </Routes>
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-0 sm:p-4">
        {/* Mobile Viewport Wrapper */}
        <div className="w-full h-screen sm:w-[375px] sm:h-[812px] bg-white sm:rounded-[40px] shadow-2xl relative overflow-hidden sm:border-[8px] border-slate-900 transition-all duration-300">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </div>
    </AppProvider>
  );
}

