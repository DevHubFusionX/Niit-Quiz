import React from 'react';
import { Play, Terminal, Code, ArrowRight } from 'lucide-react';

const Hero = ({ onGetStarted, darkMode }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">


      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Professional Badge */}
        <div className="mb-8 animate-fade-in">
          <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold ${
            darkMode ? 'bg-blue-900/80 text-cyan-300 border border-cyan-700' : 'bg-white/80 text-blue-800 border border-cyan-300'
          } backdrop-blur-sm shadow-lg`}>
            <Terminal className="w-4 h-4" />
            NIIT Certification Preparation Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slide-up">
          <span className={darkMode ? 'text-white' : 'text-blue-900'}>Excel in Your</span>
          <br />
          <span className="bg-gradient-to-r from-blue-800 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            NIIT Examinations
          </span>
        </h1>

        {/* Descriptive Subtitle */}
        <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-300 ${
          darkMode ? 'text-cyan-200' : 'text-blue-700'
        }`}>
          Comprehensive quiz platform designed specifically for NIIT students. Master all six core subjects with 
          <strong> 120+ carefully crafted questions</strong>, real-time performance tracking, and detailed explanations 
          to ensure you're fully prepared for your certification exams.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-bounce-in delay-500">
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-blue-800 to-cyan-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-blue-900 hover:to-cyan-600 transition-all duration-300 flex items-center gap-4 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
          >
            <Play className="w-7 h-7 group-hover:scale-110 transition-transform" />
            Begin Your Preparation
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className={`flex items-center gap-3 px-8 py-5 rounded-2xl ${
            darkMode ? 'bg-blue-900/60 border-cyan-700' : 'bg-white/60 border-cyan-300'
          } backdrop-blur-md shadow-xl border`}>
            <Code className="w-6 h-6 text-cyan-500" />
            <span className="font-bold text-lg">120+ Practice Questions</span>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in delay-700">
          {[
            { number: "6", label: "Core Subjects", description: "Complete curriculum coverage", color: "from-blue-800 to-cyan-500" },
            { number: "120+", label: "Practice Questions", description: "Comprehensive question bank", color: "from-cyan-500 to-blue-600" },
            { number: "3", label: "Difficulty Levels", description: "Progressive learning path", color: "from-blue-600 to-cyan-400" },
            { number: "∞", label: "Practice Sessions", description: "Unlimited attempts", color: "from-cyan-400 to-blue-800" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className={`text-sm font-semibold mb-1 ${
                darkMode ? 'text-cyan-300' : 'text-blue-700'
              }`}>
                {stat.label}
              </div>
              <div className={`text-xs opacity-75 ${
                darkMode ? 'text-cyan-200' : 'text-blue-600'
              }`}>
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export default Hero;