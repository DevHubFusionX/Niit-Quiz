import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Quiz from '../Quiz';
import apiService from '../../services/api';
import { sampleSubjects } from '../../data/sampleQuestions';

function QuizWrapper({ onFinish, onHome, darkMode, toggleDarkMode, config, selectedSubject }) {
  const { subject: subjectKey } = useParams();
  const [subjectData, setSubjectData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const fetchedRef = React.useRef(false);

  React.useEffect(() => {
    const fetchSubject = async () => {
      if (fetchedRef.current) return;
      
      try {
        if (subjectKey) {
          let data;
          try {
            data = await apiService.getSubject(subjectKey);
          } catch (apiError) {
            console.warn('API not available, using sample data:', apiError);
            data = sampleSubjects[subjectKey] || sampleSubjects['programming-logic'];
          }
          setSubjectData(data);
          fetchedRef.current = true;
        }
      } catch (error) {
        console.error('Failed to fetch subject:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectKey]);

  const subject = useMemo(() => {
    if (!subjectData || !subjectKey) return null;
    return { ...subjectData, key: subjectKey, code: subjectKey };
  }, [subjectData, subjectKey]);

  if (loading || !subject) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
            <p className={`text-lg mb-4 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Quiz configuration not found</p>
            <button
              onClick={() => window.location.href = `/quiz/${subjectKey}/setup`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Go to Quiz Setup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Quiz
      subject={subject}
      config={config}
      onFinish={onFinish}
      onHome={onHome}
      darkMode={darkMode}
    />
  );
}

export default QuizWrapper;