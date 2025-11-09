import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  User,
  Moon,
  Sun,
  ChevronLeft,
  Target,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const Sidebar = ({ darkMode, toggleDarkMode, onBackToHome, isCollapsed, setIsCollapsed, currentPage = 'overview', onNavigate }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { icon: Target, label: 'Overview', action: () => { onNavigate?.('/dashboard'); setIsMobileOpen(false); }, active: currentPage === 'overview' },
    { icon: BookOpen, label: 'Subjects', action: () => { onNavigate?.('/subjects'); setIsMobileOpen(false); }, active: currentPage === 'subjects' },
    { icon: BarChart3, label: 'Statistics', action: () => { onNavigate?.('/statistics'); setIsMobileOpen(false); }, active: currentPage === 'statistics' },
    { icon: Settings, label: 'Study Notes', action: () => { onNavigate?.('/study-notes'); setIsMobileOpen(false); }, active: currentPage === 'notes' },
    { icon: User, label: 'Profile', action: () => { onNavigate?.('/profile'); setIsMobileOpen(false); }, active: currentPage === 'profile' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`fixed top-4 left-4 z-50 p-3 rounded-lg ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'} shadow-lg md:hidden`}
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${isMobile
        ? `${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
        : isCollapsed ? 'w-16' : 'w-64'
        }`}>
        <div className={`h-full border-r ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
          {/* Header */}
          <div className={`p-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              {(!isCollapsed || isMobile) && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>NIIT Hub</h2>
                  </div>
                </div>
              )}
              {isCollapsed && !isMobile && (
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              )}
              {!isMobile && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
                >
                  <ChevronLeft className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-gray-600'} ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-blue-500 text-white'
                      : darkMode
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <item.icon className={`${isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} />
                  {(!isCollapsed || isMobile) && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Logout Button */}
            <div className="mt-8 pt-4 border-t border-slate-700">
              <button
                onClick={() => {
                  // Clear localStorage and logout
                  localStorage.clear();
                  onBackToHome();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-red-400' : 'text-gray-500 hover:bg-gray-100 hover:text-red-500'
                }`}
              >
                <LogOut className={`${isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} />
                {(!isCollapsed || isMobile) && (
                  <span className="font-medium">Logout</span>
                )}
              </button>
            </div>
          </nav>

          {/* Footer */}
          <div className={`p-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <button
              onClick={toggleDarkMode}
              className={`w-full p-3 rounded-lg transition-all ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              title={isCollapsed ? 'Toggle Theme' : ''}
            >
              <div className="flex items-center gap-3">
                {darkMode ? <Sun className={`text-amber-400 ${isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} /> : <Moon className={`text-blue-400 ${isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} />}
                {(!isCollapsed || isMobile) && (
                  <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;