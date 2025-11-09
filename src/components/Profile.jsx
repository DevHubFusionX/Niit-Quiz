import React, { useState, useEffect } from 'react';
import { User, Edit, Save, X } from 'lucide-react';
import apiService from '../services/api';

const Profile = ({ darkMode }) => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userProfile, userStats] = await Promise.all([
          apiService.getUserProfile(),
          apiService.getUserStats()
        ]);
        setProfile(userProfile);
        setStats(userStats.subjectStats || {});
        setEditData({ name: userProfile.name });
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      // In a real app, you'd have an API endpoint to update profile
      setProfile(prev => ({ ...prev, name: editData.name }));
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const totalAttempts = Object.values(stats).reduce((sum, stat) => sum + (stat.attempts || 0), 0);
  const averageScore = Object.values(stats).length > 0 
    ? Math.round(Object.values(stats).reduce((sum, stat) => sum + (stat.bestScore || 0), 0) / Object.values(stats).length)
    : 0;
  const masteredSubjects = Object.values(stats).filter(stat => stat.bestScore >= 80).length;

  return (
    <>
          <div className="mb-6">
            <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Profile
            </h1>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Your account information and progress
            </p>
          </div>
          <div className={`rounded-lg shadow-sm p-4 mb-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <User className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                {editing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ name: e.target.value })}
                      className={`text-xl font-bold px-2 py-1 rounded border ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}`}
                    />
                    <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditData({ name: profile.name });
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profile?.name}
                    </h1>
                    <button
                      onClick={() => setEditing(true)}
                      className={`p-1 ${darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'} rounded`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {profile?.email}
                </div>
                <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                  Member since {new Date(profile?.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {totalAttempts}
                </div>
                <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Attempts
                </div>
              </div>

              <div className="text-center">
                <div className={`text-2xl font-bold text-green-500`}>
                  {averageScore}%
                </div>
                <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Average
                </div>
              </div>

              <div className="text-center">
                <div className={`text-2xl font-bold text-blue-500`}>
                  {masteredSubjects}
                </div>
                <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Mastered
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-lg shadow-sm p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Subject Performance
            </h2>
            <div className="space-y-3">
              {Object.entries(stats).map(([key, stat]) => (
                <div key={key} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {key.toUpperCase()}
                      </h3>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        {stat.attempts} attempts
                      </p>
                    </div>
                    <div className={`text-lg font-bold ${
                      stat.bestScore >= 80 ? 'text-green-500' : 
                      stat.bestScore >= 60 ? 'text-yellow-500' : 
                      stat.bestScore > 0 ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {stat.bestScore || 0}%
                    </div>
                  </div>
                  <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-slate-600' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-full rounded-full ${
                        stat.bestScore >= 80 ? 'bg-green-500' : 
                        stat.bestScore >= 60 ? 'bg-yellow-500' : 
                        stat.bestScore > 0 ? 'bg-red-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${stat.bestScore || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </>
  );
};

export default Profile;