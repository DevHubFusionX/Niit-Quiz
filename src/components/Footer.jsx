import React from 'react';
import { Mail, Github, Linkedin, Heart } from 'lucide-react';

const Footer = ({ darkMode }) => {
  return (
    <footer className="py-12 border-t theme-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-800 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="text-2xl font-bold theme-text-primary">NIIT HUB</span>
              </div>
              <p className="theme-text-secondary mb-4 max-w-md">
                Empowering NIIT students to achieve excellence through interactive learning, 
                comprehensive practice questions, and detailed performance analytics.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-cyan-500 hover:text-blue-800 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="text-cyan-500 hover:text-blue-800 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-cyan-500 hover:text-blue-800 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold theme-text-primary mb-4">Quick Links</h3>
              <ul className="space-y-2 theme-text-secondary">
                <li><a href="#" className="hover:text-cyan-600 transition-colors">All Subjects</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Practice Tests</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Study Guide</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Performance Analytics</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold theme-text-primary mb-4">Support</h3>
              <ul className="space-y-2 theme-text-secondary">
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t theme-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 theme-text-tertiary">
                <span>Built with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>for NIIT students worldwide</span>
              </div>
              <div className="theme-text-tertiary text-sm">
                © 2024 NIIT HUB. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;