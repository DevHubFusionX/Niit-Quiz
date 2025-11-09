import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart3, Moon, Sun, LogIn, UserPlus } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, isAuthenticated }) => {
  const location = useLocation();
  
  // Memoize navigation items to prevent recreation on each render
  const navItems = React.useMemo(() => {
    if (isAuthenticated) {
      return [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/dashboard', icon: BookOpen, label: 'Subjects' },
        { path: '/statistics', icon: BarChart3, label: 'Stats' }
      ];
    } else {
      return [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/login', icon: LogIn, label: 'Login' },
        { path: '/signup', icon: UserPlus, label: 'Sign Up' }
      ];
    }
  }, [isAuthenticated]);

  // Memoize theme toggle handler
  const handleThemeToggle = React.useCallback(() => {
    try {
      toggleDarkMode?.();
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  }, [toggleDarkMode]);

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${
      darkMode ? 'bg-gray-800/90' : 'bg-white/90'
    } backdrop-blur-md rounded-full px-6 py-3 shadow-lg border ${
      darkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-500 text-white shadow-md'
                : item.path === '/signup'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : darkMode
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
        
        <div className={`w-px h-6 mx-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
        
        <button
          onClick={handleThemeToggle}
          className={`p-2 rounded-full transition-colors ${
            darkMode
              ? 'text-yellow-400 hover:bg-gray-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;