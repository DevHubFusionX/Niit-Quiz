import React, { useState, useEffect } from 'react';
import { subjects } from '../data/questions/index.js';
import apiService from '../services/api';

const Statistics = ({ darkMode }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const userStats = await apiService.getUserStats();
        setStats(userStats.subjectStats || {});
        setError(null);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.message);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Validate and calculate statistics with error handling
  const safeStats = React.useMemo(() => {
    try {
      if (!stats || typeof stats !== 'object') {
        return {};
      }
      return stats;
    } catch (error) {
      console.error('Error processing stats:', error);
      return {};
    }
  }, [stats]);

  const totalQuestions = React.useMemo(() => {
    try {
      return Object.values(subjects).reduce((acc, subject) => {
        return acc + (subject?.questions?.length || 0);
      }, 0);
    } catch (error) {
      console.error('Error calculating total questions:', error);
      return 0;
    }
  }, []);

  const totalAttempts = React.useMemo(() => {
    try {
      return Object.values(safeStats).reduce((acc, s) => acc + (s?.attempts || 0), 0);
    } catch (error) {
      console.error('Error calculating total attempts:', error);
      return 0;
    }
  }, [safeStats]);

  const averageScore = React.useMemo(() => {
    try {
      const statsArray = Object.values(safeStats);
      if (statsArray.length === 0) return 0;
      
      const totalScore = statsArray.reduce((acc, s) => acc + (s?.bestScore || 0), 0);
      return Math.round(totalScore / statsArray.length);
    } catch (error) {
      console.error('Error calculating average score:', error);
      return 0;
    }
  }, [safeStats]);

  const masteredSubjects = React.useMemo(() => {
    try {
      return Object.values(safeStats).filter(s => s?.bestScore >= 80).length;
    } catch (error) {
      console.error('Error calculating mastered subjects:', error);
      return 0;
    }
  }, [safeStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load statistics</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
          {/* Header */}
          <div className="mb-6">
            <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Statistics
            </h1>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Your learning progress overview
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
              <div className="text-center">
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Average Score</p>
                <p className="text-2xl font-bold text-blue-500">{averageScore}%</p>
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
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Attempts</p>
                <p className="text-2xl font-bold text-purple-500">{totalAttempts}</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
              <div className="text-center">
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Questions</p>
                <p className="text-2xl font-bold text-orange-500">{totalQuestions}</p>
              </div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm mb-6`}>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Subject Performance
            </h2>
            <div className="space-y-3">
              {Object.entries(subjects).map(([key, subject]) => {
                try {
                  const subjectStats = safeStats[key];
                  const score = subjectStats?.bestScore || 0;
                  const attempts = subjectStats?.attempts || 0;
                  
                  if (!subject || !subject.name) {
                    return null;
                  }
                  
                  return (
                    <div key={key} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {subject.name}
                          </h3>
                          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            {attempts} attempts
                          </p>
                        </div>
                        <div className={`text-lg font-bold ${
                          score >= 80 ? 'text-green-500' : 
                          score >= 60 ? 'text-yellow-500' : 
                          score > 0 ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          {score}%
                        </div>
                      </div>
                      <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-slate-600' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-full rounded-full ${
                            score >= 80 ? 'bg-green-500' : 
                            score >= 60 ? 'bg-yellow-500' : 
                            score > 0 ? 'bg-red-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                } catch (error) {
                  console.error('Error rendering subject stats:', error);
                  return null;
                }
              }).filter(Boolean)}
            </div>
          </div>


    </>
  );
};

export default Statistics;