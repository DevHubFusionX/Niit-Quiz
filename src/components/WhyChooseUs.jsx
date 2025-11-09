import React from 'react';
import { BookOpen, Clock, Trophy, Users, Code, Database, Monitor, Briefcase } from 'lucide-react';

const WhyChooseUs = ({ darkMode }) => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Subject Coverage",
      description: "Complete preparation across all six NIIT core subjects: Programming Logic & Techniques, Web Content Development, Dreamweaver, MySQL, PHP, and Project Management",
      code: "6 SUBJECTS"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Realistic Exam Simulation",
      description: "Practice under actual exam conditions with customizable time limits of 30, 45, or 60 minutes to build confidence and time management skills",
      code: "TIMED"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Detailed Performance Tracking",
      description: "Monitor your learning progress with comprehensive analytics that identify strengths and highlight areas requiring additional focus",
      code: "ANALYTICS"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Flexible Learning Modes",
      description: "Choose between Practice Mode for immediate feedback and learning, or Exam Mode for authentic assessment experience",
      code: "2 MODES"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 theme-text-primary">
            Why Choose NIIT Quiz Hub?
          </h2>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
            Our comprehensive platform provides everything you need to excel in your NIIT certification exams, 
            combining proven learning methodologies with modern technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card card-interactive p-6 theme-border border-2 hover:border-cyan-400 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-cyan-500 group-hover:text-blue-800 transition-colors">
                  {feature.icon}
                </div>
                <div className="font-code text-xs bg-gradient-to-r from-blue-800 to-cyan-500 text-white px-3 py-1 rounded-full">
                  {feature.code}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 theme-text-primary group-hover:text-cyan-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="theme-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Code className="w-6 h-6" />, number: "120+", label: "Practice Questions", description: "Comprehensive question bank" },
            { icon: <Database className="w-6 h-6" />, number: "6", label: "Core Subjects", description: "Complete curriculum coverage" },
            { icon: <Monitor className="w-6 h-6" />, number: "2", label: "Learning Modes", description: "Practice & Exam modes" },
            { icon: <Briefcase className="w-6 h-6" />, number: "∞", label: "Practice Sessions", description: "Unlimited attempts" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center mb-3">
                <div className="text-cyan-500 group-hover:text-blue-800 transition-colors">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-blue-800 to-cyan-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold theme-text-secondary mb-1">
                {stat.label}
              </div>
              <div className="text-xs theme-text-tertiary">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;