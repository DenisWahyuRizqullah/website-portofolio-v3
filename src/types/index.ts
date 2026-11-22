import type React from 'react';

// Re-export all portfolio data contracts
export * from './portfolio';

/**
 * Valid theme modes supported by the Nordic design system.
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Backward compatibility alias for legacy references.
 */
export type Theme = ThemeMode;

/**
 * W3C ViewTransition interface definition.
 * Strictly aligned with W3C Specification and TypeScript DOM typings.
 */
export interface ViewTransitionLike {
  readonly ready: Promise<undefined>;
  readonly finished: Promise<undefined>;
  readonly updateCallbackDone: Promise<undefined>;
  skipTransition(): void;
}

/**
 * Extended Document interface declaring the W3C View Transitions API.
 */
export interface DocumentWithViewTransition extends Document {
  startViewTransition(
    updateCallback?: () => Promise<void> | void
  ): ViewTransitionLike;
}

/**
 * Type-safe user-defined type guard to narrow Document for View Transitions support.
 * Guaranteed zero 'any' casts.
 */
export function hasViewTransition(
  doc: Document = document
): doc is DocumentWithViewTransition {
  return (
    'startViewTransition' in doc &&
    typeof (doc as unknown as { startViewTransition?: unknown }).startViewTransition === 'function'
  );
}

/**
 * Options contract passed into the cosmicWarpTransition coordinator.
 */
export interface CosmicWarpOptions {
  /**
   * DOM or React MouseEvent triggering the theme change.
   */
  event?: MouseEvent | React.MouseEvent<HTMLElement> | null;

  /**
   * Originating DOM element serving as the geometric singularity epicenter.
   */
  originElement?: HTMLElement | null;

  /**
   * Destination theme mode.
   */
  nextTheme: ThemeMode;

  /**
   * Synchronous state and DOM application callback invoked within flushSync.
   */
  applyTheme: () => void | Promise<void>;
}

/**
 * Contract returned by the synchronized useTheme hook.
 */
export interface UseThemeReturn {
  theme: ThemeMode;
  isTransitioning: boolean;
  toggleTheme: (
    targetTheme?: ThemeMode,
    options?: {
      event?: MouseEvent | React.MouseEvent<HTMLElement> | null;
      originElement?: HTMLElement | null;
    }
  ) => Promise<void>;
  setTheme: (
    newTheme: ThemeMode,
    options?: {
      event?: MouseEvent | React.MouseEvent<HTMLElement> | null;
      originElement?: HTMLElement | null;
    }
  ) => Promise<void>;
}
