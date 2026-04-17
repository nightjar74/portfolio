import { useRef, useCallback, useEffect } from "react";

interface UseVideoCardOptions {
  hoverDelayMs?: number;
}

interface UseVideoCardReturn {
  previewRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useVideoCard({
  hoverDelayMs = 120,
}: UseVideoCardOptions = {}): UseVideoCardReturn {
  const previewRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const srcLoadedRef = useRef(false);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearHoverTimer();

    hoverTimerRef.current = setTimeout(() => {
      const video = previewRef.current;
      if (!video) return;

      // Load src lazily — only once per mount to avoid re-buffering
      if (!srcLoadedRef.current) {
        const src = video.dataset.src;
        if (src) {
          video.src = src;
          srcLoadedRef.current = true;
        }
      }

      video.play().catch(() => {
        // Autoplay blocked – silently ignore
      });
    }, hoverDelayMs);
  }, [clearHoverTimer, hoverDelayMs]);

  const handleMouseLeave = useCallback(() => {
    clearHoverTimer();

    const video = previewRef.current;
    if (!video) return;

    video.pause();
    // Reset to start so re-hover always begins from the beginning
    video.currentTime = 0;
  }, [clearHoverTimer]);

  useEffect(() => {
    return () => {
      clearHoverTimer();
      const video = previewRef.current;
      if (video) {
        video.pause();
        video.src = "";
        video.load();
      }
    };
  }, [clearHoverTimer]);

  return { previewRef, containerRef, handleMouseEnter, handleMouseLeave };
}
