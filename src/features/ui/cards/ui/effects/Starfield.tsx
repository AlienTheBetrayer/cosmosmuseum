"use client";

import {
  Tilt,
  Star,
  PAD,
  IDLE_RATE,
  HOVER_RATE,
  MAX_STARS,
  PARALLAX,
} from "@/features/ui/cards/lib/effects";
import { useRef, useEffect } from "react";

export const Starfield = ({
  tilt,
  active,
}: {
  tilt: Tilt;
  active: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tiltRef = useRef(tilt);
  const activeRef = useRef(active);

  useEffect(() => {
    tiltRef.current = tilt;
  }, [tilt]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let color = getComputedStyle(canvas).color;

    const mo = new MutationObserver(() => {
      color = getComputedStyle(canvas).color;
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    const stars: Star[] = [];
    const smooth = { x: 0, y: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let spawnDebt = 0;
    let energy = 0; // eases 0 → 1 on hover

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (progress = 0) => {
      const hw = w / 2 - PAD;
      const hh = h / 2 - PAD;
      if (hw <= 0 || hh <= 0) return;

      const angle = Math.random() * Math.PI * 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const edge = Math.min(
        hw / Math.abs(dx || 1e-6),
        hh / Math.abs(dy || 1e-6),
      );
      const inset = Math.random() * 24;
      const reach = PAD * 0.9 + inset;
      const travelled = reach * progress;
      const dist = edge - inset + travelled;
      const depth = 0.4 + Math.random() * 0.6;

      stars.push({
        x: w / 2 + dx * dist,
        y: h / 2 + dy * dist,
        dx,
        dy,
        speed: 10 + Math.random() * 14,
        travelled,
        reach,
        radius: 0.4 + depth * 0.9,
        depth,
        phase: Math.random() * Math.PI * 2,
      });
    };

    resize();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = now;
        return;
      }

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      energy += ((activeRef.current ? 1 : 0) - energy) * Math.min(dt * 4, 1);
      const follow = Math.min(dt * 8, 1);
      smooth.x += (tiltRef.current.x - smooth.x) * follow;
      smooth.y += (tiltRef.current.y - smooth.y) * follow;

      spawnDebt += dt * (IDLE_RATE + (HOVER_RATE - IDLE_RATE) * energy);
      while (spawnDebt >= 1) {
        spawnDebt -= 1;
        if (stars.length < MAX_STARS) spawn();
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        const step = s.speed * (1 + energy * 0.8) * dt;
        s.x += s.dx * step;
        s.y += s.dy * step;
        s.travelled += step;

        const p = s.travelled / s.reach;
        if (p >= 1) {
          stars.splice(i, 1);
          continue;
        }

        const envelope = Math.min(p / 0.12, 1) * (1 - p);
        const twinkle = 0.75 + 0.25 * Math.sin(now / 500 + s.phase);
        ctx.globalAlpha = envelope * twinkle * s.depth;

        // Nearer stars shift more with the card's tilt → depth
        const ox = -smooth.y * s.depth * PARALLAX;
        const oy = smooth.x * s.depth * PARALLAX;

        ctx.beginPath();
        ctx.arc(s.x + ox, s.y + oy, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute text-foreground"
      style={{
        inset: -PAD,
        width: `calc(100% + ${PAD * 2}px)`,
        height: `calc(100% + ${PAD * 2}px)`,
      }}
    />
  );
};
