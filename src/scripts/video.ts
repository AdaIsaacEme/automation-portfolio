// Demo video: only download once it's close, and autoplay (muted) while on screen.
// With reduced motion it never autoplays — people press play themselves.
export function initVideo() {
  const videos = document.querySelectorAll<HTMLVideoElement>("[data-autoplay-inview]");
  if (!videos.length || !("IntersectionObserver" in window)) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const near = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLVideoElement).preload = "auto";
          near.unobserve(e.target);
        }
      });
    },
    { rootMargin: "600px 0px" },
  );

  const visible = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (v.dataset.userPaused === "1") return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    },
    { threshold: 0.4 },
  );

  videos.forEach((v) => {
    near.observe(v);
    if (reduce) return;
    visible.observe(v);
    // Respect a manual pause: don't auto-resume after the user stops it.
    v.addEventListener("pause", () => {
      if (!document.hidden && v.getBoundingClientRect().top < innerHeight && v.getBoundingClientRect().bottom > 0) {
        v.dataset.userPaused = "1";
      }
    });
    v.addEventListener("play", () => {
      v.dataset.userPaused = "0";
    });
  });
}
