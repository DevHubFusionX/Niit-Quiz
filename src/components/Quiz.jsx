import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import QuizHeader from './quiz/QuizHeader';
import QuestionDisplay from './quiz/QuestionDisplay';
import QuizNavigation from './quiz/QuizNavigation';
import QuizResultsModal from './quiz/QuizResultsModal';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ subject, config, onFinish, onHome, darkMode, toggleDarkMode }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(config?.timeLimit * 60 || 1800);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const mountRef = React.useRef(0);
  const resultsRef = React.useRef(null);

  // Track component mounts and restore results if available
  React.useEffect(() => {
    mountRef.current += 1;
    console.log(`🔄 Quiz component mounted (mount #${mountRef.current})`);
    
    // Try to restore results from localStorage
    const currentResultsKey = localStorage.getItem('current_quiz_results');
    if (currentResultsKey) {
      const savedResults = localStorage.getItem(currentResultsKey);
      if (savedResults) {
        try {
          const parsedResults = JSON.parse(savedResults);
          console.log('🔄 Restoring results from localStorage:', parsedResults);
          resultsRef.current = parsedResults;
          setResults(parsedResults);
          setLoading(false);
        } catch (error) {
          console.error('Failed to parse saved results:', error);
        }
      }
    }
    
    return () => {
      console.log(`🔄 Quiz component unmounting (was mount #${mountRef.current})`);
    };
  }, []);

  useEffect(() => {
    if (questions.length > 0 || results) return; // Don't refetch if we have results

    console.log('Fetching quiz questions with config:', {
      subject: subject.code,
      difficulty: config.difficulty,
      questionCount: config.questionCount
    });

    apiService.getQuizQuestions(
      subject.code,
      config.difficulty === 'all' ? null : config.difficulty,
      config.questionCount || 10
    )
      .then(response => {
        console.log('Quiz questions received:', response);
        setQuestions(response.questions || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
        // Show user-friendly error
        alert('Failed to load quiz questions. Please try again.');
        setLoading(false);
      });
  }, [subject.code, config.difficulty, config.questionCount, questions.length, results]);

  useEffect(() => {
    if (results || loading || questions.length === 0) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, results, loading, questions.length]);

  // Debug: Track results state changes
  useEffect(() => {
    console.log('🔄 Results state changed:', results);
    if (results) {
      console.log('✅ Results are set - QuizResults should render on next render');
      // Keep ref in sync
      resultsRef.current = results;
    } else if (resultsRef.current) {
      console.log('⚠️ Results state cleared but ref still has data:', resultsRef.current);
    }
  }, [results]);

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const calculateCurrentScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (results) {
      console.log('Already have results, skipping submit');
      return;
    }

    console.log('Submitting quiz...');

    try {
      const apiAnswers = questions.map((q, index) => ({
        questionId: q._id,
        selectedOption: answers[index] ?? null
      }));

      const timeTaken = Math.floor((config.timeLimit * 60 - timeLeft) / 60);
      const result = await apiService.submitQuiz(subject.code, apiAnswers, timeTaken);

      const incorrectAnswers = (result.results || [])
        .filter(r => !r.correct)
        .map(r => ({
          question: r.question || 'Question not available',
          userAnswer: r.options?.[r.selectedAnswer] || 'Not answered',
          correctAnswer: r.options?.[r.correctAnswer] || 'Unknown'
        }));

      const finalResults = {
        score: result.score || 0,
        total: result.total || questions.length,
        percentage: result.percentage || 0,
        incorrectAnswers,
        timeTaken
      };

      console.log('Quiz submitted successfully:', finalResults);
      console.log('📊 Setting results state and ref...');
      
      // Persist results to prevent loss on remount
      const resultsKey = `quiz_results_${subject.code}_${Date.now()}`;
      localStorage.setItem(resultsKey, JSON.stringify(finalResults));
      localStorage.setItem('current_quiz_results', resultsKey);
      
      resultsRef.current = finalResults;
      setResults(finalResults);
      console.log('✅ Results state and ref set, component should re-render');
      onFinish?.(finalResults);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  // Use ref as fallback if state is somehow cleared
  const displayResults = results || resultsRef.current;

  // Debug: Log render state
  console.log('🎨 Quiz component render:', {
    hasResults: !!results,
    hasResultsRef: !!resultsRef.current,
    displayResults: !!displayResults,
    resultsValue: results,
    resultsRefValue: resultsRef.current,
    loading,
    questionsCount: questions.length,
    currentIndex
  });

  const showResults = displayResults !== null;

  if (loading && !results && !resultsRef.current) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Show full results page if results exist and we want a dedicated results page
  // Currently using inline results display instead

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
        <div className="max-w-5xl mx-auto">
          <div>
            <QuizHeader
              subject={subject}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              timeLeft={timeLeft}
              darkMode={darkMode}
              currentScore={calculateCurrentScore()}
              answeredCount={Object.keys(answers).length}
            />

            <QuestionDisplay
              question={questions[currentIndex]}
              selectedAnswer={answers[currentIndex]}
              onAnswerSelect={showResults ? null : handleAnswer}
              darkMode={darkMode}
              questionNumber={currentIndex + 1}
            />

            <QuizNavigation
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              darkMode={darkMode}
              answers={answers}
              questions={questions}
              isLastQuestion={currentIndex === questions.length - 1}
            />
          </div>

      {showResults && (
        <QuizResultsModal
          results={displayResults}
          subject={subject}
          onRetake={() => {
            const currentResultsKey = localStorage.getItem('current_quiz_results');
            if (currentResultsKey) {
              localStorage.removeItem(currentResultsKey);
              localStorage.removeItem('current_quiz_results');
            }
            window.location.reload();
          }}
          onHome={() => {
            const currentResultsKey = localStorage.getItem('current_quiz_results');
            if (currentResultsKey) {
              localStorage.removeItem(currentResultsKey);
              localStorage.removeItem('current_quiz_results');
            }
            onHome();
          }}
          onClose={() => setResults(null)}
          darkMode={darkMode}
        />
      )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
