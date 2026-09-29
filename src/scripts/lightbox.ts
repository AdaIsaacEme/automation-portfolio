import gsap from "gsap";
import { lockScroll, unlockScroll, state } from "./state";

type Item = { full: string; caption: string; thumb: HTMLImageElement | null };

export function initLightbox() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-lightbox]");
  if (!dialog) return;
  const img = dialog.querySelector<HTMLImageElement>("[data-lightbox-img]")!;
  const caption = dialog.querySelector<HTMLElement>("[data-lightbox-caption]")!;
  const count = dialog.querySelector<HTMLElement>("[data-lightbox-count]")!;
  const prev = dialog.querySelector<HTMLButtonElement>("[data-lightbox-prev]")!;
  const next = dialog.querySelector<HTMLButtonElement>("[data-lightbox-next]")!;

  let items: Item[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number, fromThumb = false) => {
    index = (i + items.length) % items.length;
    const it = items[index];
    const multi = items.length > 1;
    prev.hidden = next.hidden = !multi;
    count.textContent = multi ? `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}` : "";
    caption.textContent = it.caption;
    img.alt = it.caption;

    // Show the already-loaded thumbnail instantly, then swap in the sharp version.
    if (it.thumb?.currentSrc) img.src = it.thumb.currentSrc;
    const hi = new Image();
    hi.src = it.full;
    hi.decode().then(() => {
      if (items[index] === it) img.src = it.full;
    }).catch(() => {});

    if (!state.motion) return;
    if (fromThumb && it.thumb) {
      requestAnimationFrame(() => {
        const from = it.thumb!.getBoundingClientRect();
        const to = img.getBoundingClientRect();
        if (!to.width) return;
        gsap.fromTo(
          img,
          {
            x: from.left - to.left,
            y: from.top - to.top,
            scaleX: from.width / to.width,
            scaleY: from.height / to.height,
            transformOrigin: "0 0",
          },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: "expo.out" },
        );
      });
    } else {
      gsap.fromTo(img, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" });
    }
  };

  document.addEventListener("click", (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>("[data-lightbox-trigger]");
    if (!trigger) return;
    const group = trigger.closest("[data-gallery]") ?? document;
    const triggers = [...group.querySelectorAll<HTMLElement>("[data-lightbox-trigger]")];
    items = triggers.map((t) => ({
      full: t.dataset.full!,
      caption: t.dataset.caption ?? "",
      thumb: t.querySelector("img"),
    }));
    opener = trigger;
    dialog.showModal();
    lockScroll();
    if (state.motion) gsap.fromTo(dialog, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
    show(triggers.indexOf(trigger), true);
  });

  const close = () => {
    const done = () => {
      dialog.close();
    };
    if (state.motion) gsap.to(dialog, { autoAlpha: 0, duration: 0.3, onComplete: done });
    else done();
  };

  dialog.addEventListener("close", () => {
    unlockScroll();
    gsap.set(dialog, { clearProps: "opacity,visibility" });
    opener?.focus({ preventScroll: true });
  });

  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });

  dialog.querySelector("[data-lightbox-close]")!.addEventListener("click", close);
  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));

  dialog.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t === dialog || t.classList.contains("lightbox__stage")) close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
}
