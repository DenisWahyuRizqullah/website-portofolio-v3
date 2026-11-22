import React from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuantitativePillars } from './components/QuantitativePillars';
import { ProjectAccordion } from './components/ProjectAccordion';
import { EngineeringEthos } from './components/EngineeringEthos';
import { CareerRecord } from './components/CareerRecord';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ContactModule } from './components/ContactModule';
import { Footer } from './components/Footer';
import { FloatingMicroDock } from './components/FloatingMicroDock';
import { NotFoundPage } from './components/NotFoundPage';
import { isHomeRoute } from './utils/routeUtils';

export const App: React.FC = () => {
  const { profile, pillars, projects, ethos, experiences, skills } = portfolioData;
  const isHome = isHomeRoute(typeof window !== 'undefined' ? window.location.pathname : '/');

  // If path is not the home portfolio route, render dedicated Nordic 404 experience
  if (!isHome) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0C0C0E] text-[#09090B] dark:text-[#F4F4F5] flex flex-col font-sans">
        {/* Sticky Minimalist Brand Navbar with root-prefixed anchor links */}
        <Navbar name={profile.name} isNotFound={true} />

        {/* 404 System Anomaly Stage */}
        <main className="flex-1 flex flex-col justify-between max-w-5xl w-full mx-auto px-6 sm:px-10">
          <NotFoundPage />
          {/* Minimalist Monospace Footer */}
          <Footer />
        </main>
      </div>
    );
  }

  // Primary Single-Page Portfolio Experience
  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0C0C0E] text-[#09090B] dark:text-[#F4F4F5] flex flex-col font-sans">
      {/* Sticky Minimalist Brand Navbar */}
      <Navbar name={profile.name} />

      {/* Floating Micro Dock (Left-side Section Navigator) */}
      <FloatingMicroDock />

      {/* Main Reading Column (Constrained max-w-5xl with generous spatial rhythm) */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 space-y-16 sm:space-y-24">
        {/* Large-Scale Fluid Hero */}
        <HeroSection profile={profile} />

        {/* Quantitative Pillars Strip */}
        <QuantitativePillars pillars={pillars} />

        {/* Interactive Accordion Project Drawers */}
        <ProjectAccordion projects={projects} />

        {/* Minimalist Career Record */}
        <CareerRecord experiences={experiences} />

        {/* Technical Capabilities Matrix */}
        <SkillsMatrix skills={skills} />

        {/* Engineering Ethos / Mental Models Grid */}
        <EngineeringEthos ethos={ethos} />

        {/* Direct Contact Module */}
        <ContactModule profile={profile} />

        {/* Minimalist Monospace Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default App;
