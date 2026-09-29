# Portfolio Redesign Plan — Nkechi Emechukwu

Goal: keep **all** existing content (About, 4 service groups, 27 tools, 9 projects,
video demo, screenshots, Why Choose Me, Contact, VA services link) and turn it into
a visual, motion-rich site with a real menu and four portrait photos.

Stack: **Astro (static output) + GSAP 3 (all plugins are free since v3.13) + Lenis
smooth scroll**, deployed on **Vercel Hobby (free)**.

---

## 1. Brand palette

| Role | Name | Hex |
|---|---|---|
| Page background | Cream | `#FFF8E7` |
| Alternate section bg | Coconut Milk | `#F0EDE5` |
| Cards, chips, borders | Khaki | `#E0D7C7` |
| Muted text, dividers | Cloud | `#CECBC8` |
| Secondary text, dark cards | Mocha | `#56453E` |
| Main text, dark sections | Espresso | `#28221E` |
| **Accent** (links, CTAs, highlights on light) | **Dusty Plum** | `#6B4E71` |
| **Accent on dark** (hovers, highlights on Espresso) | **Lilac Mist** | `#CDBBDD` |

Why this purple: a greyed, warm plum sits with brown instead of fighting it. A bright
violet would look like a separate brand. Plum on Cream and Lilac on Espresso both pass
WCAG AA for text.

Other purples, if you prefer:
- Deeper: Aubergine `#4A3150`
- Softer: Heather `#8E7AA8`
- Pinker: Mauve `#9C7A8E`

Rule: about 60% cream/neutrals, 30% espresso/mocha, 10% purple.

## 2. Typography

| Use | Font | Source / licence |
|---|---|---|
| Headlines, big statements | **Fraunces** (variable: `opsz`, `SOFT`, `WONK`) | Google Fonts, free |
| Nav, labels, numbers, buttons | **League Spartan** | Google Fonts, free |
| Body text | **Hanken Grotesk** (free, close to Gotham/Aptos) | Google Fonts, free |

- **Aptos** and **Arial Nova** are Microsoft fonts and are not licensed for web
  embedding. They go in the fallback stack only:
  `"Hanken Grotesk", Aptos, "Arial Nova", Arial, sans-serif`.
- **Gotham** is a paid Hoefler&Co web licence. Montserrat is the usual free alternative.
- Self-host the fonts with `@fontsource` so no Google request is made at runtime.

## 3. Layout

A long-scroll homepage plus **one page per case study** (`/projects/[slug]`), linked
with Astro View Transitions. This is better for SEO and load time than one 100 MB page,
and every project keeps its full write-up.

```
┌ Preloader (0→100 counter, name reveal, curtain wipe)
├ Top bar: logo · "Menu" button · Book a call   (hides on scroll down, returns on scroll up)
├ 01 HERO        big Fraunces headline + arched portrait #1 + animated workflow-node lines
├ 02 ABOUT       pinned: portrait #2 mask-reveal · text lights up word-by-word · stat counters
├ 03 SERVICES    4 sticky cards that stack on scroll
├ 04 TOOLS       3 infinite marquee rows (Automation / APIs & Dev / CRM & Ops)
├ 05 FLAGSHIP    AI Sales Qualification Engine: pinned architecture diagram draws step by step
│                (GHL → Webhook → FastAPI → OpenAI + Pinecone + Redis → CRM) → video → screenshots
├ 06 PROJECTS    index list 02–09, hover shows a floating screenshot → opens case-study page
├ 07 WHY ME      tilt cards + portrait #3
├ 08 CONTACT     giant "Let's automate your business" marquee + portrait #4 + magnetic CTA
└ Footer         slides up from under the page · VA Services ↗ · back to top with progress ring
```

**Menu:** a full-screen overlay (Espresso background, Lilac hover). The hamburger turns
into an X. Items stagger in as large Fraunces links numbered 01–08. Hovering an item
shows a portrait crop. The menu includes the VA Services ↗ link, email and socials.

