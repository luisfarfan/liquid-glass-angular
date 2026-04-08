---
title: Foundations & Design Tokens Specification
description: Primitive vs Semantic tokens, typography, spacing, radius, and color architectures.
version: 1.0.0
---

# 02. Foundations & Design Tokens

## 1. Token Architecture

### Purpose
To separate the hardcoded design values from their contextual usage, enabling a scalable architecture and single source of truth.

### Rules
- **Primitive Tokens:** Absolute raw values (e.g., `color-blue-500: #3b82f6`, `space-4: 16px`). These exist only in the configuration file.
- **Semantic Tokens:** Intent-based aliases mapping to primitives (e.g., `surface-glass-primary: rgba(255,255,255, 0.05)`, `border-focus-ring: color-blue-500`).
- **Anti-patterns:** Referencing primitive HEX colors or raw pixels directly in component CSS or classes (e.g., `text-[#3b82f6]`).
- **Acceptance Criteria:** 
  - [ ] 100% of the UI components rely strictly on Semantic Tokens.

---

## 2. Typography

### Purpose
Guarantee maximum legibility and scanability within a complex dashboard environment over translucent backgrounds.

### Rules & Variants
- **Primary Font Family:** `Inter`, `Roboto`, or System sans-serif.
- **Base Scale:** `1rem` (16px base). 
- **Weights:** Regular (400) for body, Medium (500) for controls/labels, SemiBold (600) for headings.
- **Tracking (Letter Spacing):** Headings require tighter tracking (`-0.02em`), Body requires normal or slightly loose tracking.

### Usage Guidelines
- High-contrast text (`rgba(255,255,255, 0.9)`) for primary data.
- Muted text (`rgba(255,255,255, 0.5)`) for metadata and helper text.

### Anti-patterns
- Using Light or Thin font weights (`300` or less) over glass surfaces (causes anti-aliasing burn-in and readability failure).

### Acceptance Criteria
- [ ] Text contrast meets WCAG AA standards (4.5:1) against its worst-case glass background combination.
- [ ] Line heights are strictly scale-based (e.g., `1.5` for body, `1.2` for headings).

---

## 3. Spacing & Grid

### Purpose
Maintain a rhythmic, mathematical consistency across layout paddings, margins, and gaps.

### Rules & Variants
- **Core System:** 8pt grid system.
- **Sub-grid:** 4pt (for micro spacing within atoms like buttons).
- **Scale:** `0` (0px), `1` (4px), `2` (8px), `3` (12px), `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px).

### Usage Guidelines
- Always use the 4/8pt scale for dimensions, margins, paddings, and absolute positioning.

### Anti-patterns
- "Magic numbers" (e.g., `margin-top: 17px` or `padding: 15px`).

### Acceptance Criteria
- [ ] All spatial CSS properties divide cleanly by 4.

---

## 4. Radius System

### Purpose
Soften the overall UI to harmonize with the "liquid" aesthetic and convey the shape of polished glass.

### Rules & Variants
- **`sm` (4px):** Internal micro-elements (checkboxes, scrollbars).
- **`md` (8px):** Interactive atoms (buttons, inputs, dropdown menus).
- **`lg` (12px):** Inner cards and sub-panels.
- **`xl` (16px) - `2xl` (24px):** Main structural glass surfaces and large modals.
- **`full` (9999px):** Avatars, badges, and pill tags.

### Anti-patterns
- Mixing sharp corners (`0px`) directly inside heavily rounded parent glass panels.

### Acceptance Criteria
- [ ] Radii strictly follow concentric nesting rules (Outer Radius = Inner Radius + padding).

---

## 5. Colors (Core Primitives)

### Purpose
The base absolute palettes before semantic aliasing.

### Rules
- **Base/Background Scale:** Zinc or Slate scale (`900`, `950`) establishing deep, neutral darks.
- **Glass Fills:** Exclusively translucent whites (`rgba(255,255,255, X)`) to allow background ambient color processing.
- **Primary/Neon Scale:** High chromacity colors (e.g., Cyan, Indigo, Violet).

### Acceptance Criteria
- [ ] Base background is heavily desaturated (near greyscale) to allow Ambient Background gradients to pop.
