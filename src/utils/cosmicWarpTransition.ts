import type { CosmicWarpOptions, ThemeMode } from '../types';
import { hasViewTransition } from '../types';

// ============================================================================
// 1. Exact Newton-Raphson Cubic-Bezier Solver for cubic-bezier(0.68, 0, 0.18, 1)
// ============================================================================

export function createCubicBezierSolver(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): (x: number) => number {
  const ax = 1 - 3 * x2 + 3 * x1;
  const bx = 3 * x2 - 6 * x1;
  const cx = 3 * x1;

  const ay = 1 - 3 * y2 + 3 * y1;
  const by = 3 * y2 - 6 * y1;
  const cy = 3 * y1;

  function sampleCurveX(t: number): number {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t: number): number {
    return ((ay * t + by) * t + cy) * t;
  }

  function sampleCurveDerivativeX(t: number): number {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function solveCurveX(x: number): number {
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    // Newton-Raphson iteration (typically converges within 4-5 iterations)
    let t = x;
    for (let i = 0; i < 8; i++) {
      const currentX = sampleCurveX(t) - x;
      if (Math.abs(currentX) < 1e-7) return t;
      const dX = sampleCurveDerivativeX(t);
      if (Math.abs(dX) < 1e-6) break;
      t -= currentX / dX;
    }

    // Binary bisection fallback for plateau or zero-slope conditions
    let t0 = 0;
    let t1 = 1;
    t = x;
    for (let i = 0; i < 12; i++) {
      const currentX = sampleCurveX(t);
      if (Math.abs(currentX - x) < 1e-7) return t;
      if (x > currentX) {
        t0 = t;
      } else {
        t1 = t;
      }
      t = (t1 - t0) * 0.5 + t0;
    }
    return t;
  }

  return function ease(x: number): number {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return sampleCurveY(solveCurveX(x));
  };
}

// Pre-instantiated exact solver matching WAAPI cubic-bezier(0.68, 0, 0.18, 1)
export const cosmicEase = createCubicBezierSolver(0.68, 0, 0.18, 1);

// ============================================================================
// 2. Dual Theme-Tuned Color Palettes
// ============================================================================

export interface WarpColorPalette {
  compositeOp: GlobalCompositeOperation;
  core: string;
  primaryGlow: string;
  secondaryGlow: string;
  rim: string;
  particleColors: string[];
}

export const DARK_WARP_PALETTE: WarpColorPalette = {
  compositeOp: 'lighter',
  core: '#ffffff',
  primaryGlow: '#38bdf8', // electric cyan
  secondaryGlow: '#8b5cf6', // cosmic violet
  rim: '#6366f1', // deep indigo
  particleColors: ['#ffffff', '#38bdf8', '#8b5cf6', '#6366f1'],
};

export const LIGHT_WARP_PALETTE: WarpColorPalette = {
  compositeOp: 'source-over',
  core: '#ffffff',
  primaryGlow: '#f59e0b', // radiant amber-gold
  secondaryGlow: 'rgba(59, 130, 246, 0.7)', // deep cobalt/indigo
  rim: 'rgba(37, 99, 235, 0.4)', // deep cobalt
  particleColors: ['#ffffff', '#f59e0b', '#3b82f6', '#4f46e5'],
};

// ============================================================================
// 3. Particle Simulation Structures
// ============================================================================

interface MicroParticle {
  angle: number;
  initialDistance: number;
  speed: number;
  radius: number;
  color: string;
  swirlDirection: number;
}

interface StarStreak {
  angle: number;
  speed: number;
  length: number;
  width: number;
  color: string;
}

function createMicroParticles(palette: WarpColorPalette, maxD: number): MicroParticle[] {
  const particles: MicroParticle[] = [];
  for (let i = 0; i < 56; i++) {
    const angle = (i / 56) * Math.PI * 2 + Math.sin(i * 12.9898) * 0.5;
    const initialDistance = 50 + ((Math.sin(i * 78.233) + 1) * 0.5) * (maxD * 0.4);
    const speed = 0.8 + ((Math.sin(i * 45.164) + 1) * 0.5) * 0.5;
    const radius = 1.0 + ((Math.sin(i * 91.314) + 1) * 0.5) * 1.8;
    const color = palette.particleColors[i % palette.particleColors.length];
    const swirlDirection = i % 2 === 0 ? 1 : -1;
    particles.push({ angle, initialDistance, speed, radius, color, swirlDirection });
  }
  return particles;
}

function createStarStreaks(palette: WarpColorPalette): StarStreak[] {
  const streaks: StarStreak[] = [];
  for (let i = 0; i < 165; i++) {
    const angle = (i / 165) * Math.PI * 2 + Math.sin(i * 37.119) * 0.04;
    const speed = 0.75 + ((Math.sin(i * 53.821) + 1) * 0.5) * 0.65;
    const length = 24 + ((Math.sin(i * 19.456) + 1) * 0.5) * 64;
    const width = 1.0 + ((Math.sin(i * 82.637) + 1) * 0.5) * 1.4;
    const color = palette.particleColors[i % palette.particleColors.length];
    streaks.push({ angle, speed, length, width, color });
  }
  return streaks;
}

// ============================================================================
// 4. Canvas Lifecycle & GPU-Accelerated Choreography
// ============================================================================

let cachedCanvas: HTMLCanvasElement | null = null;
let isTransitioningInternal = false;

function getOrCreateCanvas(): HTMLCanvasElement {
  if (cachedCanvas && document.body.contains(cachedCanvas)) {
    return cachedCanvas;
  }
  let canvas = document.getElementById('cosmic-warp-canvas') as HTMLCanvasElement | null;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cosmic-warp-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
  }
  cachedCanvas = canvas;
  return canvas;
}

