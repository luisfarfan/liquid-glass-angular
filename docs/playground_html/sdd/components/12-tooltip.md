---
title: Tooltip Specification
description: Implementation ready SDD for Tooltips.
---

# Tooltip

## Overview
- **Purpose:** Micro-contextual hints.
- **UX Intent:** Appears on slight delay to avoid noisy flashing.
- **Visual Intent:** Pure high-blur frosted glass, minimal border, no intense shadow to keep it feeling light.

## Guidelines
- **When to use:** Truncated text, icon-only buttons.
- **When NOT to use:** Critical errors or rich HTML content (use Popovers).

## Structure
- **Anatomy:**
  - `Trigger element`
  - `Tooltip Body` (Text)
  - `Arrow pointer` (Optional)

## Properties
- **Sizes:** Scales with text (max-width enforced to prevent huge popups).
- **States:** Visible / Hidden.

## Behavior
- **Interaction behavior:** Delay entry 300ms, exit instantly. 
- **Accessibility requirements:** `role="tooltip"`, `aria-describedby` linking.

## Technical Implementation
- **Dependencies:** `glass-level-3`, Z-index scale.
- **Acceptance criteria:**
  - [ ] Pointer arrow seamlessly merges with the glass body (requires complex border tricks or skipping the arrow to maintain pure glass).


## Angular API (v21)
- **Selector:** `[liquidTooltip]` (Directiva, NO componente).
- **Standalone:** `true`
- **Integración CDK:**
  - Instanciar a través de `@angular/cdk/overlay`.
  - Crear un Componente Tonto `LiquidTooltipComponent` para el panel.
  - Generará el portal flotante al `mouseenter` y lo destruirá al `mouseleave` previniendo memory leaks.
