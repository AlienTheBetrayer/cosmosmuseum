import { Temporal } from 'temporal-polyfill';

// Safely attach it to the environment runtime without redefining the TS variable
if (!globalThis.Temporal) {
  Object.defineProperty(globalThis, 'Temporal', {
    value: Temporal,
    writable: false,
    configurable: true,
  });
}