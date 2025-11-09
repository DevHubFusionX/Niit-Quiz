import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, BookOpen, CheckCircle, AlertCircle, Loader, Mail } from 'lucide-react';
import apiService from '../services/api';

const Login = ({ darkMode, onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isValid = false;
    
    switch (name) {
      case 'email':
        isValid = /\S+@\S+\.\S+/.test(value);
        break;
      case 'password':
        isValid = value.length >= 6;
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
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await apiService.login(formData.email, formData.password);
        onLogin();
        navigate('/dashboard');
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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="theme-bg-primary min-h-screen grid lg:grid-cols-2">
        {/* Left Column - Branding */}
        <div className={`hidden lg:flex flex-col justify-center items-center p-12 text-white relative overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900' 
            : 'bg-gradient-to-br from-blue-600 to-purple-700'
        }`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-md text-center relative z-10">
            <div className="mb-8 animate-fade-in">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center animate-pulse-slow ${
                darkMode ? 'bg-blue-500/20' : 'bg-white/20'
              }`}>
                <BookOpen className="w-12 h-12 opacity-90" />
              </div>
              <h1 className="text-4xl font-bold mb-4">NIIT HUB</h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Master your certification with our comprehensive quiz platform
              </p>
            </div>
            <div className="space-y-4 text-left">
              {[
                '6 Comprehensive Subjects',
                'Adaptive Learning Algorithm',
                'Progress Tracking & Analytics',
                'Study Notes & Resources'
              ].map((feature, index) => (
                <div key={index} className={`flex items-center gap-3 stagger-animation opacity-0`} style={{animationDelay: `${index * 0.2}s`}}>
                  <div className={`w-2 h-2 rounded-full ${
                    darkMode ? 'bg-blue-400' : 'bg-white'
                  }`}></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="theme-bg-primary flex items-center justify-center p-8">
          <div className="w-full max-w-md animate-slide-up">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <BookOpen className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h1 className="theme-text-primary text-2xl font-bold">
                Welcome Back
              </h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h2 className="theme-text-primary text-3xl font-bold mb-2">
                Welcome Back
              </h2>
              <p className="theme-text-secondary">
                Sign in to continue your learning journey
              </p>
            </div>

            {/* Login Form */}
            <div className="theme-bg-secondary p-8 rounded-2xl border theme-border shadow-lg backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-muted" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`theme-input w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all focus:ring-2 focus:ring-blue-500/20 ${
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

                <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
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
                      className={`theme-input w-full pl-12 pr-16 py-4 rounded-xl border-2 transition-all focus:ring-2 focus:ring-blue-500/20 ${
                        errors.password ? 'border-red-500' : fieldValidation.password ? 'border-green-500' : ''
                      }`}
                      placeholder="Enter your password"
                    />
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      {getFieldIcon('password')}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 theme-text-muted hover:theme-text-secondary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 animate-fade-in ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                  style={{animationDelay: '0.2s'}}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <p className="theme-text-secondary text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors">
                    Sign up here
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

export default Login;