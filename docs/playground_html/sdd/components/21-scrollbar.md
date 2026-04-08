---
title: Scrollbar Component Specification
description: Custom Liquid Glass scrollbar for consistent, minimalist, and aesthetic scrolling across all platforms and containers.
version: 1.0.0
---

# 21. Scrollbar Component

## 1. Vision & Philosophy
El scrollbar en Liquid Glass no debe ser un elemento intrusivo de la UI. Debe actuar como un **indicador de profundidad y posición** casi invisible cuando está inactivo, que solo cobra "vida" al interactuar, reforzando la estética de cristal y neón.

## 2. Anatomy & Tokens
- **Track (Carril):** Completamente transparente (`bg-transparent`) para no romper la continuidad visual del Glass-blur de fondo.
- **Thumb (Indicador):** 
  - *Base:* `rgba(255, 255, 255, 0.05)` (vidrio sutil).
  - *Active/Hover:* `var(--neon-primary-glow)` (cyan translúcido).
  - *Ancho:* 4px (Minimalista).
  - *Border Radius:* `var(--radius-full)` (Completamente redondeado).

## 3. Interaction Specs
- **Idle State:** El thumb es apenas perceptible.
- **Hover State:** El thumb cambia su color a Neon Primary con una transición de `150ms`.
- **Active (Click & Drag):** El thumb mantiene el brillo neón y puede aumentar levemente de opacidad.

## 4. Technical Constraints
- **Platform Parity:** En sistemas como Windows (que tienen scrollbars gruesos por defecto), es **mandatorio** usar selectores `::-webkit-scrollbar` para anular el estilo de sistema.
- **Performance:** Evitar `backdrop-filter` en el scrollbar thumb propiamente dicho; el blur ya existe en el contenedor padre. El thumb debe ser puramente de color/opacidad para evitar lag al scrollear rápidamente.

## 5. Usage Rules
- Aplicar la clase utilitaria `.custom-scrollbar` a cualquier contenedor con `overflow-y: auto` o `overflow-y: scroll`.
- No usar scrollbars horizontales en el dashboard principal; los datos deben adaptarse al ancho o usar contenedores con scroll horizontal detectado por gestos (sin barra visual si es posible).

## 6. Acceptance Criteria
- [ ] El scrollbar desaparece visualmente cuando no hay contenido para scrollear.
- [ ] El "Thumb" nunca mide menos de `20px` de altura para asegurar un target táctil/clicable mínimo.
- [ ] La transición de color al pasar el cursor es suave (150ms).
- [ ] No hay "jump" de layout al aparecer/desaparecer el scrollbar (usar `scrollbar-gutter: stable` si es necesario en áreas críticas).


## Angular API (v21)
- **Selector:** N/A (Es una capa de Estilos Globales, no un Componente Angular activo).
- **Uso:** Importado global en `styles.css`. Opcionalmente en Angular se puede proveer como una directiva estructural si queremos soporte multi-navegadores manual (e.g., OverlayScrollbars wrapper).
