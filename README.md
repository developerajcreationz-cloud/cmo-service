# Ahmad Jan: personal brand site

Next.js (App Router, TypeScript) with GSAP (ScrollTrigger, SplitText, Flip, CustomEase) and Lenis smooth scroll.

## Pages
| Route | Notes |
|---|---|
| `/` | Intro curtain, hero, marquee, featured projects, reviews, case-study carousel, "operator's advantage", closing CTA |
| `/work/` | Project index |
| `/case-studies/` | Case-study index |
| `/fractional-cmo-services/` | Full-page sheet layout |

Project and case-study **detail pages are not built yet**. Cards render without links until
`detailPagesLive` in `content/site.ts` is set to `true` and the routes exist.

## Content
All copy, numbers, links and the contact URL live in `content/site.ts`. Anything marked `PLACEHOLDER` is
stand-in text so the layout can be reviewed; replace it with real, verifiable content before launch.
Images in `public/img/` are generated SVG placeholders (`node scripts/make-placeholders.mjs`); replace them
with real photography and update the paths in `content/site.ts` / the page files.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy on Hostinger (Node.js web app hosting)
- Framework: **Next.js**, Node 20+ (22 recommended)
- Install: `npm install`  ·  Build: `npm run build`  ·  Start: `npm start`
- Connect the GitHub repo for auto-deploy on push.
- Set `site.url` in `content/site.ts` to the production domain (used for canonical / Open Graph URLs).

## Motion
`components/Motion.tsx` is mounted once in the root layout and re-initialises on every route change. Pages are
plain server-rendered markup that opt in via `data-*` attributes (`data-split`, `data-card`, `data-magnetic`, ...).
Reduced-motion users get no Lenis, no intro and no scroll animations.
