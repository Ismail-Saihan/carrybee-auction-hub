# Implementation Prompt: CarryBee Auction Panel Design System

## Goal
Implement the authoritative CarryBee Auction Hub Design System (v1.0) into the web application, exactly faithfully replicating the visual specifications and components from `design/System design.png` in accordance with the project rules in `AGENTS.md`.

---

## Skills Read
- `AGENTS.md` (Project Rules, Tech Stack, UI Guidelines, Verification Checks)
- `.agents/skills/develop/SKILL.md` (Workflow & implementation structure)
- `modern-web-guidance` (`forms`, `accessibility`, `brand-consistent-forms`)

---

## Code & Assets Inspected
- `design/System design.png`: Visual source of truth for colors, typography, buttons, inputs, toggles, badges, alerts, tabs, pagination, breadcrumbs, card layout, logo, and iconography.
- `package.json`: Next.js 16.3.6 (App Router), React 19.2.8, Tailwind CSS v4 (`@tailwindcss/postcss` & `tailwindcss ^4`), TypeScript 5.
- `src/app/globals.css`: Base Tailwind v4 setup with `@import "tailwindcss";`.
- `src/app/layout.tsx`: Currently using Geist fonts; requires replacement with Google Font `Inter` (weights 300, 400, 500, 600, 700) per the design system.
- `src/app/page.tsx`: Initial boilerplate page to be replaced with the interactive CarryBee Auction Hub Design System showcase.

---

## Decisions & Assumptions
1. **Design System & Logo Authority**:
   - `design/System design.png` is the absolute visual truth for all design tokens, font scales, colors, borders, states, and components.
   - `design/Logo.png` is the official CarryBee logo asset provided by the user. It will be copied to `public/logo.png` and used across the application.
   - Primary Brand Accent: CarryBee Yellow `#FFC107`, Hover `#FFB800`, Active `#E6A700`.
   - Dark Charcoal Typography & Neutral Surfaces: `#111827`, `#1F2937`, `#374151`, `#6B7280`, `#F8FAFC`, `#FFFFFF`.
   - Typography: Font Family `Inter` with documented type scale: Display (48px), H1 (36px), H2 (30px), H3 (24px), H4 (20px), H5 (18px), Body Large (16px), Body (14px), Body Small (12px), Caption (11px).
2. **Icons & Utilities**:
   - Install `lucide-react` for the official icons shown in the design system specification.
   - Install `clsx` and `tailwind-merge` for clean, robust className merging across design system components.
3. **Component Architecture**:
   - Build reusable, type-safe React/Tailwind components under `src/components/ui/` and `src/components/brand/`.
   - Provide an authentic CarryBee logo component using `Logo.png` (handling dark background, light background with invert/contrast filter for "carry" and tagline, and icon/favicon mark).
   - Maintain pure server/client boundaries with `"use client"` where interactive state is required (e.g. alerts dismiss, tabs toggle, switch toggle, card watchlist).
4. **Showcase Page**:
   - Implement `src/app/page.tsx` as a complete, live design system dashboard showcasing every section from `design/System design.png`.

---

## Files to Create / Touch
1. `public/logo.png`: Copy official `design/Logo.png` to public directory for static asset serving.
2. `package.json`: Add dependencies `lucide-react`, `clsx`, `tailwind-merge`.
2. `src/lib/utils.ts`: Standard `cn` helper function for class merging.
3. `src/app/globals.css`: Define CSS custom properties and Tailwind v4 `@theme` mappings for CarryBee brand, neutral, semantic, and status colors.
4. `src/app/layout.tsx`: Configure `Inter` font from `next/font/google` with weights 300, 400, 500, 600, 700 and setup root layout.
5. `src/components/brand/carrybee-logo.tsx`: CarryBee logo component (Dark, Light, and Icon marks with "Delivering with Trust" subtext).
6. `src/components/ui/button.tsx`: Buttons with Primary, Secondary, Outline, Ghost, Danger variants, 3 sizes (Small, Medium, Large), icon support, hover, active, and disabled states.
7. `src/components/ui/input.tsx`: Text input with Default, Focused (yellow border & ring), Error (red border & error message), and Success (green border & checkmark) states.
8. `src/components/ui/textarea.tsx`: Multi-line text area matching the design system input styling.
9. `src/components/ui/select.tsx`: Custom/styled dropdown select input with chevron icon.
10. `src/components/ui/checkbox.tsx`: Custom accessible checkbox with CarryBee yellow checked state and disabled state.
11. `src/components/ui/radio.tsx`: Radio button with CarryBee yellow selected state and disabled state.
12. `src/components/ui/switch.tsx`: Toggle switch component with On (`#FFC107`), Off (`#D1D5DB`), and disabled states.
13. `src/components/ui/badge.tsx`: Status badges (Live, Ending Soon, Upcoming, Ended, Won, Lost, Payment Pending, Completed, Cancelled) and category/condition tags (Open Box, Refurbished, New, Electronics, etc.).
14. `src/components/ui/alert.tsx`: Dismissible alerts for Success, Error, Warning, Info with respective icons and color themes.
15. `src/components/ui/tabs.tsx`: Tab navigation component with CarryBee yellow active indicator.
16. `src/components/ui/pagination.tsx`: Pagination component with page numbers, active state, and next/prev controls.
17. `src/components/ui/breadcrumb.tsx`: Breadcrumb trail with Home icon and separator.
18. `src/components/auction/auction-card.tsx`: Authoritative auction lot card component matching the reference image.
19. `src/app/page.tsx`: Full interactive visual showcase of the entire design system v1.0.