**Portraits:** saved in `src/assets/me/`. Astro turns them into AVIF/WebP at build time.
Keep originals in this folder only. Never put them in `public/`, because files there
skip optimisation.

| File | Photo | Placement | Why | Crop / treatment |
|---|---|---|---|---|
| `01-hero-portrait.jpg` | Standing centred, hands behind back, facing camera | **Hero**, arch mask | Symmetrical, calm, direct: the strongest first impression, and it fits a centred arch | Crop from the top of the tree to mid-thigh so the car on the right is cut off. Slow scroll parallax. |
| `02-about-portrait.jpg` | Patchwork dress on the balcony, looking out | **About**, pinned, clip-path reveal | A story shot. Looking away suits the narrative text. The terracotta pillars match Mocha. | Keep it wide (she is small in frame). Reveal from the left pillar inward. |
| `03-why-me-portrait.jpg` | Arms crossed, slight smile | **Why Choose Me** | Arms crossed reads as confident and dependable, which is the message of this section | Crop top to just above the hair to remove the razor wire. Tilt parallax. |
| `04-contact-portrait.jpg` | Big smile, hands on hips | **Contact / CTA** | The warmest, most approachable shot. It makes "let's work together" feel friendly. | Crop to head-to-knee to remove the razor wire. Gentle float animation. |

In the menu overlay, hovering each link shows a small crop of these same four photos,
so no extra files are needed.

Colour: the magenta dress works with the Dusty Plum accent. The cool blue gates and sky
get a light warm grade (CSS `filter: saturate(.92) sepia(.06)`) so all four photos sit
with the browns.

Size: the files are 810×1080 (WhatsApp-compressed). That is enough for the About,
Why Me and Contact spots, which are about 420px wide. For a sharper hero on large and
retina screens, swap `01-hero-portrait.jpg` for the phone original (same filename).
Nothing else needs to change.

## 4. Motion system

Motif: **"things connecting"**. Nodes and lines that draw between them, like a workflow
running. It fits an automation specialist.

| # | Element | Technique |
|---|---|---|
| M1 | Preloader counter + curtain | GSAP timeline |
| M2 | Smooth scroll | Lenis tied to the ScrollTrigger ticker |
| M3 | Headline character/line reveals | SplitText + ScrollTrigger |
| M4 | Workflow lines and pulsing nodes (hero, flagship diagram) | DrawSVG + MotionPath |
| M5 | Portrait mask reveals and parallax | clip-path tween, `scrub` |
| M6 | Word-by-word text highlight (About) | SplitText words, opacity scrub |
| M7 | Stat counters (50–80%, 9 projects, 27 tools) | tween on `textContent` |
| M8 | Stacking service cards | ScrollTrigger pin |
| M9 | Tool marquees that react to scroll speed | ticker + `getVelocity()` |
| M10 | Project hover preview that follows the cursor | `quickTo` |
| M11 | Screenshot lightbox zoom | Flip |
| M12 | Page transitions to case studies | Astro View Transitions + GSAP |
| M13 | Magnetic buttons, tilt cards, custom cursor (desktop only) | `quickTo` |
| M14 | Scroll progress bar + back-to-top ring | ScrollTrigger `onUpdate` |
| M15 | Footer reveal | sticky footer under main |

Guardrails:
- `prefers-reduced-motion` turns motion off and shows the content right away.
- Cursor, magnetic and tilt effects run on pointer devices only.
- On mobile, pins become normal scrolling.
- Animate `transform` and `opacity` only.
- Use `gsap.matchMedia()` for all breakpoints.

## 5. Vercel free-tier notes

- The Hobby plan is for **non-commercial personal use**. A personal portfolio fits.
  Upgrade if the site ever sells services directly (checkout, client portal).
- Use Astro's **static** output. No serverless functions are needed, so the site uses
  no function quota.
