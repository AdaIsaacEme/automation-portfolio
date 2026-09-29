import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Lenis from "lenis";
import { state } from "./state";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);

const root = document.documentElement;
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const DESKTOP = "(min-width: 1000px)";

/* ───────────────────────── Smooth scroll ───────────────────────── */
function initLenis() {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  state.lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/* ───────────────────────── Preloader ───────────────────────── */
function preloader(): Promise<void> {
  const el = document.querySelector<HTMLElement>(".preloader");
  if (!el || !root.classList.contains("is-loading")) return Promise.resolve();

  state.lenis?.stop();
  const num = el.querySelector<HTMLElement>(".preloader__num")!;
  const bar = el.querySelector<HTMLElement>(".preloader__bar span")!;
  const words = el.querySelectorAll(".preloader__word");
  const role = el.querySelector(".preloader__role");
  const counter = { v: 0 };

  const heroImg = document.querySelector<HTMLImageElement>(".hero__portrait img");
  const ready = Promise.race([
    Promise.all([
      document.fonts?.ready,
      heroImg && !heroImg.complete ? new Promise((r) => heroImg.addEventListener("load", r, { once: true })) : null,
    ]),
    new Promise((r) => setTimeout(r, 2500)),
  ]);

  return new Promise((resolve) => {
    const tl = gsap.timeline();
    tl.from(words, { yPercent: 110, autoAlpha: 0, rotate: 4, duration: 1, ease: "expo.out", stagger: 0.12 })
      .from(role, { autoAlpha: 0, y: 12, duration: 0.8, ease: "expo.out" }, "-=0.6")
      .to(counter, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v));
          bar.style.transform = `scaleX(${counter.v / 100})`;
        },
      }, 0);

    tl.then(() => ready).then(() => {
      gsap
        .timeline({
          onComplete: () => {
            root.classList.remove("is-loading");
            try {
              sessionStorage.setItem("ne-loaded", "1");
            } catch {}
            state.lenis?.start();
          },
        })
        .to([words, role, num.parentElement], { yPercent: -60, autoAlpha: 0, duration: 0.6, ease: "power3.in", stagger: 0.04 })
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.2")
        .add(() => resolve(), "-=0.7");
    });
  });
}

/* ───────────────────────── Hero ───────────────────────── */
type Wire = { node: HTMLElement; path: SVGPathElement; packet: SVGCircleElement; reveal: number; offset: number };

function cubicAt(p: number[], t: number) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = p;
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * x0 + b * x1 + c * x2 + d * x3, a * y0 + b * y1 + c * y2 + d * y3];
}

// First part of a cubic Bézier up to t (de Casteljau) — lets wires "grow" out of nodes.
function cubicHead(p: number[], t: number) {
  const lerp = (a: number, b: number) => a + (b - a) * t;
  const [x0, y0, x1, y1, x2, y2, x3, y3] = p;
  const ax = lerp(x0, x1), ay = lerp(y0, y1);
  const bx = lerp(x1, x2), by = lerp(y1, y2);
  const cx = lerp(x2, x3), cy = lerp(y2, y3);
  const dx = lerp(ax, bx), dy = lerp(ay, by);
  const ex = lerp(bx, cx), ey = lerp(by, cy);
  const fx = lerp(dx, ex), fy = lerp(dy, ey);
  return [x0, y0, ax, ay, dx, dy, fx, fy];
}

