---
title: Layout & Structure Architecture
description: Specifications for the Admin Dashboard layout, grids, responsive behavior, and Z-index layering.
version: 1.0.0
---

# 05. Layout & Structure Architecture

## 1. App Shell Structure

- **Purpose:** Define the absolute macro-container of the application layout, ensuring the "Liquid Glass" aesthetic has a stable background to distort.
- **Structure:** 
  - `<Body>` -> `#app-root` (Contains ambient background orbs)
  - `CSS Grid / Flex Matrix` holding the Sidebar and Main Content areas.
- **Rules:** The shell must remain fixed at `height: 100vh` and `width: 100vw` with `overflow: hidden`. All scrolling is strictly delegated to the child `Content Area`.
- **Interaction behavior:** Fixed. Ambient orbs inside the root background can slowly animate, but the shell itself never moves.
- **Responsive behavior:** 
  - Desktop: 2-column Grid (Sidebar + Content).
  - Mobile/Tablet: 1-column (Content only, Sidebar becomes off-canvas).
- **Anti-patterns:** Applying scrollbars to the `body` or `.html` tags, which breaks the fixed glassy viewport and creates double scrollbars.
- **Acceptance criteria:** 
  - [ ] App shell occupies exactly 100% of the viewport.
  - [ ] No native browser scrolling occurs at the root level.

---

## 2. Sidebar Behavior

- **Purpose:** Primary application navigation tree and routing hub.
- **Structure:** `w-64` (Expanded) or `w-20` (Collapsed). Deep base-level glass panel (Level 1 Glass).
- **Rules:** Sits structurally attached to the left edge. Must visually anchor the layout. 
- **Interaction behavior:** Collapsing the sidebar smoothly transitions the width (`transition-all duration-300`). Text labels fade out (`opacity-0`), leaving only centered icons. Hovering active links reveals a Neon line indicator.
- **Responsive behavior:** 
  - Desktop: Statically mounted in the DOM matrix.
  - Tablet/Mobile (`< 1024px`): Transforms into a `Slide-over/Drawer` interacting at a high Z-index (`z-40`) and requiring a hamburger menu to trigger.
- **Anti-patterns:** Text wrapping violently or causing layout jank during the expand/collapse animation transition.
- **Acceptance criteria:** 
  - [ ] Maintains perfectly smooth 60fps transitions when toggling state.
  - [ ] Automatically switches to off-canvas drawer mode on smaller viewports.

---

## 3. Topbar Behavior

- **Purpose:** Host global actions (Global Search, Notifications, User Profile) and contextual Breadcrumbs.
- **Structure:** Fixed/sticky header at the top of the Main Content column. Default height `h-16` (64px).
- **Rules:** Uses Glass Level 2 (`backdrop-blur`). Sits structurally at `z-10` to float above scrolling content.
- **Interaction behavior:** 
  - At scroll position 0, it should be entirely transparent.
  - As soon as the user scrolls (`y > 0`), it transitions into Frosted Glass with an inset bottom border `rgba(255,255,255,0.05)`, blurring the passing content.
- **Responsive behavior:** Padding decreases on mobile, Breadcrumbs vanish to save space. Global search collapses to a single icon trigger.
- **Anti-patterns:** Thick opaque background colors that block the view of data scrolling underneath.
- **Acceptance criteria:** 
  - [ ] Glass effect strictly activates upon scroll.
  - [ ] It never overlaps the Desktop Sidebar.

---

## 4. Content Area & Page Structure

- **Purpose:** The scrollable canvas rendering standard views, dashboard widgets, and data tables.
- **Structure:** `flex-1`, `overflow-y-auto`. Inner layout wrapper uses `max-w-7xl` or fluid 100% width depending on the specific view requirement.
- **Rules:** Padding must be generous (`p-8` desktop, `p-6` tablet, `p-4` mobile) to allow the floating glass cards to "breathe" against the background.
- **Interaction behavior:** Native smooth vertical scrolling.
- **Responsive behavior:** Padding decreases dynamically. Content reflows vertically.
- **Anti-patterns:** Hardcoded fixed heights (`height: 800px`) causing trapped nested scrollbars (Inception scrolling).
- **Acceptance criteria:** 
  - [ ] Reaching the absolute bottom of the content area reveals appropriate padding (glass cards do not touch the bottom boundary of the screen).

---

## 5. Card Grid System

- **Purpose:** Distribute data cards logically, ensuring symmetry often seen in 'Bento-box' style dashboards.
- **Structure:** CSS Grid using `grid-cols-12` as the parent matrix, or `grid-template-columns: repeat(auto-fill, ...)` for fluid tiles.
- **Rules:** Grid gaps must strictly follow the 8pt scale (usually `gap-6` or 24px default).
- **Interaction behavior:** Grid items reflow naturally without animation jumps when viewport resizes. Hovering a card slightly elevates it.
- **Responsive behavior:** 
  - Desktop wide: `grid-cols-4`
  - Desktop standard: `grid-cols-3`
  - Tablet: `grid-cols-2`
  - Mobile: `grid-cols-1` (Stacked)
- **Anti-patterns:** Masonry layouts (too chaotic for enterprise metrics).
- **Acceptance criteria:** 
  - [ ] Cards placed in the same row naturally stretch to equal heights via CSS Grid's `align-items: stretch`.

---

## 6. Form Layout System

- **Purpose:** Structure data input cohesively within glass contexts.
- **Structure:** Vertical stack (default) or 2-column CSS Grid for dense records.
- **Rules:** Labels must be directly above their respective inputs (simplifies visual scanning). Related fieldsets must be separated by subtle glass dividers (`border-white/10`).
- **Interaction behavior:** Validation errors or helper text manifesting below an input must push content down smoothly using CSS transitions (no sudden layout snapping).
- **Responsive behavior:** Any 2-column or 3-column forms forcefully collapse to 1-column strictly on mobile viewports.
- **Anti-patterns:** Horizontal forms (Label on the left, Input on the right) inside narrow glass cards, resulting in broken/wrapped text.
- **Acceptance criteria:** 
  - [ ] Form fields align perfectly tightly to the master grid lines.
  - [ ] The Neon Focus ring of inputs is never clipped by the parent form container.

---

## 7. Modal Layering System & Z-Index Architecture

- **Purpose:** Manage overlapping elements gracefully to prevent Z-index collisions (a common issue in UI).
- **Structure (The Z-Stack):**
  - `z-0`: Base Content & Background Orbs
  - `z-10`: Sticky Headers / Topbar
  - `z-20`: Sidebar (Desktop)
  - `z-30`: Popovers, Dropdowns, Tooltips, Select Menus
  - `z-40`: Mobile Drawer / Slideovers (Needs to float above everything else, including Sidebar and Topbar)
  - `z-50`: Modals / Dialogs / Massive Overlays
  - `z-60`: Toasts / Notifications (Always absolute top)
- **Rules:** Modals completely lock the Z-axis below them.
- **Interaction behavior:** Entering a `z-50` modal adds an isolating backdrop (`bg-black/60` + `backdrop-blur-sm`), dimming and pushing the App Shell visually backward.
- **Responsive behavior:** Modals detach from center and dock to the bottom of the screen (`bottom-sheet`) on smaller devices.
- **Anti-patterns:** Dropdown menus (`z-30`) rendering beneath sticky headers (`z-10`), or Modals opening behind the Sidebar.
- **Acceptance criteria:** 
  - [ ] Absolutely zero structural overlap errors.
  - [ ] Z-index scale strictly adheres to the 10-step increments mentioned above.
