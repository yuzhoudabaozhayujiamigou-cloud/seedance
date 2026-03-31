# Landing v1 Implementation Report

## Scope Completed
Implemented Seedance marketing landing v1 redesign per `reports/landing-v1-spec.md` across `src/components/landing/*`, preserving the section order and generator-first flow.

## What Changed

### 1) Header (`src/components/landing/header.tsx`)
- Updated sticky behavior to match spec:
  - Transparent over hero at top.
  - Becomes `rgba(245,247,251,0.9)` with `#E5E7EB` border after scroll.
- Optimized scroll handling to avoid heavy updates:
  - Passive scroll listener + `requestAnimationFrame` + state update only on threshold change.
- Kept locale switch, auth actions, and user menu.
- Refreshed visual style to v1 minimal premium palette.

### 2) Hero (`src/components/landing/hero-section.tsx`)
- Rebuilt hero to full-viewport style.
- Added required background layers:
  - Background video.
  - Vignette/gradient overlays.
  - Subtle grain texture using `/images/noise.webp`.
- Kept existing generator workflow and submission logic intact.
- Updated copy to concise format with i18n keys.
- Primary CTA now uses required text in English locale: `Generate my first ad — Free`.

### 3) Section Redesigns
- `src/components/landing/how-it-works-section.tsx`
  - Simplified 3-step workflow cards with subtle entrance motion and hover lift.
- `src/components/landing/features-section.tsx`
  - Converted to 3-card feature grid per spec.
- `src/components/landing/showcase-section.tsx`
  - Redesigned demo/gallery cards with subtle motion and hover lift.
- `src/components/landing/testimonials-section.tsx`
  - Replaced hardcoded copy with i18n-driven testimonials.
  - Removed unverified numerical claims.
- `src/components/landing/pricing-section.tsx`
  - Rebuilt as minimal premium pricing section.
  - Uses configured monthly plans from `SUBSCRIPTION_PRODUCTS` (no fabricated pricing).
- `src/components/landing/faq-section.tsx`
  - Refined visual style and maintained FAQ JSON-LD.
  - Removed speculative “+40%” claim language.
- `src/components/landing/cta-section.tsx`
  - Reworked final CTA block with minimal premium style and i18n copy.
- `src/components/landing/footer.tsx`
  - Updated to redesigned footer style and removed hardcoded marketing copy.

### 4) i18n Updates (`src/messages/en.json`, `src/messages/zh.json`)
- Updated landing namespaces to avoid hardcoded section copy:
  - `Hero`, `HowItWorks`, `Features`, `Showcase`, `CTA`, `FAQ`, `Footer`.
- Added new namespaces:
  - `Testimonials`
  - `PricingLanding`
- Ensured all new landing text is translation-backed.

### 5) Metadata Cleanup (`src/app/[locale]/(marketing)/page.tsx`)
- Updated homepage title/description metadata copy to neutral, non-inflated claims.

## Validation

### Command: `pnpm -s lint`
- Result: **Failed** (repo-wide pre-existing lint issues unrelated to this landing change).
- Biome reported 55 total errors across multiple non-landing files (e.g. `scripts/*`, admin pages, generator internals).
- Landing files modified in this task were checked separately and pass Biome.

### Command: `pnpm -s typecheck`
- Result: **Passed**.

### Command: `pnpm -s build`
- Result: **Failed** due missing required environment variables in this environment:
  - `BETTER_AUTH_SECRET`
  - `NEXT_PUBLIC_APP_URL`
  - plus auth/email env requirements.

### Additional verification build (with temporary env values)
- Command run with temporary env vars for required keys.
- Result: **Passed**.
- Build still emits an existing warning unrelated to this redesign:
  - `Module not found: Can't resolve 'undici'` from `src/lib/proxy-config.ts` import path.

## Notes
- Section order on homepage remains:
  - Hero -> HowItWorks -> Features -> Showcase -> Testimonials -> Pricing -> FAQ -> Final CTA -> Footer.
- Core product flow remains functional (generator still embedded in hero).
