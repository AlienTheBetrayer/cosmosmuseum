"use client";

import { MotionValue } from "motion";
import { motion } from "motion/react";

export const Shading = ({
  shade,
  glare,
}: {
  shade: MotionValue<number>;
  glare: MotionValue<string>;
}) => (
  <>
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-black"
      style={{ opacity: shade }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{
        backgroundImage:
          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
        backgroundSize: "250% 100%",
        backgroundPositionX: glare,
      }}
    />
  </>
);
