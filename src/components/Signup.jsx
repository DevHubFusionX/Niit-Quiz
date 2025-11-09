import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, BookOpen, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import apiService from '../services/api';

const Signup = ({ darkMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors and validate in real-time
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Real-time validation feedback
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isValid = false;
    
    switch (name) {
      case 'name':
        isValid = value.length >= 2;
        break;
      case 'email':
        isValid = /\S+@\S+\.\S+/.test(value);
        break;
      case 'password':
        isValid = value.length >= 6;
        break;
      case 'confirmPassword':
        isValid = value === formData.password;
        break;
      default:
        break;
    }
    
    setFieldValidation(prev => ({
      ...prev,
      [name]: isValid
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await apiService.register(formData.name, formData.email, formData.password);
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setErrors({ general: error.message });
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const getFieldIcon = (fieldName) => {
    if (!formData[fieldName]) return null;
    return fieldValidation[fieldName] ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^\w\s]/)) strength++;
    
    const levels = [
      { label: 'Very Weak', color: 'bg-red-500' },
      { label: 'Weak', color: 'bg-orange-500' },
      { label: 'Fair', color: 'bg-yellow-500' },
      { label: 'Good', color: 'bg-blue-500' },
      { label: 'Strong', color: 'bg-green-500' }
    ];
    
    return { strength, ...levels[strength] };
  };

  if (success) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark' : ''}`}>
        <div className="theme-bg-primary min-h-screen w-full flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="animate-bounce mb-6">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h1 className="theme-text-primary text-2xl font-bold mb-4">
              Account Created Successfully!
            </h1>
            <p className="theme-text-secondary mb-6">
              Welcome to NIIT Quiz App. Redirecting you to login...
            </p>
            <div className="flex justify-center">
              <Loader className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="theme-bg-primary min-h-screen grid lg:grid-cols-2">
        {/* Left Column - Branding */}
        <div className={`hidden lg:flex flex-col justify-center items-center p-12 text-white relative overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900' 
            : 'bg-gradient-to-br from-green-600 to-blue-700'
        }`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-md text-center relative z-10">
            <div className="mb-8 animate-fade-in">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center animate-pulse-slow ${
                darkMode ? 'bg-green-500/20' : 'bg-white/20'
              }`}>
                <BookOpen className="w-12 h-12 opacity-90" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Join NIIT Quiz</h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Start your certification journey with our comprehensive learning platform
              </p>
            </div>
            <div className="space-y-4 text-left">
              {[
                'Personalized Learning Path',
                'Real-time Progress Tracking', 
                'Expert-curated Content',
                'Certification Preparation'
              ].map((feature, index) => (
                <div key={index} className={`flex items-center gap-3 stagger-animation opacity-0`} style={{animationDelay: `${index * 0.2}s`}}>
                  <div className={`w-2 h-2 rounded-full ${
                    darkMode ? 'bg-green-400' : 'bg-white'
                  }`}></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Signup Form */}
        <div className="theme-bg-primary flex items-center justify-center p-8">
          <div className="w-full max-w-md animate-slide-up">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <BookOpen className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h1 className="theme-text-primary text-2xl font-bold">
                Create Account
              </h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h2 className="theme-text-primary text-3xl font-bold mb-2">
                Create Account
              </h2>
              <p className="theme-text-secondary">
                Join thousands of learners on their certification journey
              </p>
            </div>

            {/* Signup Form */}
            <div className="theme-bg-secondary p-8 rounded-2xl border theme-border shadow-lg backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                {errors.general && (
                  <div className={`p-4 rounded-lg border-l-4 border-red-500 animate-fade-in ${
                    darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-sm text-red-600 font-medium">{errors.general}</p>
                    </div>
                  </div>
                )}
                <div className="animate-fade-in">
                  <label className="theme-text-primary block text-sm font-semibold mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`theme-input w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all focus:ring-2 focus:ring-green-500/20 ${
                        errors.name ? 'border-red-500' : fieldValidation.name ? 'border-green-500' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {getFieldIcon('name')}
                    </div>
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <label className="theme-text-primary block text-sm font-semibold mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`theme-input w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all focus:ring-2 focus:ring-green-500/20 ${
                        errors.email ? 'border-red-500' : fieldValidation.email ? 'border-green-500' : ''
                      }`}
                      placeholder="Enter your email"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {getFieldIcon('email')}
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <label className="theme-text-primary block text-sm font-semibold mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`theme-input w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all focus:ring-2 focus:ring-green-500/20 ${
                        errors.password ? 'border-red-500' : fieldValidation.password ? 'border-green-500' : ''
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 theme-text-muted hover:theme-text-secondary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs theme-text-secondary">Password Strength</span>
                        <span className={`text-xs font-medium ${getPasswordStrength(formData.password).strength >= 3 ? 'text-green-600' : 'text-orange-600'}`}>
                          {getPasswordStrength(formData.password).label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(formData.password).color}`}
                          style={{ width: `${(getPasswordStrength(formData.password).strength / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
                  <label className="theme-text-primary block text-sm font-semibold mb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`theme-input w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all focus:ring-2 focus:ring-green-500/20 ${
                        errors.confirmPassword ? 'border-red-500' : fieldValidation.confirmPassword ? 'border-green-500' : ''
                      }`}
                      placeholder="Confirm your password"
                    />
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      {getFieldIcon('confirmPassword')}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 theme-text-muted hover:theme-text-secondary transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                <p className="theme-text-secondary text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-500 hover:text-green-600 font-semibold transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;