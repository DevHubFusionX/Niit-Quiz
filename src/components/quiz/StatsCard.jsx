import React from 'react';

const StatsCard = ({ icon: Icon, value, label, color, darkMode }) => {
  return (
    <div className={`p-6 rounded-2xl border-2 text-center transition-all hover:scale-105 ${
      darkMode ? 'bg-slate-700/50 border-slate-600' : `bg-gradient-to-br from-${color}-50 to-${color}-50 border-${color}-200`
    }`}>
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
        darkMode ? `bg-${color}-500/20` : `bg-${color}-100`
      }`}>
        <Icon className={`w-8 h-8 ${darkMode ? `text-${color}-400` : `text-${color}-600`}`} />
      </div>
      <div className={`text-5xl font-bold mb-2 ${darkMode ? `text-${color}-400` : `text-${color}-600`}`}>
        {value}
      </div>
      <div className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{label}</div>
    </div>
  );
};

export default StatsCard;
