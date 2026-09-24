export type Tilt = { x: number; y: number };

export type Star = {
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

export const PAD = 100; // how far (px) stars can drift past the card's edge
export const MAX_STARS = 100;
export const IDLE_RATE = 0; // stars / second at rest
export const HOVER_RATE = 15; // stars / second while hovered
export const PARALLAX = 1; // px of star shift per degree of card tilt