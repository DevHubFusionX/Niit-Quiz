import React from 'react';
import { CheckCircle, BookOpen, Download, Moon, Smartphone, Save } from 'lucide-react';

const BenefitsSection = ({ darkMode }) => {
  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Question Bank",
      description: "Access 20+ carefully crafted questions per subject with detailed explanations to reinforce your understanding."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Flexible Navigation System",
      description: "Mark questions for review and navigate freely between questions to optimize your study strategy."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Professional Result Reports",
      description: "Export your quiz results as PDF documents for your academic records and progress tracking."
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Comfortable Study Environment",
      description: "Toggle between light and dark modes to create an optimal learning environment for any time of day."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Study Anywhere, Anytime",
      description: "Fully responsive design ensures seamless learning experience across all devices and screen sizes."
    },
    {
      icon: <Save className="w-6 h-6" />,
      title: "Automatic Progress Saving",
      description: "Your progress is automatically saved locally, allowing you to continue where you left off even after closing the browser."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 theme-text-primary">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
              Our platform is designed with student success in mind, offering comprehensive features 
              that enhance your learning experience and exam preparation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-xl card hover:shadow-lg transition-all duration-200">
                <div className="text-cyan-500 flex-shrink-0 mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 theme-text-primary">
                    {benefit.title}
                  </h3>
                  <p className="theme-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 rounded-xl theme-bg-secondary">
            <p className="text-lg theme-text-primary font-semibold mb-2">
              Trusted by NIIT Students Worldwide
            </p>
            <p className="theme-text-secondary">
              Join thousands of successful students who have improved their exam scores 
              and gained confidence in their technical skills through our comprehensive platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;