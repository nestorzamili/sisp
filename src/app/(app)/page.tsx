import React from 'react';
import dynamic from 'next/dynamic';
import Header from './_components/header';
import HeroSection from './_components/hero-section';

const Benefits = dynamic(() => import('./_components/benefits'), {
  ssr: true,
});
const Features = dynamic(() => import('./_components/features'), {
  ssr: true,
});
const Facilities = dynamic(() => import('./_components/facilities'), {
  ssr: true,
});
const ProcessFlow = dynamic(() => import('./_components/process-flow'), {
  ssr: true,
});
const Statistics = dynamic(() => import('./_components/statistics'), {
  ssr: true,
});
const CallToAction = dynamic(() => import('./_components/call-to-action'), {
  ssr: true,
});
const Footer = dynamic(() => import('./_components/footer'), {
  ssr: true,
});

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        <HeroSection />
        <Benefits />
        <Features />
        <Facilities />
        <ProcessFlow />
        <Statistics />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
