# Implementation Prompt: CarryBee Auction Hub Homepage Implementation

## Goal
Implement the production-ready CarryBee Auction Hub Homepage in Next.js (App Router), faithfully replicating `design/Home.png` down to the exact layout, spacing, typography, colors, component hierarchy, card specifications, and interactive states in accordance with `AGENTS.md`.

---

## Skills Read & Applied
- `AGENTS.md`: Core application rules, authoritative brand identity, UI guidelines, server-authoritative bidding architecture, and operational expectations.
- `.agents/skills/develop/SKILL.md`: Structured development flow, artifact ownership, and execution discipline.
- `modern-web-guidance`: Modern CSS layout (`css-layout`), container queries (`size-aware-styling`), stable scrollbars, responsive flex/grid architectures, and interactive performance.

---

## Code & Assets Inspected
- `design/Home.png`: Authoritative visual reference for the entire homepage layout, components, colors, and content.
- `design/Logo.png` & `public/logo.png`: Official CarryBee logo asset with "carrybee" brandmark and "Delivering with Trust" subtext.
- `src/components/brand/carrybee-logo.tsx`: Official CarryBee logo component supporting dark and light surface variants.
- `src/components/auction/auction-card.tsx`: Existing auction card component, to be enhanced or complemented with the exact vertical segmented countdown card seen in `design/Home.png`.
- `src/app/globals.css`: CarryBee brand design tokens (`cb-yellow: #FFC107`, neutral darks `#111827`, `#1F2937`, `#374151`, semantic status colors, and typography scale).
- `src/app/layout.tsx`: Configured with Google Font `Inter`.
- `package.json`: Next.js 16.3.6, React 19, Tailwind CSS v4, Lucide React, clsx, tailwind-merge, sharp.

---

## Decisions & Assumptions
1. **Visual Parity**:
   - Strictly reproduce the design in `design/Home.png`. Every layout segment, badge color, font weight, and spacing will follow the reference.
   - Primary Brand Accent: CarryBee Yellow `#FFC107`, Hover `#FFB800`, Active `#E6A700`.
   - Surfaces & Typography: Dark Charcoal Header & Hero `#111827`, Card Surfaces `#FFFFFF`, Page Background `#F8FAFC`, Borders `#E5E7EB`.
2. **Component Breakdown**:
   - **Header / Navigation Bar**:
     - CarryBee logo on dark background (`variant="dark"`).
     - Mobile sidebar collapse toggle button (Hamburger icon).
     - Search input with placeholder "Search auctions, products, categories..." and `Ctrl + K` badge.
     - Live Sync latency status pill (`Live Sync` with pulsing green dot and `14ms` badge).
     - Notifications button with red unread count badge (`5`).
     - User profile indicator with initials avatar "AD", employee name "Arif Hossain", designation "EMP001 · Operations", and dropdown chevron.
   - **Left Sidebar**:
     - Navigation item "Dashboard" with yellow active state and icon.
     - "AUCTION" section: Live Auctions, Upcoming Auctions, My Bids, Won Auctions, Payments, Notifications (badge 5).
     - "ACCOUNT" section: Profile, Help & Support.
     - Smooth collapse on smaller screens and mobile drawer navigation.
   - **Hero Section**:
     - Large headline: "CarryBee " (white) + "Auction Hub" (yellow `#FFC107`).
     - Subtitle: "Internal Auction Platform for CarryBee Employees".
     - 4 live platform metrics: Live Auctions (24), Ending Soon (12), Upcoming (36), Completed (218) with respective icons.
     - Warehouse parcels background graphic matching CarryBee logistics identity.
     - Floating callout banner: "Ongoing Employee Auction", description, and "View Live Auctions ->" yellow CTA button.
   - **Category Filter Bar**:
     - Horizontally scrollable pill tabs: "All Categories" (active yellow), "Electronics", "Mobiles & Accessories", "Laptops", "Home & Living", "Fashion", "Office Equipment", "Other".
     - Interactive filter state updating auction lot views.
   - **Live Auctions Section (Main Grid)**:
     - Header with live pulse indicator: "Live now • Real-time bidding" and "View All ->" link.
     - 4 high-fidelity auction lot cards matching `design/Home.png`:
       1. Dell Latitude 5420 (`AUC-2026-0914-001`) — 12 bids, Laptops + Good Condition, Rec: ৳ 50,000, Current: ৳ 28,000, 4-box countdown (`00d 02h 14m 32s`), "Place Bid" button.
       2. iPhone 14 (`AUC-2026-0914-002`) — 28 bids, Mobiles + Open Box, Rec: ৳ 70,000, Current: ৳ 84,000, 4-box countdown (`00d 01h 32m 15s`), "Place Bid" button.
       3. Apple AirPods Pro 2 (`AUC-2026-0913-015`) — ENDING SOON, 18 bids, Audio + Refurbished, Rec: ৳ 25,000, Current: ৳ 22,000, 4-box countdown (`00d 00h 12m 08s`), "Place Bid" button.
       4. Canon G2010 Printer (`AUC-2026-0914-008`) — 7 bids, Office Equipment + Good Condition, Rec: ৳ 20,000, Current: ৳ 12,500, 4-box countdown (`00d 03h 22m 41s`), "Place Bid" button.
     - Segmented 4-box countdown timer for Days, Hours, Mins, Secs.
     - Interactive Watchlist toggle button on cards.
   - **Ending Soon Sidebar Widget**:
     - Apple Watch Series 8 (`AUC-2026-0913-021`, 12 bids, `00:10:32`).
     - Sony WH-1000XM4 (`AUC-2026-0913-019`, 24 bids, `00:24:18`).
     - Nintendo Switch (Used) (`AUC-2026-0913-017`, 18 bids, `00:42:55`).
     - Logitech MX Master 3 (`AUC-2026-0913-020`, 9 bids, `01:12:33`).
     - Distinct red urgency badge with countdown timer.
   - **My Auctions Table**:
     - Filter tabs: "My Active Bids (3)", "Won Auctions (2)", "Lost Auctions (5)", "Payment Pending (1)".
     - Data table with columns: Product, Auction ID, My Bid, Current Bid, Status, Ends In, Action.
     - Exact rows from UI: iPhone 14 (Outbid, ৳ 80,000 vs ৳ 84,000, "Bid Again"), Dell Latitude 5420 (Winning, ৳ 28,000 vs ৳ 28,000, "Increase Bid"), AirPods Pro 2 (Outbid, ৳ 20,000 vs ৳ 22,000, "Bid Again").
   - **Quick Stats & Important Notice**:
     - 2x2 metrics grid: My Active Bids (3), Won Auctions (2), Payment Pending (1), Lost Auctions (5).
     - Dismissible "Important Notice" callout banner regarding facility collection rules.
