---
title: AI Agent Task Breakdown
description: Independent executable tasks for an AI agent to build the Liquid Glass system without context guessing.
version: 1.0.0
---

# 09. AI Agent Task Breakdown

Este documento desglosa el *Implementation Roadmap* en unidades de trabajo atómicas optimizadas para la memoria de contexto de agentes de IA (Cursor, Antigravity, Claude). Cada tarea es estricta, independiente y declara explícitamente qué conocimiento de SDD se requiere inyectar antes de programar.

---

## Phase 1: Foundations

### Task 1.1: Setup Global CSS Variables & Tailwind Base
- **Objective:** Establish the primitive and semantic token mappings in pure CSS.
- **Inputs:** `docs/sdd/02-foundations.md`
- **Outputs:** `src/style/index.css` (o equivalente raíz), `tailwind.config.js` (si aplica).
- **Dependencies:** Ninguna.
- **Step-by-step instructions:**
  1. Set base `<body>` background using the darkest Zinc scale (`zinc-950`).
  2. Define semantic color CSS variables (e.g., `--neon-primary`, `--glass-fill-1`, `--glass-blur-1`).
  3. Setup the 8pt spacing overrides if required by the framework.
- **Definition of done:** No raw HEX values `/#[0-9a-fA-F]/` are present outside the `:root` pseudo-class definitions.

### Task 1.2: App Shell & Ambient Backgrounds Substrate
- **Objective:** Build the fixed shell that will render the massive blurred orbs creating the environmental light.
- **Inputs:** `docs/sdd/05-layout-architecture.md`, `docs/sdd/03-visual-language.md`
- **Outputs:** `src/index.html` o Layout component principal.
- **Dependencies:** Task 1.1.
- **Step-by-step instructions:**
  1. Create `#app-root` with `w-screen h-screen overflow-hidden relative`.
  2. Inject 2-3 fixed, absolutely positioned `div` elements with `border-radius: 50%` and enormous `filter: blur(120px)`.
- **Definition of done:** Viewport presents a dark surface intermingled with soft, non-intrusive glowing atmospheric lights (ambient background).

---

## Phase 2: Primitives

### Task 2.1: Build the Button Component
- **Objective:** Create the primary trigger element with precise Neon focus and hover physics.
- **Inputs:** `docs/sdd/components/01-button.md`, `docs/sdd/06-motion.md`
- **Outputs:** `src/components/Button.html` (o macro de template).
- **Dependencies:** Task 1.1.
- **Step-by-step instructions:**
  1. Wrap a `<button>` with base glass properties (`bg-glass-1`, `backdrop-blur`).
  2. Apply `transform: scale(0.97)` strictly on `:active`.
  3. Apply `box-shadow` inset for the top edge glow (`inset 0 1px 0 rgba(255,255,255,0.1)`).
  4. Build the Neon `:focus-visible` offset ring.
- **Definition of done:** Button passes WCAG AA contrast, scales down on click organically (150ms transform), and glows strictly only on focus.

### Task 2.2: Badge & Icon Button
- **Objective:** Create micro-visual primitives.
- **Inputs:** `docs/sdd/components/04-badge.md`, `docs/sdd/components/07-icon-button.md`
- **Outputs:** `src/components/Badge.html`, `src/components/IconButton.html`.
- **Dependencies:** Task 1.1.
- **Step-by-step instructions:**
  1. Create a pill container (`rounded-full`).
  2. For Badge: Map a semantic status SVG dot.
  3. For IconButton: Assure `class="sr-only"` is mapped for the accessible label.
- **Definition of done:** Icon button is perfectly circular/square and accessible.

---

## Phase 3: Form Components

### Task 3.1: Etched Input & Textarea
- **Objective:** Create translucent dark inputs waiting for Neon activation.
- **Inputs:** `docs/sdd/components/02-input.md`, `docs/sdd/components/08-textarea.md`
- **Outputs:** `src/components/Input.html`, `src/components/Textarea.html`.
- **Dependencies:** Task 1.1.
- **Step-by-step instructions:**
  1. Implement base input with heavy inner shadow (`inset 0 2px 4px rgba(...)`).
  2. On `:focus`, replace the inner shadow with an outer Neon glow and neon solid border.
  3. Build explicit `<label>` bindings.
