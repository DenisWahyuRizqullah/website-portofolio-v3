import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { KineticSlideOverProps } from '../types';

const MIN_ZOOM = 75;
const MAX_ZOOM = 200;
const ZOOM_STEP = 25;
const CLOSE_DURATION_MS = 280;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const KineticSlideOverViewer: React.FC<KineticSlideOverProps> = ({
  isOpen,
  items,
  activeIndex,
  onClose,
  onSelectIndex,
}) => {
  const titleId = useId();
  const [shouldRender, setShouldRender] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [stageSize, setStageSize] = useState<{ w: number; h: number } | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  const safeIndex =
    items.length > 0 ? Math.min(Math.max(0, activeIndex), items.length - 1) : 0;
  const activeItem = items[safeIndex];

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
  }, []);

  const handleToggleQuickZoom = useCallback(() => {
    setZoom((z) => (z === 100 ? 150 : 100));
  }, []);

  // Manage mount/unmount lifecycle so enter & exit transitions complete cleanly
  useEffect(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (raf1Ref.current !== null) {
      window.cancelAnimationFrame(raf1Ref.current);
      raf1Ref.current = null;
    }
    if (raf2Ref.current !== null) {
      window.cancelAnimationFrame(raf2Ref.current);
      raf2Ref.current = null;
    }

    if (isOpen && items.length > 0) {
      setShouldRender(true);
      if (prefersReducedMotion()) {
        setIsEntered(true);
      } else {
        raf1Ref.current = window.requestAnimationFrame(() => {
          raf2Ref.current = window.requestAnimationFrame(() => {
            setIsEntered(true);
          });
        });
      }
    } else {
      setIsEntered(false);
      if (prefersReducedMotion()) {
        setShouldRender(false);
      } else {
        closeTimerRef.current = window.setTimeout(() => {
          setShouldRender(false);
        }, CLOSE_DURATION_MS);
      }
    }

    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
      if (raf1Ref.current !== null) window.cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current !== null) window.cancelAnimationFrame(raf2Ref.current);
    };
  }, [isOpen, items.length]);

  // Reset zoom when opening or switching items
  useEffect(() => {
    if (isOpen) {
      setZoom(100);
    }
  }, [isOpen, activeItem?.id]);

  // Reset natural image dimensions only when the active asset changes
  useEffect(() => {
    setNaturalSize(null);
  }, [activeItem?.id]);

  // Measure image stage bounds so zoomed images remain cleanly scrollable on all edges
  useEffect(() => {
    const el = imageStageRef.current;
    if (!shouldRender || !el || activeItem?.type !== 'image') return;

    const update = () => {
      const style = window.getComputedStyle(el);
      const padX =
        (parseFloat(style.paddingLeft) || 0) +
        (parseFloat(style.paddingRight) || 0);
      const padY =
        (parseFloat(style.paddingTop) || 0) +
        (parseFloat(style.paddingBottom) || 0);
      setStageSize({
        w: Math.max(0, el.clientWidth - padX),
        h: Math.max(0, el.clientHeight - padY),
      });
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender, activeItem?.type, activeItem?.id]);

  // Lock body scroll during full render lifecycle without horizontal layout shift
  useEffect(() => {
    if (!shouldRender) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const widthBefore = document.body.getBoundingClientRect().width;

    document.body.style.overflow = 'hidden';

    const scrollbarDelta = document.body.getBoundingClientRect().width - widthBefore;
    if (scrollbarDelta > 0) {
      const computedPad =
        parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${computedPad + scrollbarDelta}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [shouldRender]);

  // Capture/restore focus across open and close transitions
  useEffect(() => {
    if (isOpen && shouldRender && !wasOpenRef.current) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      wasOpenRef.current = true;
      window.requestAnimationFrame(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.focus({ preventScroll: true });
        } else {
          panelRef.current?.focus({ preventScroll: true });
        }
      });
    } else if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false;
      const prev = previousFocusRef.current;
      previousFocusRef.current = null;
      if (prev && prev.isConnected) {
        prev.focus({ preventScroll: true });
      }
    }
  }, [isOpen, shouldRender]);

  // Restore focus if unmounted while open
  useEffect(() => {
    return () => {
      const prev = previousFocusRef.current;
      if (wasOpenRef.current && prev && prev.isConnected) {
        prev.focus({ preventScroll: true });
      }
    };
  }, []);

  // Global keyboard shortcuts & focus trap while open
  useEffect(() => {
    if (!isOpen || !activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const isEditable =
        target !== null &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (isEditable) return;

      if (e.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);

        if (focusables.length === 0) {
          e.preventDefault();
          panelRef.current.focus();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const current = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (
            current === first ||
            current === panelRef.current ||
            !panelRef.current.contains(current)
          ) {
            e.preventDefault();
            last.focus();
          }
        } else if (current === last || !panelRef.current.contains(current)) {
          e.preventDefault();
          first.focus();
        }
        return;
      }

      if (activeItem.type === 'image' && items.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          onSelectIndex((safeIndex - 1 + items.length) % items.length);
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          onSelectIndex((safeIndex + 1) % items.length);
          return;
        }
      }

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    activeItem,
    items.length,
    safeIndex,
    onClose,
    onSelectIndex,
    handleZoomIn,
    handleZoomOut,
  ]);

  if (!shouldRender || !activeItem || typeof document === 'undefined') {
    return null;
  }

  const encodedSrc = encodeURI(activeItem.src);
  const isPdf = activeItem.type === 'pdf';
  const showZoneC = !isPdf;

  // Compute contained 100% image dimensions inside Zone B without upscaling
  let measuredBox: { w: number; h: number } | null = null;
  if (!isPdf && naturalSize && stageSize) {
    const availW = Math.max(120, stageSize.w);
    const availH = Math.max(120, stageSize.h);
    const fitRatio = Math.min(availW / naturalSize.w, availH / naturalSize.h, 1);
    measuredBox = {
      w: Math.max(1, Math.floor(naturalSize.w * fitRatio)),
      h: Math.max(1, Math.floor(naturalSize.h * fitRatio)),
    };
  }

  const scaleFactor = zoom / 100;

  return createPortal(
    <>
      {/* Overlay Scrim */}
      <div
        aria-hidden="true"
        data-entered={isEntered ? 'true' : 'false'}
        onClick={onClose}
        className={`kinetic-scrim fixed inset-0 z-[60] bg-[rgba(15,23,42,0.36)] dark:bg-[rgba(9,9,11,0.56)] backdrop-blur-[8px] ${
          isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Floating Inset Sheet */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-entered={isEntered ? 'true' : 'false'}
        style={{
          transform: isEntered
            ? 'translateX(0) scale(1)'
            : 'translateX(calc(100% + 24px)) scale(0.985)',
          opacity: isEntered ? 1 : 0,
        }}
        className="kinetic-sheet fixed z-[61] top-2 right-2 bottom-2 left-2 rounded-[16px] sm:top-4 sm:right-4 sm:bottom-4 sm:left-auto sm:w-[min(760px,calc(100vw-32px))] sm:rounded-[20px] bg-[var(--surface)] border border-[var(--hairline)] text-[var(--text-primary)] shadow-[0_12px_36px_-10px_rgba(15,23,42,0.16)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.55)] flex flex-col overflow-hidden outline-none"
      >
        {/* Zone A — Sticky Top Control Header */}
        <header className="shrink-0 px-4 py-2.5 sm:h-[60px] sm:px-5 sm:py-0 border-b border-[var(--hairline)] bg-[var(--surface)] flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-center gap-2.5 min-w-0 sm:flex-1">
            <span className="shrink-0 px-1.5 py-0.5 rounded border border-[var(--hairline)] bg-[var(--canvas)] font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
              {isPdf ? 'PDF' : 'IMG'}
            </span>
            <div className="min-w-0 flex-1">
              <h2
                id={titleId}
                className="text-xs sm:text-sm font-medium text-[var(--text-primary)] truncate"
              >
                {activeItem.title}
              </h2>
              <p className="text-[11px] font-mono text-[var(--text-secondary)] truncate">
                {activeItem.subtitle}
                {activeItem.metaTag ? ` · ${activeItem.metaTag}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
                title="Zoom out (-)"
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-md border border-[var(--hairline)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-stone-800/70 disabled:opacity-35 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
              >
                <ZoomOut size={15} aria-hidden="true" />
              </button>
              <span className="font-mono text-[11px] tabular-nums text-[var(--text-secondary)] w-10 text-center select-none">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
                title="Zoom in (+)"
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-md border border-[var(--hairline)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-stone-800/70 disabled:opacity-35 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
              >
                <ZoomIn size={15} aria-hidden="true" />
              </button>
            </div>

            {/* PDF Actions & Close */}
            <div className="flex items-center gap-2">
              {isPdf && (
                <>
                  <a
                    href={encodedSrc}
                    download={activeItem.downloadName || true}
                    aria-label={`Download ${activeItem.title} PDF`}
                    title="Download PDF"
                    className="w-9 h-9 sm:w-8 sm:h-8 rounded-md border border-[var(--hairline)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-stone-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
                  >
                    <Download size={15} aria-hidden="true" />
                  </a>
                  <a
                    href={encodedSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${activeItem.title} in new tab`}
                    title="Open raw PDF in new tab"
                    className="w-9 h-9 sm:w-8 sm:h-8 rounded-md border border-[var(--hairline)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-stone-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                </>
              )}

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close viewer"
                title="Close (Esc)"
                className="h-9 w-9 sm:h-8 sm:w-auto sm:px-2.5 rounded-md border border-[var(--hairline)] flex items-center justify-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-stone-800/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
              >
                <X size={15} aria-hidden="true" />
                <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] border border-[var(--hairline)] rounded px-1 py-0.5 leading-none">
                  ESC
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Zone B — Scrollable Interactive Stage */}
        <div className="flex-1 min-h-0 overflow-hidden bg-stone-100/70 dark:bg-[#0C0C0E]/70">
          <div
            key={activeItem.id}
            className="kinetic-stage-enter w-full h-full"
          >
            {isPdf ? (
              <div className="w-full h-full overflow-auto p-3 sm:p-5 flex flex-col gap-3">
                <div
                  style={{
                    width: zoom === 100 ? '100%' : `${zoom}%`,
                    height: zoom > 100 ? `${Math.round(74 * scaleFactor)}vh` : '100%',
                    minHeight: `${Math.round(480 * Math.max(scaleFactor, 1))}px`,
                  }}
                  className={`mx-auto shrink-0 bg-white dark:bg-[#18181B] border border-[var(--hairline)] rounded-lg overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.08)] dark:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.4)] ${
                    zoom <= 100 ? 'flex-1' : ''
                  }`}
                >
                  <iframe
                    title={activeItem.title}
                    src={`${encodedSrc}#toolbar=0&navpanes=0&view=FitH`}
                    className="w-full h-full border-0 block bg-white"
                  />
                </div>

                {/* Accessible Fallback Notice (e.g., mobile Safari / blocked inline PDFs) */}
                <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-md border border-[var(--hairline)] bg-[var(--surface)] text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>Inline PDF preview blocked or unavailable on your device?</span>
                  <div className="flex items-center gap-4">
                    <a
                      href={encodedSrc}
                      download={activeItem.downloadName || true}
                      className="underline underline-offset-4 text-[var(--text-primary)] hover:opacity-75 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 rounded-sm"
                    >
                      Download PDF
                    </a>
                    <a
                      href={encodedSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-[var(--text-primary)] hover:opacity-75 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 rounded-sm"
                    >
                      Open Raw Tab
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div
                ref={imageStageRef}
                className="w-full h-full overflow-auto flex p-4 sm:p-6"
              >
                <div
                  style={
                    measuredBox
                      ? {
                          width: `${Math.round(measuredBox.w * scaleFactor)}px`,
                          height: `${Math.round(measuredBox.h * scaleFactor)}px`,
                        }
                      : undefined
                  }
                  className={measuredBox ? 'relative shrink-0 m-auto' : 'm-auto'}
                >
                  <button
                    type="button"
                    onClick={handleToggleQuickZoom}
                    aria-label={
                      zoom === 100 ? 'Zoom image to 150%' : 'Reset image zoom to 100%'
                    }
                    className={`block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 ${
                      measuredBox ? 'w-full h-full' : ''
                    } ${zoom === 100 ? 'cursor-zoom-in' : 'cursor-zoom-out'}`}
                  >
                    <img
                      src={encodedSrc}
                      alt={`${activeItem.title} — ${activeItem.subtitle}`}
                      onLoad={(e) => {
                        const { naturalWidth, naturalHeight } = e.currentTarget;
                        if (naturalWidth > 0 && naturalHeight > 0) {
                          setNaturalSize({ w: naturalWidth, h: naturalHeight });
                        }
                      }}
                      style={
                        measuredBox
                          ? {
                              width: `${measuredBox.w}px`,
                              height: `${measuredBox.h}px`,
                              transform: `scale(${scaleFactor})`,
                              transformOrigin: 'top left',
                            }
                          : { transform: `scale(${scaleFactor})` }
                      }
                      className={`kinetic-zoom-img block object-contain rounded-md border border-[var(--hairline)] bg-[var(--surface)] select-none ${
                        measuredBox ? '' : 'max-w-full max-h-[calc(100vh-220px)]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zone C — Bottom Media Switcher Bar (Image Mode only) */}
        {showZoneC && (
          <footer className="h-[54px] shrink-0 px-3 sm:px-4 border-t border-[var(--hairline)] bg-[var(--surface)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                onSelectIndex((safeIndex - 1 + items.length) % items.length)
              }
              disabled={items.length <= 1}
              aria-label="Previous image"
              className="h-9 px-2.5 sm:px-3 rounded-md border border-[var(--hairline)] inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-stone-800/70 disabled:opacity-35 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
            >
              <ChevronLeft size={14} aria-hidden="true" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center gap-3 min-w-0 overflow-x-auto py-1">
              <span className="font-mono text-[11px] tabular-nums text-[var(--text-secondary)] shrink-0">
                {String(safeIndex + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </span>
              {items.length > 1 && (
                <div className="flex items-center gap-2" role="group" aria-label="Image switcher">
                  {items.map((item, idx) => {
                    const isActive = idx === safeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectIndex(idx)}
                        aria-label={`View image ${idx + 1} of ${items.length}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`h-7 min-w-[28px] px-2 rounded-full font-mono text-[11px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100 ${
                          isActive
                            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950'
                            : 'bg-stone-100 text-[var(--text-secondary)] dark:bg-stone-800/80 hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectIndex((safeIndex + 1) % items.length)}
              disabled={items.length <= 1}
              aria-label="Next image"
              className="h-9 px-2.5 sm:px-3 rounded-md border border-[var(--hairline)] inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-stone-800/70 disabled:opacity-35 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-stone-100"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </footer>
        )}
      </div>
    </>,
    document.body
  );
};
