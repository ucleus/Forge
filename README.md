# Forge — AI Prompt Builder

A client-side prompt builder for AI image and video generation tools. No backend, no login — runs entirely in the browser. Build structured, detailed prompts for fashion mockups, Midjourney images, and cinematic video scenes.

---

## Modules

### Fashion Builder (`index.php`)

Builds apparel mockup prompts for AI image generators (Midjourney, DALL-E, Stable Diffusion, Firefly). Structured around 5 sections that assemble into a single production-ready prompt.

**Section 01 — Garment**
Define the core product being shown. Choose garment type (T-shirt, hoodie, etc.), color, fit/style, print finish, and design size. Use the placement chip grid to specify exactly where the design sits on the garment — front center, left chest, back, sleeves, hood, and combos.

**Section 02 — Model**
Set the model's physical attributes: age range, gender, race/ethnicity, body type, height, skin tone, hair style, and facial hair. These fields compose the "featuring a..." clause of the prompt.

**Section 03 — Styling**
Add the full outfit around the garment. Pick bottom wear, footwear, and headwear from dropdowns. Use the Accessories chip grid (sunglasses, bags, phone, headphones) and Jewelry chip grid (chains, earrings, grills) to layer details.

**Section 04 — Creative Direction**
Controls the visual language of the shot. Set style direction (streetwear, luxury, editorial, etc.), pose, camera angle, background/scene, lighting mood, model expression, and overall image type (studio mockup, lifestyle, e-commerce, lookbook, etc.).

**Section 05 — Custom Notes**
Free-text field for anything the other sections don't cover — specific graphic descriptions, brand name placement, special effects, background details, or art direction notes.

**Prompt Bar**
The assembled prompt updates in real time as you fill sections. Click **Build** to force a refresh, **Copy Prompt** to copy to clipboard, and **Reset** to clear everything and start over.

**Stat Cards**
Live summary at the top: Garment type selected, Model attributes filled, Styling items chosen, and overall Prompt Status (Draft → Ready once 6+ fields are filled).

**Progress Dots**
Five dots in the header track section completion. Gray = empty, dim lime = partial, bright lime = 100% complete.

**Filter Bar**
Two dropdowns — Garment Type and Style Direction — let you pre-set key fields without entering the section. The search box filters visible chips and dropdown options in real time.

---

### Midjourney Builder (`midjourney.php`)

Builds Midjourney-ready prompts optimized for current parameter syntax, including flags like `--ar`, `--v`, `--s`, `--chaos`, `--sref`, and `--oref`.

**Quick Presets**
Seven one-click presets that load sensible defaults for common output types:
- Realistic Photo
- Profile / Headshot
- Fashion Shoot
- Pixar 3D
- 2D Cartoon
- Anime
- Concept Art

Each preset populates Output Mode, style keywords, and recommended parameters automatically.

**Section 01 — Output Mode**
Choose the image type (Realistic Photo, 3D Animation, Flat Illustration, Anime, etc.). This drives the style keywords injected into the prompt automatically from the style map.

**Section 02 — Subject**
Describe the main subject — who or what is in the image, their appearance, clothing, and action.

**Section 03 — Style & Mood**
Art style, color palette, mood/atmosphere, and lighting direction. These refine the aesthetic beyond what the output mode sets.

**Section 04 — Camera & Composition**
Lens type, camera angle, shot framing (close-up, wide, overhead, etc.), and depth of field.

**Section 05 — Parameters**
Midjourney-specific flags. Set aspect ratio, version (`--v 6.1`), stylize value, chaos, quality, and tile mode. Selected parameters appear as chips above the prompt output so you can see exactly what flags will be appended.

**Section 06 — Advanced**
Negative prompts (`--no`), seed value for reproducibility, stop value, and image weight if using an image reference URL.

**Parameter Chips**
The bar above the prompt output shows all active `--flag value` pairs at a glance.

---

### Cinematic Builder (`cinematic.php`)

Builds prompts for AI video generation platforms. Supports platform-specific formatting with a dark cinema-themed UI.

**Platform Tabs**
Switch between platforms at the top — each adjusts prompt structure and terminology to match what that platform expects:
- **Sora** (OpenAI)
- **Veo 3** (Google)
- **Midjourney** (video mode)
- **Runway** (Gen-3)
- **Kling**
- **Pika**

**Character Lock Card**
Lock in a character description that persists across all sections — name, appearance, clothing. This prevents character drift between prompt sections.

**Scene & Environment**
Location, time of day, weather, atmosphere, and background detail. These establish the world the character inhabits.

**Camera Direction**
Shot type, camera movement (pan, dolly, handheld, orbit), angle, and lens style. Directly translates to cinematic language video models understand.

**Action & Motion**
What the character is doing, how they move, and at what pace. Includes motion intensity and any secondary motion in the scene (wind, crowd, particles).

**Lighting & Color**
Lighting setup, color grading style, contrast level, and color temperature. References real cinematography styles (golden hour, neon noir, desaturated thriller, etc.).

**Technical**
Frame rate, aspect ratio, duration, and rendering quality keywords tailored to the selected platform.

---

## How Prompts Are Built

Every section contributes a clause to the final prompt. Fields left blank are skipped — the prompt is never padded with placeholders. The builder composes natural language sentences rather than a comma-dump, which produces better AI output.

Example output (Fashion):

> Create a lifestyle shot featuring a young adult, black / african / afro-caribbean, male model with a athletic build, approximately tall (5'11"–6'3") tall, brown skin tone. The model is wearing a black oversized / boxy t-shirt (crew neck). The model has short fade hair and clean-shaven facial hair. Place the design (large) at: front center, left sleeve with screen print finish. Style with baggy jeans and sneakers (high-top). Accessories: snapback, thin chain. Direction: streetwear style, standing relaxed pose, 3/4 angle angle, urban street background, natural daylight, confident expression. Make fabric folds, print placement, shadows, and proportions look premium and realistic like a professional fashion campaign.

---

## File Structure

```
Forge/
├── index.php           — Fashion Builder
├── midjourney.php      — Midjourney Builder
├── cinematic.php       — Cinematic Builder
├── dalle.php           — Dall-e landing page
├── nanobanana.php      — Nano Banana landing page
├── characters.php      — Characters landing page
├── assets/
│   ├── css/
│   │   ├── styles.css      — Shared base styles
│   │   ├── midjourney.css  — Midjourney-specific styles
│   │   └── cinematic.css   — Cinematic-specific dark theme overrides
│   └── js/
│       ├── core.js         — Shared utilities and nav helpers
│       ├── script.js       — Fashion Builder logic + data
│       ├── midjourney.js   — Midjourney Builder logic + data
│       └── cinematic.js    — Cinematic Builder logic + data
├── scripts/
│   └── regression-smoke.sh — Cross-module smoke checks
└── .gitignore
```

---

## Browser Support

Works in all modern browsers. Copy to clipboard requires HTTPS for the native Clipboard API — a `execCommand` fallback handles plain HTTP.

---

## Roadmap

See [AUDIT.md](AUDIT.md) for the full bug history, completed fixes, and planned features including SaaS conversion, user accounts, saved collections, and Stripe billing.
