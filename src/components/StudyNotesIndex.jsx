import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { BookOpen, FileText, Code, Globe, Palette, Database, Server, Clipboard } from 'lucide-react';

const StudyNotesIndex = ({ darkMode }) => {
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

  // Memoize icon components to prevent re-creation on each render
  const getSubjectIcon = React.useCallback((key) => {
    try {
      const icons = {
        PLT: <Code className="w-8 h-8" />,
        IWCD: <Globe className="w-8 h-8" />,
        Dreamweaver: <Palette className="w-8 h-8" />,
        MySQL: <Database className="w-8 h-8" />,
        PHP: <Server className="w-8 h-8" />,
        Project: <Clipboard className="w-8 h-8" />
      };
      return icons[key] || <Code className="w-8 h-8" />;
    } catch (error) {
      console.error('Error getting subject icon:', error);
      return <Code className="w-8 h-8" />;
    }
  }, []);

  const getIconColor = React.useCallback((key) => {
    try {
      const colors = {
        PLT: 'text-blue-500',
        IWCD: 'text-green-500',
        Dreamweaver: 'text-purple-500',
        MySQL: 'text-orange-500',
        PHP: 'text-indigo-500',
        Project: 'text-red-500'
      };
      return colors[key] || 'text-blue-500';
    } catch (error) {
      console.error('Error getting icon color:', error);
      return 'text-blue-500';
    }
  }, []);

  return (
    <>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Study Notes
                </h1>
                <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  Access comprehensive study materials for all subjects
                </p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Subjects Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => {
              try {
                if (!subject || !subject.name) {
                  return null;
                }
                
                return (
                  <div 
                    key={subject.code}
                    onClick={() => {
                      try {
                        navigate(`/study-notes/${subject.code}`);
                      } catch (error) {
                        console.error('Navigation error:', error);
                      }
                    }}
                    className={`p-6 cursor-pointer group transition-all duration-200 rounded-lg border-2 hover:border-blue-500 ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
                        : 'bg-white border-gray-200 hover:bg-blue-50'
                    } shadow-sm hover:shadow-md`}
                  >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-slate-700' : 'bg-gray-100'
                  } group-hover:scale-105 transition-transform`}>
                    <div className={getIconColor(subject.code)}>
                      {getSubjectIcon(subject.code)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      darkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {subject.code}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="mb-4">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  } group-hover:text-blue-600 transition-colors`}>
                    {subject.name}
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Comprehensive study materials and key concepts
                  </p>
                </div>
                
                {/* Action */}
                <div className={`p-3 rounded-lg border text-center ${
                  darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-center gap-2 theme-text-primary">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">View Notes</span>
                  </div>
                  </div>
                </div>
              );
              } catch (error) {
                console.error('Error rendering subject card:', error);
                return (
                  <div key={subject.code} className="p-6 rounded-lg border-2 border-red-200 bg-red-50">
                    <p className="text-red-600">Error loading subject</p>
                  </div>
                );
              }
            }).filter(Boolean)}
            </div>
          )}
    </>
  );
};

export default StudyNotesIndex;