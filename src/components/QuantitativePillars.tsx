import React from 'react';
import type { MetricPillar } from '../types/portfolio';

interface QuantitativePillarsProps {
  pillars: MetricPillar[];
}

export const QuantitativePillars: React.FC<QuantitativePillarsProps> = ({ pillars }) => {
  return (
    <section className="border-y border-stone-200/80 dark:border-stone-800 py-8 my-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {pillars.map((pillar) => (
          <div key={pillar.index} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                {pillar.index}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
                {pillar.label}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-light tracking-tight text-stone-950 dark:text-stone-100">
              {pillar.value}
            </div>
            <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-light leading-snug">
              {pillar.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
