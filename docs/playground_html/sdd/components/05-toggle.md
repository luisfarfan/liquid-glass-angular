---
title: Toggle Switch Specification
description: Implementation ready SDD for Toggle (Switch) input.
---

# Toggle (Switch)

## Overview
- **Purpose:** Immediate binary state adjustment (Settings, ON/OFF flags).
- **UX Intent:** Satisfying physical snapping motion, akin to a high-end mechanical dial.
- **Visual Intent:** A recessed glass track containing a glowing, elevated pearl/orb.

## Guidelines
- **When to use:** Immediate boolean decisions where state saves instantly.
- **When NOT to use:** In a form that requires a manual standard "Submit" button (use Checkbox instead).

## Structure
- **Anatomy:**
  - `Track` (Outer background container)
  - `Handle / Thumb` (The moving circle)
  - `Hidden Input` (for a11y)
- **Required parts:** Track and Handle.
- **Optional parts:** Adjacent text label.

## Properties
- **Variants:**
  - `Default`: Glass base.
  - `Neon/Primary`: Uses neon track color when active.
- **Sizes:**
  - `md` (Standard): Track h-6 w-11, Handle h-5 w-5.
  - `sm` (Compact): Track h-5 w-9, Handle h-4 w-4.
- **States:**
  - `Off (Unchecked)`: Track is deep inset grey/void. Handle is greyish white.
  - `On (Checked)`: Track ignites with Neon semantic token. Handle moves right, gains a slight neon glow.
  - `Focus-Visible`: Neon ring wraps the Track.
  - `Disabled`: Opacity 50%, locked interaction.

## Behavior
- **Interaction behavior:** 
  - Click transits handle horizontally (transform: translateX).
  - Hovering increases thumb brightness.
- **Accessibility requirements:** 
  - `role="switch"`
  - `aria-checked="true/false"`
  - Connect to label text via `aria-labelledby`.
- **Responsive behavior:** No specific scaling, standard inline block.
- **Theming behavior:** The "On" track color must glow and cast a faint drop shadow against the background.

## Technical Implementation
- **Dependencies:** `radius-full`, `transition-transform duration-200 ease-in-out`, `neon-system`.
- **Edge cases:** Rapid toggling should not break animation frames (use CSS transforms).
- **Anti-patterns:** Changing the track color to something unrelated to the Neon semantic system.
- **Acceptance criteria:**
  - [ ] Thumb movement uses `translate` (GPU accelerated), not `left` or `margin` properties.
  - [ ] Accessible via Space/Enter keys when focused.

## Angular API (v21)
- **Selector:** `<liquid-toggle>`
- **Standalone:** `true`
- **Integración Formularios:**
  - Implementa obligatoriamente la interfaz `ControlValueAccessor` (CVA) para soporte nativo con `@angular/forms` (Reactive Forms y Template-driven `[(ngModel)]`).
  - Proveedor: `{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LiquidToggle), multi: true }`
- **Signals & Inputs:**
  - `checked = model<boolean>(false);` (Two-way binding signal para la variante sin forms).
  - `disabled = input<boolean>(false);`
  - `size = input<'sm' | 'md'>('md');`
- **Estructura Interna recomendada:**
  - Se debe utilizar un `<input type="checkbox" class="peer sr-only">` envuelto en un `<label>`, enlazando su prop `[checked]` internamente a la señal y despachando eventos `onChange()` para cumplir con el framework CVA, evitando recrear la accesibilidad desde cero.
