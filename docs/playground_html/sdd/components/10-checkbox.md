---
title: Checkbox Specification
description: Implementation ready SDD for Checkboxes.
---

# Checkbox

## Overview
- **Purpose:** Multi-selection within forms or data tables.
- **UX Intent:** Sharp, decisive toggling.
- **Visual Intent:** A small glass recess that fills with Neon accent and a checkmark when active.

## Guidelines
- **When to use:** Multi-select options, Terms & Conditions, bulk selecting table rows.
- **When NOT to use:** Mutually exclusive options (use Radio).

## Structure
- **Anatomy:**
  - `Label wrapper`
  - `Hidden native checkbox`
  - `Custom Checkbox Box` (Glass square)
  - `Checkmark SVG`
- **Required parts:** All above.

## Properties
- **Variants:** Default, Indeterminate (dash instead of check, used for table headers).
- **Sizes:** `sm` (16px), `md` (20px).
- **States:** Default (etched base), Hover (slight glow), Checked (Neon fill, bright SVG), Disabled.

## Behavior
- **Interaction behavior:** Click checks/unchecks. Animation: Checkmark draws in using `stroke-dashoffset`.
- **Accessibility requirements:** Visually hidden native input must remain focusable (`sr-only` class) to handle keyboard spacebar interactions.

## Technical Implementation
- **Dependencies:** `radius-sm`, `neon-system`.
- **Anti-patterns:** Focus ring on the label text instead of the box itself.
- **Acceptance criteria:**
  - [ ] Tabbing focuses the custom box with a soft neon outline.
  - [ ] Native input handles the actual state payload.


## Angular API (v21)
- **Selector:** `<liquid-checkbox>`
- **Standalone:** `true`
- **Signals & Formularios:** ControlValueAccessor. `checked = model<boolean>(false);`
- **HTML Interno:** Mantendrá exactamente el mismo `<input type="checkbox" class="peer sr-only">` envuelto por el Label, controlando la señal con la API DOM nativa para máxima compatibilidad con lectores de vista.