function heroWires() {
  const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
  const svg = document.querySelector<SVGSVGElement>("[data-wires]");
  const portrait = document.querySelector<HTMLElement>("[data-hero-portrait]");
  if (!stage || !svg || !portrait) return null;

  const NS = "http://www.w3.org/2000/svg";
  const wires: Wire[] = [...stage.querySelectorAll<HTMLElement>("[data-node]")].map((node, i) => {
    const path = document.createElementNS(NS, "path");
    path.setAttribute("class", "wire");
    const packet = document.createElementNS(NS, "circle");
    packet.setAttribute("class", "packet");
    packet.setAttribute("r", "3.5");
    svg.append(path, packet);
    return { node, path, packet, reveal: 0, offset: i * 0.17 };
  });

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(stage);
  const wide = matchMedia("(min-width: 760px)"); // nodes are hidden below this

  const tick = (time: number) => {
    if (!visible || !wide.matches) return;
    const s = stage.getBoundingClientRect();
    const p = portrait.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${s.width} ${s.height}`);
    const pcx = p.left + p.width / 2 - s.left;

    wires.forEach((w) => {
      const n = w.node.getBoundingClientRect();
      const nx = n.left + n.width / 2 - s.left;
      const ny = n.top + n.height / 2 - s.top;
      const side = nx < pcx ? -1 : 1;
      const tx = pcx + side * p.width * 0.5;
      const ty = Math.min(Math.max(ny, p.top - s.top + p.height * 0.3), p.bottom - s.top - p.height * 0.15);
      const sx = nx - side * (n.width / 2);
      const mid = (sx + tx) / 2;
      const pts = [sx, ny, mid, ny, mid, ty, tx, ty];
      const h = w.reveal >= 1 ? pts : cubicHead(pts, w.reveal);
      w.path.setAttribute("d", `M${h[0]},${h[1]} C${h[2]},${h[3]} ${h[4]},${h[5]} ${h[6]},${h[7]}`);

      const t = (time * 0.28 + w.offset) % 1;
      const [px, py] = cubicAt(pts, t);
      w.packet.setAttribute("cx", String(px));
      w.packet.setAttribute("cy", String(py));
      w.packet.style.opacity = w.reveal >= 1 ? String(Math.sin(t * Math.PI)) : "0";
    });
  };
  gsap.ticker.add(tick);
  return wires;
}

function hero() {
  const heroEl = document.querySelector<HTMLElement>("[data-hero]");
  if (!heroEl) return null;

  const lines = heroEl.querySelectorAll<HTMLElement>("[data-hero-line]");
  const portrait = heroEl.querySelector<HTMLElement>("[data-hero-portrait]");
  const portraitInner = heroEl.querySelector<HTMLElement>(".hero__portrait-inner");
  const img = heroEl.querySelector<HTMLElement>(".hero__portrait img");
  const nodes = heroEl.querySelectorAll<HTMLElement>("[data-node]");
  const fades = heroEl.querySelectorAll<HTMLElement>("[data-hero-fade]");
  const ribbon = document.querySelector<HTMLElement>(".ribbon");
  const wires = heroWires();

  const splits = [...lines].map((l) => SplitText.create(l, { type: "chars", mask: "chars" }));
  const chars = splits.flatMap((s) => s.chars);

  // Masks would clip the surname's halo, so drop the split once the intro is done.
  const intro = gsap.timeline({
    paused: true,
    defaults: { ease: "expo.out" },
    onComplete: () => splits.forEach((s) => s.revert()),
  });
  intro
    .set([lines, portrait, nodes, fades, ribbon], { autoAlpha: 1 })
    .from(chars, { yPercent: 115, rotate: 6, duration: 1.3, stagger: 0.035 })
    .fromTo(portraitInner, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0.1)
    .from(img, { scale: 1.35, duration: 1.8 }, 0.1)
    .from(".hero__badge", { scale: 0, rotate: -90, duration: 1.2, ease: "back.out(1.6)" }, 0.8)
    .from(nodes, { scale: 0, autoAlpha: 0, duration: 0.9, ease: "back.out(1.8)", stagger: 0.08 }, 0.7)
    .to(wires ?? [], { reveal: 1, duration: 1.2, ease: "power2.inOut", stagger: 0.08 }, 0.9)
    .from(fades, { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.6)
    .from(ribbon, { yPercent: 120, rotate: 4, duration: 1.2 }, 0.8);

  // Floating nodes
  nodes.forEach((n, i) => {
    gsap.to(n, {
      y: gsap.utils.random(-14, 14),
      x: gsap.utils.random(-8, 8),
      rotate: gsap.utils.random(-4, 4),
      duration: gsap.utils.random(2.4, 3.6),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.2,
    });
  });

  // Scroll away: name lines drift apart, portrait lifts
  const mm = gsap.matchMedia();
  mm.add("(min-width: 760px)", () => {
    const st = { trigger: heroEl, start: "top top", end: "bottom top", scrub: true };
    gsap.to(lines[0], { xPercent: -12, ease: "none", scrollTrigger: st });
    gsap.to(lines[1], { xPercent: 10, ease: "none", scrollTrigger: st });
    gsap.to(portrait, { yPercent: -18, rotate: -3, ease: "none", scrollTrigger: st });
    gsap.to(".hero__node", { yPercent: -120, ease: "none", stagger: 0.02, scrollTrigger: st });
  });

  // Mouse: portrait tilts, name nudges
  mm.add(FINE_POINTER, () => {
    const rx = gsap.quickTo(portraitInner, "rotationY", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(portraitInner, "rotationX", { duration: 0.8, ease: "power3" });
    gsap.set(portraitInner, { transformPerspective: 900 });
    const move = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      rx(x * 12);
      ry(-y * 10);
    };
    heroEl.addEventListener("pointermove", move);
    return () => heroEl.removeEventListener("pointermove", move);
  });

  return intro;
}

/* ───────────────────────── Text reveals ───────────────────────── */
function headings() {
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      },
    });
  });

  document.querySelectorAll<HTMLElement>("[data-scrub-words]").forEach((el) => {
    SplitText.create(el, {
      type: "words",
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
          },
        );
      },
    });
  });
}

function fadeUps() {
  const els = gsap.utils.toArray<HTMLElement>("[data-fade-up]");
  gsap.set(els, { y: 40, autoAlpha: 0 });
  ScrollTrigger.batch(els, {
    start: "top 92%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });

  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((list) => {
    gsap.from(list.children, {
      y: 24,
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.07,
      scrollTrigger: { trigger: list, start: "top 88%", once: true },
    });
  });
}

function counters() {
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    el.textContent = "0";
    gsap.to(o, {
      v: end,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
}

/* ───────────────────────── Images ───────────────────────── */
function images() {
  document.querySelectorAll<HTMLElement>("[data-clip-reveal]").forEach((el) => {
    const img = el.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" });
    if (img) tl.from(img, { scale: 1.4, duration: 2, ease: "expo.out" }, 0.2);
  });

  document.querySelectorAll<HTMLElement>("[data-parallax-inner]").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -3 },
      {
        yPercent: 3,
        ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  document.querySelectorAll<HTMLElement>("[data-scale-in]").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.86, borderRadius: "80px" },
      {
        scale: 1,
        borderRadius: "36px",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: true },
      },
    );
  });

  document.querySelectorAll<HTMLElement>("[data-float]").forEach((el) => {
    gsap.to(el, { y: -12, rotate: -4, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
  });
}

/* ───────────────────────── Service cards stack ───────────────────────── */
function serviceStack() {
  const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
  const mm = gsap.matchMedia();
  mm.add("(min-width: 760px)", () => {
    cards.forEach((card, i) => {
      const nextCard = cards[i + 1];
      if (!nextCard) return;
      gsap.to(card, {
        scale: 0.9 + i * 0.015,
        filter: "brightness(0.9)",
        ease: "none",
        scrollTrigger: { trigger: nextCard, start: "top bottom", end: "top 25%", scrub: true },
      });
    });
  });
  cards.forEach((card) => {
    gsap.from(card.querySelectorAll(".card__list li"), {
      x: -20,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "expo.out",
      scrollTrigger: { trigger: card, start: "top 70%", once: true },
    });
  });
}

/* ───────────────────────── Marquees ───────────────────────── */
function marquees(lenis: Lenis) {
  const tracks = gsap.utils.toArray<HTMLElement>("[data-marquee]");
  let boost = 0;
  let scrollDir = 1;

  lenis.on("scroll", ({ velocity }: { velocity: number }) => {
    boost = Math.min(Math.abs(velocity) * 0.35, 8);
    if (Math.abs(velocity) > 0.5) scrollDir = velocity > 0 ? 1 : -1;
  });

  tracks.forEach((track) => {
    const base = Number(track.dataset.speed ?? 0.5) * 100; // px per second
    const reactive = track.hasAttribute("data-velocity");
    const setX = gsap.quickSetter(track, "x", "px");
    let x = 0;
    let on = true;
    new IntersectionObserver(([e]) => (on = e.isIntersecting)).observe(track);

    // Slow down while hovered so people can read the logos.
    const hover = { v: 1 };
    track.addEventListener("mouseenter", () => gsap.to(hover, { v: 0.25, duration: 0.6, overwrite: true }));
    track.addEventListener("mouseleave", () => gsap.to(hover, { v: 1, duration: 0.6, overwrite: true }));

    gsap.ticker.add((_t, dt) => {
      if (!on) return;
      const width = (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      if (!width) return;
      const dir = reactive ? scrollDir : 1;
      x -= (base * (1 + (reactive ? boost : boost * 0.3)) * dir * hover.v * dt) / 1000;
      x = gsap.utils.wrap(-width, 0, x);
      setX(x);
    });
  });

  gsap.ticker.add(() => {
    boost *= 0.92;
  });
}

/* ───────────────────────── Architecture diagram ───────────────────────── */
function architecture() {
  const arch = document.querySelector<HTMLElement>("[data-arch]");
  const staticArch = document.querySelectorAll<HTMLElement>("[data-arch-static]");

  const prep = (scope: Element) => {
    const steps = [...scope.querySelectorAll<SVGGElement>(".step")];
    steps.forEach((s) => {
      const edges = s.querySelectorAll(".edge");
      // Arrowheads only appear once their line has finished drawing.
      edges.forEach((e) => e.setAttribute("marker-end", "none"));
      if (edges.length) gsap.set(edges, { drawSVG: "0%" });
      gsap.set(s.querySelectorAll("[data-node-box]"), { autoAlpha: 0, scale: 0.7 });
    });
    return steps;
  };

  const build = (steps: SVGGElement[], tl: gsap.core.Timeline) => {
    steps.forEach((s, i) => {
      const edges = s.querySelectorAll(".edge");
      tl.addLabel(`s${i}`);
      if (edges.length) {
        tl.to(edges, { drawSVG: "100%", duration: 0.5, ease: "power1.inOut" }).set(edges, {
          attr: { "marker-end": "url(#arrow)" },
        });
      }
      tl.to(s.querySelectorAll("[data-node-box]"), { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2)", stagger: 0.08 }, edges.length ? "-=0.2" : ">");
    });
    return tl;
  };

  const packetLoop = (scope: Element) => {
    const packet = scope.querySelector<SVGCircleElement>("[data-packet]");
    if (!packet) return;
    gsap.set(packet, { opacity: 1 });
    gsap.to(packet, {
      motionPath: { path: "M95,330 L1000,330", autoRotate: false },
      duration: 2.8,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 0.4,
    });
  };

  if (arch) {
    const steps = prep(arch);
    const items = [...arch.querySelectorAll<HTMLElement>("[data-arch-step]")];
    const mm = gsap.matchMedia();

    mm.add(DESKTOP, () => {
      arch.classList.add("is-live");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: arch,
          start: "top top",
          end: () => `+=${steps.length * 55}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate(self) {
            const active = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999));
            items.forEach((li, i) => {
              li.classList.toggle("is-active", i === active);
              li.classList.toggle("is-done", i < active);
            });
          },
          onLeave: () => packetLoop(arch),
        },
      });
      build(steps, tl);
      return () => arch.classList.remove("is-live");
    });

    mm.add(`not all and ${DESKTOP}`, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: arch, start: "top 70%", once: true }, onComplete: () => packetLoop(arch) });
      build(steps, tl);
      tl.timeScale(1.6);
    });
  }

  staticArch.forEach((scope) => {
    const steps = prep(scope);
    const tl = gsap.timeline({ scrollTrigger: { trigger: scope, start: "top 75%", once: true }, onComplete: () => packetLoop(scope) });
    build(steps, tl).timeScale(1.8);
  });
}

