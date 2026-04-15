# Forge — Code Audit & Upgrade Tracker

**Audit Date:** April 13, 2026
**Execution Update:** April 15, 2026
**Auditor:** Claude Sonnet 4.6
**Scope:** Full codebase review — bugs, architecture, SaaS viability, feature gaps

---

## Summary

Forge is a client-side AI prompt builder with three modules: Fashion, Midjourney, and Cinematic. The app runs entirely in the browser with no backend. The audit identified 10 bugs (2 critical, 5 medium, 3 minor), an accessibility violation, and several architectural issues that must be resolved before a SaaS conversion.

---

## Bugs Found

### Critical

#### BUG-01 — `renderSectionList` declared twice
**File:** `assets/js/script.js` (lines 180 and 551)
**Status:** Fixed

The function was defined twice. The first definition (line 180) generated section list items without `data-key` attributes. The second definition (line 551) correctly included `data-key`, which `updateSidebar()` depends on to patch the DOM without a full re-render. Because the second definition overwrote the first at runtime, the sidebar worked — but only by accident. Any reordering of the code would have silently broken sidebar updates.

**Fix:** Deleted the first definition entirely. Only the correct version with `data-key` remains.

---

#### BUG-02 — "Rings" in both Accessories and Jewelry caused cross-list chip toggling
**File:** `assets/js/script.js`
**Status:** Fixed

The word "Rings" appeared in both the `accessories` and `jewelry` data arrays. `toggleAcc()` matched chips by `textContent.trim()` across all `.m-chip` elements — no scoping by list type. Clicking Rings in Accessories also visually activated Rings in Jewelry, and vice versa. The state Sets were updated correctly, but the UI showed both toggled.

**Fix (two-part):**
1. Renamed entries to `"Rings (Hand)"` in accessories and `"Rings (Jewelry)"` in jewelry to eliminate ambiguity.
2. Added `data-type="acc"` and `data-type="jew"` attributes to chips at render time. `toggleAcc()` now queries `.m-chip[data-type="${type}"]` so only the correct list's chips are toggled.

---

### Medium

#### BUG-03 — Clipboard copy silently failed on HTTP
**File:** `assets/js/script.js` — `copyPrompt()`
**Status:** Fixed

`navigator.clipboard.writeText()` is restricted to secure contexts (HTTPS or localhost). On plain HTTP the call threw silently — no toast, no error, nothing. There was also no `.catch()` handler.

**Fix:** Added a `window.isSecureContext` guard. If the modern API is unavailable or throws, a `fallbackCopy()` function uses a temporary `<textarea>` + `document.execCommand('copy')` as a fallback.

---

#### BUG-04 — `maximum-scale=1.0` disabled pinch-to-zoom on mobile
**Files:** `index.html`, `midjourney.html`, `cinematic.html`, `_index.html`
**Status:** Fixed

All four files had `maximum-scale=1.0` in the viewport meta tag, preventing users from zooming on mobile. This is a WCAG 1.4.4 violation and particularly bad for a tool used on phones to copy prompts.

**Fix:** Removed `maximum-scale=1.0` from all viewport metas.

---

#### BUG-05 — No localStorage persistence — all work lost on page refresh
**File:** `assets/js/script.js`
**Status:** Fixed

The entire state (all dropdowns, chips, textarea, current section) lived only in memory. Refreshing the page wiped everything with no warning.

**Fix:** Added `saveToStorage()` / `loadFromStorage()` using `localStorage` key `forge_fashion_state`. Saves a JSON snapshot of `state`, all three `Set` values (placements, accessories, jewelry), and `currentSection`. All mutating functions are patched to auto-save on every change. `resetAll()` clears the stored key. Filter bar dropdowns are restored from saved state on init.

---

#### BUG-06 — Search hides `<option>` elements — broken in Safari
**File:** `assets/js/script.js` — `handleSearch()`
**Status:** Fixed (April 15, 2026)

`option` elements do not respect `display:none` in Safari or iOS WebKit. The search feature silently does nothing on Apple devices when filtering dropdown options.

**Fix:** Replaced option filtering with `disabled` + `hidden` attributes while preserving the placeholder option.

---

#### BUG-07 — "Done" panel tab has no click handler
**Files:** `index.html`, `assets/js/script.js`
**Status:** Fixed (April 15, 2026)

The "Done" tab in the left panel had no click handler in Fashion, and no filter implementation in `script.js`.

**Fix:** Added tab click handlers and implemented `setFilter(mode, btn)` to switch between all sections and completed-only sections.

---

### Minor

#### BUG-08 — `+ New Prompt`, `Collections`, `Export`, `⊞`, `⚙` are non-functional stubs
**Files:** `index.html`, `midjourney.html`
**Status:** Open — deferred to feature work

