"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

export const SlidingText = ({ list }: { list: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => {
        const available = list.map((_, i) => i).filter((i) => i !== current);

        return available[Math.floor(Math.random() * available.length)];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={index}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{
          duration: 0.35,
          ease: "circInOut",
        }}
      >
        {list[index]}
      </motion.span>
    </AnimatePresence>
  );
};
