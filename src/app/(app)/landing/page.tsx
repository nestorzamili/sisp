import React from 'react';
import Header from './_components/header';
import HeroSection from './_components/hero-section';
import Footer from './_components/footer';
import Features from './_components/features';
import Facilities from './_components/facilities';
import Statistics from './_components/statistics';
import CallToAction from './_components/call-to-action';
import ProcessFlow from './_components/process-flow';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <HeroSection />
      <Features />
      <Facilities />
      <ProcessFlow />
      <Statistics />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
