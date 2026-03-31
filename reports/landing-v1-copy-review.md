# Seedance Landing v1 — Copy Review & Recommendations

---

## 1. Recommended English Copy

### Header

| Element | Copy |
|---|---|
| Logo label | Seedance |
| Nav: Generate | Generate |
| Nav: Templates | Templates |
| Nav: Examples | Examples |
| Nav: Pricing | Pricing |
| Nav: API | API |
| Primary CTA (logged-out) | Get started free |
| Sign-in link | Sign in |
| Credits badge | {n} credits |

---

### Hero

| Element | Copy |
|---|---|
| Eyebrow badge | Seedance 1.5 · Ecommerce product video |
| H1 | Generate product ads in minutes. |
| Subhead | Upload a product image, write a brief, and render video creative for ads, feeds, and listings — no production team required. |
| Primary CTA | Generate my first ad — Free |
| Secondary CTA | See examples |
| Micro-trust bullet 1 | Start with {credits} free credits |
| Micro-trust bullet 2 | No credit card required |
| Micro-trust bullet 3 | Commercial use included |

> **Notes:** H1 is short and ends with a period — intentional rhythm break, not laziness. The three trust bullets are grounded in real config values (`NEW_USER_GIFT.credits = 2`, `validDays = 30`, commercial feature included in all paid plans). Do not add invented user counts or revenue figures here.

---

### How It Works

**Section heading:** From brief to first draft in three steps

| Step | Title | One-line description |
|---|---|---|
| 1 | Write the brief | Describe the product, audience, and visual direction. |
| 2 | Add product assets | Upload a product photo or reference image and choose a format. |
| 3 | Generate and iterate | Create variations, compare outputs, download the best version. |

**Section CTA:** Open generator

---

### Features

**Section heading:** Built for ecommerce creative workflows

| Card | Title | One sentence |
|---|---|---|
| 1 | Product-focused motion | Models are tuned for clear product framing and stable, controlled movement. |
| 2 | Text and image inputs | Start from a prompt, a product photo, or a reference image — all in one generator. |
| 3 | Ready for key channels | Output formats sized for ad placements, social feeds, and product detail pages. |

**Section sub-label:** Why Seedance

---

### Showcase / Demo

**Section heading:** Example outputs

**Section sub-label:** Generated with Seedance

| Card | Title | One sentence |
|---|---|---|
| 1 | Lifestyle product shot | A skincare product rendered in a clean studio setting with soft ambient motion. |
| 2 | Social feed format | A 9:16 clip showing a product with text overlay suitable for Instagram and TikTok feeds. |
| 3 | Product detail page clip | A 16:9 walkthrough clip showing product angles, suited for listing pages. |

> **Note:** Label these explicitly as *generated examples*, not verified customer outputs. Use `badge: "Generated with Seedance"` or similar. Do not use real Unsplash stock images as stand-ins for AI output — it implies false proof of capability.

---

### Testimonials / Social Proof

**Recommended approach:** Replace attributed testimonials with "Example Results" cards until real, verifiable user quotes are collected.

**Section heading:** What you can create

| Card | Label | Body |
|---|---|---|
| 1 | Ad creative | A 15-second product ad for a skincare line, generated from two product images and a one-sentence brief. |
| 2 | Feed content | A 9:16 vertical clip showing a kitchen product in use, exported directly from the generator. |
| 3 | Listing video | A 30-second product walkthrough for an Amazon listing, created without a camera or editor. |

> These are format descriptions, not performance claims. They show *what the tool produces*, not invented ROI or reach metrics.

---

### Pricing

**Section heading:** Straightforward monthly plans

**Section sub-label:** Pricing

**Section description:** Use the plan that fits your creative volume. Switch or cancel anytime.

| Tier | Label | One-liner |
|---|---|---|
| Basic | Basic | For individual sellers validating new products and creative angles. |
| Pro | Pro | For teams running frequent ad testing and weekly product launches. |
| Ultimate | Ultimate | For larger catalogs and multi-brand creative operations. |

**Shared feature lines (all plans):**
- Access to Seedance video generation models
- Commercial use included
- Upgrade, downgrade, or cancel anytime

**Pricing note (below plans):** Need annual billing or a one-time credit pack? See the full pricing page.

> **Constraint:** Do not use the word "unlimited" for any credit-backed resource. Credits are finite by design — using "unlimited" is both inaccurate and a support liability.

---

### FAQ

**Q1: What kind of videos can I generate?**
Seedance generates short product videos from prompts and product images. Typical outputs include ad creatives, social feed clips, and product detail page videos in standard aspect ratios (16:9 and 9:16).

