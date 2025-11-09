import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import AppLayout from './components/AppLayout';
import Overview from './components/Overview';
import Profile from './components/Profile';
import Subjects from './components/Subjects';
import Statistics from './components/Statistics';
import StudyNotes from './components/StudyNotes';
import StudyNotesIndex from './components/StudyNotesIndex';
import QuizSetupWrapper from './components/wrappers/QuizSetupWrapper';
import QuizWrapper from './components/wrappers/QuizWrapper';
import ProtectedRoute from './components/wrappers/ProtectedRoute';
import { useLocalStorage } from './hooks/useLocalStorage';

function AppContent() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizConfig, setQuizConfig] = useState(null);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [quizStats, setQuizStats] = useLocalStorage('quizStats', {});
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubjectSelect = (subjectKey) => {
    setSelectedSubject(subjectKey);
    navigate(`/quiz/${subjectKey}/setup`);
  };

  const handleQuizStart = (config) => {
    setQuizConfig(config);
    navigate(`/quiz/${selectedSubject}`);
  };

  const handleQuizFinish = (results) => {
    const subjectStats = quizStats[selectedSubject] || { attempts: 0, bestScore: 0 };
    const newStats = {
      ...quizStats,
      [selectedSubject]: {
        attempts: subjectStats.attempts + 1,
        bestScore: Math.max(subjectStats.bestScore, results.percentage),
        lastScore: results.percentage,
        lastAttempt: new Date().toISOString()
      }
    };
    setQuizStats(newStats);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const showNavbar = location.pathname === '/' && !isAuthenticated;

  return (
    <>
      {showNavbar && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isAuthenticated={isAuthenticated} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          isAuthenticated ? (
            <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />
          ) : (
            <LandingPage onGetStarted={() => navigate('/login')} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          )
        }>
          <Route index element={<Overview darkMode={darkMode} stats={quizStats} />} />
        </Route>

        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} darkMode={darkMode} />} />
        <Route path="/signup" element={<Signup darkMode={darkMode} />} />

        {/* Protected Routes with AppLayout */}
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<Overview darkMode={darkMode} stats={quizStats} />} />
        </Route>

        <Route path="/subjects" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<Subjects onSubjectSelect={handleSubjectSelect} darkMode={darkMode} stats={quizStats} />} />
        </Route>

        <Route path="/statistics" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<Statistics darkMode={darkMode} />} />
        </Route>

        <Route path="/study-notes" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<StudyNotesIndex darkMode={darkMode} />} />
        </Route>

        <Route path="/study-notes/:subject" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<StudyNotes darkMode={darkMode} />} />
        </Route>

        <Route path="/profile" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <AppLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<Profile darkMode={darkMode} />} />
        </Route>

        {/* Quiz Routes (without sidebar) */}
        <Route path="/quiz/:subject/setup" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <QuizSetupWrapper
              onStart={handleQuizStart}
              onBack={() => navigate('/subjects')}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              setSelectedSubject={setSelectedSubject}
            />
          </ProtectedRoute>
        } />

        <Route path="/quiz/:subject" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} darkMode={darkMode}>
            <QuizWrapper
              config={quizConfig}
              onFinish={handleQuizFinish}
              onHome={() => navigate('/subjects')}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              selectedSubject={selectedSubject}
            />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;