- **Definition of done:** Input looks recessed into the glass until focused, at which point it brightly illuminates. Browser autofil defaults do not break the transparent background.

### Task 3.2: Custom Toggle & Checkbox
- **Objective:** Create snappy SVGs/CSS switches.
- **Inputs:** `docs/sdd/components/05-toggle.md`, `docs/sdd/components/10-checkbox.md`
- **Outputs:** `src/components/Toggle.html`, `src/components/Checkbox.html`.
- **Dependencies:** Task 3.1 (Form context), Task 1.1.
- **Step-by-step instructions:**
  1. Hide the native input using `.sr-only`. 
  2. Build custom glass tracks. 
  3. Animate the thumb (`translateX`) or stroke offset.
- **Definition of done:** Pressing `Space` while focused checks the box; clicking does the same.

---

## Phase 4: Overlays

### Task 4.1: The Z-50 Modal Component
- **Objective:** Construct a layout-breaking dialog overlay with intense blur.
- **Inputs:** `docs/sdd/components/06-modal.md`, `docs/sdd/05-layout-architecture.md`, `docs/sdd/07-accessibility.md` (Focus Trap).
- **Outputs:** `src/components/Modal.html`.
- **Dependencies:** Task 2.1 (Needs Buttons for closing), Task 1.2 (Sits over Shell).
- **Step-by-step instructions:**
  1. Create fixed full-screen backdrop (`rgba(0,0,0,0.6)` + `blur-lg`).
  2. Create centered `z-50` trap box using `Level 3 Glass`.
  3. Implement JavaScript (o seudocódigo) to trap `Tab` loop and `overflow: hidden` on body.
- **Definition of done:** Background app shell cannot be scrolled or tabbed into while Modal is open. 

---

## Phase 5: Navigation and Layout

### Task 5.1: The Application Shell Matrix
- **Objective:** Connect the Sidebar, Topbar, and Scroll Area into a resilient CSS Grid.
- **Inputs:** `docs/sdd/05-layout-architecture.md`, `docs/sdd/components/15-sidebar.md`, `docs/sdd/components/16-topbar.md`
- **Outputs:** Main container layout.
- **Dependencies:** Task 1.2 (Ambient Shell).
- **Step-by-step instructions:**
  1. Establish layout grid with a fixed left column and flexible right column.
  2. Implement Sticky Topbar at the top of the right column, applying dynamic `backdrop-blur` when scrolled.
- **Definition of done:** Panning the right column does not move the Sidebar. Topbar blurs successfully over flowing text.

### Task 5.2: Bento-Box Card Grid
- **Objective:** Responsive data chunking containers.
- **Inputs:** `docs/sdd/components/03-card.md`, `docs/sdd/05-layout-architecture.md`
- **Outputs:** `src/components/Card.html`, `src/layouts/DashboardGrid.html`.
- **Dependencies:** Task 5.1 (App Shell).
- **Step-by-step instructions:**
  1. Apply `glass-level-1` to Card panels.
  2. Grid container handles `grid-cols-4` collapsing linearly down to 1.
- **Definition of done:** Cards are uniform in height natively without manual adjustments.

---

## Phase 6: Advanced Components

### Task 6.1: Data Table Shell
- **Objective:** High-density data grid with glass headers.
- **Inputs:** `docs/sdd/components/17-table.md`
- **Outputs:** `src/components/Table.html`.
- **Dependencies:** Task 5.2 (Card).
- **Step-by-step instructions:**
  1. Wrap inside a generic Card container.
  2. Make `<th>` sticky to top.
  3. Add `hover:bg-white/5` increments to `<tr>` rows.
- **Definition of done:** Rows scroll seamlessly under the sticky header without breaking borders.
