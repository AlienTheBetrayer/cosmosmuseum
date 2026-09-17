"use client";

import { useCallback, useMemo, useState } from "react";
import { YouTubeEvent } from "react-youtube";

export const useVideoIFrame = () => {
  const [playing, setPlaying] = useState<boolean>(false);
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

  const onStateChange = useCallback((event: YouTubeEvent) => {
    event.target.mute();
    event.target.playVideo();

    if (event.data === 1) {
      setPlaying(true);
    }
  }, []);

  return useMemo(() => ({ videoId, opts, onStateChange, playing }), [videoId, opts, onStateChange, playing]);
};
