---
title: Icon Button Specification
description: Implementation ready SDD for Icon Buttons.
---

# Icon Button

## Overview
- **Purpose:** Execute actions where space is limited and intent is universally understood via iconography.
- **UX Intent:** A dense, precise glass key. 
- **Visual Intent:** Perfect aspect ratio (square or circular) maintaining the Liquid Glass properties.

## Guidelines
- **When to use:** Toolbars, table row actions, close buttons in modals.
- **When NOT to use:** Primary CTAs requiring explicit textual context.

## Structure
- **Anatomy:**
  - `Root Container` 
  - `Icon Slot`
- **Required parts:** Icon SVG, sr-only ARIA label.
- **Optional parts:** Tooltip for context.

## Properties
- **Variants:** Primary (neon border), Ghost (no background until hovered), Subtle (glass base).
- **Sizes:** `sm` (w-8 h-8), `md` (w-10 h-10), `lg` (w-12 h-12).
- **States:** Default, Hover (glass opacity brightens), Focus (neon ring), Active (shrinks scale 0.95), Disabled.

## Behavior
- **Interaction behavior:** Icon itself may shift color slightly on hover; container gains soft back-light.
- **Accessibility requirements:** 
  - MUST have `aria-label` or `<span class="sr-only">`.
- **Responsive behavior:** Maintains strict aspect ratio.
- **Theming behavior:** Uses core semantic text colors for the SVG path.

## Technical Implementation
- **Dependencies:** `radius-md` or `radius-full`, `blur-md`.
- **Edge cases:** Unusually shaped SVGs.
- **Anti-patterns:** Rectangular widths for single icons.
- **Acceptance criteria:**
  - [ ] Content is perfectly centered both horizontally and vertically.
  - [ ] Screen readers announce the button's action correctly.


## Angular API (v21)
- **Selector:** `<button liquid-icon-btn>` o `<a>`
- **Standalone:** `true`
- **Host Directive:** Se aconseja construirlo como un Host Directive idéntico al `button` para heredar enfoques accesibles y señales de focus.
