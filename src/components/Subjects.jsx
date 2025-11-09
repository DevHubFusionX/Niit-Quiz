import React, { useState, useEffect } from 'react';
import SubjectCard from './SubjectCard';
import apiService from '../services/api';

const Subjects = ({ onSubjectSelect, darkMode, stats }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await apiService.getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        setError('Failed to load subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <>
          {/* Header */}
          <div className="mb-6">
            <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Subjects
            </h1>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Choose a subject to start practicing
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={`text-center py-12 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
              <p>{error}</p>
            </div>
          )}

          {/* Subjects Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.code}
                  subject={subject}
                  subjectKey={subject.code}
                  onSelect={onSubjectSelect}
                  stats={stats[subject.code]}
                  darkMode={darkMode}
                />
              ))}
            </div>
          )}
    </>
  );
};

export default Subjects;