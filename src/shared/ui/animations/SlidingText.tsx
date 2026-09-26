"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

export const SlidingText = ({ list }: { list: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((current) => {
        const available = list.map((_, i) => i).filter((i) => i !== current);

        return available[Math.floor(Math.random() * available.length)];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [list]);

  return (
    <span className="relative flex h-5 w-5 items-center justify-center overflow-visible">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={index}
          className="absolute flex items-center justify-center"
          initial={{
            y: 18,
            opacity: 0,
            scale: 0.65,
            rotate: -12,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            y: -18,
            opacity: 0,
            scale: 0.65,
            rotate: 12,
          }}
          transition={{
            y: {
              type: "spring",
              stiffness: 420,
              damping: 24,
              mass: 0.7,
            },
            scale: {
              type: "spring",
              stiffness: 500,
              damping: 22,
            },
            rotate: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            },
            opacity: {
              duration: 0.16,
            },
          }}
        >
          {list[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
