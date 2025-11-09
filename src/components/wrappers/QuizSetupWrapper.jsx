import React from 'react';
import { useParams } from 'react-router-dom';
import QuizSetup from '../QuizSetup';
import apiService from '../../services/api';
import { sampleSubjects } from '../../data/sampleQuestions';

function QuizSetupWrapper({ onStart, onBack, darkMode, toggleDarkMode, setSelectedSubject }) {
  const { subject: subjectKey } = useParams();
  const [subjectData, setSubjectData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSubject = async () => {
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
          setSelectedSubject(subjectKey);
        }
      } catch (error) {
        console.error('Failed to fetch subject:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectKey, setSelectedSubject]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subjectData) {
    return <div>Subject not found</div>;
  }

  return (
    <QuizSetup
      subject={{ ...subjectData, key: subjectKey }}
      onStart={onStart}
      onBack={onBack}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
}

export default QuizSetupWrapper;