import React from 'react';
import type { EthosItem } from '../types/portfolio';

interface EngineeringEthosProps {
  ethos: EthosItem[];
}

export const EngineeringEthos: React.FC<EngineeringEthosProps> = ({ ethos }) => {
  return (
    <section id="ethos" className="pt-10 pb-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800 pb-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-1">
          04 / ENGINEERING ETHOS
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-950 dark:text-stone-100">
          First-Principles Mental Models
        </h2>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {ethos.map((item) => (
          <div key={item.indexStr} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                {item.indexStr}
              </span>
              <span className="text-stone-300 dark:text-stone-700">/</span>
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                {item.subtitle}
              </span>
            </div>

            <h3 className="text-lg font-normal tracking-tight text-stone-950 dark:text-stone-100">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm font-light text-stone-600 dark:text-stone-400 leading-relaxed">
              {item.narrative}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
