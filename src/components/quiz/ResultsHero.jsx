import React from 'react';
import { Sparkles } from 'lucide-react';

const ResultsHero = ({ gradeInfo, subject }) => {
  const GradeIcon = gradeInfo.icon;

  return (
    <div className={`bg-gradient-to-br ${gradeInfo.color} p-8 md:p-12 text-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
      
      <div className="relative text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full backdrop-blur-md mb-6 animate-scale-in">
          <GradeIcon className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">{gradeInfo.text}</h1>
        <p className="text-xl text-white/90 mb-2">You've completed {subject?.name || 'the quiz'}</p>
        <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold">Grade: {gradeInfo.grade}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsHero;
