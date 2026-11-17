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

export const App: React.FC = () => {
  const { profile, pillars, projects, ethos, experiences, skills } = portfolioData;

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#09090B] flex flex-col font-sans">
      {/* Sticky Minimalist Brand Navbar */}
      <Navbar name={profile.name} />

      {/* Main Reading Column (Constrained max-w-5xl with generous spatial rhythm) */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 space-y-16 sm:space-y-24">
        {/* Large-Scale Fluid Hero */}
        <HeroSection profile={profile} />

        {/* Quantitative Pillars Strip */}
        <QuantitativePillars pillars={pillars} />

        {/* Interactive Accordion Project Drawers */}
        <ProjectAccordion projects={projects} />

        {/* Engineering Ethos / Mental Models Grid */}
        <EngineeringEthos ethos={ethos} />

        {/* Minimalist Career Record */}
        <CareerRecord experiences={experiences} />

        {/* Technical Capabilities Matrix */}
        <SkillsMatrix skills={skills} />

        {/* Understated Contact Transmission */}
        <ContactModule profile={profile} />

        {/* Minimalist Monospace Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default App;