3. **Asset Handling**:
   - Extract product thumbnails and hero warehouse imagery directly from `design/Home.png` into `public/auction/` using `sharp` to achieve authentic 1:1 image representation.

---

## Files to Create / Modify
1. `scripts/extract-assets.js`: Node script using `sharp` to slice and crop authentic product images and warehouse hero graphic from `design/Home.png` into `public/auction/`.
2. `src/components/layout/top-nav.tsx`: Top navigation bar with logo, search, Live Sync status, notifications, and employee profile.
3. `src/components/layout/sidebar.tsx`: Collapsible left sidebar navigation matching CarryBee Auction Hub menu items and active styling.
4. `src/components/home/hero-banner.tsx`: Hero banner with statistics, logistics parcel background, and quick action.
5. `src/components/home/category-bar.tsx`: Interactive category filter bar.
6. `src/components/home/live-auction-card.tsx`: Vertical live auction card with 4-box countdown, status pill, watchlist, and bid action.
7. `src/components/home/ending-soon-widget.tsx`: Ending Soon lot list with red countdown badges.
8. `src/components/home/my-auctions-table.tsx`: User bidding summary table with tabs and status indicators.
9. `src/components/home/quick-stats-widget.tsx`: 2x2 metrics summary and dismissible notice banner.
10. `src/app/page.tsx`: Main homepage layout combining all components with state management (category selection, search filter, tab switching, and notice dismiss).

---

## Requirements & Design Specifications
- **Color Tokens**:
  - Yellow Accent: `#FFC107`, Hover `#FFB800`
  - Dark Header & Hero: `#111827`, Secondary Dark `#1F2937`, Border `#374151`
  - Text: Dark Charcoal `#111827`, Muted `#6B7280`, Light Muted `#9CA3AF`
  - Status: Live Green `#10B981`, Ending Soon Amber `#F59E0B`, Outbid Red `#EF4444`, Winning Green `#10B981`
- **Typography**: Inter font with exact weight hierarchy matching `design/Home.png`.
- **Responsive Design**: Full desktop experience matching `design/Home.png` at 1536px and 1280px, responsive wrapping for tablets, and drawer/stacking layout for mobile.

---

## Security Considerations
- Client-side state is strictly for presentation; inputs and search queries are sanitized.
- Server-authoritative mindset maintained: prices and timers are formatted as server-supplied readouts without client arithmetic altering business invariants.
- Sensitive employee metadata is constrained to authorized employee identity.

---

## Acceptance Criteria
- [x] Top navigation bar matches `design/Home.png` with CarryBee logo, search input, `Ctrl + K` badge, `Live Sync 14ms` pill, notifications `5` badge, and "Arif Hossain / EMP001 · Operations" profile.
- [x] Left sidebar includes active "Dashboard" item, "AUCTION" section, "ACCOUNT" section, and responsive drawer behavior.
- [x] Hero banner reproduces headline, 4 stat counters, CarryBee warehouse parcels visual, and "Ongoing Employee Auction" CTA.
- [x] Category bar allows switching between all 8 categories with the active yellow styling on "All Categories".
- [x] Live Auctions section displays 4 auction cards with correct titles, IDs, tags, prices, 4-box segmented countdown timers, and "Place Bid" buttons.
- [x] Ending Soon widget displays 4 ending lots with red timer badges.
- [x] My Auctions section displays filter tabs and the 3 active bids with Outbid/Winning status badges and respective action buttons.
- [x] Quick Stats shows the 2x2 grid and Important Notice banner can be dismissed.
- [x] Clean TypeScript build (`npm run build`) with zero lint or compilation errors.

---

## Checks to Run
- TypeScript compilation: `npx tsc --noEmit`
- Next.js build: `npm run build`
- Browser/Dev server inspection: `npm run dev`

---

## Manual Test Steps
1. Open homepage at `http://localhost:3000`.
2. Verify top navigation bar: logo, search input, Live Sync badge, notification counter, user profile.
3. Verify left sidebar: "Dashboard" active highlight, all menu items present.
4. Verify hero banner: "CarryBee Auction Hub", 4 live metrics, warehouse visual, CTA button.
5. Click through Category Filter pills: active state moves and displays selection.
6. Verify Live Auction cards: image rendering, live status badge, heart watchlist click, segmented countdown timer boxes, bid price in bold gold.
7. Verify Ending Soon widget: 4 items with red timer badges.
8. Switch tabs in "My Auctions": verify "My Active Bids", "Won Auctions", "Lost Auctions", "Payment Pending".
9. Verify Quick Stats 2x2 metrics and dismiss the "Important Notice" banner.
10. Test responsive breakpoints down to mobile (resize window or dev tools).
