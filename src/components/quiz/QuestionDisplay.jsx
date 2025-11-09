import React from 'react';

const QuestionDisplay = ({ question, selectedAnswer, onAnswerSelect, darkMode, questionNumber }) => {
  if (!question) {
    return (
      <div className={`rounded-lg p-6 mb-6 ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
        <p className="text-red-600">Question not available</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg shadow-sm p-6 mb-6 ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
      <h2 className={`text-lg font-medium mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {question.question}
      </h2>
      
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const optionLetter = String.fromCharCode(65 + index);
          
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect?.(index)}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : darkMode
                    ? 'border-slate-600 bg-slate-700 text-slate-200 hover:border-slate-500'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : darkMode
                      ? 'bg-slate-600 text-slate-300'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {optionLetter}
                </span>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionDisplay;