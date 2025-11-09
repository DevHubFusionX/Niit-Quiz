import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { studyNotes } from '../data/studyNotes';
import { ArrowLeft, BookOpen, CheckCircle, FileText, Download, Search } from 'lucide-react';

const StudyNotes = ({ darkMode, toggleDarkMode, onBackToHome }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();
  const { subject } = useParams();

  const subjectNotes = studyNotes[subject];

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredSections = subjectNotes?.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  if (!subjectNotes) {
    return (
      <div className={`min-h-screen theme-bg-primary ${darkMode ? 'dark' : ''} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold theme-text-primary mb-4">Study Notes Not Found</h2>
          <button 
            onClick={() => navigate('/subjects')} 
            className="text-blue-500 hover:text-blue-600"
          >
            ← Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen theme-bg-primary ${darkMode ? 'dark' : ''}`}>
      <Sidebar 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onBackToHome={onBackToHome}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        currentPage="subjects"
        onNavigate={(path) => navigate(path)}
      />
      
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-72'}`}>
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/subjects')}
              className="flex items-center gap-2 mb-4 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Subjects
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {subjectNotes.title}
                </h1>
                <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  Study Notes & Key Concepts
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Study Notes Content */}
          <div className="space-y-6">
            {filteredSections.map((section, index) => (
              <div 
                key={index}
                className={`rounded-xl border shadow-sm transition-all ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {section.title}
                    </h3>
                  </div>
                  <div className={`transform transition-transform ${expandedSections[index] ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {expandedSections[index] && (
                  <div className="px-6 pb-6">
                    <div className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} leading-relaxed`}>
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredSections.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                No notes found for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate(`/quiz/${subject}/setup`)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              <FileText className="w-5 h-5" />
              Take Practice Quiz
            </button>
            {subjectNotes.pdfUrl && (
              <a
                href={subjectNotes.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Download PDF Guide
              </a>
            )}
            <button
              onClick={() => window.print()}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                darkMode 
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Download className="w-5 h-5" />
              Print Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotes;