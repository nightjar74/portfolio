"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/resources";

type LightboxState = "closed" | "opening" | "open" | "closing";

export interface UseLightboxReturn {
  activeIndex: number | null;
  lightboxState: LightboxState;
  currentImage: (typeof gallery.images)[number] | null;
  isVisible: boolean;
  isOpen: boolean;
  isClosing: boolean;
  open: (index: number, rect: DOMRect) => void;
  close: () => void;
  prev: () => void;
  next: () => void;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

export function useLightbox(): UseLightboxReturn {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxState, setLightboxState] = useState<LightboxState>("closed");
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closingIndexRef = useRef<number | null>(null);

  const open = useCallback((index: number, rect: DOMRect) => {
    setOriginRect(rect);
    setActiveIndex(index);
    setLightboxState("opening");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLightboxState("open"));
    });
  }, []);

  const close = useCallback(() => {
    closingIndexRef.current = activeIndex;
    setLightboxState("closing");
    const timer = setTimeout(() => {
      setLightboxState("closed");
      setActiveIndex(null);
      setOriginRect(null);
      closingIndexRef.current = null;
    }, 420);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i !== null ? (i - 1 + gallery.images.length) % gallery.images.length : 0,
    );
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i !== null ? (i + 1) % gallery.images.length : 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxState === "closed") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxState, close, prev, next]);

  // Body scroll lock — compensate for scrollbar width to prevent layout jump without this the page content overflows
  useEffect(() => {
    if (lightboxState !== "closed") {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [lightboxState]);

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 50) {
        delta < 0 ? next() : prev();
      }
      touchStartX.current = null;
    },
  };

  return {
    activeIndex,
    lightboxState,
    currentImage: activeIndex !== null ? gallery.images[activeIndex] : null,
    isVisible: lightboxState !== "closed",
    isOpen: lightboxState === "open",
    isClosing: lightboxState === "closing",
    open,
    close,
    prev,
    next,
    touchHandlers,
  };
}
