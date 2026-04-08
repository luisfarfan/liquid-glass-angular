---
title: Table Specification
description: Implementation ready SDD for Data Tables (Shell).
---

# Data Table (Shell)

## Overview
- **Purpose:** High-density data grid rendering.
- **UX Intent:** Clean, highly scannable rows.
- **Visual Intent:** Avoid heavy vertical borders. Use hover states to illuminate entire rows.

## Guidelines
- **When to use:** Lists of users, transactions, logs.

## Structure
- **Anatomy:**
  - `Table Container` (Scroll wrapper)
  - `Table Header` (Sticky)
  - `Table Rows` (Data)
  - `Table Cells` (Content)

## Behavior
- **Interaction behavior:** Hovering a row slightly brightens its background (simulating a faint back-light).
- **Responsive behavior:** Horizontal scrolling overlay with inner shadows to indicate scrollability.

## Technical Implementation
- **Dependencies:** Semantic borders for bottom rules (`rgba(255,255,255,0.05)`).
- **Anti-patterns:** Thick opaque borders between rows.
- **Acceptance criteria:**
  - [ ] Sticky Header (`th`) maintains a `backdrop-blur` to show data passing behind it during scroll.

## Angular API (v21)
- **Selector:** `<table liquid-table>`
- **Standalone:** `true`
- **Integración CDK:**
  - Hereda o envuelve `@angular/cdk/table`. La tabla no usará `*ngFor` manual.
  - Implementación obligatoria de `DataSource` o Signals reactivas iterables para alta fidelidad de dibujado de filas.
- **Signals & Control Flow:**
  - `data = input.required<T[]>();`
  - Renderizado de filas usando `@for (row of data(); track row.id)`. La cláusula `track` es innegociable por razones de rendimiento.
- **Microacciones (Hooks):**
  - Filas interactivas despacharán eventos locales usando la nueva directiva `@HostListener` o señales de UI interceptadas para no bloquear el hilo de ejecución al calcular los estados hover.
