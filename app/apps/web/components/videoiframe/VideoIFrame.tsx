"use client";

import { useVideoIFrame } from "@/components/videoiframe/useVideoIFrame";
import YouTube from "react-youtube";

export default function BackgroundVideo() {
  const { videoId, opts, onReady } = useVideoIFrame();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] scale-125 pointer-events-none"
        iframeClassName="w-full h-full pointer-events-none"
      />
    </div>
  );
}
