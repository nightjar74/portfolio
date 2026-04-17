"use client";
import React from "react";
import styles from "./videoContainer.module.css";
import { VideoCard } from "./videoCard";
import type { VideoItem } from "../../types/videoTypes";
import { VideoModal } from "./modal/videoModal";
import { useVideoCarousel } from "@/hooks/useVideoCarousel";

interface VideoGridProps {
  count?: number;
  items: VideoItem[];
  visibleCount?: number;
}

const VideoContainer = ({ count = 8, items }: VideoGridProps) => {
  const { activeIndex, openModal, closeModal } = useVideoCarousel();

  return (
    <section>
      <div className={styles.gridContainer}>
        {items.map((item, i) => (
          <div key={item.id} className={styles.videoSlot}>
            <VideoCard item={item} onOpen={() => openModal(i)} />
            {/* <span className={styles.label}>Video {slot + 1}</span> */}
          </div>
        ))}
      </div>
      {activeIndex !== null && (
        <VideoModal item={items[activeIndex]} onClose={closeModal} />
      )}
    </section>
  );
};

export default VideoContainer;
