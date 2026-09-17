/**
 * enables ripple effect on any interactable element
 * @param e - pointer event of a given interactable element
 * @returns nothing
 */
export const rippleEnable = <T extends HTMLElement>(e: React.PointerEvent<T>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();

  // creating
  const ripple = document.createElement("span");
  ripple.classList.add("ripple-element");

  const size = Math.max(rect.width, rect.height) * 2.5;
  ripple.style.width = ripple.style.height = `${String(size)}px`;
  ripple.style.left = `${String(e.clientX - rect.left)}px`;
  ripple.style.top = `${String(e.clientY - rect.top)}px`;
  const textColor = window.getComputedStyle(el).getPropertyValue("color");
  ripple.style.background = `color-mix(in srgb, ${textColor} 15%, transparent)`;

  el.appendChild(ripple);

  // animation
  ripple.animate(
    [
      { transform: "translate(-50%, -50%) scale(0)", opacity: 1 },
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
    ],
    {
      duration: Math.max(125, Math.min(size, 350)) * 10,
      easing: "cubic-bezier(0.05, 0.7, 0.1, 1)",
      fill: "forwards",
    },
  );

  // handler
  const handle = () => {
    const fade = ripple.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 1000,
      easing: "ease-out",
      fill: "forwards",
    });

    fade.onfinish = () => {
      ripple.remove();
    };

    // cleaning up listeners
    window.removeEventListener("pointerup", handle);
    window.removeEventListener("pointercancel", handle);
    el.removeEventListener("pointerleave", handle);
  };

  // adding listeners
  window.addEventListener("pointerup", handle);
  window.addEventListener("pointercancel", handle);
  el.addEventListener("pointerleave", handle);
};
