import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800 pt-8 pb-12 mt-12 text-stone-500 dark:text-stone-400 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="uppercase tracking-wider text-[11px] text-stone-600 dark:text-stone-400">
            SYSTEMS NOMINAL — MALANG, ID
          </span>
        </div>

        {/* Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors w-fit underline-offset-4 hover:underline"
        >
          <span>TOP</span>
          <ArrowUp size={12} />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-stone-200/40 dark:border-stone-800/60 text-[10px] text-stone-400 dark:text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>Denis Wahyu Rizqullah © 2026. All rights reserved.</span>
        <span>B.Eng. Computer Engineering — Universitas Brawijaya</span>
      </div>
    </footer>
  );
};
