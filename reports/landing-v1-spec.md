# Seedance Landing v1 Spec (Minimal Premium)

Goal: Minimalist premium marketing landing based on provided spec; keep core product flow working.

Non-negotiables:
- No fake claims (remove unverified numbers / claims).
- Keep i18n via next-intl; update translations, avoid hardcoding.
- Performance: no heavy scroll listeners.

Palette:
- Primary: #1E2A78
- Accent: #FF6A00
- Neutrals: #0B0F1A, #F5F7FB

Header:
- Sticky, transparent over hero, becomes rgba(245,247,251,0.9) + border #E5E7EB after scroll.

Hero:
- Full viewport feel, background video + vignette overlay + subtle grain.
- Copy: short, concrete.
- Primary CTA: "Generate my first ad — Free".
- Keep existing generator if possible; otherwise provide CTA to tool.

Sections order:
Hero -> HowItWorks -> Features(3 grid) -> Showcase/Demo -> (Testimonials or Example Results) -> Pricing -> FAQ -> Final CTA -> Footer.

Animations:
- Entrance fade/translate for sections (subtle).
- Card hover lift.

Deliverables:
- Update components under src/components/landing/*.
- Report: reports/landing-v1-implementation.md
- Must pass: pnpm lint, pnpm typecheck, pnpm build.