function runCanvasChoreography(
  canvas: HTMLCanvasElement,
  originX: number,
  originY: number,
  maxRadius: number,
  nextTheme: ThemeMode,
  onPeakSingularity?: () => void
): Promise<void> {
  return new Promise((resolve) => {
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) {
      if (onPeakSingularity) onPeakSingularity();
      resolve();
      return;
    }
    const context: CanvasRenderingContext2D = rawCtx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.opacity = '1';

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);

    const palette = nextTheme === 'dark' ? DARK_WARP_PALETTE : LIGHT_WARP_PALETTE;
    const maxD = Math.max(width, height);
    const microParticles = createMicroParticles(palette, maxD);
    const starStreaks = createStarStreaks(palette);

    const TOTAL_DURATION = 1050;
    const PHASE1_END = 210;
    const PHASE2_END = 860;
    let startTime: number | null = null;
    let peakTriggered = false;

    function frame(now: number) {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const clampedElapsed = Math.min(elapsed, TOTAL_DURATION);

      // Trigger peak callback at 210ms (used by non-supporting browser fallback)
      if (clampedElapsed >= PHASE1_END && !peakTriggered) {
        peakTriggered = true;
        if (onPeakSingularity) {
          onPeakSingularity();
        }
      }

      // Guaranteed 100% transparency: clear entire canvas before every single frame
      context.clearRect(0, 0, width, height);

      // Dissipation opacity in Phase 3 (860ms - 1050ms)
      let globalOpacity = 1.0;
      if (clampedElapsed >= PHASE2_END) {
        globalOpacity = Math.max(0, 1.0 - (clampedElapsed - PHASE2_END) / (TOTAL_DURATION - PHASE2_END));
      }
      context.globalAlpha = globalOpacity;
      context.globalCompositeOperation = palette.compositeOp;

      if (clampedElapsed <= PHASE1_END) {
        // ====================================================================
        // Phase 1: Gravitational Implosion (0 - 210ms)
        // ====================================================================
        const u1 = clampedElapsed / PHASE1_END;

        // Draw 56 inward-pulling micro-particles
        for (let i = 0; i < microParticles.length; i++) {
          const p = microParticles[i];
          const dist = p.initialDistance * Math.max(0, 1.0 - Math.pow(u1, 2) * p.speed);
          const swirl = p.angle + Math.pow(u1, 1.5) * 1.2 * p.swirlDirection;
          const px = originX + dist * Math.cos(swirl);
          const py = originY + dist * Math.sin(swirl);

          context.fillStyle = p.color;
          context.beginPath();
          context.arc(px, py, p.radius, 0, Math.PI * 2);
          context.fill();

          // Motion vector trail
          if (dist > 8) {
            const prevDist = p.initialDistance * Math.max(0, 1.0 - Math.pow(Math.max(0, u1 - 0.05), 2) * p.speed);
            const prevSwirl = p.angle + Math.pow(Math.max(0, u1 - 0.05), 1.5) * 1.2 * p.swirlDirection;
            const ppx = originX + prevDist * Math.cos(prevSwirl);
            const ppy = originY + prevDist * Math.sin(prevSwirl);
            context.strokeStyle = p.color;
            context.lineWidth = p.radius * 0.8;
            context.beginPath();
            context.moveTo(ppx, ppy);
            context.lineTo(px, py);
            context.stroke();
          }
        }

        // Singularity Core Ignition
        const coreR = Math.max(0.5, 12 * Math.pow(u1, 2.5));
        const grad = context.createRadialGradient(originX, originY, 0, originX, originY, coreR * 2.5);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, palette.primaryGlow);
        grad.addColorStop(0.8, palette.secondaryGlow);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        context.fillStyle = grad;
        context.beginPath();
        context.arc(originX, originY, coreR * 2.5, 0, Math.PI * 2);
        context.fill();
      } else {
        // ====================================================================
        // Phase 2 & 3: Event Horizon Burst (210 - 1050ms)
        // ====================================================================
        const u2 = Math.min(1.0, (clampedElapsed - PHASE1_END) / (PHASE2_END - PHASE1_END));
        const eased2 = cosmicEase(u2);
        const burstR = maxRadius * eased2;

        if (burstR > 0) {
          // 1. Outer Bloom Ring
          const bloomWidth = Math.max(6, 26 * (1.0 - eased2 * 0.6));
          context.beginPath();
          context.arc(originX, originY, burstR, 0, Math.PI * 2);
          context.lineWidth = bloomWidth;
          context.strokeStyle = palette.secondaryGlow;
          context.stroke();

          // 2. Chromatic Inner Rim
          const rimWidth = Math.max(2, 6 * (1.0 - eased2 * 0.5));
          context.beginPath();
          context.arc(originX, originY, Math.max(0, burstR - 2), 0, Math.PI * 2);
          context.lineWidth = rimWidth;
          context.strokeStyle = palette.primaryGlow;
          context.stroke();

          // 3. Razor White Core (1.8px crisp white)
          context.beginPath();
          context.arc(originX, originY, burstR, 0, Math.PI * 2);
          context.lineWidth = 1.8;
          context.strokeStyle = '#ffffff';
          context.stroke();
        }

        // Hyperspace Radial Star-Streaks (165 streaks)
        for (let i = 0; i < starStreaks.length; i++) {
          const s = starStreaks[i];
          const rHead = maxRadius * eased2 * s.speed;
          const rTail = Math.max(0, rHead - s.length * (0.4 + 0.6 * eased2));

          const hx = originX + rHead * Math.cos(s.angle);
          const hy = originY + rHead * Math.sin(s.angle);
          const tx = originX + rTail * Math.cos(s.angle);
          const ty = originY + rTail * Math.sin(s.angle);

          const streakGrad = context.createLinearGradient(tx, ty, hx, hy);
          streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          streakGrad.addColorStop(0.65, s.color);
          streakGrad.addColorStop(1, '#ffffff');

          context.beginPath();
          context.moveTo(tx, ty);
          context.lineTo(hx, hy);
          context.lineWidth = s.width;
          context.strokeStyle = streakGrad;
          context.stroke();
        }
      }

      if (elapsed < TOTAL_DURATION) {
        requestAnimationFrame(frame);
      } else {
        context.clearRect(0, 0, width, height);
        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}

// ============================================================================
// 5. Main Orchestration Function: cosmicWarpTransition
// ============================================================================

export async function cosmicWarpTransition(options: CosmicWarpOptions): Promise<void> {
  const { event, originElement, nextTheme, applyTheme } = options;

  // Accessibility Check: Prefers-Reduced-Motion immediately applies theme without animation
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    await applyTheme();
    return;
  }

  // Concurrency Guard: Lock out re-entrant clicks while in motion
  if (isTransitioningInternal) {
    return;
  }
  isTransitioningInternal = true;

  // 3-Tier Origin Coordinate Resolution
  let originX = window.innerWidth / 2;
  let originY = window.innerHeight / 2;

  if (event && 'clientX' in event && typeof event.clientX === 'number' && (event.clientX !== 0 || event.clientY !== 0)) {
    originX = event.clientX;
    originY = event.clientY;
  } else if (originElement) {
    const rect = originElement.getBoundingClientRect();
    originX = rect.left + rect.width / 2;
    originY = rect.top + rect.height / 2;
  }

  const maxRadius =
    Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    ) * 1.04;

  const canvas = getOrCreateCanvas();
  canvas.classList.add('is-active');

  // Freeze CSS transitions instantaneously so DOM snapshots capture final tokens (0s)
  document.documentElement.classList.add('theme-warp-freeze');

  try {
    if (hasViewTransition(document)) {
      // ----------------------------------------------------------------------
      // Modern Path: View Transitions API + WAAPI clip-path
      // ----------------------------------------------------------------------
      const transition = document.startViewTransition(async () => {
        await applyTheme();
      });

      // Wait until browser takes DOM snapshot of new state
      await transition.ready;

      // Remove freeze class once snapshot is captured so normal UI interactions resume
      document.documentElement.classList.remove('theme-warp-freeze');

      // WAAPI clip-path animation on ::view-transition-new(root)
      const waapiAnim = document.documentElement.animate(
        [
          {
            clipPath: `circle(0px at ${originX}px ${originY}px)`,
            offset: 0,
            easing: 'linear',
          },
          {
            clipPath: `circle(0px at ${originX}px ${originY}px)`,
            offset: 0.20,
            easing: 'cubic-bezier(0.68, 0, 0.18, 1)',
          },
          {
            clipPath: `circle(${maxRadius}px at ${originX}px ${originY}px)`,
            offset: 0.82,
            easing: 'linear',
          },
          {
            clipPath: `circle(${maxRadius}px at ${originX}px ${originY}px)`,
            offset: 1.0,
          },
        ],
        {
          duration: 1050,
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)',
        }
      );

      // Run canvas choreography frame-locked alongside the WAAPI expansion
      await Promise.all([
        runCanvasChoreography(canvas, originX, originY, maxRadius, nextTheme),
        transition.finished.catch(() => {}),
        waapiAnim.finished.catch(() => {}),
      ]);
    } else {
      // ----------------------------------------------------------------------
      // Fallback Path: Non-ViewTransition Browsers (Firefox / older WebKit)
      // ----------------------------------------------------------------------
      await runCanvasChoreography(canvas, originX, originY, maxRadius, nextTheme, () => {
        // Toggle theme at the 210ms peak singularity flash
        applyTheme();
        document.documentElement.classList.remove('theme-warp-freeze');
      });
    }
  } finally {
    // Guaranteed cleanup under all execution paths
    document.documentElement.classList.remove('theme-warp-freeze');
    canvas.classList.remove('is-active');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    isTransitioningInternal = false;
  }
}
