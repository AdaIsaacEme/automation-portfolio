import gsap from "gsap";
import { lockScroll, unlockScroll, state } from "./state";

export function initMenu() {
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return;

  const bg = menu.querySelector<HTMLElement>(".menu__bg")!;
  const links = [...menu.querySelectorAll<HTMLAnchorElement>(".menu__link")];
  const side = menu.querySelector<HTMLElement>(".menu__side");
  const imgs = [...menu.querySelectorAll<HTMLElement>("[data-preview-img]")];
  let open = false;
  let tl: gsap.core.Timeline | null = null;

  const setPreview = (i: number) => {
    imgs.forEach((img, j) => img.classList.toggle("is-active", j === i));
  };

  links.forEach((link) => {
    const i = Number(link.dataset.preview ?? 0);
    link.addEventListener("mouseenter", () => setPreview(i));
    link.addEventListener("focus", () => setPreview(i));
    link.addEventListener("click", () => {
      if (open) close(false);
    });
  });

  const focusables = () =>
    [toggle, ...menu.querySelectorAll<HTMLElement>("a[href], button")].filter(
      (el) => !el.hasAttribute("disabled"),
    );

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const f = focusables();
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  function openMenu() {
    open = true;
    menu!.hidden = false;
    root.classList.add("menu-open");
    toggle!.setAttribute("aria-expanded", "true");
    toggle!.setAttribute("aria-label", "Close menu");
    lockScroll();
    document.addEventListener("keydown", onKey);

    if (state.motion) {
      tl?.kill();
      tl = gsap
        .timeline()
        .fromTo(bg, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.05 }, "-=0.45")
        .fromTo(side, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.7");
    }
    setTimeout(() => links[0]?.focus({ preventScroll: true }), state.motion ? 500 : 0);
  }

  function close(returnFocus = true) {
    if (!open) return;
    open = false;
    toggle!.setAttribute("aria-expanded", "false");
    toggle!.setAttribute("aria-label", "Open menu");
    document.removeEventListener("keydown", onKey);
    const finish = () => {
      menu!.hidden = true;
      root.classList.remove("menu-open");
    };
    unlockScroll();
    if (returnFocus) toggle!.focus({ preventScroll: true });

    if (state.motion) {
      tl?.kill();
      tl = gsap
        .timeline({ onComplete: finish })
        .to(links, { yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.02 })
        .to(side, { autoAlpha: 0, duration: 0.3 }, "<")
        .to(bg, { clipPath: "circle(0% at 100% 0%)", duration: 0.7, ease: "expo.inOut" }, "-=0.2");
    } else {
      finish();
    }
  }

  toggle.addEventListener("click", () => (open ? close() : openMenu()));
}
