---
title: Badge Specification
description: Implementation ready SDD for Badge/Pill components.
---

# Badge (Pill)

## Overview
- **Purpose:** Micro-component used to display status, counts, or categorical labels.
- **UX Intent:** Highly scannable, visually distinct but non-intrusive metadata.
- **Visual Intent:** Glowing or frosted micro-crystals.

## Guidelines
- **When to use:** Status indicators (Active, Pending), row counting, new item highlights.
- **When NOT to use:** As buttons or interactive tags (use Chips or Buttons instead).

## Structure
- **Anatomy:**
  - `Root Element` (Pill shape)
  - `Status Dot` (Optional neon glowing SVG/Div)
  - `Label text`
- **Required parts:** Label.
- **Optional parts:** Status dot, trailing icon (e.g. for dismissal).

## Properties
- **Variants:**
  - `Solid`: High opacity background mapping to semantic intent (Success/Green, Error/Red).
  - `Glass/Outline`: `rgba` background matched with neon border, used for less critical data.
  - `Dot-only`: No text, just a pulsating glowing neon orb.
- **Sizes:**
  - `sm`: Text `0.75rem`, padding `px-2 py-0.5`.
  - `md`: Text `0.875rem`, padding `px-2.5 py-1`.
- **States:**
  - `Default`: Static rendering.
  - `Pulsating`: Specifically for 'Live' or 'Critical' states, the status dot breathes using CSS keyframes.

## Behavior
- **Interaction behavior:** Purely presentational (no hover effects) unless used as a dismissable tag.
- **Accessibility requirements:** 
  - Must include hidden text for screen readers if only colors or dots are used to convey status (e.g. `<span class="sr-only">Status: Active</span>`).
- **Responsive behavior:** Inline element, wraps naturally.
- **Theming behavior:** Status colors (Red/Yellow/Green) must be deeply saturated for dark mode readability.

## Technical Implementation
- **Dependencies:** `radius-full`, Semantic Status Colors, Typography (`text-xs`, `font-medium`).
- **Edge cases:** Badge content overflowing a tight grid (truncate gracefully).
- **Anti-patterns:** Giant badges trying to act as Cards.
- **Acceptance criteria:**
  - [ ] Status dot (if present) aligns perfectly vertically to the center of the text baseline.
  - [ ] Colors maintain strict AA contrast (e.g., Black text on Neon Green background, or Neon Green text on dark background).


## Angular API (v21)
- **Selector:** `<liquid-badge>` o `[liquidBadge]`
- **Standalone:** `true`
- **Signals & Inputs:**
  - `variant = input<'success' | 'warning' | 'danger' | 'info'>('info');`
  - `hostClasses = computed(() => ...)` para procesar el borde neón adecuado.
- **Rendimiento:** `ChangeDetectionStrategy.OnPush` estricto, al ser componente 100% presentacional.
