import React from 'react';
import { ArrowRight, Users, Award, TrendingUp } from 'lucide-react';

const CTASection = ({ onGetStarted, darkMode }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center p-12 rounded-3xl ${
          darkMode ? 'bg-gradient-to-r from-blue-900 to-cyan-800' : 'bg-gradient-to-r from-blue-800 to-cyan-600'
        } text-white shadow-2xl`}>
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Excel in Your NIIT Certification?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of successful NIIT students who have transformed their exam preparation 
              and achieved outstanding results with our comprehensive quiz platform.
            </p>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm opacity-75">Active Students</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-75">Pass Rate</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">40%</div>
              <div className="text-sm opacity-75">Score Improvement</div>
            </div>
          </div>
          
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-800 px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-200 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Begin Your Success Journey
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="mt-6 space-y-2">
            <p className="text-sm opacity-75">
              ✓ No registration required • ✓ Start practicing immediately • ✓ 100% Free access
            </p>
            <p className="text-xs opacity-60">
              Trusted by students from leading NIIT centers across the country
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;