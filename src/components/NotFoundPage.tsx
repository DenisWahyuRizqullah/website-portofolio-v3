import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32 max-w-xl mx-auto w-full animate-fadeIn">
      {/* Main 404 Numerals */}
      <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter text-stone-950 dark:text-stone-100 font-mono mb-4 select-none">
        404
      </h1>

      {/* Editorial Headline */}
      <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100 mb-3">
        Page not found
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-8 leading-relaxed">
        The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Action Control */}
      <a
        href="/"
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-mono text-xs font-medium uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
        <ArrowLeft size={14} />
        Return to Home
      </a>
    </section>
  );
};
