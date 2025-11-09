import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Target, BookOpen, Play, ArrowLeft, Settings, Zap, Brain, Timer } from 'lucide-react';
import Sidebar from './Sidebar';

const QuizSetup = ({ subject, onStart, onBack, darkMode, toggleDarkMode }) => {
  const [config, setConfig] = useState({
    timeLimit: 30,
    questionCount: 10,
    difficulty: 'medium'
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    // Validate config before starting
    const validatedConfig = {
      timeLimit: parseInt(config.timeLimit) || 30,
      questionCount: parseInt(config.questionCount) || 10,
      difficulty: config.difficulty || 'medium'
    };
    
    console.log('Starting quiz with config:', validatedConfig);
    onStart(validatedConfig);
  };

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', icon: '🟢', desc: 'Basic concepts and fundamentals' },
    { value: 'medium', label: 'Medium', icon: '🟡', desc: 'Intermediate level questions' },
    { value: 'hard', label: 'Hard', icon: '🔴', desc: 'Advanced and challenging topics' }
  ];

  const timeOptions = [15, 30, 45, 60];
  
  // Dynamic question options based on available questions
  const totalQuestions = subject?.questionCount || 0;
  const getQuestionOptions = () => {
    const baseOptions = [5, 10, 15, 20];
    if (totalQuestions >= 60) {
      return [...baseOptions, 30, 50];
    } else if (totalQuestions >= 30) {
      return [...baseOptions, 30];
    }
    return baseOptions.filter(option => option <= totalQuestions);
  };
  const questionOptions = getQuestionOptions();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onBackToHome={() => navigate('/')}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        currentPage="subjects"
        onNavigate={navigate}
      />
      <div className={`transition-all duration-300 p-4 md:p-6 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'} ml-0`}>
        <div className="max-w-6xl mx-auto">
          <div className={`rounded-3xl shadow-2xl p-6 md:p-8 mb-8 border-2 transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Settings className="w-8 h-8" />
                </div>
                <div>
                  <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Quiz Configuration
                  </h1>
                  <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    Customize your {subject?.name || 'quiz'} experience
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    {totalQuestions} questions available
                  </p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className={`rounded-2xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-slate-800/90 border border-slate-700' : 'bg-white border border-gray-200'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Time Limit
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      onClick={() => setConfig({ ...config, timeLimit: time })}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        config.timeLimit === time
                          ? 'bg-blue-500 text-white'
                          : darkMode
                            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  <Target className="w-4 h-4 inline mr-2" />
                  Questions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {questionOptions.map((count) => (
                    <button
                      key={count}
                      onClick={() => setConfig({ ...config, questionCount: count })}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        config.questionCount === count
                          ? 'bg-green-500 text-white'
                          : darkMode
                            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  <Brain className="w-4 h-4 inline mr-2" />
                  Difficulty
                </label>
                <div className="space-y-2">
                  {difficultyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setConfig({ ...config, difficulty: option.value })}
                      className={`w-full p-3 rounded-lg text-sm font-medium text-left transition-all ${
                        config.difficulty === option.value
                          ? 'bg-purple-500 text-white'
                          : darkMode
                            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.icon} {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back
            </button>
            <button
              onClick={handleStart}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Play className="w-4 h-4 inline mr-2" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;