All nav action buttons have no handlers. Acceptable for current state; will be addressed during SaaS build.

---

#### BUG-09 — Icon buttons `←` `→` have no `aria-label`
**Files:** `index.html`, `midjourney.html`
**Status:** Fixed (April 15, 2026)

Added `aria-label="Previous section"` and `aria-label="Next section"` to both modules for screen-reader clarity.

---

#### BUG-10 — Word count shows `0 words` when default intro text exists
**File:** `assets/js/script.js` — `buildPrompt()`
**Status:** Fixed (April 15, 2026)

The word stat now always reflects the actual generated prompt text, including the default intro line.

---

## Architecture Issues

### ARCH-01 — Three different CSS architectures across four files
`index.html` links to `assets/css/styles.css`. `midjourney.html` links to the same stylesheet but adds a `<style>` block for extras. `cinematic.html` and `_index.html` embed all CSS inline (30k+ tokens each). Styles have already diverged — the Cinematic dark theme redefines variables that conflict with the shared stylesheet. Any global style change requires editing 3 separate places.

**Plan:** Consolidate into `assets/css/styles.css` (shared tokens + layout), `assets/css/cinematic.css` (dark theme overrides), `assets/css/midjourney.css` (module extras).

---

### ARCH-02 — `_index.html` is an orphaned draft
`_index.html` is a self-contained copy of the Fashion Builder with all CSS inlined. It is not linked from anywhere and appears to be an earlier version. It will cause confusion as the codebase grows.

**Plan:** Delete or archive `_index.html` once it's confirmed no content is missing from `index.html`.

---

### ARCH-03 — No shared JS across modules
Midjourney and Cinematic each embed their full script inline. Utility functions (`copyPrompt`, `buildPrompt`, toast logic, search, reset) are duplicated across files with slight variations. A bug fix in one doesn't carry to the others.

**Plan:** Extract shared utilities into `assets/js/core.js`. Module-specific logic stays in `assets/js/fashion.js`, `assets/js/midjourney.js`, `assets/js/cinematic.js`.

---

## Completed Fixes (April 13, 2026)

| ID | Issue | File | Resolution |
|----|-------|------|------------|
| BUG-01 | Duplicate `renderSectionList` | script.js | Deleted first definition |
| BUG-02 | "Rings" cross-list chip toggle | script.js | Renamed entries + `data-type` scoping |
| BUG-03 | Clipboard silent fail on HTTP | script.js | `isSecureContext` guard + `execCommand` fallback |
| BUG-04 | `maximum-scale=1.0` zoom lock | All HTML | Removed from all 4 viewport metas |
| BUG-05 | No localStorage persistence | script.js | Full save/load system added |
| BUG-06 | Safari option search broken | script.js | Use disabled + hidden for option filtering |
| BUG-07 | Done tab non-functional | index.html + script.js | Added handlers + setFilter logic |
| BUG-09 | Missing aria labels on arrows | index.html + midjourney.html | Added aria-label attributes |
| BUG-10 | Inaccurate empty word count | script.js | Always display actual word count |

---

## Open Issues

| ID | Issue | Priority | Effort |
|----|-------|----------|--------|
| BUG-06 | Safari option search broken | ✅ Fixed | Small |
| BUG-07 | "Done" tab non-functional | ✅ Fixed | Small |
| BUG-08 | Nav buttons are stubs | Low | Deferred to feature work |
| BUG-09 | Missing `aria-label` on icon buttons | ✅ Fixed | Small |
| BUG-10 | Inaccurate word count at empty state | ✅ Fixed | Trivial |
| ARCH-01 | Three CSS architectures | High | Medium |
| ARCH-02 | Orphaned `_index.html` | Medium | Trivial |
| ARCH-03 | No shared JS across modules | High | Large |

---


## Repair Execution Steps (Started April 15, 2026)

1. ✅ Fix Safari dropdown search compatibility by replacing hidden option styling logic.
2. ✅ Implement working All/Done sidebar tab behavior in the Fashion builder.
3. ✅ Add accessibility labels to previous/next icon buttons across builders.
4. ✅ Correct prompt word count stat to reflect real generated text.
5. ⏭️ Next: resolve architecture issues ARCH-01 to ARCH-03 in phased refactors.

## SaaS Conversion Plan

### Should this be converted to PHP + a database?

Yes, a backend and database are required to support user accounts, saved prompts, and billing. The frontend can remain as-is (HTML/CSS/JS) — only a server layer needs to be added.

**Recommended stack:** Next.js (React) + Supabase (Postgres + Auth + Storage)

