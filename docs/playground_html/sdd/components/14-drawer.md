---
title: Drawer Specification
description: Implementation ready SDD for Drawer / Sheet.
---

# Drawer (Side Sheet)

## Overview
- **Purpose:** Complex nested tasks that need more space than a Modal but shouldn't lose underlying context.
- **UX Intent:** Slides in from the right edge smoothly.
- **Visual Intent:** Similar to Modal (Level 3 Glass) but pinned to height 100%.

## Guidelines
- **When to use:** Detailed item editing, deep filters.
- **When NOT to use:** Simple confirmations.

## Structure
- **Anatomy:** `Backdrop`, `Slide Panel`, `Header`, `Body`, `Footer`.

## Behavior
- **Interaction behavior:** Enter slides `-translateX`. Exit reverses. Esc closes.
- **Accessibility:** Same Trap Focus logic as Modals.

## Technical Implementation
- **Dependencies:** `glass-level-3`, `z-50`.
- **Acceptance criteria:**
  - [ ] Sticks to the viewport edge perfectly.
  - [ ] Body scroll lock is enforced.


## Angular API (v21)
- **Selector:** `LiquidDrawerService`
- **Integración CDK:** 
  - Comparte estructura con Modals. Inicializado mediante `CdkDialog` enviando una configuración de clase específica: `panelClass: 'slide-in-right-drawer'`.
- **Accesibilidad:** `CdkTrapFocus` habilitado.
