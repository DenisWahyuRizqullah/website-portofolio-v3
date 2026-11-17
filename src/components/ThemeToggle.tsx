import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className="inline-flex items-center p-0.5 rounded-full border border-stone-200/80 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/70 shrink-0"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        aria-label="Switch to light theme"
        title="Light theme"
        onClick={() => setTheme('light')}
        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors ${
          theme === 'light'
            ? 'bg-white text-stone-950 shadow-xs border-stone-200/70'
            : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
        }`}
      >
        <Sun size={13} strokeWidth={1.75} />
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        aria-label="Switch to dark theme"
        title="Dark theme"
        onClick={() => setTheme('dark')}
        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors ${
          theme === 'dark'
            ? 'bg-stone-800 text-stone-100 shadow-xs border-stone-700/70'
            : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
        }`}
      >
        <Moon size={13} strokeWidth={1.75} />
      </button>
    </div>
  );
};
