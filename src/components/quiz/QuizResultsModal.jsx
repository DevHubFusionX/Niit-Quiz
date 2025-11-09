import React from 'react';
import { X, Trophy, Target, Clock, RotateCcw, Home, CheckCircle2, XCircle } from 'lucide-react';

const QuizResultsModal = ({ results, subject, onRetake, onHome, darkMode, onClose }) => {
  if (!results) return null;

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Quiz Complete!
                </h2>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {subject?.name || 'Quiz'} Results
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(results.percentage)}`}>
              {results.percentage}%
            </div>
            <div className={`text-lg ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              {results.score}/{results.total} correct
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Completed in {results.timeTaken || 0} minutes
            </div>
          </div>

          {results.incorrectAnswers && results.incorrectAnswers.length > 0 && (
            <div className={`rounded-lg p-4 mb-6 ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
              <h3 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Review Incorrect Answers ({results.incorrectAnswers.length})
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {results.incorrectAnswers.map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.question}
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-3 h-3 text-red-500" />
                        <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Your answer:</span>
                        <span className="text-red-500">{item.userAnswer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Correct answer:</span>
                        <span className="text-green-500">{item.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onRetake}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
            <button
              onClick={onHome}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <Home className="w-4 h-4" />
              Back to Subjects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsModal;