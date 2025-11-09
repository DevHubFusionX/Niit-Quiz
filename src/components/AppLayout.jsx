import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = ({ darkMode, toggleDarkMode, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'overview';
    if (path.startsWith('/subjects')) return 'subjects';
    if (path.startsWith('/statistics')) return 'statistics';
    if (path.startsWith('/study-notes')) return 'notes';
    if (path.startsWith('/profile')) return 'profile';
    return 'overview';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onBackToHome={onLogout}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        currentPage={getCurrentPage()}
        onNavigate={(path) => navigate(path)}
      />

      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'}`}>
        <div className="p-6 pt-16 md:pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;