- Optimise images **at build time** (`astro:assets` + sharp), not with Vercel Image
  Optimization, which has monthly limits on Hobby.
- The current `images/` folder is **87 MB**.
  - Convert screenshots to AVIF/WebP.
  - Re-encode `Website_integration.mp4` to about 1080p H.264, under 10 MB, with a
    poster image.
  - Lazy-load the video and play it only while it is on screen.
- Keep Vercel Web Analytics (already on the page). The free tier has an event cap.
- Contact stays `mailto:` (or a free Formspree/Tally form), so no backend is needed.

## 6. Task list

### Phase 0 — Decisions (you)
- [x] T0.1 Palette approved (Dusty Plum + Lilac Mist accent)
- [x] T0.2 Fonts approved: Fraunces / League Spartan / Hanken Grotesk (More Sugar dropped)
- [x] T0.3 Portraits saved to `src/assets/me/` and assigned (see §3)
- [x] T0.4 Links: reuse the existing ones: email `mailto:nkechieme.ada@gmail.com`,
      Upwork profile, VA Services portfolio (emexhukwu-nkechi-isaac-portfolio.vercel.app)
- [ ] T0.5 (Optional) Replace the hero photo with the full-resolution original

### Phase 1 — Project setup
- [x] T1.1 Scaffold Astro (static) in the repo and move the current `index.html` to `legacy/`
- [x] T1.2 Install `gsap`, `lenis`, `@fontsource-variable/fraunces`, `league-spartan`, `hanken-grotesk`
- [x] T1.3 Design tokens: CSS variables for colour, type scale (fluid `clamp()`), spacing, radii
- [x] T1.4 Move all copy into content collections (`services.json`, `tools.json`, `projects/*.md`) so nothing is lost
- [x] T1.5 Move and optimise the images and video (§5)
- [x] T1.6 `vercel.json` / Astro config, Vercel analytics, SEO meta, OG image, sitemap

### Phase 2 — Structure (no motion yet)
- [x] T2.1 Base layout, top bar, full-screen menu (keyboard and screen-reader accessible)
- [x] T2.2 Hero, About, Services, Tools, Flagship, Projects index, Why Me, Contact, Footer
- [x] T2.3 Case-study page template plus all 9 projects migrated word-for-word
- [x] T2.4 Accessible lightbox for screenshots
- [x] T2.5 Responsive pass: 360 / 768 / 1280 / 1920

### Phase 3 — Motion
- [x] T3.1 GSAP + Lenis bootstrap, `matchMedia`, reduced-motion switch
- [x] T3.2 Preloader (M1) and hero intro (M3, M4, M5)
- [x] T3.3 Menu open/close timeline and hover portrait
- [x] T3.4 About pin, word highlight, counters (M5–M7)
- [x] T3.5 Stacking service cards (M8)
- [x] T3.6 Velocity marquees (M9)
- [x] T3.7 Flagship architecture diagram draw (M4 scrubbed)
- [x] T3.8 Project hover preview (M10), Flip lightbox (M11), page transitions (M12)
- [x] T3.9 Micro-interactions (M13), progress (M14), footer reveal (M15)

### Phase 4 — Quality and launch
- [ ] T4.1 Lighthouse: at least 90 on Performance, Accessibility and SEO, on mobile and desktop
- [ ] T4.2 Test Safari iOS / Chrome Android / Firefox, and reduced motion
- [ ] T4.3 Deploy a preview on Vercel, review, then promote to production

## Sources
- GSAP 3.13, all plugins free: https://gsap.com/blog/3-13/
- Astro + GSAP portfolio patterns (reveals, Flip, View Transitions): https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/
- Astro + GSAP ScrollTrigger reference build: https://github.com/nilaymastaadmi/portfolio
- Fraunces pairings: https://www.typewolf.com/fraunces
- League Spartan: https://fontpair.co/fonts/google/league-spartan
- Free Gotham alternatives: https://www.typewolf.com/gotham
