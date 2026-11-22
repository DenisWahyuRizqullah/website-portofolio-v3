import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal, Cpu, Compass, Briefcase, Code2, Send, LucideIcon } from 'lucide-react';

interface DockSection {
  id: string;
  index: string;
  title: string;
  icon: LucideIcon;
}

const DOCK_SECTIONS: DockSection[] = [
  { id: 'intro', index: '01', title: 'Intro', icon: Terminal },
  { id: 'systems', index: '02', title: 'Systems', icon: Cpu },
  { id: 'career', index: '03', title: 'Career', icon: Briefcase },
  { id: 'capabilities', index: '04', title: 'Capabilities', icon: Code2 },
  { id: 'ethos', index: '05', title: 'Ethos', icon: Compass },
  { id: 'contact', index: '06', title: 'Transmission', icon: Send },
];

export const FloatingMicroDock: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeIdxRef = useRef<number>(0);
  const isProgrammaticScroll = useRef(false);
  const unlockTimeout = useRef<number | null>(null);

  // Keep activeIdxRef synchronized with state
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // Native smooth scroll with reduced motion support and intermediate lock
  const scrollToSection = useCallback((idx: number, id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Immediately slide active pill to clicked icon
    activeIdxRef.current = idx;
    setActiveIdx(idx);

    // Lock scroll-spy temporarily so passing intermediate sections does not flicker
    isProgrammaticScroll.current = true;
    if (unlockTimeout.current !== null) {
      window.clearTimeout(unlockTimeout.current);
    }

    const unlock = () => {
      isProgrammaticScroll.current = false;
    };

    unlockTimeout.current = window.setTimeout(unlock, 700);
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', unlock, { once: true });
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  // 60fps Scroll-Spy Detection inside requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const checkActiveSection = () => {
      if (isProgrammaticScroll.current) {
        ticking = false;
        return;
      }

      const triggerY = window.innerHeight * 0.45;
      let currentIdx = 0;

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

      if (isAtBottom) {
        currentIdx = DOCK_SECTIONS.length - 1;
      } else {
        for (let i = 0; i < DOCK_SECTIONS.length; i++) {
          const el = document.getElementById(DOCK_SECTIONS[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerY) {
              currentIdx = i;
            }
          }
        }
      }

      // Update active state when crossing threshold
      if (currentIdx !== activeIdxRef.current) {
        activeIdxRef.current = currentIdx;
        setActiveIdx(currentIdx);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkActiveSection);
        ticking = true;
      }
    };

    // User interrupt immediately releases programmatic lock
    const handleUserInterrupt = () => {
      if (isProgrammaticScroll.current) {
        if (unlockTimeout.current !== null) {
          window.clearTimeout(unlockTimeout.current);
          unlockTimeout.current = null;
        }
        isProgrammaticScroll.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });

    // Initial check on mount
    checkActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
      if (unlockTimeout.current !== null) {
        window.clearTimeout(unlockTimeout.current);
      }
    };
  }, []);

  // Compute active pill scale during hover proximity magnification
  let activeScale = 1;
  if (hoveredIdx !== null) {
    const dist = Math.abs(activeIdx - hoveredIdx);
    activeScale = dist === 0 ? 1.22 : dist === 1 ? 1.08 : 1;
  }

  return (
    <nav
      aria-label="Section Navigation"
      className="fixed z-50
        /* Desktop (>= 1280px): Left-side vertical capsule */
        xl:left-6 xl:top-1/2 xl:-translate-y-1/2 xl:flex-col
        /* Mobile, Tablet & Small Laptop (< 1280px): Bottom-centered horizontal capsule */
        bottom-4 left-1/2 -translate-x-1/2 xl:bottom-auto xl:translate-x-0
        flex flex-row items-center gap-2 p-1.5 rounded-full
        bg-white/75 dark:bg-[#121216]/75 backdrop-blur-md
        border border-stone-200/80 dark:border-stone-800/90
        shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]"
      style={{
        '--dock-active-idx': activeIdx,
        '--dock-active-scale': activeScale,
      } as React.CSSProperties}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {/* Shared Sliding Active Pill Indicator */}
      <div
        aria-hidden="true"
        className="dock-active-pill bg-stone-900 dark:bg-stone-100 shadow-sm"
      />

      {/* Navigation Nodes */}
      {DOCK_SECTIONS.map((sec, idx) => {
        const IconComponent = sec.icon;
        const isActive = activeIdx === idx;

        // macOS Dock Proximity magnification: i = 1.22, i ± 1 = 1.08, rest = 1
        let scale = 1;
        if (hoveredIdx !== null) {
          const dist = Math.abs(idx - hoveredIdx);
          scale = dist === 0 ? 1.22 : dist === 1 ? 1.08 : 1;
        }

        const isHovered = hoveredIdx === idx;

        return (
          <button
            key={sec.id}
            type="button"
            data-target={sec.id}
            aria-label={`Jump to ${sec.title}`}
            aria-current={isActive ? 'true' : 'false'}
            onClick={() => scrollToSection(idx, sec.id)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onFocus={() => setHoveredIdx(idx)}
            onBlur={() => setHoveredIdx(null)}
            style={{ '--dock-scale': scale } as React.CSSProperties}
            className={`dock-item group relative z-10 w-9 h-9 rounded-full flex items-center justify-center p-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 ${
              isActive
                ? 'text-white dark:text-stone-950 bg-transparent'
                : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
            }`}
          >
            {/* Crisp 16px Vector Icon */}
            <IconComponent size={16} strokeWidth={1.75} className="relative z-10 shrink-0" />

            {/* Floating Monospace Pill Tooltip (Desktop only) */}
            <span
              className={`dock-tooltip hidden xl:block absolute pointer-events-none whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-md border border-stone-800/20 dark:border-stone-200/20 z-30
                left-[calc(100%+14px)] top-1/2 -translate-y-1/2
                ${
                  isHovered
                    ? 'opacity-100 translate-x-0 scale-100'
                    : 'opacity-0 -translate-x-2 scale-[0.94]'
                }`}
            >
              {sec.index} · {sec.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
