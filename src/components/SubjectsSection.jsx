import React from 'react';
import { Code, Globe, Palette, Database, Server, Clipboard } from 'lucide-react';

const SubjectsSection = ({ darkMode }) => {
  const subjects = [
    { 
      name: "Programming Logic & Techniques", 
      code: "PLT", 
      icon: <Code className="w-10 h-10" />, 
      color: "bg-tech-gradient",
      description: "Master fundamental programming concepts, algorithms, and logical problem-solving techniques essential for software development."
    },
    { 
      name: "Web Content Development", 
      code: "IWCD", 
      icon: <Globe className="w-10 h-10" />, 
      color: "from-cyan-600 to-blue-800",
      description: "Learn HTML, CSS, and modern web development practices to create responsive and interactive web applications."
    },
    { 
      name: "Adobe Dreamweaver", 
      code: "DW", 
      icon: <Palette className="w-10 h-10" />, 
      color: "from-blue-700 to-cyan-500",
      description: "Develop proficiency in Adobe Dreamweaver for professional web design and visual development workflows."
    },
    { 
      name: "MySQL Database Management", 
      code: "SQL", 
      icon: <Database className="w-10 h-10" />, 
      color: "from-cyan-500 to-blue-600",
      description: "Understand database design, SQL queries, and data management principles for robust application backends."
    },
    { 
      name: "PHP Server-Side Programming", 
      code: "PHP", 
      icon: <Server className="w-10 h-10" />, 
      color: "from-blue-900 to-cyan-600",
      description: "Build dynamic web applications using PHP programming language and server-side development techniques."
    },
    { 
      name: "Project Management Fundamentals", 
      code: "PM", 
      icon: <Clipboard className="w-10 h-10" />, 
      color: "from-cyan-400 to-white text-blue-900",
      description: "Learn project planning, execution, and management methodologies essential for successful IT project delivery."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 theme-text-primary">
            Master All Six Core Subjects
          </h2>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
            Our comprehensive curriculum covers every essential topic in your NIIT program, 
            ensuring you're thoroughly prepared for both coursework and certification exams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${subject.color} p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border border-cyan-200 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-white group-hover:scale-110 transition-transform">
                  {subject.icon}
                </div>
                <div className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">
                  {subject.code}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">
                {subject.name}
              </h3>
              
              <p className="text-white/90 text-sm leading-relaxed">
                {subject.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-xs text-white/75">
                  20+ Practice Questions Available
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg theme-text-secondary">
            Each subject includes comprehensive practice questions, detailed explanations, 
            and progress tracking to ensure mastery of all key concepts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;