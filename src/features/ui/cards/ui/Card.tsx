"use client";

import { Tilt } from "@/features/ui/cards/lib/effects";
import { CardOverlay } from "@/features/ui/cards/ui/overlay/CardOverlay";
import { Shading } from "@/features/ui/cards/ui/effects/Shading";
import { Starfield } from "@/features/ui/cards/ui/effects/Starfield";
import { QRCodeDisplay } from "@/shared/ui/qrcodedisplay";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { contracts } from "@/backend";

const rad = (deg: number) => (deg * Math.PI) / 180;

export const Card = ({
  idx,
  src,
  qrText,
  data,
}: {
  idx: number;
  src: string;
  qrText: string;
  data: contracts.reactions.GetResponse[string] | undefined | null;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState<Tilt>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();

  // ---- Flip physics -------------------------------------------------------
  // Spring gives a natural settle. Raise damping for less wobble, lower for more.
  const angle = useSpring(0, { stiffness: 110, damping: 15, mass: 1 });

  // 0 when flat to the viewer, 1 when edge-on
  const edge = useTransform(angle, (v) => Math.abs(Math.sin(rad(v))));
  const lift = useTransform(edge, (v) => v * 90); // px toward the viewer
  const roll = useTransform(angle, (v) => Math.sin(rad(v)) * -6); // slight tumble, deg
  const shade = useTransform(edge, (v) => v * 0.55); // max darkening at edge-on
  const glare = useTransform(angle, [0, 180], ["150%", "-50%"]);
  const shadow = useTransform(
    edge,
    (v) =>
      `0 ${10 + v * 40}px ${25 + v * 45}px -5px rgba(0,0,0,${0.12 + v * 0.18})`,
  );
  // -------------------------------------------------------------------------

  useEffect(() => {
    const target = flipped ? 180 : 0;
    if (reduceMotion) angle.jump(target);
    else angle.set(target);
  }, [flipped, reduceMotion, angle]);

  const toggle = () => setFlipped((f) => !f);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({
      x: -y * 20,
      y: x * 20,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const faceClass =
    "absolute inset-0 overflow-hidden rounded-4xl bg-card outline-2 outline-foreground/10 [backface-visibility:hidden]";

  return (
    <div className="relative [perspective:1000px]">
      <Starfield tilt={rotate} active={isHovered} />

      <article
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.05, 1.05, 1.05)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s ease-out",
        }}
        className="group relative h-100 cursor-pointer transform-gpu [transform-style:preserve-3d] focus-visible:outline-none"
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          style={{ rotateY: angle, rotateX: roll, z: lift }}
        >
          {/* Thickness: thin slices between the faces so the edge is visible mid-turn */}
          {[-1.5, -0.75, 0, 0.75, 1.5].map((z) => (
            <motion.div
              key={z}
              aria-hidden
              className="absolute inset-0 rounded-4xl bg-muted shadowed"
              style={{ z }}
            />
          ))}

          <motion.div
            inert={flipped}
            className={faceClass}
            style={{ z: 2, boxShadow: shadow }}
          >
            <Image
              alt={src}
              src={src}
              fill
              style={{ objectFit: "cover" }}
              className="h-full w-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Shading shade={shade} glare={glare} />

            <CardOverlay idx={idx} data={data} />
          </motion.div>

          <motion.div
            inert={!flipped}
            className={faceClass}
            style={{ z: -2, rotateY: 180, boxShadow: shadow }}
          >
            <div className="flex h-full w-full items-center justify-center text-foreground">
              <QRCodeDisplay
                text={qrText}
                size={100}
                className="w-full h-full"
              />
            </div>

            <Shading shade={shade} glare={glare} />
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
};
