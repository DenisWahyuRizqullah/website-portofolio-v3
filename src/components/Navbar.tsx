import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  name: string;
  isNotFound?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ name, isNotFound = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Projects', href: isNotFound ? '/#systems' : '#systems' },
    { label: 'Career', href: isNotFound ? '/#career' : '#career' },
    { label: 'Capabilities', href: isNotFound ? '/#capabilities' : '#capabilities' },
    { label: 'Ethos', href: isNotFound ? '/#ethos' : '#ethos' },
    { label: 'Contact', href: isNotFound ? '/#contact' : '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF9]/90 dark:bg-[#0C0C0E]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
          aria-label="Denis Wahyu Rizqullah — Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-stone-900 dark:bg-stone-100 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm tracking-tight text-stone-950 dark:text-stone-100">
            {name}
          </span>
        </a>

        {/* Right side navigation & theme switch */}
        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors py-1 underline-offset-4 hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <span className="h-4 w-px bg-stone-200 dark:bg-stone-800" />

          {/* Minimalist Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-stone-200/80 dark:border-stone-800 bg-[#FAFAF9] dark:bg-[#0C0C0E] px-6 py-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-1 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
