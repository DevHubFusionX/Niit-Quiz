import React from 'react';
import { Star } from 'lucide-react';

const PerfectScoreBanner = ({ darkMode }) => {
  return (
    <div className={`rounded-3xl shadow-2xl p-8 border-2 text-center animate-fade-in ${
      darkMode ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-700/50' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
    }`}>
      <Star className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
        🎉 Perfect Score! 🎉
      </h3>
      <p className={`${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
        Outstanding! You've mastered this subject!
      </p>
    </div>
  );
};

export default PerfectScoreBanner;