/* ───────────────────────── Pointer toys ───────────────────────── */
function pointer() {
  const mm = gsap.matchMedia();
  mm.add(FINE_POINTER, () => {
    // Custom cursor
    const cursor = document.querySelector<HTMLElement>(".cursor");
    if (cursor) {
      const dot = cursor.querySelector<HTMLElement>(".cursor__dot")!;
      const ring = cursor.querySelector<HTMLElement>(".cursor__ring")!;
      const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
      const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
      const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
      const move = (e: PointerEvent) => {
        root.classList.add("has-cursor");
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };
      const over = (e: PointerEvent) => {
        const t = e.target as HTMLElement;
        cursor.classList.toggle("is-view", !!t.closest("[data-cursor='view']"));
        cursor.classList.toggle("is-link", !t.closest("[data-cursor='view']") && !!t.closest("a, button"));
        cursor.classList.toggle("on-dark-area", !!t.closest(".on-dark, [data-dark], .lightbox"));
      };
      const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
      const enter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerover", over);
      document.documentElement.addEventListener("mouseleave", leave);
      document.documentElement.addEventListener("mouseenter", enter);
    }

    // Magnetic buttons
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const strength = Number(el.dataset.magneticStrength ?? 0.3);
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * strength);
        y((e.clientY - r.top - r.height / 2) * strength);
      });
      el.addEventListener("pointerleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)" });
      });
    });

    // Tilt cards
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
      });
      el.addEventListener("pointerleave", () => {
        rx(0);
        ry(0);
      });
    });

    // Project hover preview that follows the cursor
    const list = document.querySelector<HTMLElement>("[data-project-list]");
    const preview = document.querySelector<HTMLElement>("[data-preview]");
    if (list && preview) {
      const imgs = [...preview.querySelectorAll<HTMLElement>("[data-preview-img-index]")];
      const px = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
      const py = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
      const rot = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      list.addEventListener("pointermove", (e) => {
        px(e.clientX + 40);
        py(e.clientY);
        rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      });
      list.querySelectorAll<HTMLElement>("[data-preview-index]").forEach((row) => {
        row.addEventListener("pointerenter", (e) => {
          const i = Number(row.dataset.previewIndex);
          imgs.forEach((img, j) => img.classList.toggle("is-active", i === j));
          gsap.set(preview, { x: e.clientX + 40, y: e.clientY });
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" });
        });
      });
      list.addEventListener("pointerleave", () => {
        gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: "power3.in", overwrite: "auto" });
      });
    }
  });
}

/* ───────────────────────── Footer + case pages ───────────────────────── */
function footer() {
  const inner = document.querySelector<HTMLElement>("[data-footer-inner]");
  if (!inner) return;
  gsap.from(inner, {
    yPercent: -25,
    opacity: 0.4,
    ease: "none",
    scrollTrigger: { trigger: inner.parentElement, start: "top bottom", end: "bottom bottom", scrub: true },
  });
}

/* ───────────────────────── Boot ───────────────────────── */
export async function initMotion() {
  const lenis = initLenis();
  const intro = hero();

  const pre = preloader();
  root.classList.add("motion-ready");

  await document.fonts?.ready;
  headings();
  fadeUps();
  counters();
  images();
  serviceStack();
  marquees(lenis);
  architecture();
  pointer();
  footer();

  await pre;
  intro?.play();

  window.addEventListener("load", () => ScrollTrigger.refresh());

  // Arriving on a /#section link from another page.
  if (location.hash) {
    const target = document.querySelector<HTMLElement>(location.hash);
    if (target) setTimeout(() => lenis.scrollTo(target, { immediate: true }), 50);
  }
}
