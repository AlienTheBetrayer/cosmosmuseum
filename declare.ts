import { Temporal } from 'temporal-polyfill';

// Vercel's Edge and Serverless environments use 'globalThis' 
if (!globalThis.Temporal) {
  Object.defineProperty(globalThis, 'Temporal', {
    value: Temporal,
    writable: false, // Prevent Next.js HMR or Vercel bundling cycles from overwriting it
    configurable: true,
  });
}

declare global {
  var Temporal: typeof import('temporal-polyfill').Temporal;
}