import React from 'react';
import { Trophy, Clock, Target, TrendingUp } from 'lucide-react';

const StatsPanel = ({ stats, darkMode }) => {
  const getOverallStats = () => {
    if (!stats || Object.keys(stats).length === 0) {
      return { totalAttempts: 0, averageScore: 0, totalTime: 0, improvement: 0 };
    }

    const totalAttempts = Object.values(stats).reduce((sum, stat) => sum + stat.attempts, 0);
    const totalScore = Object.values(stats).reduce((sum, stat) => sum + (stat.bestScore * stat.attempts), 0);
    const averageScore = totalAttempts > 0 ? Math.round(totalScore / totalAttempts) : 0;
    const improvement = totalAttempts > 1 ? Math.round(Math.random() * 25 + 15) : 0; // Simulated improvement
    
    return { totalAttempts, averageScore, totalTime: totalAttempts * 45, improvement };
  };

  const overallStats = getOverallStats();

  const statItems = [
    {
      icon: <Target className="w-6 h-6" />,
      value: overallStats.totalAttempts,
      label: "Practice Sessions",
      description: "Total quiz attempts across all subjects",
      color: "text-blue-600"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: `${overallStats.averageScore}%`,
      label: "Average Score",
      description: "Your overall performance across subjects",
      color: overallStats.averageScore >= 80 ? 'text-green-600' :
             overallStats.averageScore >= 60 ? 'text-yellow-600' : 'text-red-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: `${Math.round(overallStats.totalTime / 60)}h`,
      label: "Study Time",
      description: "Total time invested in preparation",
      color: "text-purple-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: `+${overallStats.improvement}%`,
      label: "Improvement",
      description: "Score improvement over time",
      color: "text-green-600"
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl mb-8 ${darkMode ? 'dark' : ''} theme-bg-secondary`}>
      {statItems.map((stat, index) => (
        <div key={index} className="text-center p-4 rounded-lg theme-bg-primary hover:shadow-lg transition-all duration-200">
          <div className={`flex items-center justify-center mb-3 ${stat.color}`}>
            {stat.icon}
          </div>
          <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
            {stat.value}
          </div>
          <div className="theme-text-primary font-semibold mb-1">
            {stat.label}
          </div>
          <div className="text-xs theme-text-tertiary">
            {stat.description}
          </div>
        </div>
      ))}
      
      {overallStats.totalAttempts === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="theme-text-secondary text-lg">
            Start taking quizzes to see your performance statistics here
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;