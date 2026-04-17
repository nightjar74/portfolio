"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useVideoPlayer } from "../../../hooks/useVideoPlayer";
import type { VideoItem } from "../../../types/videoTypes";
import styles from "./videoModal.module.css";

interface VideoModalProps {
  item: VideoItem;
  onClose: () => void;
}

export function VideoModal({ item, onClose }: VideoModalProps) {
  const { playerRef } = useVideoPlayer({ autoPlay: true });
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${item.title}`}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.metaLabel}>{item.label}</span>
            <h2 className={styles.metaTitle}>{item.title}</h2>
          </div>

          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close video"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              width={20}
              height={20}
            >
              <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Player */}
        <div className={styles.playerWrapper}>
          <video
            ref={playerRef}
            src={item.videoUrl}
            className={styles.player}
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
