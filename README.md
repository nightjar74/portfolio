# Design Portfolio

This project is a customized fork of the **Magic Portfolio** template, rebuilt to showcase a more interactive portfolio experience using **Next.js** and **Once UI**.

---

## What I changed

This version adds custom pages, interactive media, smooth scrolling, and new UI components on top of the original template.

### Major updates

- Added a new `/videoGallery` route with a custom video gallery page.
- Built hover-preview video cards plus a modal video player.
- Replaced the default navigation with a responsive custom sidebar.
- Added a custom contact footer component.
- Created a custom project showcase with pixel trail visuals, carousel controls.
- Added `LineWaves` and `PixelTrail` visual components for dynamic backgrounds.
- Added `SmoothScroll` smooth scrolling effect.

### Key files and folders

- `src/app/videoGallery/page.tsx` — new video gallery route.
- `src/components/video/` — video cards, modal player, gallery layout.
- `src/components/Sidebar.tsx` — responsive nav and mobile menu.
- `src/components/ContactFooter.tsx` — footer CTA section.
- `src/components/work/ClientShowcase.tsx` — custom work showcase.
- `src/components/ui/` — custom button components, confetti, aurora text, line waves, and pixel trail visuals.
- `src/hooks/` — custom hooks for video interaction, carousel state, texture preloading, and lightbox behavior.
- `src/types/videoTypes.ts` — typed video item definitions.
- `src/utils/preloadTexture.ts` — texture preload helper.
- `src/components/ui/smoothScroll.tsx` — smotth scrolling effect.

---

## 🚀 Run locally

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

---

## 🧱 Notes

This repo is no longer just the base Magic Portfolio template. It now includes custom interactive media, new layout components, and several new routes for video and work showcase content.
