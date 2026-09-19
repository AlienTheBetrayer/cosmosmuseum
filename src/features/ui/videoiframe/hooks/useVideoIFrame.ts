"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { YouTubeEvent } from "react-youtube";

export const useVideoIFrame = () => {
  // states
  const [playing, setPlaying] = useState<boolean>(false);

  // refs
  const mainPlayer = useRef<YT.Player | null>(null);
  const ambientPlayer = useRef<YT.Player | null>(null);

  // constants
  const videoId = "2RyoVNMUbpM";
  const opts = useMemo(() => {
    return {
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        loop: 1,
        playlist: videoId,
        playsinline: 1,
        rel: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        iv_load_policy: 3,
      },
    };
  }, [videoId]);

  // syncing
  useEffect(() => {
    const interval = setInterval(() => {
      const main = mainPlayer.current;
      const ambient = ambientPlayer.current;
      if (!main || !ambient) return;
      if (typeof main.getCurrentTime !== "function") return; // guard, player not fully ready

      const mainTime = main.getCurrentTime();
      const bgTime = ambient.getCurrentTime();

      const drift = Math.abs(mainTime - bgTime);
      if (drift > 0.35) {
        ambient.seekTo(mainTime, true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // functions
  const onStateChange = useCallback((event: YouTubeEvent) => {
    event.target.mute();
    event.target.playVideo();

    if (event.data === 1) {
      setPlaying(true);
    }
  }, []);

  const onMainReady = useCallback((e: YouTubeEvent) => {
    mainPlayer.current = e.target;
  }, []);

  const onAmbientReady = useCallback((e: YouTubeEvent) => {
    ambientPlayer.current = e.target;
  }, []);

  return useMemo(
    () => ({
      videoId,
      opts,
      playing,
      onMainReady,
      onAmbientReady,
      onStateChange,
    }),
    [videoId, opts, playing, onMainReady, onAmbientReady, onStateChange],
  );
};
