// Adaptive Testing Algorithm
export class AdaptiveTestingEngine {
  constructor(questions, initialDifficulty = 'medium') {
    try {
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Invalid questions array provided');
      }
      
      this.questions = questions;
      this.currentDifficulty = ['easy', 'medium', 'hard'].includes(initialDifficulty) 
        ? initialDifficulty 
        : 'medium';
      this.userAbility = 0; // Range: -3 to +3
      this.questionHistory = [];
      this.difficultyMap = {
        'easy': -1,
        'medium': 0,
        'hard': 1
      };
      this.reverseDifficultyMap = {
        '-1': 'easy',
        '0': 'medium',
        '1': 'hard'
      };
    } catch (error) {
      console.error('Error initializing AdaptiveTestingEngine:', error);
      throw error;
    }
  }

  // Calculate user ability based on Item Response Theory (IRT)
  updateUserAbility(isCorrect, questionDifficulty) {
    try {
      if (typeof isCorrect !== 'boolean') {
        console.error('Invalid isCorrect value:', isCorrect);
        return;
      }
      
      if (!this.difficultyMap.hasOwnProperty(questionDifficulty)) {
        console.error('Invalid question difficulty:', questionDifficulty);
        return;
      }
      
      const difficultyValue = this.difficultyMap[questionDifficulty];
      const expectedProbability = this.calculateProbability(this.userAbility, difficultyValue);
      
      // Update ability using simple Bayesian approach
      const learningRate = 0.3;
      const adjustment = learningRate * (isCorrect ? 1 : -1) * (1 - expectedProbability);
      
      this.userAbility = Math.max(-3, Math.min(3, this.userAbility + adjustment));
      
      this.questionHistory.push({
        difficulty: questionDifficulty,
        correct: isCorrect,
        abilityAfter: this.userAbility
      });
    } catch (error) {
      console.error('Error updating user ability:', error);
    }
  }

  // Calculate probability of correct answer using IRT model
  calculateProbability(ability, difficulty) {
    const exponent = ability - difficulty;
    return 1 / (1 + Math.exp(-exponent));
  }

  // Get next optimal difficulty level
  getNextDifficulty() {
    // Target 70% success rate for optimal learning
    const targetProbability = 0.7;
    let bestDifficulty = 'medium';
    let bestDifference = Infinity;

    for (const [difficulty, value] of Object.entries(this.difficultyMap)) {
      const probability = this.calculateProbability(this.userAbility, value);
      const difference = Math.abs(probability - targetProbability);
      
      if (difference < bestDifference) {
        bestDifference = difference;
        bestDifficulty = difficulty;
      }
    }

    this.currentDifficulty = bestDifficulty;
    return bestDifficulty;
  }

  // Get next question based on adaptive algorithm
  getNextQuestion(answeredQuestions = []) {
    try {
      if (!Array.isArray(answeredQuestions)) {
        console.error('Invalid answeredQuestions array');
        answeredQuestions = [];
      }
      
      const targetDifficulty = this.getNextDifficulty();
      
      // Filter available questions
      const availableQuestions = this.questions.filter(q => {
        try {
          return q && q.id && !answeredQuestions.includes(q.id) && q.difficulty === targetDifficulty;
        } catch (error) {
          console.error('Error filtering question:', error);
          return false;
        }
      });

      // If no questions at target difficulty, get closest available
      if (availableQuestions.length === 0) {
        const allAvailable = this.questions.filter(q => {
          try {
            return q && q.id && !answeredQuestions.includes(q.id);
          } catch (error) {
            console.error('Error filtering available questions:', error);
            return false;
          }
        });
        if (allAvailable.length === 0) return null;
        return allAvailable[Math.floor(Math.random() * allAvailable.length)];
      }

      // Return random question from target difficulty
      return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    } catch (error) {
      console.error('Error getting next question:', error);
      return null;
    }
  }

  // Check if adaptive test should end
  shouldEndTest(answeredQuestions = []) {
    try {
      if (!Array.isArray(answeredQuestions)) {
        console.error('Invalid answeredQuestions array');
        answeredQuestions = [];
      }
      
      const minQuestions = 10;
      const maxQuestions = 30;
      const stabilityThreshold = 5;
      
      // Must answer minimum questions
      if (this.questionHistory.length < minQuestions) return false;
      
      // End if reached maximum questions
      if (this.questionHistory.length >= maxQuestions) return true;
      
      // End if no more questions available
      const availableQuestions = this.questions.filter(q => {
        try {
          return q && q.id && !answeredQuestions.includes(q.id);
        } catch (error) {
          return false;
        }
      });
      if (availableQuestions.length === 0) return true;
      
      // End if ability has stabilized (last 5 questions show consistent performance)
      if (this.questionHistory.length >= minQuestions + stabilityThreshold) {
        const recent = this.questionHistory.slice(-stabilityThreshold);
        const abilityVariance = this.calculateVariance(recent.map(q => q.abilityAfter));
        
        // If ability variance is low, user has reached stable performance
        if (abilityVariance < 0.1) return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking if test should end:', error);
      return true; // End test on error to prevent infinite loops
    }
  }
  
  // Calculate variance for stability check
  calculateVariance(values) {
    try {
      if (!Array.isArray(values) || values.length === 0) return 0;
      
      const numericValues = values.filter(v => typeof v === 'number' && !isNaN(v));
      if (numericValues.length === 0) return 0;
      
      const mean = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
      const variance = numericValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numericValues.length;
      return variance;
    } catch (error) {
      console.error('Error calculating variance:', error);
      return 0;
    }
  }

  // Get performance insights
  getPerformanceInsights() {
    const recentHistory = this.questionHistory.slice(-5);
    const recentCorrect = recentHistory.filter(q => q.correct).length;
    const recentAccuracy = recentHistory.length > 0 ? (recentCorrect / recentHistory.length) * 100 : 0;

    let abilityLevel = 'Beginner';
    if (this.userAbility > 1) abilityLevel = 'Advanced';
    else if (this.userAbility > -0.5) abilityLevel = 'Intermediate';

    return {
      currentAbility: this.userAbility,
      abilityLevel,
      recommendedDifficulty: this.currentDifficulty,
      recentAccuracy: Math.round(recentAccuracy),
      totalQuestions: this.questionHistory.length,
      improvementTrend: this.getImprovementTrend(),
      isStable: this.questionHistory.length >= 10 && this.calculateVariance(this.questionHistory.slice(-5).map(q => q.abilityAfter)) < 0.1
    };
  }

  // Calculate improvement trend
  getImprovementTrend() {
    if (this.questionHistory.length < 3) return 'insufficient_data';
    
    const recent = this.questionHistory.slice(-3).map(q => q.abilityAfter);
    const older = this.questionHistory.slice(-6, -3).map(q => q.abilityAfter);
    
    if (older.length === 0) return 'improving';
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    if (recentAvg > olderAvg + 0.2) return 'improving';
    if (recentAvg < olderAvg - 0.2) return 'declining';
    return 'stable';
  }

  // Reset for new session
  reset() {
    this.userAbility = 0;
    this.currentDifficulty = 'medium';
    this.questionHistory = [];
  }
}