**Q2: Do I need video editing experience?**
No. The generator takes a text brief and a product image as inputs. You select a format and duration, then download the rendered clip.

**Q3: Are the videos I generate mine to use commercially?**
Commercial use is included with paid plans. Check the pricing page for the exact terms applicable to each plan tier.

**Q4: How many credits does a video cost?**
Credit cost depends on the model, duration, and output quality you select. The generator shows the credit cost before you confirm each generation.

**Q5: What happens when I run out of credits?**
You can purchase a credit pack or upgrade your plan at any time. Unused credits roll over according to your plan's expiry policy — see the pricing page for details.

---

### Final CTA

| Element | Copy |
|---|---|
| H2 | Start generating product videos today. |
| Subhead | Upload a product image and create your first ad-ready clip with your free starting credits. |
| Primary CTA | Generate my first ad — Free |
| Risk reversal line | No credit card required. Cancel or pause your plan anytime. |

---

### Footer

**One-line tagline:** AI product video for ecommerce teams.

**Footer nav — Product column:** Generate · Templates · Examples · Pricing · API

**Footer nav — Legal column:** Privacy · Terms

**Copyright line:** © {year} Seedance. All rights reserved.

> **Action required:** The current footer uses the `VideoFly` brand name in `src/messages/en.json` (`Footer.madeBy`). Replace with `Seedance` throughout. Brand inconsistency on the landing page erodes trust.

---

## 2. Anti-AI Checklist

Apply these checks before shipping any copy change to this landing page.

1. **No invented numbers.** Every figure (credit counts, prices, durations) must be derived from `pricing-user.ts` or verified config. No `12,000+` users, no `$X saved` claims.
2. **No superlatives without proof.** Avoid "best", "fastest", "most advanced" unless supported by a named benchmark. Use concrete descriptors instead (e.g. "tuned for product framing").
3. **Testimonials are verified or removed.** Any attributed quote must have a real, contactable source. If not available, use "Example Results" format instead.
4. **Showcase images reflect actual output.** Do not use Unsplash stock as a proxy for AI-generated video output. Label all showcase content as "Generated with Seedance" if it is.
5. **"Free" means free.** If a free tier requires a credit card at any point, remove "No credit card required" from copy immediately.
6. **No passive voice hiding the agent.** Rewrite "videos are generated" → "Seedance generates" so the product's role is unambiguous.
7. **No AI filler phrases.** Audit for: *seamlessly*, *revolutionize*, *cutting-edge*, *game-changing*, *effortless*, *powerful*, *robust*. Delete on sight.
8. **CTAs name the action.** "Get started" alone is weak. Prefer "Generate my first ad", "Open generator", "See examples" — verbs that describe exactly what happens next.
9. **Brand is consistent.** Every component must say "Seedance", not "VideoFly". Check `en.json` and `zh.json` footer keys.
10. **Pricing copy matches config.** After any change to `pricing-user.ts`, re-read the pricing section copy and confirm plan names, credit amounts, and tier descriptions still match.

---

## 3. Risky-Claim Audit

### Claims to Avoid → Safer Alternatives

| Risky claim (current or potential) | Why it's risky | Safer alternative |
|---|---|---|
| `in minutes` (Hero subhead, Metadata description) | Undefined promise — generation time varies by model, queue, and output length | Remove or qualify: "Render without a production team" |
| `launch-ready video creative` (Hero subhead) | Implies no further editing required; outputs may need review | `ad-ready video drafts` or `video creative ready to review` |
| Named testimonials with 5-star ratings | Legally risky if synthetic or unverifiable; FTC guidance requires disclosure | Replace with "Example Results" cards describing output format, not user ROI |
| `unlimited` (if ever added to pricing) | Credits are finite; "unlimited" is architecturally false | State exact credit allotment per plan |
| Stock images in Showcase presented as AI output | Misleads on actual model capability | Use real Seedance outputs labeled "Generated with Seedance", or use clearly labeled placeholder frames |
| `AI product video generator for ecommerce ads` (Metadata title) | Fine as a descriptor, but ensure the tool actually supports ad-spec formats before keeping | Keep only if 16:9/9:16 outputs are documented as ad-compatible |
| `Commercial usage included` in pricing features | Accurate for paid plans, but free tier must be scoped separately | Add qualifier: "on paid plans" if free tier has different rights |
| `VideoFly` in footer while page is branded `Seedance` | Creates trust gap — visitors may think the product changed hands or is a resale | Replace all `VideoFly` references in `en.json` and `zh.json` footer keys |
| Speed benchmarks (if added later) | Any "X seconds per video" claim becomes a liability if queues are slow | Omit time benchmarks from landing copy entirely unless sourced from p50 production data |


