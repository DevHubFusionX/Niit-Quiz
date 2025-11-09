import React from 'react';
import { Trophy, Award, Target, TrendingUp, AlertCircle, Star, Clock } from 'lucide-react';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import ResultsHero from './ResultsHero';
import StatsCard from './StatsCard';
import ReviewQuestion from './ReviewQuestion';
import ActionButtons from './ActionButtons';
import PerfectScoreBanner from './PerfectScoreBanner';

const QuizResults = ({ results, subject, onRetake, onHome, darkMode, toggleDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const navigate = useNavigate();

  if (!results) {
    return (
      <div className={`min-h-screen p-6 flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: Quiz results not available</p>
          <button onClick={onHome} className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const percentage = results.percentage || 0;
  const isPerfect = percentage === 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;
  
  const getGrade = () => {
    if (isPerfect) return { grade: 'A+', color: 'from-yellow-400 to-orange-500', text: 'Perfect Score!', icon: Star };
    if (isExcellent) return { grade: 'A', color: 'from-green-400 to-emerald-500', text: 'Excellent!', icon: Trophy };
    if (isGood) return { grade: 'B', color: 'from-blue-400 to-cyan-500', text: 'Good Job!', icon: Award };
    return { grade: 'C', color: 'from-orange-400 to-red-500', text: 'Keep Practicing!', icon: Target };
  };

  const gradeInfo = getGrade();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Sidebar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onBackToHome={() => navigate('/')} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        currentPage="subjects"
        onNavigate={navigate}
      />
      <div className={`transition-all duration-300 p-4 md:p-6 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'} ml-0`}>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className={`rounded-3xl shadow-2xl overflow-hidden border-2 animate-fade-in ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-gray-200'}`}>
            <ResultsHero gradeInfo={gradeInfo} subject={subject} />

            {/* Stats Grid */}
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard 
                  icon={Target} 
                  value={<>{results.score || 0}<span className="text-2xl opacity-70">/{results.total || 0}</span></>}
                  label="Correct Answers"
                  color="blue"
                  darkMode={darkMode}
                />
                <StatsCard 
                  icon={TrendingUp} 
                  value={`${percentage}%`}
                  label="Score Percentage"
                  color="green"
                  darkMode={darkMode}
                />
                <StatsCard 
                  icon={Award} 
                  value={gradeInfo.grade}
                  label="Final Grade"
                  color="purple"
                  darkMode={darkMode}
                />
                <StatsCard 
                  icon={Clock} 
                  value={`${results.timeTaken || 0}m`}
                  label="Time Taken"
                  color="orange"
                  darkMode={darkMode}
                />
              </div>

              <ActionButtons onRetake={onRetake} onHome={onHome} darkMode={darkMode} />
            </div>
          </div>

          {/* Review Section */}
          {results.incorrectAnswers?.length > 0 && (
            <div className={`rounded-3xl shadow-2xl p-6 md:p-10 border-2 animate-fade-in ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-red-500/20' : 'bg-red-100'}`}>
                  <AlertCircle className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Questions to Review
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {results.incorrectAnswers.length} question{results.incorrectAnswers.length !== 1 ? 's' : ''} need attention
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {results.incorrectAnswers.map((item, index) => (
                  <ReviewQuestion key={index} item={item} index={index} darkMode={darkMode} />
                ))}
              </div>
            </div>
          )}

          {/* Perfect Score Message */}
          {isPerfect && <PerfectScoreBanner darkMode={darkMode} />}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;