---
title: Select Specification
description: Implementation ready SDD for Select / Combobox.
---

# Select (Dropdown Input)

## Overview
- **Purpose:** Pick one or many items from a constrained list.
- **UX Intent:** Two-part interaction: an etched input opens into a floating, high-blur glass panel.
- **Visual Intent:** The trigger mimics an `Input`, the menu mimics a `Modal` floating above.

## Guidelines
- **When to use:** Constrained lists of 4+ items.
- **When NOT to use:** Binary choices (use Toggle/Radio).

## Structure
- **Anatomy:**
  - `Trigger` (Button resembling an input field)
  - `Chevron Icon`
  - `Floating Menu` (Popover layer)
  - `Menu Item` (Options)
- **Required parts:** All of the above.

## Properties
- **Variants:** Single select, Multi-select (with glass chips inside the trigger).
- **States:** Closed, Open (Dropdown uses Level 3 Float Glass), Focused.

## Behavior
- **Interaction behavior:** Clicking trigger opens menu. Trigger gains Neon outline. Hovering menu items lightly highlights them.
- **Accessibility requirements:** Combobox ARIA roles (`role="combobox"`, `aria-expanded`). Keyboard navigation (Arrow keys).

## Technical Implementation
- **Dependencies:** Z-index floating hooks (`z-50`), `glass-level-3`.
- **Edge cases:** Dropdown escaping viewport bounds (needs collision detection / Popper.js logic).
- **Anti-patterns:** Native `<select>` UI rendering over a glass design (breaks immersion).
- **Acceptance criteria:**
  - [ ] Menu uses Level 3 glass and distinct drop shadows to float over the parent card.
  - [ ] Keyboard arrows can navigate options.


## Angular API (v21)
- **Selector:** `<liquid-select>`
- **Standalone:** `true`
- **Integración CDK (Crítico):**
  - No usar CSS puro para la caja flotante. DEBE usar el `CdkConnectedOverlay` para que la lista flote calculando límites del viewport.
  - Implementará `ListKeyManager` del CDK para acceder a la lista con Flechas del teclado arriba/abajo accesiblemente.
- **Formularios:** `ControlValueAccessor`.
