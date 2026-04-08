---
title: Input Specification
description: Implementation ready SDD for text inputs.
---

# Input (Text field)

## Overview
- **Purpose:** Capture text/number user input contexts.
- **UX Intent:** Deep, etched areas within the glass panel waiting to be illuminated upon entry.
- **Visual Intent:** Relies on inset shadows (inner depth) rather than drop shadows. Activating it turns on the "Neon" system frame to indicate cursor presence.

## Guidelines
- **When to use:** Forms, search bars, data entry.
- **When NOT to use:** For multi-line text (use Textarea) or massive option sets (use Select).

## Structure
- **Anatomy:**
  - `Input Root / Wrapper`
  - `Leading Icon` (Optional)
  - `HTML Input Element`
  - `Trailing Element` (Optional icon, clear button, or shortcut hint e.g., '⌘K').
- **Required parts:** Input field and accessible floating/fixed label.
- **Optional parts:** Icons, hints.

## Properties
- **Variants:**
  - `Standard`: Underlined or etched glass box.
  - `Filled`: Stronger background opacity.
- **Sizes:**
  - `md`: height 40px (Default).
  - `lg`: height 48px (Search bars).
- **States:**
  - `Default`: Very subtle inset shadow `box-shadow: inset 0 2px 4px rgba(0,0,0,0.2)`. Placeholder text opacity `0.4`.
  - `Hover`: Border brightness increases explicitly by 5-10%.
  - `Focus`: The defining Neon interaction. Inner shadow disappears, replaced by a radiant neon border `0 0 0 1px neon-primary` and a glowing outer spread `0 0 8px neon-primary/30`.
  - `Error`: Neon shifts to Red/Destructive tint.
  - `Disabled`: `opacity: 0.5`, background fill merges with parent.

## Behavior
- **Interaction behavior:** Blinking text cursor matches the neon accent color.
- **Accessibility requirements:** 
  - Input MUST have a `<label for="id">` tightly coupled or `aria-label`.
  - Error states must link via `aria-describedby` to the error text.
- **Responsive behavior:** Scales to 100% width of parent container by default.
- **Theming behavior:** Placeholder color must pass contrast minimums against the deep void of the input background.

## Technical Implementation
- **Dependencies:** `radius-md`, `inset-shadow-tokens`, `neon-system`.
- **Edge cases:** Autofill overriding background colors (WebKit autofill resets glass backgrounds to solid yellow/blue, requires shadow-hacking or `-webkit-text-fill-color` resets).
- **Anti-patterns:** Input text color matching the placeholder (bad contrast), sharp corners next to rounded buttons.
- **Acceptance criteria:**
  - [ ] WebKit autofill does NOT break the glass aesthetic (use `box-shadow: inset 0 0 0 50px rgba(...)`).
  - [ ] Clicking the icon correctly focuses the inner input field.
  - [ ] Neon glow strictly applies when actively typing.


## Angular API (v21)
- **Selector:** `<liquid-input>` o `[liquidInput]`
- **Standalone:** `true`
- **Integración Formularios:**
  - Implementa `ControlValueAccessor` para enlazar perfectamente con `ReactiveFormsModule` (`[formControl]`, `formControlName`).
- **Signals & Inputs:**
  - `icon = input<string>();` (Soporte opcional para SVG leading).
  - `error = input<string>();` (Cambia bordes a Destructive).
- **A11y:** Debe incluir `forwardRef` para asociar el `<label>` externo dinámicamente con el `<input>` nativo envuelto.
