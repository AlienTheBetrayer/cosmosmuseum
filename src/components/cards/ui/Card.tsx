"use client";

import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";

export const Card = ({ src }: { src: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div className="[perspective:1000px]">
      <article
        ref={cardRef}
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
        className="relative h-100 overflow-hidden rounded-4xl bg-card outline-2 outline-foreground/10 shadow-xl transition-all duration-300 transform-gpu preserve-3d group cursor-pointer"
      >
        <Image
          alt={src}
          src={src}
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
      </article>
    </div>
  );
};
