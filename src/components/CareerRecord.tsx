import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import type { ExperienceItem } from '../types/portfolio';

interface CareerRecordProps {
  experiences: ExperienceItem[];
}

export const CareerRecord: React.FC<CareerRecordProps> = ({ experiences }) => {
  return (
    <section id="career" className="pt-10 pb-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="border-b border-stone-200/80 pb-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 mb-1">
          03 / CAREER RECORD
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-950">
          Industry Deployments & Research
        </h2>
      </div>

      {/* Timeline Rows */}
      <div className="divide-y divide-stone-200/80 border-b border-stone-200/80">
        {experiences.map((exp) => (
          <div key={exp.id} className="py-6 sm:py-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-normal text-stone-950">
                  {exp.role}
                </h3>
                <div className="text-xs sm:text-sm text-stone-600 font-light">
                  {exp.organization}
                  <span className="mx-2 text-stone-300">·</span>
                  <span className="font-mono text-stone-400 text-xs">{exp.type}</span>
                </div>
              </div>

              <div className="text-right sm:shrink-0 font-mono text-xs text-stone-400">
                <span>{exp.period}</span>
                <span className="hidden sm:inline text-stone-300 mx-2">·</span>
                <span className="block sm:inline text-stone-400">{exp.location}</span>
              </div>
            </div>

            {/* Bulleted technical accomplishments */}
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 font-light max-w-3xl">
              {exp.highlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-2 shrink-0" />
                  <span className="leading-relaxed">{hl}</span>
                </li>
              ))}
            </ul>

            {/* Tags and Report Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white border border-stone-200 rounded text-[11px] font-mono px-2 py-0.5 text-stone-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {exp.reportUrl && (
                <a
                  href={exp.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-800 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
                >
                  <FileText size={12} className="text-stone-400" />
                  <span>{exp.reportLabel || 'View Report (PDF)'}</span>
                  <ArrowUpRight size={11} className="text-stone-400" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
