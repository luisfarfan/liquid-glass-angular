---
title: Modal Specification
description: Implementation ready SDD for Modals and Dialogs.
---

# Modal (Dialog Container)

## Overview
- **Purpose:** Demand user attention to complete an isolated task or present critical information.
- **UX Intent:** Completely hijack the Z-axis, throwing the rest of the application into deep background space.
- **Visual Intent:** Highest elevation of Liquid Glass (Level 3 Float). It casts massive shadows and extreme blur on the backdrop.

## Guidelines
- **When to use:** Critical confirmations, complex sub-forms, details views that break routing.
- **When NOT to use:** For standard navigation or minor alerts (use Toast instead).

## Structure
- **Anatomy:**
  - `Backdrop Overlay` (Full screen fixed wrapper)
  - `Dialog Trap` (The actual modal centered)
  - `Close Trigger` (Usually X icon top right)
  - `Modal Header, Body, Footer`
- **Required parts:** Backdrop, trap, close trigger.
- **Optional parts:** Footer actions.

## Properties
- **Variants:**
  - `Standard`: Centered Glass Panel.
  - `Slide-over (Sidebar)`: Docks to the right edge (used for deeply nested data editing).
  - `Alert`: Smaller, centered, often mapped to Destructive semantic colors.
- **Sizes:**
  - `sm` (max-w-md), `md` (max-w-xl), `lg` (max-w-3xl), `full` (margin-4).
- **States:**
  - `Entering`: Scales up from `0.95` and opacity `0`. Backdrop transitions from `opacity-0`.
  - `Exiting`: Reverses enter sequence.
  - `Idle`: Resting centered.

## Behavior
- **Interaction behavior:** Clicking outside the Dialog Trap (on the Backdrop Overlay) closes the modal. Pressing `ESC` closes it.
- **Accessibility requirements:** 
  - Heavy Focus trap (Tab ring must loop inside the modal).
  - `aria-modal="true"`, `role="dialog"` or `role="alertdialog"`.
  - Initial focus drops into the first input or the primary CTA.
- **Responsive behavior:** On mobile, modals should pin to the bottom of the screen (`bottom-sheet` style) and stretch 100% width.
- **Theming behavior:** The background overlay must be `rgba(0,0,0, 0.6)` combined with a `backdrop-blur(8px)` to enforce distance.

## Technical Implementation
- **Dependencies:** `z-index-scale (usually z-50)`, `glass-float-level-3`, `radius-xl`.
- **Edge cases:** Modal body taller than viewport bounds (requires `overflow-y: auto` inside the Body segment, Header and Footer must remain fixed).
- **Anti-patterns:** Modals stacking on top of Modals (Inception).
- **Acceptance criteria:**
  - [ ] Focus cannot escape the modal using the `Tab` key.
  - [ ] Body scrolling (`<body>`) is locked (`overflow: hidden`) when modal is open.
  - [ ] Entrance animation executes smoothly under 200ms.

## Angular API (v21)
- **Selector:** Servicio inyectable `LiquidModalService` en lugar de etiqueta HTML fija para evitar contaminación del DOM base.
- **Standalone:** `true` (El componente inyectado será standalone).
- **Integración CDK:**
  - Importación y uso obligatorio de `@angular/cdk/dialog` o `@angular/cdk/overlay`.
  - Configuración del Backdrop: El `backdropClass` del CDK se inyectará con `['bg-black/60', 'backdrop-blur-md']`.
  - Configuración del Panel: El `panelClass` obtendrá nuestro `['glass-3', 'rounded-3xl', 'shadow-[0_20px_50px_rgba(...)']`.
- **Signals & Inputs:**
  - Uso del nuevo sistema de inyección: `readonly dialogRef = inject(DialogRef);`
  - Uso de señales para procesar el estado de entrada/salida para coordinar la animación antes de invocar `dialogRef.close()`.
- **Focus & A11y:**
  - Dejar que `CdkTrapFocus` administre la accesibilidad. No re-implementar el secuestro de la tecla `Tab`.
