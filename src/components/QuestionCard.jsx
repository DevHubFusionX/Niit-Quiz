import React from 'react';
import { Flag, FlagOff } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  isMarkedForReview, 
  onToggleReview,
  showCorrectAnswer = false,
  userAnswer = null
}) => {
  // Validate question data
  if (!question || !question.options || !Array.isArray(question.options)) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-600">
          <p>Error: Invalid question data</p>
        </div>
      </div>
    );
  }

  const getOptionClass = (optionIndex) => {
    try {
      let baseClass = "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ";
      
      if (showCorrectAnswer) {
        if (optionIndex === question.correct) {
          baseClass += "border-green-500 bg-green-50 text-green-800";
        } else if (optionIndex === userAnswer && optionIndex !== question.correct) {
          baseClass += "border-red-500 bg-red-50 text-red-800";
        } else {
          baseClass += "border-gray-200 bg-gray-50";
        }
      } else {
        if (selectedAnswer === optionIndex) {
          baseClass += "border-blue-500 bg-blue-50 text-blue-800";
        } else {
          baseClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
        }
      }
      
      return baseClass;
    } catch (error) {
      console.error('Error in getOptionClass:', error);
      return "p-4 rounded-lg border-2 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex-1 mr-4">
          {question.question}
        </h2>
        
        {!showCorrectAnswer && (
          <button
            onClick={onToggleReview}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isMarkedForReview 
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isMarkedForReview ? <Flag size={16} /> : <FlagOff size={16} />}
            {isMarkedForReview ? 'Marked' : 'Mark for Review'}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          try {
            return (
              <div
                key={index}
                className={getOptionClass(index)}
                onClick={() => {
                  try {
                    if (!showCorrectAnswer && onAnswerSelect) {
                      onAnswerSelect(index);
                    }
                  } catch (error) {
                    console.error('Error selecting answer:', error);
                  }
                }}
              >
                <div className="flex items-center">
                  <span className="font-semibold mr-3 text-lg">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-lg">{option || 'Invalid option'}</span>
                </div>
              </div>
            );
          } catch (error) {
            console.error('Error rendering option:', error);
            return (
              <div key={index} className="p-4 rounded-lg border-2 border-red-200 bg-red-50">
                <span className="text-red-600">Error loading option</span>
              </div>
            );
          }
        })}
      </div>

      {showCorrectAnswer && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Correct Answer:</strong> 
            {typeof question.correct === 'number' && question.options[question.correct] 
              ? `${String.fromCharCode(65 + question.correct)}. ${question.options[question.correct]}`
              : 'Answer not available'
            }
          </p>
          {userAnswer !== null && userAnswer !== question.correct && question.options[userAnswer] && (
            <p className="text-sm text-red-600 mt-2">
              <strong>Your Answer:</strong> {String.fromCharCode(65 + userAnswer)}. {question.options[userAnswer]}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;