import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Search, Menu, LogOut, Settings, BookOpen } from 'lucide-react';
import apiService from '../services/api';

const TopBar = ({ darkMode, toggleDarkMode, onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await apiService.getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    apiService.logout();
    onLogout();
    navigate('/');
  };

  return (
    <div className={`sticky top-0 z-50 theme-bg-secondary border-b theme-border backdrop-blur-sm ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <BookOpen className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h1 className="theme-text-primary text-xl font-bold">NIIT Quiz</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
            <input
              type="text"
              placeholder="Search subjects, questions..."
              className="theme-input w-full pl-10 pr-4 py-2 rounded-lg border"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
            <Bell className="w-5 h-5 theme-text-secondary" />
          </button>

          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <User className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <span className="hidden md:block theme-text-primary font-medium">
                {user?.name || 'User'}
              </span>
            </button>

            {showProfileMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                <div className="p-3 border-b theme-border">
                  <p className="theme-text-primary font-medium">{user?.name}</p>
                  <p className="theme-text-secondary text-sm">{user?.email}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <User className="w-4 h-4 theme-text-secondary" />
                    <span className="theme-text-primary">Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Settings className="w-4 h-4 theme-text-secondary" />
                    <span className="theme-text-primary">Dashboard</span>
                  </button>
                  <hr className="my-2 theme-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;