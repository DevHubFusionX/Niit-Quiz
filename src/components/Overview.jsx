import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { Target, BookOpen } from 'lucide-react';

const Overview = ({ darkMode, stats = {} }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await apiService.getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const safeStats = stats || {};
  const totalAttempts = Object.values(safeStats).reduce((acc, s) => acc + (s?.attempts || 0), 0);
  const averageScore = Object.values(safeStats).length > 0 
    ? Math.round(Object.values(safeStats).reduce((acc, s) => acc + (s?.bestScore || 0), 0) / Object.values(safeStats).length)
    : 0;
  const masteredSubjects = Object.values(safeStats).filter(s => s?.bestScore >= 80).length;

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Overview
        </h1>
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Your learning dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Subjects</p>
            <p className="text-2xl font-bold text-blue-500">{subjects.length}</p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Mastered</p>
            <p className="text-2xl font-bold text-green-500">{masteredSubjects}</p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Avg Score</p>
            <p className="text-2xl font-bold text-blue-500">{averageScore}%</p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Attempts</p>
            <p className="text-2xl font-bold text-purple-500">{totalAttempts}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/subjects')}
            className={`p-4 rounded-lg text-left transition-all hover:bg-opacity-80 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            <BookOpen className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Start Learning</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Browse subjects</p>
          </button>
          
          <button
            onClick={() => navigate('/statistics')}
            className={`p-4 rounded-lg text-left transition-all hover:bg-opacity-80 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            <Target className="w-6 h-6 text-green-500 mb-2" />
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>View Statistics</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Check progress</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Overview;