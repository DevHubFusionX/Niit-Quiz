import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

const ReviewQuestion = ({ item, index, darkMode }) => {
  return (
    <div className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
      darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
          darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
        }`}>
          {index + 1}
        </div>
        <div className="flex-1">
          <p className={`font-semibold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {item.question}
          </p>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl border-2 ${
              darkMode ? 'bg-red-900/20 border-red-700/50' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Your Answer</span>
              </div>
              <p className={`${darkMode ? 'text-red-400' : 'text-red-700'} font-medium`}>{item.userAnswer}</p>
            </div>
            <div className={`p-4 rounded-xl border-2 ${
              darkMode ? 'bg-green-900/20 border-green-700/50' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-green-600">Correct Answer</span>
              </div>
              <p className={`${darkMode ? 'text-green-400' : 'text-green-700'} font-medium`}>{item.correctAnswer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewQuestion;
