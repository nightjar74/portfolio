import { useState, useCallback, useRef, useEffect } from "react";

interface UseVideoCarouselReturn {
  activeIndex: number | null;
  openModal: (index: number) => void;
  closeModal: () => void;
}

export function useVideoCarousel(): UseVideoCarouselReturn {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setActiveIndex(null);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return {
    activeIndex,
    openModal,
    closeModal,
  };
}
