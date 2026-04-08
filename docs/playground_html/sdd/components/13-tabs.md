---
title: Tabs Specification
description: Implementation ready SDD for Tabs.
---

# Tabs

## Overview
- **Purpose:** Context switching without routing.
- **UX Intent:** Slidable fluid indicators.
- **Visual Intent:** The active tab is anchored by a glowing neon underline or a recessed glass pill.

## Guidelines
- **When to use:** Grouping closely related sub-views in a modal or profile card.
- **When NOT to use:** Primary application navigation.

## Structure
- **Anatomy:**
  - `Tab List` (Container)
  - `Tab Triggers` (Buttons)
  - `Active Indicator` (Floating marker)
  - `Tab Panels` (Content)

## Properties
- **Variants:**
  - `Underline`: Active tab has a bottom neon glowing border.
  - `Pills`: Entire `Tab List` is a depressed glass track, active Tab is an elevated glass button (Slider logic).

## Behavior
- **Interaction behavior:** Keyboard L/R arrows switch tabs. 
- **Theming behavior:** Inactive tabs text is faded (`opacity: 0.5`).

## Technical Implementation
- **Dependencies:** `neon-system`, `glass-base`.
- **Acceptance criteria:**
  - [ ] Active indicator uses `transform` to slide physically between triggers (no instant jumps).


## Angular API (v21)
- **Selector:** `<liquid-tabs>`, `<liquid-tab>`
- **Standalone:** `true`
- **Signals & Control Flow:**
  - `activeTab = model<string>();`
  - Uso de `@if` para renderizar perezosamente (`Lazy Rendering`) solo el cuerpo del tab activo. Si se requiere retener estado, pre-renderizar todo y ocultarlo por CSS.
- **Queries:** `viewChildren(LiquidTabComponent)` para recuperar etiquetas de encabezado automáticamente.
