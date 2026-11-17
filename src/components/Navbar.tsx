import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  name: string;
  status: string;
}

export const Navbar: React.FC<NavbarProps> = ({ name, status }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Systems', href: '#systems' },
    { label: 'Ethos', href: '#ethos' },
    { label: 'Career', href: '#career' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Transmission', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-900"
          aria-label="Denis Wahyu Rizqullah — Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-stone-900 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm tracking-tight text-stone-950">
            {name}
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[11px] font-mono border border-stone-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {status}
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden sm:flex items-center gap-7 text-xs font-mono tracking-wider uppercase text-stone-500">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-stone-950 transition-colors duration-150 py-1 underline-offset-4 hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-1.5 text-stone-700 hover:text-stone-950 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-stone-200/80 bg-[#FAFAF9] px-6 py-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-stone-600">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-1 hover:text-stone-950 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
