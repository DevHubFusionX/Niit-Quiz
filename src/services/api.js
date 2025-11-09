const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` })
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Auth methods
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    
    this.token = data.token;
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });
    
    this.token = data.token;
    localStorage.setItem('authToken', data.token);
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    // Clear any quiz results
    const currentResultsKey = localStorage.getItem('current_quiz_results');
    if (currentResultsKey) {
      localStorage.removeItem(currentResultsKey);
      localStorage.removeItem('current_quiz_results');
    }
    // Clear any other user-specific data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('quiz_results_') || key.startsWith('user_')) {
        localStorage.removeItem(key);
      }
    });
  }

  // Quiz methods
  async getQuizQuestions(subject, difficulty = null, count = 10) {
    const params = new URLSearchParams({ count: count.toString() });
    if (difficulty && difficulty !== 'all') {
      params.append('difficulty', difficulty);
    }
    
    return this.request(`/quiz/${subject}?${params}`);
  }

  async submitQuiz(subject, answers, timeSpent) {
    return this.request(`/quiz/${subject}/submit`, {
      method: 'POST',
      body: { answers, timeSpent }
    });
  }

  // User methods
  async getUserProfile() {
    return this.request('/user/profile');
  }

  async getUserStats() {
    return this.request('/user/stats');
  }

  // Subject methods
  async getSubjects() {
    return this.request('/subjects');
  }

  async getSubject(code) {
    return this.request(`/subjects/${code}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();