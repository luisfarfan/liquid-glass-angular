---
title: Button Specification
description: Implementation ready SDD for the standard Button component.
---

# Button

## Overview
- **Purpose:** Initiates an action, submits forms, or handles dialog invocations.
- **UX Intent:** Must feel like a weighty physical glass tablet that physically reacts to clicks.
- **Visual Intent:** Reflects subtle ambient light on hover; strictly illuminates with Neon tokens ONLY when focused or if it is the primary call to action.

## Guidelines
- **When to use:** Standard actions, form submissions, state toggles.
- **When NOT to use:** For inline navigation (use text links) or purely decorative triggers.

## Structure
- **Anatomy:**
  - `Root Container` (Glass surface context)
  - `Leading Slot` (Optional Icon)
  - `Label` (Text node)
  - `Trailing Slot` (Optional Icon)
- **Required parts:** Label or an `aria-label` if icon-only.
- **Optional parts:** Icons, Loading spinner.

## Properties
- **Variants:**
  - `Primary`: High contrast, slightly more opaque glass, subtle neon glowing border.
  - `Default/Secondary`: Standard Glass Level 1.
  - `Ghost`: Transparent background until hovered, where it becomes low-opacity glass.
  - `Destructive`: Glass base with red-tinted inset shadow/glow.
- **Sizes:**
  - `sm`: height 32px (h-8), padding-x 12px, font-sm.
  - `md`: height 40px (h-10), padding-x 16px, font-base (Default).
  - `lg`: height 48px (h-12), padding-x 24px, font-base.
- **States:**
  - `Default`: Base opacity + backdrop-blur.
  - `Hover`: Fill opacity shifts up +2%, subtle `var(--token-blur-shift)`.
  - `Active/Pressed`: `transform: scale(0.97)`, inner shadow darkens slightly.
  - `Focus-Visible`: Hard neon glowing border (outline offset 2px).
  - `Disabled`: `opacity: 0.5`, `cursor: not-allowed`, no hover/active transforms.
  - `Loading`: Label fades out slightly, spinner occupies center, disabled interactions.

## Behavior
- **Interaction behavior:** Snappy entrance (150ms) and active (100ms) transitions. Return to default is slower (250ms).
- **Accessibility requirements:** 
  - Real `<button>` tag (or `role="button"` + `tabindex="0"` for `a`).
  - `aria-disabled` / `disabled` attribute syncing.
- **Responsive behavior:** Switches to `width: 100%` inside mobile modals, otherwise inline-flex.
- **Theming behavior:** Reflects underlying background gradients through blur. 

## Technical Implementation
- **Dependencies:** `blur-md`, `radius-md`, Semantic Neon Colors.
- **Edge cases:** Truncated text (requires `text-overflow: ellipsis; white-space: nowrap`), flex overflow.
- **Anti-patterns:** Adding outer drop-shadows (button uses inset light and blur for depth, drop-shadow limits the glass effect).
- **Acceptance criteria:**
  - [ ] Scale down animation works smoothly on click.
  - [ ] Neon focus ring is correctly restricted to keyboard focus (`:focus-visible`), not mouse click.
  - [ ] It maintains AA text contrast.

## Angular API (v21)
- **Selector:** `<button liquid-btn>` o `[liquid-btn]` (Uso como Host Directive recomendado para mantener la semántica a11y nativa).
- **Standalone:** `true`
- **Signals & Inputs:**
  - `variant = input<'primary' | 'default' | 'ghost' | 'destructive'>('default');`
  - `size = input<'sm' | 'md' | 'lg'>('md');`
  - `loading = input<boolean>(false);`
- **Computed State:**
  - `hostClasses = computed(() => this.generateClasses(this.variant(), this.size()))`
- **Estructura Interna (Control Flow):**
  - Uso de `@if (loading())` para inyectar un componente `<liquid-spinner>` interno.
  - La proyección de contenido se mantiene vía `<ng-content>`.
