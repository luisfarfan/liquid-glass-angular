---
title: Skeleton Specification
description: Implementation ready SDD for Skeleton Loaders.
---

# Skeleton (Loading State)

## Overview
- **Purpose:** Perceived performance placeholder during async data fetching.
- **UX Intent:** Communicates structure before content.
- **Visual Intent:** Low-opacity glass blocks that pulse with a soft inner light.

## Structure
- **Anatomy:** Unstyled divs mapping exactly to heights and widths of text/images.

## Behavior
- **Interaction behavior:** Continuous CSS animation (`pulse` or `shimmer` gradient).
- **Theming behavior:** Uses `rgba(255,255,255,0.05)` as base and sweeps to `0.1`.

## Technical Implementation
- **Acceptance criteria:**
  - [ ] Animation is disabled if user prefers reduced motion (CSS `@media (prefers-reduced-motion)`).


## Angular API (v21)
- **Selector:** `<liquid-skeleton>`
- **Standalone:** `true`
- **Signals & Inputs:**
  - `type = input<'text' | 'avatar' | 'card'>('text');`
  - Computará rápidamente formas estándar, delegando toda la animación al CSS Keyframe nativo (Zero JavaScript loop animation).
