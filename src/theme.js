// Theme Manager for NIIT Quiz App
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.watchSystemTheme();
  }

  getSystemTheme() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      return 'light';
    }
  }

  getStoredTheme() {
    try {
      return localStorage.getItem('niit-quiz-theme');
    } catch (error) {
      return null;
    }
  }

  applyTheme(theme) {
    // Sanitize theme input to prevent XSS
    const sanitizedTheme = ['dark', 'light'].includes(theme) ? theme : 'light';
    
    try {
      document.documentElement.className = sanitizedTheme === 'dark' ? 'dark' : '';
      document.documentElement.setAttribute('data-theme', sanitizedTheme);
      this.currentTheme = sanitizedTheme;
      localStorage.setItem('niit-quiz-theme', sanitizedTheme);
    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    return newTheme;
  }

  setTheme(theme) {
    try {
      if (['light', 'dark'].includes(theme)) {
        this.applyTheme(theme);
      }
    } catch (error) {
      console.error('Failed to set theme:', error);
    }
  }

  watchSystemTheme() {
    try {
      // Add CSRF protection by validating the event source
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        // Validate event is from trusted source
        if (e.isTrusted && !this.getStoredTheme()) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      };
      mediaQuery.addEventListener('change', handleChange);
    } catch (error) {
      console.error('Failed to watch system theme:', error);
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Subject theme utilities
export const subjectThemes = {
  plt: 'subject-plt',
  iwcd: 'subject-iwcd', 
  dreamweaver: 'subject-dreamweaver',
  mysql: 'subject-mysql',
  php: 'subject-php',
  project: 'subject-project'
};

export const getSubjectTheme = (subjectId) => {
  return subjectThemes[subjectId] || 'subject-plt';
};

// Animation utilities
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  bounceIn: 'animate-bounce-in',
  stagger: 'stagger-animation'
};

// Create global theme manager instance
export const themeManager = new ThemeManager();

// React hook for theme management
export const useTheme = () => {
  const [theme, setTheme] = React.useState(themeManager.getCurrentTheme());

  const toggleTheme = () => {
    try {
      const newTheme = themeManager.toggleTheme();
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to toggle theme:', error);
    }
  };

  const changeTheme = (newTheme) => {
    try {
      themeManager.setTheme(newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to change theme:', error);
    }
  };

  React.useEffect(() => {
    const handleThemeChange = (e) => {
      // Validate event is trusted
      if (e.isTrusted) {
        setTheme(themeManager.getCurrentTheme());
      }
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  return { theme, toggleTheme, changeTheme };
};

export default themeManager;