---
title: Toast Specification
description: Implementation ready SDD for Toasts / Notifications.
---

# Toast (Notification)

## Overview
- **Purpose:** Non-blocking async feedback.
- **UX Intent:** Slides in quickly, waits, slides out.
- **Visual Intent:** Floating Glass element (Level 3), heavily distinguished by semantic colored left-borders.

## Structure
- **Anatomy:** `Toast Region` (usually absolute right-bottom), `Toast Box`, `Status Icon`, `Message`, `Close Action`.

## Properties
- **Variants:** Success (Green neon accent), Error (Red neon accent), Info (Blue neon accent).

## Behavior
- **Interaction behavior:** Auto-dismissal pauses when hovered.

## Technical Implementation
- **Dependencies:** `z-index-max`, `neon-system`.
- **Acceptance criteria:**
  - [ ] Entering animation must be fluid.
  - [ ] Must stack elegantly if multiple toasts are triggered.


## Angular API (v21)
- **Selector:** `LiquidToastService`
- **Integración CDK:** 
  - Se implementará vía `Overlay` global.
  - La lógica del temporizador se manejará idealmente unificando `setTimeout` con limpieza automática (`destroy()`) o RxJS retrasado para orquestar la finalización de animación `opacity-0` antes de desalojar el Portal real del DOM.
