---
title: Empty State Specification
description: Implementation ready SDD for Empty States.
---

# Empty State

## Overview
- **Purpose:** Handle 0-results UX gracefully.
- **Visual Intent:** Ghosted, highly transparent icons.

## Structure
- **Anatomy:** `Container` (centered flex), `Massive Icon` (opacity 10-20%), `Title`, `Subtitle`, `CTA Button`.

## Technical Implementation
- **Dependencies:** `typography-scale`, `button-primary`.
- **Acceptance criteria:**
  - [ ] Perfect vertical/horizontal centering inside its parent context (Table body or Card).


## Angular API (v21)
- **Selector:** `<liquid-empty-state>`
- **Standalone:** `true`
- **Proyección:** Usará bloques `<ng-content>` puros para Label, Imagen SVG, y Call-to-actions, permitiendo un uso flexible en la vista vacía de una Tabla.