Rationale: The existing logic is all JavaScript. Moving to Next.js means the frontend code can be migrated to React components without rewriting business logic. Supabase provides authentication, a Postgres database, and file storage out of the box, eliminating the need to build those systems from scratch.

Alternative if PHP is preferred: **Laravel** — clean, well-documented, fast to build with, excellent Stripe integration via Laravel Cashier.

---

### Database Schema

```sql
users
  id              uuid primary key
  email           text unique
  plan            text default 'free'   -- free | creator | pro | agency
  created_at      timestamp

prompts
  id              uuid primary key
  user_id         uuid references users
  module          text                  -- fashion | midjourney | cinematic
  title           text
  prompt_text     text
  state_json      jsonb                 -- full state snapshot for re-opening
  created_at      timestamp

collections
  id              uuid primary key
  user_id         uuid references users
  name            text
  created_at      timestamp

collection_items
  collection_id   uuid references collections
  prompt_id       uuid references prompts

subscriptions
  id              uuid primary key
  user_id         uuid references users
  stripe_customer_id   text
  stripe_sub_id        text
  plan            text
  status          text                  -- active | past_due | canceled
  period_end      timestamp
```

---

### Monetization Tiers

| Plan | Price | Limits |
|------|-------|--------|
| Free | $0/mo | 10 prompts/month, no save |
| Creator | $9/mo | 200 prompts/month, save + collections |
| Pro | $19/mo | Unlimited prompts, history, export, API access |
| Agency | $49/mo | 5 seats, white-label, priority support |

**Payment stack:** Stripe Subscriptions + Stripe Customer Portal (self-serve upgrades/cancellations) + Stripe Webhooks to sync subscription state to DB.

**Gating strategy:**
- Prompt builder is freely usable
- Copy/Save requires a free account (login wall — drives signups)
- Free users see a usage counter and a soft upsell modal at limit
- Collections and history are Creator+ only

---

## Feature Roadmap

### Phase 1 — SaaS Foundation (MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| User auth | Email/password + Google OAuth | Must-have |
| Save prompts | One-click save with auto-title | Must-have |
| Prompt history | Last 50 prompts, re-openable | Must-have |
| Collections | Organize prompts into named folders | Must-have |
| Usage counter | Visible in nav: "7 / 10 prompts used" | Must-have |
| Stripe billing | Subscription plans, upgrade/cancel flow | Must-have |
| User dashboard | Landing page after login with saved prompts + stats | Must-have |

---

### Phase 2 — High Value Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Export | Copy as plain text, Markdown, or download `.txt` | High |
| Share prompt | Public read-only link to a prompt (viral growth) | High |
| Prompt templates | Pre-built starting points that load default selections | High |
| Prompt variations | Generate 3 slight rewrites via Claude API | High |
| Dark mode toggle | Unified theme toggle across all modules | High |
| "Done" tab filter | Filter sidebar to show only completed sections | High |
| Safari search fix | Proper option filtering using disabled/hidden attributes | High |

---

### Phase 3 — Growth Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Community gallery | Opt-in public prompt library with search | Medium |
| API access | Pro-tier programmatic prompt generation endpoint | Medium |
| Team workspaces | Agency-tier shared collections + member management | Medium |
| Prompt scoring | Rate prompts, surface best-performing ones | Medium |
| More modules | DALL-E 3, Stable Diffusion, Adobe Firefly builders | Medium |
| Image embed | Paste the AI-generated image result alongside the prompt | Medium |
| Prompt diff view | See what changed between two versions of a prompt | Low |
| Mobile app | React Native wrapper around the web app | Low |

---

## Design & Layout Changes Needed

| Change | Reason |
|--------|--------|
| Add a left sidebar nav | Top tabs won't scale past 6 modules. Sidebar with icons handles growth better. |
| Add a Dashboard / home page | Users need a landing view after login — saved prompts, recent activity, usage. |
| User avatar + account menu | Replace the ⚙ icon in the top-right with a proper user menu (plan badge, logout, settings). |
| Upgrade banner | Persistent soft banner for free users nudging upgrade — not a modal, just a bar. |
| Mobile bottom-sheet | The 2-column split collapses on mobile but the right panel UX is poor on small screens. A bottom-sheet for the detail form works better. |
| Unify CSS architecture | See ARCH-01. One shared file, module overrides in separate files. |
| Onboarding tooltips | First-time users don't know what sections to fill or what the prompt output does. A 3-step tooltip tour would reduce abandonment. |

---

## Notes

- `_index.html` should be deleted or moved to an `/archive` folder once confirmed as redundant.
- `Forge-Notes.docx` in the project root is excluded from git via `.gitignore`. Consider moving design notes into this file or a `/docs` folder.
- All fixes and this audit file were committed to `ucleus/Forge` on `main` on April 14, 2026.
