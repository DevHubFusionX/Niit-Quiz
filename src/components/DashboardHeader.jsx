import React from 'react';
import { Moon, Sun, BarChart3, Home, GraduationCap, Sparkles, BookOpen } from 'lucide-react';

const DashboardHeader = ({ darkMode, toggleDarkMode, onBackToHome, showStats, setShowStats }) => {
  return (
    <div className="relative mb-12 animate-fade-in">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
      
      {/* Main Header Card */}
      <div className="glass-card p-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 text-cyan-400/20">
          <Sparkles className="w-12 h-12 floating-element" />
        </div>
        <div className="absolute bottom-6 left-6 text-blue-400/20">
          <BookOpen className="w-8 h-8" style={{transform: 'rotate(-15deg)'}} />
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          {/* Left Section - Title & Description */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  NIIT Certification Hub
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium theme-text-tertiary">Active Learning Platform</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg theme-text-secondary leading-relaxed max-w-2xl">
              Master your certification journey with our comprehensive practice platform designed for NIIT excellence.
            </p>
          </div>
          
          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="glass-card p-3 hover:scale-110 transition-all duration-200 group"
                title="Back to Home"
              >
                <Home className="w-5 h-5 theme-text-secondary group-hover:text-blue-500 transition-colors" />
              </button>
            )}
            
            <button
              onClick={() => setShowStats(!showStats)}
              className={`glass-card p-3 hover:scale-110 transition-all duration-200 group ${
                showStats ? 'bg-blue-500/20 border-blue-500/30' : ''
              }`}
              title="Toggle Statistics"
            >
              <BarChart3 className={`w-5 h-5 transition-colors ${
                showStats ? 'text-blue-400' : 'theme-text-secondary group-hover:text-cyan-500'
              }`} />
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="glass-card p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:scale-110 transition-all duration-200 group"
              title="Toggle Theme"
            >
              {darkMode ? 
                <Sun className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" /> : 
                <Moon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
              }
            </button>
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default DashboardHeader;