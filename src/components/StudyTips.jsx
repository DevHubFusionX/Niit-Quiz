import React from 'react';
import { BookOpen, Clock, Target, RotateCcw, Lightbulb, CheckCircle } from 'lucide-react';

const StudyTips = ({ darkMode }) => {
  const tips = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Strategic Learning",
      description: "Begin with Practice Mode to understand concepts thoroughly, then challenge yourself with Exam Mode for authentic assessment experience.",
      color: "blue"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Management",
      description: "Allocate 2-3 minutes per question during practice. Use the review feature to mark challenging questions for focused study sessions.",
      color: "green"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Targeted Improvement",
      description: "Analyze your performance reports to identify weak areas. Focus additional study time on subjects with lower scores for balanced preparation.",
      color: "purple"
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Consistent Practice",
      description: "Establish a regular study schedule with frequent quiz sessions. Consistent practice improves retention and builds exam confidence.",
      color: "orange"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Active Learning",
      description: "Don't just memorize answers. Read explanations carefully and understand the reasoning behind correct solutions for deeper comprehension.",
      color: "yellow"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Monitor your improvement over time using the statistics panel. Set score targets for each subject and celebrate achievements.",
      color: "cyan"
    }
  ];

  const getColorClasses = (color) => {
    const lightColors = {
      blue: { bg: 'bg-blue-50', icon: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', icon: 'bg-green-100', iconColor: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', icon: 'bg-purple-100', iconColor: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', icon: 'bg-orange-100', iconColor: 'text-orange-600', border: 'border-orange-200' },
      yellow: { bg: 'bg-yellow-50', icon: 'bg-yellow-100', iconColor: 'text-yellow-600', border: 'border-yellow-200' },
      cyan: { bg: 'bg-cyan-50', icon: 'bg-cyan-100', iconColor: 'text-cyan-600', border: 'border-cyan-200' }
    };

    const darkColors = {
      blue: { bg: 'bg-blue-900/20', icon: 'bg-blue-800/50', iconColor: 'text-blue-400', border: 'border-blue-800' },
      green: { bg: 'bg-green-900/20', icon: 'bg-green-800/50', iconColor: 'text-green-400', border: 'border-green-800' },
      purple: { bg: 'bg-purple-900/20', icon: 'bg-purple-800/50', iconColor: 'text-purple-400', border: 'border-purple-800' },
      orange: { bg: 'bg-orange-900/20', icon: 'bg-orange-800/50', iconColor: 'text-orange-400', border: 'border-orange-800' },
      yellow: { bg: 'bg-yellow-900/20', icon: 'bg-yellow-800/50', iconColor: 'text-yellow-400', border: 'border-yellow-800' },
      cyan: { bg: 'bg-cyan-900/20', icon: 'bg-cyan-800/50', iconColor: 'text-cyan-400', border: 'border-cyan-800' }
    };

    return darkMode ? darkColors[color] : lightColors[color];
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => {
          const colors = getColorClasses(tip.color);
          return (
            <div 
              key={index} 
              className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
                darkMode 
                  ? `bg-slate-800 border-slate-700 hover:bg-slate-750` 
                  : `bg-white border-gray-200 hover:bg-gray-50`
              }`}
            >
              {/* Icon Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${colors.icon}`}>
                  <div className={colors.iconColor}>
                    {tip.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg theme-text-primary">
                  {tip.title}
                </h3>
              </div>
              
              {/* Content */}
              <p className="text-sm leading-relaxed theme-text-secondary">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className={`p-8 text-center mt-8 rounded-lg border ${
        darkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      } shadow-sm`}>
        <h3 className="text-2xl font-bold theme-text-primary mb-3">
          Ready to Excel?
        </h3>
        <p className="theme-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
          Success in NIIT certification comes from consistent practice, strategic learning, and thorough understanding of core concepts.
        </p>
      </div>
    </div>
  );
};

export default StudyTips;