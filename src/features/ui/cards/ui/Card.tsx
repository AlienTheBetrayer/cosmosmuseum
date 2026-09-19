"use client";

import { QRCodeDisplay } from "@/shared/ui/qrcodedisplay";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";

type Tilt = { x: number; y: number };

type Star = {
  x: number;
  y: number;
  dx: number; // unit direction (radial from card centre)
  dy: number;
  speed: number; // px / second
  travelled: number;
  reach: number; // distance at which the star has fully faded
  radius: number;
  depth: number; // 0.4 (far) → 1 (near); drives brightness + parallax
  phase: number; // twinkle offset
};

const PAD = 100; // how far (px) stars can drift past the card's edge
const MAX_STARS = 100;
const IDLE_RATE = 0; // stars / second at rest
const HOVER_RATE = 10; // stars / second while hovered
const PARALLAX = 1; // px of star shift per degree of card tilt
// ---------------------------------------------------------------------------

const Starfield = ({ tilt, active }: { tilt: Tilt; active: boolean }) => {
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

const rad = (deg: number) => (deg * Math.PI) / 180;
const Shading = ({
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

export const Card = ({ src, qrText }: { src: string; qrText: string }) => {
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
          </motion.div>

          <motion.div
            inert={!flipped}
            className={faceClass}
            style={{ z: -2, rotateY: 180, boxShadow: shadow }}
          >
            <div className="flex h-full w-full items-center justify-center text-foreground">
              <QRCodeDisplay text={qrText} size={100} className="w-full h-full"/>
            </div>

            <Shading shade={shade} glare={glare} />
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
};
