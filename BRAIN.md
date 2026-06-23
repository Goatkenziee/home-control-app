# BRAIN.md

## What this app does
A browser-based smart home dashboard for controlling Wi-Fi connected home devices (lights, plugs, thermostats, fans, sensors, AC units).

## Current state
✅ Build passes clean — both TypeScript check and Next.js production build succeed.

## Tech stack
- **Framework**: Next.js 14.2 (App Router + Pages Router hybrid)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: localStorage-backed store (client-side)
- **UI**: Custom Button/Card components with shadcn-inspired variants

## What has been built
- **Dashboard** (`app/page.tsx`): Device cards with power toggle, brightness slider, thermostat controls, energy summary
- **Device types**: lights, plugs, switches, thermostats, fans, AC units, sensors
- **Store** (`lib/store.ts`): CRUD for devices, rooms, scenes, schedules with localStorage persistence
- **Mock data** (`lib/mock-data.ts`): Sample devices across rooms with realistic energy usage
- **UI Components**: Button (with variant/size/asChild), Card (with header/content/footer)
- **Pages Router**: Custom `_app.tsx` and `_document.tsx` for hybrid routing support

## Verification status
- [x] TypeScript check (`tsc --noEmit`): PASS
- [x] Production build (`next build`): PASS
- [ ] Deployment: pending

## Known issues
- No actual IoT/WiFi control yet — uses mock data and localStorage
- No real device discovery or pairing flow
