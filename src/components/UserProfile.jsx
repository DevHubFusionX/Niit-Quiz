import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Trophy, Target, Award, LogOut } from 'lucide-react';
import apiService from '../services/api';

const UserProfile = ({ darkMode, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await apiService.getUserProfile();
        setProfile(userProfile);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    apiService.logout();
    onLogout();
  };

  if (loading) {
    return (
      <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-300 h-16 w-16"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-3 bg-gray-300 rounded w-48"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-xl border border-red-200 bg-red-50 ${darkMode ? 'bg-red-900/20 border-red-800' : ''}`}>
        <p className="text-red-600">Failed to load profile: {error}</p>
      </div>
    );
  }

  if (!profile) return null;

  const totalAttempts = Object.values(profile.quizStats || {}).reduce((sum, stat) => sum + (stat.attempts || 0), 0);
  const averageScore = Object.values(profile.quizStats || {}).length > 0 
    ? Math.round(Object.values(profile.quizStats).reduce((sum, stat) => sum + (stat.bestScore || 0), 0) / Object.values(profile.quizStats).length)
    : 0;
  const masteredSubjects = Object.values(profile.quizStats || {}).filter(stat => stat.bestScore >= 80).length;

  return (
    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <User className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {profile.name}
            </h2>
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <Mail className="w-4 h-4" />
              {profile.email}
            </div>
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <Calendar className="w-4 h-4" />
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} mb-2`}>
            <Target className={`w-6 h-6 mx-auto ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {totalAttempts}
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Total Attempts
          </div>
        </div>

        <div className="text-center">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} mb-2`}>
            <Trophy className={`w-6 h-6 mx-auto ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {averageScore}%
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Average Score
          </div>
        </div>

        <div className="text-center">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'} mb-2`}>
            <Award className={`w-6 h-6 mx-auto ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {masteredSubjects}
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Mastered
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;