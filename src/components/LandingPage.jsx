import React from 'react';
import Hero from './Hero';
import WhyChooseUs from './WhyChooseUs';
import SubjectsSection from './SubjectsSection';
import BenefitsSection from './BenefitsSection';
import CTASection from './CTASection';
import Footer from './Footer';

const LandingPage = ({ onGetStarted, darkMode, toggleDarkMode }) => {
  return (
    <div className={`min-h-screen theme-bg-primary theme-text-primary ${darkMode ? 'dark' : ''}`}>
      <Hero onGetStarted={onGetStarted} darkMode={darkMode} />
      <WhyChooseUs darkMode={darkMode} />
      <SubjectsSection darkMode={darkMode} />
      <BenefitsSection darkMode={darkMode} />
      <CTASection onGetStarted={onGetStarted} darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default LandingPage;