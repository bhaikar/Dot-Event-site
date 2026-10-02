# DOT DevOps Team — Website

Multi-page event website for DOT DevOps Team (Hackathon + Gamethon), built with Next.js App
Router and Tailwind CSS v4.

## Stack

- **Next.js 16 (App Router)** — file-based routing, one route per page in the site map
- **Tailwind CSS v4** — utilities for layout/spacing, custom CSS in `app/globals.css` for the
  glass-panel / glow / grid design system
- **next/font/google** — Chakra Petch (headings/labels) + Manrope (body), self-hosted at build
  time
- Plain JavaScript (no TypeScript)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build — verifies every route compiles & prerenders
npm run start   # run the production build locally
npm run lint     # ESLint
```

> **Note:** the very first `npm run build` needs internet access so Next.js can fetch Chakra
> Petch / Manrope from Google Fonts once and cache them locally. This works out of the box on
> Vercel, GitHub Actions, or any normal dev machine — it only fails in fully offline/sandboxed
> environments.

## Project structure

```
app/
  layout.js              Root layout — fonts, background layers, Navbar, Footer
  globals.css            Design tokens (brand colors) + custom effect classes
  page.js                Home                       /
  about/page.js           About Us                   /about
  events/
    page.js               Events listing             /events
    hackathon/
      page.js             Hackathon details           /events/hackathon
      register/page.js    Hackathon registration      /events/hackathon/register
    gamethon/
      page.js             Gamethon details             /events/gamethon
      register/page.js    Gamethon registration        /events/gamethon/register
  gallery/page.js         Gallery                     /gallery
  sponsors/page.js        Sponsors                    /sponsors
  not-found.js            404 page

components/               Shared UI — Navbar, Footer, EventCard, EventDetail,
                           RegisterForm, GalleryGrid, FaqAccordion, Reveal, etc.
data/
  events.js               Hackathon & Gamethon content (rules, timeline, FAQ...)
  gallery.js               Gallery placeholder items + filter categories
public/images/mascot.webp  DOT mascot asset
```

## Editing content

- **Event details** (rules, timeline, prizes, FAQ, eligibility): edit `data/events.js` — both
  event pages read from this file, so there's one place to update per event.
- **Gallery items**: edit `data/gallery.js`. Real photos can replace the placeholder tiles in
  `components/GalleryGrid.js` (swap the placeholder `<div>` for a Next `<Image>`).
- **Sponsors**: edit `app/sponsors/page.js` — replace the `SponsorBox` placeholders with real
  names/logos as partnerships are confirmed.
- **Colors/typography**: all in `app/globals.css` under `:root` — change once, applies
  everywhere.

## Registration forms — current state

`components/RegisterForm.js` does client-side validation (required fields, email/phone format)
and shows a success state on submit, but **does not send data anywhere yet** — there's no
backend wired up. The submit handler is clearly marked with a `// NOTE:` comment showing where
to add a real API call, Supabase insert, or email trigger when you're ready to build that out.

## Deploying

Push to GitHub, then import the repo on [vercel.com](https://vercel.com) — no config needed,
Vercel auto-detects Next.js. Every push to `main` redeploys automatically.
