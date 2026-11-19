import { useCallback, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import type { ThemeMode, UseThemeReturn } from '../types';
import { cosmicWarpTransition } from '../utils/cosmicWarpTransition';

export type Theme = ThemeMode;

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

// Module-level store for multi-instance synchronization (desktop & mobile toggles)
let currentTheme: ThemeMode = getInitialTheme();
let isTransitioningGlobal = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getThemeSnapshot(): ThemeMode {
  return currentTheme;
}

function getTransitionSnapshot(): boolean {
  return isTransitioningGlobal;
}

export function applyThemeDirectly(nextTheme: ThemeMode): void {
  currentTheme = nextTheme;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (_) {}
  }
  notify();
}

export function useTheme(): UseThemeReturn {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, (): ThemeMode => 'light');
  const isTransitioning = useSyncExternalStore(subscribe, getTransitionSnapshot, () => false);

  const setTheme = useCallback(
    async (
      newTheme: ThemeMode,
      options?: {
        event?: MouseEvent | React.MouseEvent<HTMLElement> | null;
        originElement?: HTMLElement | null;
      }
    ) => {
      if (newTheme === currentTheme || isTransitioningGlobal) {
        return;
      }

      // Respect reduced motion: immediate swap without animation
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        applyThemeDirectly(newTheme);
        return;
      }

      isTransitioningGlobal = true;
      notify();

      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('theme-warp-freeze');
      }

      try {
        await cosmicWarpTransition({
          event: options?.event,
          originElement: options?.originElement,
          nextTheme: newTheme,
          applyTheme: () => {
            flushSync(() => {
              applyThemeDirectly(newTheme);
            });
          },
        });
      } catch (err) {
        console.error('Cosmic Warp Transition encountered error, applying fallback:', err);
        applyThemeDirectly(newTheme);
      } finally {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('theme-warp-freeze');
          const canvas = document.getElementById('cosmic-warp-canvas');
          if (canvas) {
            canvas.classList.remove('is-active');
          }
        }
        isTransitioningGlobal = false;
        notify();
      }
    },
    []
  );

  const toggleTheme = useCallback(
    async (
      targetTheme?: ThemeMode,
      options?: {
        event?: MouseEvent | React.MouseEvent<HTMLElement> | null;
        originElement?: HTMLElement | null;
      }
    ) => {
      const next: ThemeMode = targetTheme ?? (currentTheme === 'light' ? 'dark' : 'light');
      await setTheme(next, options);
    },
    [setTheme]
  );

  return { theme, isTransitioning, toggleTheme, setTheme };
}
