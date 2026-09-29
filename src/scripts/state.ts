import type Lenis from "lenis";

// Shared between modules so menu/lightbox can pause smooth scrolling and
// anchor links can scroll through Lenis when it is running.
export const state: { lenis: Lenis | null; motion: boolean } = {
  lenis: null,
  motion: document.documentElement.classList.contains("motion"),
};

let locks = 0;

export function lockScroll() {
  locks++;
  state.lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  state.lenis?.start();
  document.documentElement.style.overflow = "";
}

export function scrollToTarget(target: string | HTMLElement | number) {
  if (state.lenis) {
    state.lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}
