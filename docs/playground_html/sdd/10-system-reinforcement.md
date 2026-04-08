---
title: System Rules Reinforcement & Errata
description: Global consistency patch resolving vague definitions, missing technical rules, and standardizing nomenclature.
version: 1.1.0
---

# 10. System Rules & Critical Definitions (Refinement)

*This document acts as an explicit ruleset reinforcement across all previous SDD files. It resolves ambiguities, defines hard technical thresholds, and aligns terminology to prevent AI hallucination or developer discrepancy.*

## 1. Nomenclature & Terminology (Strict Policy)
- **"Liquid Glass"**: Este es el ÚNICO término oficial para el paradigma UI. Queda prohibido en el código o specs referirse al efecto como *"Acrylic"*, *"Mica"*, *"Frosted"* o *"Glassmorphism"*. 
- **Neon System**: Debe referirse a tokens semánticos pareados. Un efecto neón consta de dos patas obligatorias en CSS: el `border` sólido (`--neon-border`) y el halo exterior (`--neon-glow`).

## 2. Technical Token Constraints (Resolving Vagueness)
Se estandarizan matemáticamente los niveles esbozados en el Documento 03:

- **Glass Level 1 (Base / App Shell / Sidebar)**
  - *Fill:* `bg-white/[0.03]`
  - *Blur:* `backdrop-blur-md` (12px)
- **Glass Level 2 (Raised / Cards / Topbar)**
  - *Fill:* `bg-white/[0.06]`
  - *Blur:* `backdrop-blur-xl` (24px)
- **Glass Level 3 (Floating / Modals / Dropdowns / Tooltips)**
  - *Fill:* `bg-white/[0.09]`
  - *Blur:* `backdrop-blur-2xl` (40px)
  - *Glow:* Mandatory 1px inner inset white highlight.

## 3. Strict Form/Grid Synchronization (Missing Rules)
- **Alturas Estándar Universales:** En la creación de componentes (Fase 2 y 3), `Button`, `Input`, y `Select` en tamaño `md` (por defecto) deben medir matemáticamente `40px` (`h-10` en Tailwind). Las alineaciones horizontales (`items-center` dentro de flex-boxes) tienen tolerancia de desajuste de **0 píxeles**.
- **Regla del Z-Axis Inception:** Para evitar el congelamiento de renderizado WebKit (FPS drop), queda **ABSOLUTAMENTE PROHIBIDO** acumular más de 3 capas anidadas de `backdrop-filter: blur()`.
  *(Ejemplo máximo permitido: Ambient Background -> Sidebar -> Modal -> Tooltip).*

## 4. Interaction & Edge Case Refinements
- **Opacidad del Ghost State:** En el Componente `01-button.md`, especificamos que el Ghost Button es "transparente y luego de baja opacidad". La regla exacta ahora es: Cambia de `bg-transparent` a `bg-white/[0.03]` pero **sin invocar un nuevo backdrop-blur** en hover, para salvar ciclos de GPU.
- **Ambient Core Blending:** Los orbes de luz detrás de la App Shell mencionados en `05-layout` deben obligatoriamente usar la propiedad `mix-blend-mode: screen` o `color-dodge` sobre el fondo Zinc (`zinc-950`). De lo contrario, los orbes debajo del Liquid Glass se verán cenizos y "sucios" (Anti-patrón).
- **Reducción de Movimiento (Compensación de Sombras):** Cuando se inyecte CSS para `@media (prefers-reduced-motion) ` y los modales/drawers pierdan su efecto de traslado, su sombra negra exterior (`drop-shadow` flotante) debe aumentarse en opacidad un 30% como compensación cognitiva ante la aparición "repentina" (sin transición).

## 5. Criterio Maestro de Aceptación (Global)
Cualquier pull-request, generación de código por agentes IA, o revisión visual DEBE fallar automáticamente si:
1. Contiene la utilización estática de la clase `rgba(0,0,0, ...)` para la opacidad de paneles; Liquid Glass opera en blanco translúcido y depende que el "void" negro lo aporte el framework (`body bg-zinc-950`).
2. Contiene el uso del token "Neon" de colores saturados fuera de estados `:focus-visible`, `:checked`, o rutas puramente `.active`.
