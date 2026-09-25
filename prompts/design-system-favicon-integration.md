# Implementation Prompt: Design System Favicon Integration

## Goal
Integrate the official CarryBee favicon from `https://carrybee.com/` directly into the CarryBee Auction Panel Design System (in the brand logo components, the Logo Usage showcase section under "Icon / Favicon", and the design system UI) rather than merely configuring browser metadata.

---

## Skills Read
- `AGENTS.md` (Design system visual truth, UI work, verification checks)
- `.agents/skills/develop/SKILL.md` (Workflow & implementation structure)

---

## Code & Assets Inspected
- `src/app/page.tsx`: Section 1 "Logo Usage" displaying "Icon / Favicon". Currently rendered using the old cropped `logo-icon.png`.
- `src/components/brand/carrybee-logo.tsx`: `variant="icon"` currently rendering `logo-icon.png` in a dark squircle.
- `public/favicon.png`: The official high-resolution bee favicon extracted directly from `https://carrybee.com/favicon.ico`.
- `design/System design.png`: "Logo Usage" section displaying "Icon / Favicon" specification.

---

## Decisions & Assumptions
1. **Design System Integration**:
   - The user's instruction "use the favicon at my design system not in the local npm" requires displaying and using the official `carrybee.com` favicon in the Design System components and showcase page.
   - Update `CarryBeeLogo` (`src/components/brand/carrybee-logo.tsx`) `variant="icon"` to use the official `carrybee.com` favicon (`/favicon.png`).
   - In `src/app/page.tsx`, update the "Logo Usage" section's "Icon / Favicon" showcase card to display the official `carrybee.com` favicon with transparent background / branded presentation and explicit label indicating it uses the official asset from `https://carrybee.com/`.
   - Also showcase the favicon in both light and dark container styles so designers and engineers see how the official favicon renders across all design system surfaces.

---

## Files to Create / Touch
1. `src/components/brand/carrybee-logo.tsx`: Update `variant="icon"` to use `/favicon.png` (the official favicon from `https://carrybee.com/`).
2. `src/app/page.tsx`: Update the "Icon / Favicon" section in the design system showcase to prominently feature the `carrybee.com` favicon.

---

## Requirements
- The design system UI must use and showcase the official favicon from `https://carrybee.com/`.
- The "Icon / Favicon" component must render crisply on both light and dark backgrounds.
- Zero TypeScript, ESLint, or Next.js build errors.

---

## Security Considerations
- Pure frontend presentation changes; no secrets or external execution risks.

---

## Acceptance Criteria
- [x] `CarryBeeLogo` with `variant="icon"` renders the official favicon from `https://carrybee.com/`.
- [x] The "Icon / Favicon" card in the Design System showcase displays the official favicon from `https://carrybee.com/`.
- [x] Both dark and light background presentations of the favicon are visible in the design system showcase.
- [x] `npx tsc --noEmit` passes with 0 errors.
- [x] `npm run lint` passes with 0 errors.
- [x] `npm run build` passes with 0 errors.

---

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## Manual Test Steps
1. Run `npm run dev`.
2. Open `http://localhost:3000`.
3. Scroll to the "Logo Usage" section in the Design System.
4. Verify the "Icon / Favicon" block displays the official CarryBee favicon from `https://carrybee.com/`.
