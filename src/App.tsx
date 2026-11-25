import React, { useCallback, useState } from 'react';
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
import { KineticSlideOverViewer } from './components/KineticSlideOverViewer';
import { NotFoundPage } from './components/NotFoundPage';
import { isHomeRoute } from './utils/routeUtils';
import type { MediaAsset } from './types';

export const App: React.FC = () => {
  const { profile, pillars, projects, ethos, experiences, skills } = portfolioData;
  const isHome = isHomeRoute(typeof window !== 'undefined' ? window.location.pathname : '/');

  const [viewer, setViewer] = useState<{
    isOpen: boolean;
    items: MediaAsset[];
    activeIndex: number;
  }>({
    isOpen: false,
    items: [],
    activeIndex: 0,
  });

  const openMedia = useCallback((items: MediaAsset[], initialIndex = 0) => {
    if (items.length === 0) return;
    const clampedIndex = Math.min(Math.max(0, initialIndex), items.length - 1);
    setViewer({ isOpen: true, items, activeIndex: clampedIndex });
  }, []);

  const closeMedia = useCallback(() => {
    setViewer((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const selectMediaIndex = useCallback((index: number) => {
    setViewer((prev) => {
      if (prev.items.length === 0) return prev;
      const clampedIndex = Math.min(Math.max(0, index), prev.items.length - 1);
      return { ...prev, activeIndex: clampedIndex };
    });
  }, []);

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
        <HeroSection profile={profile} onOpenMedia={openMedia} />

        {/* Quantitative Pillars Strip */}
        <QuantitativePillars pillars={pillars} />

        {/* Interactive Accordion Project Drawers */}
        <ProjectAccordion projects={projects} onOpenMedia={openMedia} />

        {/* Minimalist Career Record */}
        <CareerRecord experiences={experiences} onOpenMedia={openMedia} />

        {/* Technical Capabilities Matrix */}
        <SkillsMatrix skills={skills} />

        {/* Engineering Ethos / Mental Models Grid */}
        <EngineeringEthos ethos={ethos} />

        {/* Direct Contact Module */}
        <ContactModule profile={profile} onOpenMedia={openMedia} />

        {/* Minimalist Monospace Footer */}
        <Footer />
      </main>

      <KineticSlideOverViewer
        isOpen={viewer.isOpen}
        items={viewer.items}
        activeIndex={viewer.activeIndex}
        onClose={closeMedia}
        onSelectIndex={selectMediaIndex}
      />
    </div>
  );
};

export default App;
