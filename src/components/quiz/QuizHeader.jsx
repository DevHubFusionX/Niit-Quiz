import React from 'react';
import { Clock, Target } from 'lucide-react';

const QuizHeader = ({ subject, currentIndex, totalQuestions, timeLeft, darkMode, currentScore, answeredCount }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalQuestions > 0 ? (((currentIndex || 0) + 1) / totalQuestions) * 100 : 0;

  return (
    <div className={`rounded-lg shadow-sm p-4 mb-6 ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {subject?.name || 'Quiz'}
          </h1>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Question {(currentIndex || 0) + 1} of {totalQuestions || 0}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <Target className="w-3 h-3" />
              Score
            </div>
            <p className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {currentScore || 0}/{answeredCount || 0}
            </p>
          </div>
          
          <div className="text-center">
            <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <Clock className="w-3 h-3" />
              Time
            </div>
            <p className={`text-lg font-bold font-mono ${timeLeft < 300 ? 'text-red-500' : darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {formatTime(timeLeft || 0)}
            </p>
          </div>
        </div>
      </div>
      
      <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
        <div 
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default QuizHeader;