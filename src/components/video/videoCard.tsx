"use client";

import Image from "next/image";
import { useVideoCard } from "../../hooks/useVideoCard";
import type { VideoItem } from "../../types/videoTypes";
import styles from "./videoCard.module.css";

interface VideoCardProps {
  item: VideoItem;
  onOpen: () => void;
}

export function VideoCard({ item, onOpen }: VideoCardProps) {
  const { previewRef, containerRef, handleMouseEnter, handleMouseLeave } =
    useVideoCard({ hoverDelayMs: 100 });

  return (
    <article className={styles.card}>
      {/* Section label */}
      {/* <span className={styles.label}>{item.label}</span> */}

      <div
        ref={containerRef}
        className={styles.media}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`Play ${item.title}`}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
      >
        <Image
          src={item.thumbnailUrl}
          alt={item.description ?? item.title}
          fill
          sizes="(max-width: 768px) 80vw, 25vw"
          className={styles.thumbnail}
          priority={false}
        />

        <video
          ref={previewRef}
          data-src={item.previewUrl}
          className={styles.preview}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />

        {/* Play icon overlay */}
        <div className={styles.playOverlay} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" width={32} height={32}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Title pill optional */}
        {/*         <div className={styles.titlePill}>
          <span>{item.title}</span>
        </div> */}
      </div>
    </article>
  );
}
