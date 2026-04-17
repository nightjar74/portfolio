import { useRef, useEffect, useCallback } from "react";

interface UseVideoPlayerOptions {
  autoPlay?: boolean;
}

interface UseVideoPlayerReturn {
  playerRef: React.RefObject<HTMLVideoElement | null>;
  pause: () => void;
  play: () => void;
}

export function useVideoPlayer({
  autoPlay = true,
}: UseVideoPlayerOptions = {}): UseVideoPlayerReturn {
  const playerRef = useRef<HTMLVideoElement>(null);

  const pause = useCallback(() => {
    playerRef.current?.pause();
  }, []);

  const play = useCallback(() => {
    playerRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (autoPlay) {
      // Slight defer so the element is painted before we ask it to play
      const id = requestAnimationFrame(() => {
        playerRef.current?.play().catch(() => {});
      });
      return () => cancelAnimationFrame(id);
    }
  }, [autoPlay]);

  useEffect(() => {
    return () => {
      const video = playerRef.current;
      if (video) {
        video.pause();
        video.src = "";
        video.load();
      }
    };
  }, []);

  return { playerRef, pause, play };
}
