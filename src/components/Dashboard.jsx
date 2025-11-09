import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import StatsPanel from './StatsPanel';
import SubjectCard from './SubjectCard';
import StudyTips from './StudyTips';
import { subjects } from '../data/questions/index.js';
import { Target, TrendingUp, Award, Clock, BookOpen } from 'lucide-react';

const Dashboard = ({ onSubjectSelect, darkMode, toggleDarkMode, stats, onBackToHome }) => {
  const [showStats, setShowStats] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen theme-bg-primary ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onBackToHome={onBackToHome}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        currentPage="subjects"
        onNavigate={(path) => navigate(path)}
      />

      <div className={`transition-all duration-300 md:${isCollapsed ? 'ml-16' : 'ml-64'} theme-text-primary`}>
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-tertiary mb-1">Available Subjects</p>
                  <p className="text-3xl font-bold theme-text-primary">{Object.keys(subjects).length}</p>
                  <p className="text-xs theme-text-tertiary mt-1">Certification tracks</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-tertiary mb-1">Mastered</p>
                  <p className="text-3xl font-bold text-emerald-500">{Object.values(stats).filter(s => s?.bestScore >= 80).length}</p>
                  <p className="text-xs theme-text-tertiary mt-1">80%+ score achieved</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Award className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-tertiary mb-1">Learning</p>
                  <p className="text-3xl font-bold text-amber-500">{Object.values(stats).filter(s => s?.bestScore > 0 && s?.bestScore < 80).length}</p>
                  <p className="text-xs theme-text-tertiary mt-1">Currently practicing</p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-xl">
                  <Target className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              } shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-tertiary mb-1">Practice Sessions</p>
                  <p className="text-3xl font-bold text-purple-500">{Object.values(stats).reduce((acc, s) => acc + (s?.attempts || 0), 0)}</p>
                  <p className="text-xs theme-text-tertiary mt-1">Total quiz attempts</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {showStats && (
            <div className="animate-slide-up mb-8">
              <StatsPanel stats={stats} darkMode={darkMode} />
            </div>
          )}

          {/* Main Content */}
          <div className="mb-8">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-6 gap-4">
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Subject Management</h1>
                <p className={`text-sm md:text-base ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>Select a subject to begin your certification preparation</p>
              </div>
              <div className={`p-3 md:p-4 rounded-lg border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                } shadow-sm`}>
                <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Performance Legend</p>
                <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
                    <span className={`font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Excellent</span>
                    <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>80%+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full shadow-sm"></div>
                    <span className={`font-medium ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>Good</span>
                    <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>60-79%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-rose-500 rounded-full shadow-sm"></div>
                    <span className={`font-medium ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>Practice</span>
                    <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>&lt;60%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(subjects).map(([key, subject], index) => (
                <div key={key} className="stagger-animation" style={{ opacity: 0 }}>
                  <SubjectCard
                    subject={subject}
                    subjectKey={key}
                    onSelect={onSubjectSelect}
                    stats={stats[key]}
                    darkMode={darkMode}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Study Tips */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-cyan-500" />
              <h2 className="text-2xl font-bold theme-text-primary">Study Resources</h2>
            </div>
            <StudyTips darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;