import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const QuizNavigation = ({ 
  currentIndex, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onSubmit, 
  darkMode,
  answers
}) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isFirstQuestion = currentIndex === 0;
  const answeredCount = Object.keys(answers || {}).length;
  const allAnswered = answeredCount === totalQuestions;

  const handleSubmit = () => {
    const unanswered = totalQuestions - answeredCount;
    if (unanswered > 0) {
      const confirm = window.confirm(`You have ${unanswered} unanswered questions. Submit anyway?`);
      if (!confirm) return;
    }
    onSubmit?.();
  };

  return (
    <div className={`rounded-lg shadow-sm p-4 ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isFirstQuestion
              ? 'opacity-50 cursor-not-allowed'
              : darkMode
                ? 'bg-slate-700 text-white hover:bg-slate-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          {answeredCount}/{totalQuestions} answered
        </div>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-all"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-all"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizNavigation;