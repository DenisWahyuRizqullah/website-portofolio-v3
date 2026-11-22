import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800 pt-8 pb-12 mt-12 text-stone-500 dark:text-stone-400 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Author & Education credentials */}
        <div>
          <span className="text-stone-900 dark:text-stone-100 font-semibold tracking-tight">
            Denis Wahyu Rizqullah
          </span>
          <span className="mx-2 text-stone-300 dark:text-stone-700 hidden sm:inline" aria-hidden="true">/</span>
          <span className="block sm:inline text-[11px] text-stone-500 dark:text-stone-400">
            B.Eng. Computer Engineering — Universitas Brawijaya
          </span>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 transition-colors w-fit group cursor-pointer"
          aria-label="Back to top of page"
        >
          <span className="text-[11px] uppercase tracking-widest">TOP</span>
          <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-stone-200/40 dark:border-stone-800/60 text-[10px] text-stone-400 dark:text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>© 2026. All rights reserved.</span>
        <span>Malang, East Java, Indonesia</span>
      </div>
    </footer>
  );
};
