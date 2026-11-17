import React from 'react';
import type { SkillCategory } from '../types/portfolio';

interface SkillsMatrixProps {
  skills: SkillCategory[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills }) => {
  return (
    <section id="capabilities" className="pt-10 pb-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="border-b border-stone-200/80 pb-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 mb-1">
          04 / TECHNICAL CAPABILITIES
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-950">
          Systems Matrix & Toolchains
        </h2>
      </div>

      {/* 3-column / 3-card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((cat) => (
          <div
            key={cat.code}
            className="p-6 bg-white rounded-lg border border-stone-200/80 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-400">
                  {cat.code}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
              </div>
              <h3 className="text-base font-normal text-stone-950">
                {cat.category}
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="bg-stone-50 border border-stone-200/60 rounded px-2.5 py-1 text-xs font-mono text-stone-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
