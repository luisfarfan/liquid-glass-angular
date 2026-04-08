---
title: Sidebar Specification
description: Implementation ready SDD for Sidebar Navigation.
---

# Sidebar (App Navigation)

## Overview
- **Purpose:** Primary application routing skeleton.
- **UX Intent:** The permanent anchor of the UI.
- **Visual Intent:** Deep Ambient Blur. It sits behind the main content elevation logic, acting as the lowest level glass.

## Guidelines
- **When to use:** Admin dashboards shell.

## Structure
- **Anatomy:**
  - `Sidebar Container` (Fixed, height 100vh).
  - `Brand Area` (Logo).
  - `Navigation Links`.
  - `User/Settings Footer`.

## Properties
- **States:** Expanded, Collapsed (Icon only).

## Behavior
- **Interaction behavior:** Active link is illuminated with Neon, inactive links are muted.
- **Theming behavior:** Typically holds the strongest background blur or acts as a portal for massive background gradients to bleed through.

## Technical Implementation
- **Dependencies:** `layout-shell-rules`, `glass-level-1`.
- **Acceptance criteria:**
  - [ ] Active state border indicator is clearly visible on the edge.


## Angular API (v21)
- **Selector:** `<liquid-sidebar>`
- **Standalone:** `true`
- **Signals:** 
  - `collapsed = model<boolean>(false);`
  - Uso de `effect()` local que guarde de manera asíncrona la preferencia de colapso en `localStorage`.
- **Responsive:** Usará `BreakpointObserver` del Angular CDK para forzar el estado `collapsed` si la pantalla cruza niveles lógicos móviles.
