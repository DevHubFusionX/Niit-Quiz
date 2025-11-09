import React from 'react';
import { Code, Globe, Palette, Database, Server, Clipboard } from 'lucide-react';

const SubjectCard = ({ subject, subjectKey, onSelect, stats, darkMode }) => {
  const getSubjectIcon = (key) => {
    const icons = {
      PLT: <Code className="w-8 h-8" />,
      IWCD: <Globe className="w-8 h-8" />,
      Dreamweaver: <Palette className="w-8 h-8" />,
      MySQL: <Database className="w-8 h-8" />,
      PHP: <Server className="w-8 h-8" />,
      Project: <Clipboard className="w-8 h-8" />
    };
    return icons[key] || <Code className="w-8 h-8" />;
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'text-emerald-500';
    if (percentage >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getPerformanceLabel = (percentage) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    return 'Needs Practice';
  };

  const getIconColor = (key) => {
    const colors = {
      PLT: 'text-blue-500',
      IWCD: 'text-green-500',
      Dreamweaver: 'text-purple-500',
      MySQL: 'text-orange-500',
      PHP: 'text-indigo-500',
      Project: 'text-red-500'
    };
    return colors[key] || 'text-blue-500';
  };

  return (
    <div 
      onClick={() => onSelect(subjectKey)}
      className={`p-4 cursor-pointer transition-all rounded-lg border hover:border-blue-500 ${
        darkMode 
          ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
          : 'bg-white border-gray-200 hover:bg-blue-50'
      } shadow-sm hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
          <div className={getIconColor(subjectKey)}>
            {getSubjectIcon(subjectKey)}
          </div>
        </div>
        {stats && (
          <span className={`text-xs px-2 py-1 rounded ${getPerformanceColor(stats.bestScore)}`}>
            {stats.bestScore}%
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="mb-3">
        <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {subject.name}
        </h3>
        <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          {subject.questionCount || 0} Questions • ~{Math.ceil((subject.questionCount || 30) / 2)} min
        </div>
      </div>
      
      {/* Action */}
      {stats ? (
        <div className="flex items-center justify-between text-sm">
          <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>
            {stats.attempts} attempts
          </span>
          <span className={`font-medium ${getPerformanceColor(stats.bestScore)}`}>
            {getPerformanceLabel(stats.bestScore)}
          </span>
        </div>
      ) : (
        <div className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          Start Practice
        </div>
      )}
    </div>
  );
};

export default SubjectCard;