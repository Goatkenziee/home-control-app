# BRAIN.md

## What this app does
Home control dashboard app — control Wi-Fi home devices (thermostats, lights, plugs, fans, AC, sensors) from the browser.

## Current state
Production build fix complete. The `pages/` directory with empty 0-byte `_app.tsx` and `_document.tsx` files was removed. Next.js 14.2 was trying to load both App Router (`app/`) and Pages Router (`pages/`) simultaneously, and the empty Pages Router files caused `PageNotFoundError` during the "Collecting page data" phase of the build.

## Tech stack
- Next.js 14.2.5 (App Router)
- React 18
- Tailwind CSS 3.4
- TypeScript
- lucide-react (icons)
- clsx + tailwind-merge (class utilities)

## What has been built
- `.gitignore`
- `CRITERIA.md`
- `PROJECT_STATE.json`
- `app/globals.css` — Tailwind base + custom CSS variables
- `app/layout.tsx` — Root layout with dark theme
- `app/page.tsx` — Main dashboard page with device cards, thermostat controls, brightness sliders
- `components/ui/button.tsx` — Reusable button component (default/ghost/outline variants)
- `components/ui/card.tsx` — Reusable card component
- `lib/mock-data.ts` — Mock smart home devices data
- `lib/store.ts` — Zustand-like state store (custom implementation)
- `lib/types.ts` — TypeScript types for devices
- `lib/utils.ts` — cn() utility with clsx + tailwind-merge
- `next-env.d.ts`
- `next.config.mjs`
- `package.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`

## Latest verification
- ✅ Build fix: Removed `pages/_app.tsx` and `pages/_document.tsx` (0-byte empty files causing PageNotFoundError)
- Build now compiles successfully

## What's still pending
- Deploy to Vercel
- Replace mock data with real Wi-Fi/API integration
- Add device control functionality (toggle on/off, set temperature, adjust brightness)

## User preferences detected
- Keep changes focused, modern, and production-ready.

## Run notes
- Last updated: 2026-06-23T22:04:11.156Z
- Autonomous iteration: 0
