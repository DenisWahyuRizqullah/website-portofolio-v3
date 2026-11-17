import React from 'react';
import { ArrowDownRight, FileText } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface HeroSectionProps {
  profile: Profile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  return (
    <section className="pt-8 sm:pt-14 pb-12 sm:pb-16 space-y-8">
      {/* Tracker label */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">
          00 / SYSTEMS ARCHITECTURE & FIRMWARE
        </span>
        <span className="h-px w-8 bg-stone-300/80 dark:bg-stone-800" />
      </div>

      {/* Large-scale fluid H1 */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-stone-950 dark:text-stone-100 leading-[1.08] max-w-4xl">
        Developing reliable and efficient systems across{' '}
        <span className="font-normal underline decoration-stone-300 dark:decoration-stone-700 underline-offset-8 decoration-1">
          software and embedded hardware
        </span>
        .
      </h1>

      {/* Narrative bio */}
      <div className="max-w-2xl space-y-4 text-stone-600 dark:text-stone-400 font-light text-sm sm:text-base leading-relaxed">
        <p>
          I am a Computer Engineering graduate from Universitas Brawijaya specializing in the synthesis of bare-metal microcontrollers, deterministic edge ML, and robust web applications.
        </p>
        <p className="text-stone-500 dark:text-stone-400/90 text-xs sm:text-sm font-light">
          From aligning telecommunication antennas over wireless stepper control at Telkomsel to publishing peer-reviewed research on mobile computer vision in J-PTIIK, my focus is structured, measurable execution.
        </p>
      </div>

      {/* Actions strip */}
      <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
        <a
          href="#systems"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-xs font-mono tracking-wider hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
        >
          <span>EXPLORE SYSTEMS</span>
          <ArrowDownRight size={14} />
        </a>

        {profile.resumes.length > 0 && (
          <a
            href={profile.resumes[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 transition-colors py-2"
          >
            <FileText size={13} className="text-stone-400 dark:text-stone-500" />
            <span>DOWNLOAD CV (PDF)</span>
          </a>
        )}

        <div className="text-[11px] font-mono text-stone-400 dark:text-stone-500 sm:ml-auto">
          {profile.location} · UB B.Eng.
        </div>
      </div>
    </section>
  );
};
