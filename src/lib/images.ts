import type { ImageMetadata } from "astro";

// Screenshots and logos live in the existing /images/Automation folder so the
// legacy site and the new build share one copy. Astro optimises them at build time.
const shots = import.meta.glob<{ default: ImageMetadata }>(
  "/images/Automation/*.{png,jpg,jpeg}",
  { eager: true },
);

const portraits = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/me/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export function shot(file: string): ImageMetadata {
  const mod = shots[`/images/Automation/${file}`];
  if (!mod) throw new Error(`Missing image: images/Automation/${file}`);
  return mod.default;
}

function portrait(prefix: string): ImageMetadata {
  const key = Object.keys(portraits).find((k) =>
    k.split("/").pop()!.startsWith(prefix),
  );
  if (!key) throw new Error(`Missing portrait starting with ${prefix} in src/assets/me`);
  return portraits[key].default;
}

export const me = {
  hero: portrait("01-"),
  about: portrait("02-"),
  why: portrait("03-"),
  contact: portrait("04-"),
};
