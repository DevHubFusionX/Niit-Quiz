import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

const ActionButtons = ({ onRetake, onHome, darkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        onClick={onRetake}
        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <RotateCcw className="w-6 h-6" />
        Retake Quiz
      </button>
      <button
        onClick={onHome}
        className={`py-4 px-8 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
          darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Home className="w-6 h-6" />
        Back to Subjects
      </button>
    </div>
  );
};

export default ActionButtons;
