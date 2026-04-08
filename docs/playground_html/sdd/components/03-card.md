---
title: Card Specification
description: Implementation ready SDD for Card containers.
---

# Card

## Overview
- **Purpose:** Serve as the primary content container, grouping related data, charts, or forms.
- **UX Intent:** To feel like an elegant physical sheet of frosted glass floating above the dashboard floor.
- **Visual Intent:** Pure Liquid Glass implementation (Level 1 or Level 2).

## Guidelines
- **When to use:** Almost universally for chunking context in dashboards.
- **When NOT to use:** Inside already nested cards (avoid Card-in-a-Card inception; use simple dividers instead).

## Structure
- **Anatomy:**
  - `Card Root`
  - `Card Header` (Title + Optional Actions)
  - `Card Body` (Primary Content Slot)
  - `Card Footer` (Pagination, Submit actions)
- **Required parts:** Card Root, Card Body.
- **Optional parts:** Header, Footer.

## Properties
- **Variants:**
  - `Elevated`: Default Glass panel with `blur-xl`, subtle border light leak, and strong drop shadow.
  - `Outlined`: Reduced fill, thicker visible border (usually `rgba(255,255,255, 0.1)`), no heavy shadow.
- **Sizes:** Governed by parent grid, internal padding varies (`sm: p-4`, `md: p-6`, `lg: p-8`).
- **States:**
  - `Interactive/Link`: Can be clicked; triggers structural scale `0.99` and hover illumination on hover.
  - `Static`: No interaction.

## Behavior
- **Interaction behavior:** Static by default. If the card acts as a link, the entire surface should slightly lighten on hover.
- **Accessibility requirements:** If interactive, the root must have keyboard focusability and ARIA roles (`role="region"` or `article`).
- **Responsive behavior:** Stack vertically on mobile, breaking grid tracks.
- **Theming behavior:** Translucency strictly allows whatever ambient background orb is behind it to bleed through.

## Technical Implementation
- **Dependencies:** `glass-level-1`, `shadow-float`, `radius-xl`.
- **Edge cases:** Very complex charts overflowing the border radius. Content must have `overflow: hidden` or matching inner radii.
- **Anti-patterns:** High opacity backgrounds (destroying the glass look), removing the 1px inset top border (makes it look flat and muddy).
- **Acceptance criteria:**
  - [ ] Ambient light bleeds through the card accurately.
  - [ ] Top/left edges catch the 1px white inset "Glow" line.
  - [ ] Content inside does not get blurred (backdrop-filter is strictly applied to the card background layer).


## Angular API (v21)
- **Selector:** `<liquid-card>`
- **Standalone:** `true`
- **Signals & Inputs:**
  - `level = input<1 | 2 | 3>(1);` (Controla la intensidad del glassmorphism).
  - `interactive = input<boolean>(false);` (Añade hover-glow si es true).
- **Estructura (Control Flow):**
  - `<ng-content select="[card-header]"></ng-content>`
  - `<ng-content></ng-content>` (Cuerpo)
  - `<ng-content select="[card-footer]"></ng-content>`
