---
title: Global Visual Rules (Glass & Neon)
description: Explicit rules around the Liquid Glass system, shadows, depth, blur, and neon illumination.
version: 1.0.0
---

# 03. Global Visual Rules

## 1. The Glass System (Liquid Glass)

### Purpose
To render surfaces that mimic frosted glass, creating an organic layering effect over vibrant underlying elements.

### Rules & Mechanics
A perfect "Liquid Glass" panel requires exactly 4 layers of CSS combined:
1. **Translucent Fill:** `background: rgba(255, 255, 255, 0.03)` (Base) to `0.08` (Elevated).
2. **Backdrop Blur:** `backdrop-filter: blur(16px)` to `blur(24px)`.
3. **Edge Highlight (Light leak):** `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.02)`. This simulates light catching the top edge of the glass.
4. **Surface Texture (Optional but recommended):** A barely visible noise/grain SVG overlay to add physical realism.

### Variants
- **Glass Base (Level 1):** Low fill (`0.03`), medium blur (`12px`). Used for main app shell panels.
- **Glass Raised (Level 2):** Medium fill (`0.06`), high blur (`16px`). Used for nested data cards.
- **Glass Float (Level 3):** High fill (`0.08`), ultra blur (`24px`). Used for Modals and Dropdowns.

### Usage Guidelines
- Only apply the Glass System to containing structural elements. 

### Anti-patterns
- Stacking more than 3 glass layers on top of each other (causes severe render/painting performance lag).
- Placing opaque backgrounds beneath glass items inside the same contextual flow (ruins the transparency illusion).

### Acceptance Criteria
- [ ] Forms, Modals, and Main content panels accurately distort/blur underlying ambient gradients.
- [ ] The top/left edges of glass panels reflect a subtle 1px white inset highlight.

---

## 2. Blur Usage (Ambient Orbs)

### Purpose
To simulate a shallow depth of field and create an ambient environment behind the glass interface.

### Rules & Variants
- **Ambient Backgrounds:** Large divs with `border-radius: 50%` and massive blurs (`filter: blur(100px)`) placed in fixed background layers behind the application shell to inject color.
- **Interactive Blurs:** Small blurs (`filter: blur(8px)`) used for glowing hovered elements.

### Anti-patterns
- Applying CSS `filter: blur()` directly to text or UI controls.

---

## 3. Depth & Layering (Shadow System)

### Purpose
Provide grounding and physical separation on the Z-axis in an environment where standard drop-shadows (which are black) are difficult to see on dark backgrounds.

### Rules & Variants
- Shadow opacity must be multiplied by 2x or 3x compared to light mode in order to register.
- Shadows should be deeply saturated or have a larger spread.
- **Shadow Base:** `0 4px 20px rgba(0, 0, 0, 0.5)`
- **Shadow Float:** `0 10px 40px rgba(0, 0, 0, 0.8)`

### Anti-patterns
- Light gray shadows or colored shadows (unless they are part of the Neon system).

### Acceptance Criteria
- [ ] Modals use intense black drop padding (`rgba(0,0,0, 0.8)`) to visually detach from the glass beneath them.

---

## 4. Neon System (Interactive Glows)

### Purpose
To immediately guide the user's eye to current focus states, active routing paths, or highly critical primary actions.

### Rules & Variants
- **Neon Focus:** When an input or button receives keyboard focus, it receives a bright 1px solid border AND an outer glowing ring: 
  `box-shadow: 0 0 0 1px #00f0ff, 0 0 12px 0 rgba(0, 240, 255, 0.4)`.
- **Primary Action (Active):** A subtle gradient border combined with an underlying blurred element dropping the same color.

### Usage Guidelines
- Strict limitation: Neon is the only source of pure vivid color on the foreground layer.

### Anti-patterns
- Applying Neon Glows indiscriminately to static non-interactive elements (like standard panel borders).

### Acceptance Criteria
- [ ] Tabbing through the UI with a keyboard produces a highly visible, fluid Neon focus ring.
- [ ] Hover states trigger a subtle ramp up in illumination that snaps to 100% on `:active` or `:focus`.
