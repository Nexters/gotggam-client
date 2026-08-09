"use client";

import { useEffect, useRef } from "react";

type UseAudioOptions = {
  src: string;
  isPlaying: boolean;
  loop?: boolean;
};

export function useAudio({ src, isPlaying, loop = false }: UseAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = loop;
    }

    audioRef.current.play().catch(() => {});

    return () => {
      audioRef.current?.pause();
    };
  }, [src, isPlaying, loop]);
}
