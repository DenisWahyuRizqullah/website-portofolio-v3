import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight, FileText, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';

interface ProjectAccordionProps {
  projects: ProjectItem[];
}

export const ProjectAccordion: React.FC<ProjectAccordionProps> = ({ projects }) => {
  // Open the first featured project by default (e.g. Telkomsel) so the page immediately displays technical depth
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categories = ['ALL', 'IoT & Embedded', 'Computer Vision & ML', 'Web Platform'];

  const filteredProjects = projects.filter((item) => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'IoT & Embedded') return item.category.includes('IoT') || item.category.includes('Embedded');
    if (filterCategory === 'Computer Vision & ML') return item.category.includes('Vision') || item.category.includes('Machine Learning');
    if (filterCategory === 'Web Platform') return item.category.includes('Web');
    return true;
  });

  const toggleDrawer = (id: number) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section id="systems" className="pt-10 pb-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 mb-1">
            01 / PORTFOLIO CATALOG
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-950">
            Engineered Systems & Research
          </h2>
        </div>

        {/* Minimal Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Drawers List */}
      <div className="divide-y divide-stone-200/80 border-b border-stone-200/80">
        {filteredProjects.map((project) => {
          const isOpen = openIndex === project.id;

          return (
            <div
              key={project.id}
              className={`transition-colors duration-200 ${
                isOpen ? 'bg-[#FFFFFF]/60' : 'hover:bg-stone-50/50'
              }`}
            >
              {/* Header / Clickable Drawer Row */}
              <button
                type="button"
                onClick={() => toggleDrawer(project.id)}
                aria-expanded={isOpen}
                className="w-full py-5 px-3 sm:px-4 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-900"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                  {/* Monospace index */}
                  <span className="text-xs font-mono text-stone-400 pt-0.5 sm:pt-0">
                    {project.indexStr}
                  </span>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3
                        className={`text-base sm:text-lg tracking-tight font-normal transition-colors ${
                          isOpen ? 'text-stone-950' : 'text-stone-900'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[11px] font-mono border border-stone-200/60 whitespace-nowrap">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-500 font-light line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right side metric and kinetic toggle */}
                <div className="flex items-center gap-4 shrink-0 pt-0.5 sm:pt-0">
                  {project.metric && (
                    <span className="hidden md:inline-block text-[11px] font-mono text-stone-500 bg-stone-100/70 px-2.5 py-1 rounded border border-stone-200/40">
                      {project.metric}
                    </span>
                  )}
                  <span
                    className={`w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center font-mono text-stone-600 transition-transform duration-200 ${
                      isOpen ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </div>
              </button>

              {/* Collapsible Content */}
              <div className={`accordion-grid ${isOpen ? 'open' : ''}`}>
                <div className="accordion-inner">
                  <div className="px-3 sm:px-6 pt-2 pb-8 space-y-6 text-stone-700 font-light border-t border-stone-100">
                    {/* Description narrative */}
                    <div className="text-xs sm:text-sm leading-relaxed text-stone-600 max-w-3xl">
                      {project.description}
                    </div>

                    {/* Case study deep-dive */}
                    {project.caseStudy && (
                      <div className="space-y-6 pt-2">
                        {/* Objectives / Methodology Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-lg border border-stone-200/80">
                          {project.caseStudy.objectives && (
                            <div className="space-y-2">
                              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-400 block">
                                Technical Objectives
                              </span>
                              <ul className="space-y-1.5 text-xs text-stone-600">
                                {project.caseStudy.objectives.map((obj, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <CheckCircle2 size={13} className="text-stone-400 shrink-0 mt-0.5" />
                                    <span>{obj}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {project.caseStudy.methodology && (
                            <div className="space-y-2">
                              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-400 block">
                                Implementation Architecture
                              </span>
                              <ul className="space-y-2 text-xs text-stone-600">
                                {project.caseStudy.methodology.map((mth, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-stone-300 font-mono text-[10px] mt-0.5">
                                      0{i + 1}
                                    </span>
                                    <span>{mth}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Engineering Challenge & Resolution */}
                        {project.caseStudy.challenge && (
                          <div className="p-4 rounded-lg bg-stone-50 border-l-2 border-stone-900 space-y-1.5 text-xs text-stone-700">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500 block">
                              Engineering Bottleneck & Resolution
                            </span>
                            {project.caseStudy.challenge.map((c, i) => (
                              <p key={i} className="leading-relaxed">
                                {c}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Authentic Engineering Photography / Media Gallery */}
                        {project.caseStudy.images && project.caseStudy.images.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-400 block">
                              Hardware & Dataset Telemetry Verification
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {project.caseStudy.images.slice(0, 4).map((imgUrl, idx) => (
                                <div
                                  key={idx}
                                  className="group relative aspect-[4/3] bg-stone-100 rounded border border-stone-200/80 overflow-hidden"
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`${project.title} telemetry ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Documentation / Paper Links */}
                        {project.caseStudy.reportUrl && (
                          <div className="pt-1 flex items-center gap-3">
                            <a
                              href={project.caseStudy.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
                            >
                              <FileText size={13} className="text-stone-500" />
                              <span>{project.caseStudy.reportLabel || 'Read Complete Technical Report (PDF)'}</span>
                              <ArrowUpRight size={12} className="text-stone-400" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Technology Stack Pills */}
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mr-1">
                        STACK:
                      </span>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white border border-stone-200 rounded text-[11px] font-mono px-2.5 py-0.5 text-stone-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
