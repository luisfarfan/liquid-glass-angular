---
title: Core Engineering Principles & Architectural Rules
description: Mandatos estricto de ingeniería de software y diseño de sistemas aplicados a Liquid Glass UI.
version: 1.0.0
---

# 02. Core Engineering Principles

Este documento no es una sugerencia; es la **Constitución Técnica** del proyecto. Cualquier componente que no cumpla con estas reglas debe ser refactorizado. El objetivo es crear una librería de grado industrial, altamente performante y lista para producción.

---

## 1. Fundamentos de CSS y Layout

### A. Unidades de Medida (Prohibido `px` en Layout)
*   **Tipografía y Espaciado**: Se usará exclusivamente `rem`. Esto garantiza que la interfaz escale correctamente según la configuración de accesibilidad del usuario.
*   **Radios de Borde**: Uso de `rem` para mantener la proporción con la tipografía.
*   **Bordes y Detalles**: Se permite `px` únicamente para bordes finos (1px) o detalles visuales microscópicos donde el escalado no tiene sentido.

### B. Diseño Fluido y Responsivo (Mobile-First)
*   **Layouts Flexibles**: Priorizar `%`, `vw/vh`, y funciones modernas de CSS como `clamp()`, `min()` y `max()`. 
*   **Mobile-First**: Los componentes deben ser funcionales y hermosos en una pantalla de 320px antes de añadir mayor complejidad para desktop.
*   **Breakpoints**: Usar los tokens de Tailwind v4 para mantener la consistencia en el escalado de pantallas.

---

## 2. Design Tokens & Semantic System

### A. Zero Hardcoding
*   No se permiten valores mágicos (ej. `#f4f4f4` o `blur(10px)` directamente en el componente).
*   Todo debe pasar por los **Design Tokens** definidos en `01-theming-engine.md`.

### B. Estados Universales
Cada componente interactivo debe implementar obligatoriamente estilos para:
1.  **Hover**: Feedback visual sutil.
2.  **Focus-Visible**: Anillos de enfoque neón para navegación por teclado.
3.  **Active**: Transformaciones de escala o feedback de presión.
4.  **Disabled**: Opacidad reducida e interacciones bloqueadas.
5.  **Loading/Error**: Feedback visual de estado de proceso.

---

## 3. Principios de Angular 21 (Signals Architecture)

*   **Change Detection**: `ChangeDetectionStrategy.OnPush` es obligatorio en todos los componentes.
*   **Signals API**:
    *   `input()` e `input.required()` en lugar de `@Input()`.
    *   `output()` en lugar de `@Output()`.
    *   `model()` para Two-Way binding.
    *   `computed()` para lógica derivada de inputs.
*   **Encapsulation**: `ViewEncapsulation.None` para permitir que el motor de temas y los utilitarios de Tailwind fluyan correctamente sin sobreespecificidad innecesaria.

---

## 4. Accesibilidad y Movimiento

*   **A11y**: El contraste de la tipografía sobre el cristal debe cumplir el estándar WCAG AA como mínimo.
*   **Keyboard First**: Toda la funcionalidad debe ser accesible mediante el teclado.
*   **Motion**:
    *   Usar curvas de easing suaves y consistentes.
    *   **Respetar Configuración del Sistema**: Implementar `prefers-reduced-motion` para desactivar o simplificar animaciones a usuarios que lo requieran.

---

## 5. Resiliencia del Contenido

*   **Textos Largos**: Los componentes deben prever casos de desbordamiento (`text-overflow: ellipsis`) o expansión dinámica sin romper el diseño.
*   **Contenedores Variables**: Uso de `min-height` y `max-width` en lugar de dimensiones fijas para adaptarse al contenido dinámico.

---

> **Regla de Oro de Ingeniería:** "Make it work, make it beautiful, make it scale." Si no es mantenible a largo plazo, no es Liquid Glass UI.