---

## Requirements & Design Specifications
1. **Brand Colors**:
   - `cb-yellow`: `#FFC107`
   - `cb-yellow-dark`: `#FFB800`
   - `cb-yellow-deep`: `#E6A700`
2. **Neutral Colors**:
   - Background Primary: `#111827`
   - Background Secondary: `#1F2937`
   - Surface Tertiary: `#374151`
   - Text Muted: `#6B7280`
   - Page Background: `#F8FAFC`
   - Card/Modal: `#FFFFFF`
3. **Semantic Colors**:
   - Success: `#10B981`
   - Error: `#EF4444`
   - Warning: `#F59E0B`
   - Info: `#3B82F6`
   - Secondary: `#8B5CF6`
4. **Status Colors**:
   - LIVE: `#10B981`
   - ENDING SOON: `#F59E0B`
   - UPCOMING: `#3B82F6`
   - ENDED: `#6B7280`
   - WON: `#059669`
   - LOST: `#EF4444`
   - PAYMENT PENDING: `#D97706`
   - COMPLETED: `#2563EB`
   - CANCELLED: `#9CA3AF`
5. **Card Example**:
   - Laptop Dell Latitude 5420 image
   - Pinned `LIVE` green badge on top left
   - Pinned Watchlist heart icon on top right
   - Category tag `Electronics` and condition tag `Open Box`
   - Current Bid: "৳ 28,000", "12 bids", time remaining "02:14:32" with clock icon in red/orange
   - Full-width primary yellow "View Details" button

---

## Security & Architectural Considerations
- Client/Server isolation: No secrets or sensitive keys exposed to client bundles.
- Accessibility: Valid semantic HTML (`<button>`, `<input>`, `<label>`, `<nav>`, `aria-checked`, `role="switch"`).
- Strict adherence to brand guidelines: No synthetic brand marks, no generic theme substitutions.

---

## Acceptance Criteria
- [x] All design tokens (brand, neutrals, semantic, status, typography) mapped in CSS/Tailwind v4.
- [x] Font set to `Inter` across the application with correct type scale.
- [x] Buttons match all 5 variants and 3 sizes with hover, active, disabled states.
- [x] Form inputs support default, focused, error, and success states with corresponding icons/messages.
- [x] Checkbox, radio, and toggle switch support active, inactive, and disabled states with CarryBee Yellow styling.
- [x] All 9 status badges and category tags styled accurately.
- [x] 4 alert styles (Success, Error, Warning, Info) with close triggers.
- [x] Tabs, pagination, and breadcrumbs match reference.
- [x] Auction lot card replicates reference layout, badge positioning, Bangladeshi Taka currency symbol (৳), bid count, timer, and action button.
- [x] CarryBee logo component renders correctly on light and dark surfaces.
- [x] Interactive showcase page renders cleanly without layout breaks or console errors.
- [x] Code passes TypeScript typecheck and Next.js build.

---

## Checks to Run
- `npm run lint` or `npx tsc --noEmit` to verify type safety.
- `npm run build` to verify production Next.js compilation.

---

## Manual Test Steps
1. Start dev server with `npm run dev`.
2. Navigate to `http://localhost:3000`.
3. Verify the Header: "CarryBee Auction Hub", "Design System v1.0", and subtitle.
4. Verify Logo Usage section shows Dark, Light, Icon, and Clear Space diagrams.
5. Verify Color System swatches show exact HEX codes and names.
6. Verify Typography section displays the Inter scale from Display down to Caption.
7. Verify Buttons section displays all variants (Primary, Secondary, Outline, Ghost, Danger) and states (Default, Hover, Active, Disabled) plus Button with Icons.
8. Verify Form Elements displays interactive inputs with focused, error, and success states, plus Checkbox, Radio, and Toggle Switch.
9. Verify Badges & Tags display all 9 status badges and category tags.
10. Verify Alerts render and dismiss when close icon is clicked.
11. Verify Tabs switch active state with CarryBee Yellow indicator.
12. Verify Auction lot card displays the Dell Latitude laptop lot with Live status badge, watchlist heart toggle, current bid `৳ 28,000`, 12 bids, `02:14:32` countdown, and "View Details" button.
