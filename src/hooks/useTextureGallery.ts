"use client";
import { Client } from "@/components/work/ClientShowcase";
import PreloadTexture from "@/utils/preloadTexture";
import { useState } from "react";

export function useTextureGallery(clients: Client[]) {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const total = clients.length;

  const handleNext = async () => {
    const nextIndex = (active + 1) % total;
    await navigateTo(nextIndex);
  };

  const handlePrev = async () => {
    const nextIndex = (active - 1 + total) % total;
    await navigateTo(nextIndex);
  };

  const navigateTo = async (index: number) => {
    if (isLoading) return;
    console.log("image index loading started", index);
    setIsLoading(true);
    try {
      const targetImg = clients[index].imageSrc;
      await PreloadTexture(targetImg);

      setActive(index);
    } catch (err) {
      console.error("Failed to load texture:", err);
    } finally {
      setIsLoading(false);
      console.log("image index loading finished", index);
    }
  };

  return {
    active,
    setActive,
    client: clients[active],
    handleNext,
    handlePrev,
    isLoading,
    total,
  };
}
