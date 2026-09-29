import { scrollToTarget } from "./state";

// Top bar hide/show, scroll progress bar and back-to-top ring.
// Plain scroll events so it works with or without Lenis.
export function initChrome() {
  const root = document.documentElement;
  const topbar = document.querySelector<HTMLElement>("[data-topbar]");
  const bar = document.querySelector<HTMLElement>(".progress span");
  const toTop = document.querySelector<HTMLButtonElement>(".to-top");
  const ring = toTop?.querySelector<SVGCircleElement>(".to-top__ring");

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const max = Math.max(1, root.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, y / max));

    if (bar) bar.style.transform = `scaleX(${p})`;
    if (ring) ring.style.strokeDashoffset = String(1 - p);
    toTop?.classList.toggle("is-visible", y > 700);

    if (topbar && !root.classList.contains("menu-open")) {
      topbar.classList.toggle("is-solid", y > 40);
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (goingDown && y > 400) topbar.classList.add("is-hidden");
      else if (goingUp || y < 400) topbar.classList.remove("is-hidden");
    }
    lastY = y;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  toTop?.addEventListener("click", () => scrollToTarget(0));

  // Same-page anchor links scroll smoothly (through Lenis when active).
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
    if (!a || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const el = document.querySelector<HTMLElement>(url.hash);
    if (!el) return;
    e.preventDefault();
    history.pushState(null, "", url.hash);
    // Let the menu close first if the link was inside it.
    requestAnimationFrame(() => scrollToTarget(el));
  });
}
