---
title: Topbar Specification
description: Implementation ready SDD for Topbar header.
---

# Topbar (Header)

## Overview
- **Purpose:** Breadcrumbs, Page Titles, Global Search, and Notifications.
- **Visual Intent:** Starts completely transparent, transitions to Frosted Glass upon scrolling down the page.

## Structure
- **Anatomy:** `Header Container`, `Left slot` (Breadcrumbs), `Right slot` (Actions/Profile).

## Behavior
- **Interaction behavior:** Sticky positioning. Triggers backdrop-blur dynamically on scroll `> 0px`.

## Technical Implementation
- **Dependencies:** `glass-level-2`, `sticky`.
- **Acceptance criteria:**
  - [ ] Content scrolling behind the header is appropriately blurred.


## Angular API (v21)
- **Selector:** `<liquid-topbar>`
- **Standalone:** `true`
- **Signals:** Dependerá interceptar un evento de Scroll del Viewport central.
- **Rendimiento:** Debe usar RxJS o directivas Angular con `throttleTime()` para prevenir caídas de FPS al modificar el estado cristalino (`backdrop-blur-xl`) base en la altura del scroll actual.
