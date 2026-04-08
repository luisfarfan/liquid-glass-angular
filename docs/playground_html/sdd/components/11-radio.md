---
title: Radio Specification
description: Implementation ready SDD for Radios.
---

# Radio

## Overview
- **Purpose:** Mutually exclusive selection.
- **UX Intent:** Circular, target-like activation.
- **Visual Intent:** Glass circle that ignites a glowing neon core.

## Guidelines
- **When to use:** Picking exactly one option from a list of < 5 options.
- **When NOT to use:** Toggling independent features.

## Structure
- **Anatomy:**
  - `Label wrapper`
  - `Hidden native radio`
  - `Custom Radio Circle`
  - `Inner Dot`
- **Required parts:** Custom SVG/DOM circle and hidden input.

## Properties
- **States:** Unchecked (Empty glass ring), Checked (Neon ring + glowing center dot), Disabled.

## Behavior
- **Accessibility requirements:** `role="radio"`, arrow keys navigate the radio group natively.

## Technical Implementation
- **Dependencies:** `radius-full`, `neon-system`.
- **Acceptance criteria:**
  - [ ] Center dot scales up (`transform: scale(1)`) from 0 when checked via CSS transition.


## Angular API (v21)
- **Selector:** `<liquid-radio-group>`, `<liquid-radio>`
- **Standalone:** `true`
- **Composición:** `RadioGroup` mantendrá la señal de valor maestro, y utilizará `contentChildren()` para iterar sobre sus `<liquid-radio>` y deseleccionar a los hermanos al marcarse.
- **Formularios:** `ControlValueAccessor` en el grupo contenedor.
