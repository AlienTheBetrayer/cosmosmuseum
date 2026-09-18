"use client";

import YouTube from "react-youtube";
import { useVideoIFrame } from "@/components/videoiframe/hooks/useVideoIFrame";
import Image from "next/image";
import { Spinner } from "@/shared/ui";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "cn";

export default function BackgroundVideo() {
  const { opts, playing, onStateChange } = useVideoIFrame();
  console.log(playing);
  // jsx
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={"absolute inset-0 pointer-events-none"}
          >
            <Image
              alt="video-preview"
              src="/video-preview.jpeg"
              fill
              style={{ objectFit: "cover" }}
            />

            <div className="text-white">
              <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-7" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "transition-opacity duration-350 pointer-events-none",
          playing ? "opacity-100" : "opacity-0",
        )}
      >
        <YouTube
          videoId="2RyoVNMUbpM"
          opts={opts}
          onStateChange={onStateChange}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] scale-125"
        />
      </div>
    </div>
  );
}
