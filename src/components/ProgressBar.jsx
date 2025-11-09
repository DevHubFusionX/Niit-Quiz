import React from 'react';

const ProgressBar = ({ current, total, markedForReview = [] }) => {
  // Validate inputs
  if (typeof current !== 'number' || typeof total !== 'number' || total <= 0) {
    return (
      <div className="w-full">
        <div className="text-sm text-red-600 mb-2">Invalid progress data</div>
      </div>
    );
  }

  const safeMarkedForReview = Array.isArray(markedForReview) ? markedForReview : [];
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  // Memoize grid items to prevent unnecessary re-renders
  const gridItems = React.useMemo(() => {
    try {
      return Array.from({ length: Math.min(total, 50) }, (_, i) => {
        const questionNum = i + 1;
        const isAnswered = questionNum < current;
        const isCurrent = questionNum === current;
        const isMarked = safeMarkedForReview.includes(questionNum);
        
        let bgColor = 'bg-gray-200';
        if (isCurrent) bgColor = 'bg-blue-500';
        else if (isAnswered && isMarked) bgColor = 'bg-yellow-500';
        else if (isAnswered) bgColor = 'bg-green-500';
        else if (isMarked) bgColor = 'bg-orange-500';
        
        return (
          <div
            key={i}
            className={`h-3 w-full rounded ${bgColor} transition-colors duration-200`}
            title={`Question ${questionNum}${isMarked ? ' (Marked for review)' : ''}`}
          />
        );
      });
    } catch (error) {
      console.error('Error creating grid items:', error);
      return [];
    }
  }, [current, total, safeMarkedForReview]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {total <= 50 && (
        <div className="grid grid-cols-10 gap-1 mb-4">
          {gridItems}
        </div>
      )}
      
      <div className="flex gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Answered & Marked</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <span>Not Answered</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;