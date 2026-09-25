# Implementation Prompt: Fix Header Logo Sizing and Placement

## Goal
Fix the CarryBee logo sizing, proportions, vertical centering, and ordering in the top navigation bar so it matches `design/Home.png` and `header-top-left.png` with pixel-perfect fidelity, eliminating overflow and clipping.

---

## Skills Read & Applied
- `AGENTS.md`: Authoritative brand guidelines, CarryBee visual proportions, UI fidelity, and mandatory review loop.
- `chrome-devtools`: Browser automation, visual inspection, snapshot measurement, and rendered layout verification.
- `modern-web-guidance`: Modern CSS layout, flex alignment, and image aspect ratio optimization.

---

## Code & Evidence Inspected
1. `public/auction/browser-header.png`:
   - Real browser snapshot captured via Chrome Puppeteer.
   - Identified that the logo was rendering at `width: 256px` by `height: 87px` at `y: -11.5px`, severely overflowing the 64px header and clipping "Delivering with Trust".
   - Identified that the hamburger menu button was mistakenly placed *before* the logo instead of after it.
2. `design/Home.png` & `public/auction/header-top-left.png`:
   - Logo is placed on the far left.
   - Logo height is ~38px (centered in the 64px header with ~13px padding top and bottom).
   - Logo width is ~115px–125px preserving the natural 512:173 brand proportion without stretching or clipping.
   - The hamburger button is positioned immediately *after* the logo.
3. `src/components/brand/carrybee-logo.tsx`:
   - Lacks bounded container constraints, causing Next.js `<Image>` to expand based on container width rather than adhering to header height.
4. `src/components/layout/top-nav.tsx`:
   - Flex item ordering had hamburger button first, then logo.

---

## Decisions & Assumptions
1. **Header Layout Order**:
   - Structure top-nav left section as:
     `[CarryBee Logo] -> [Divider / Hamburger Toggle] -> [Search Bar]`
   - Matches `design/Home.png` exactly.
2. **Logo Component Sizing**:
   - In `CarryBeeLogo`:
     - Default target height for header display: `38px` (or `h-9.5`), with corresponding proportional width `~113px` (based on 512:173 aspect ratio).
     - Add explicit container styling with `h-9.5` / `max-h-10` and `w-auto` to strictly prevent vertical overflow.
     - Ensure `object-contain` and crisp rendering for the white "carry", yellow "bee" wings, and white "Delivering with Trust" subtext.
3. **Verification via Browser Automation**:
   - Run `node scripts/inspect-logo.js` to capture a new browser screenshot and confirm the exact bounding box (`y >= 10px`, `height <= 40px`, zero clipping).

---

## Files to Modify
1. `src/components/brand/carrybee-logo.tsx`: Update sizing defaults, max-height container bounds, and aspect-ratio styling.
2. `src/components/layout/top-nav.tsx`: Reorder DOM elements so CarryBeeLogo is on the far left, followed by the hamburger button.

---

## Acceptance Criteria
- [x] CarryBee logo is placed on the far left of the header, preceding the hamburger menu button.
- [x] Logo height is ~38px, vertically centered with clear padding above and below.
- [x] Tagline "Delivering with Trust" is fully visible without clipping or overflow.
- [x] Brand aspect ratio (512:173) is strictly preserved with crisp legibility.
- [x] Browser screenshot confirms visual alignment with `design/Home.png`.
- [x] `npx tsc --noEmit`, `npm run lint`, and `npm run build` pass with 0 errors.

---

## Checks to Run
- TypeScript compilation: `npx tsc --noEmit`
- ESLint: `npm run lint`
- Production Build: `npm run build`
- Browser screenshot verification: `node scripts/inspect-logo.js`

---

## Manual Test Steps
1. Navigate to `http://localhost:3000` in Google Chrome.
2. Inspect the top-left of the navbar:
   - Confirm CarryBee logo appears first on the left.
   - Confirm the hamburger icon button appears next to it.
   - Confirm logo does not touch or overflow the top/bottom borders of the header.
   - Confirm "Delivering with Trust" tagline is fully rendered and readable.
