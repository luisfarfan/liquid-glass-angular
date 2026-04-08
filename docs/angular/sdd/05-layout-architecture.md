---
title: Layout & Structure Architecture
description: Specifications for the Admin Dashboard layout, grids, responsive behavior, and Z-index layering in Angular 21.
version: 1.2.0
---

# 05. Layout & Structure Architecture

Esta especificación define el esqueleto macro de la aplicación. Elevamos el estándar del sistema agregando capacidades de diseño adaptativo avanzado y resiliencia de carga.

---

## 1. App Shell Architecture (Angular Root)

*   **Fixed Viewport**: El Shell ocupa exactamente `100dvh` y `100vw`.
*   **Safe Area Awareness**: El Shell debe respetar las áreas seguras de dispositivos (Notch de iPhone/Mac) usando `padding: env(safe-area-inset-*)`. Esto garantiza que los botones inferiores o el sidebar nunca se solapen con el hardware del dispositivo.

---

## 2. Advanced Adaptive Patterns

### A. Container Queries (Component Autonomy)
A diferencia de los Media Queries tradicionales, los componentes de Liquid Glass UI usarán **Container Queries** (`@container`).
*   **Regla**: Un componente `Glass-Card` debe cambiar su layout (ej. de horizontal a vertical) basándose en el ancho de su **contenedor padre**, permitiendo que sea reutilizado en columnas de dashboard de cualquier tamaño sin romperse.

### B. Skeleton & Layout Stability
Para prevenir el "Cumulative Layout Shift" (CLS):
*   **Placeholder Reservations**: Al cargar datos, el Layout debe renderizar "Skeletons" de cristal con las dimensiones exactas del contenido final.
*   **Stability**: El contenedor de contenido principal debe tener un `min-height: 100%` para evitar que el pie de página o los orbes de fondo "salten" al cargar vistas dinámicas.

---

## 3. Layout Dimensions & Grids

Adoptamos el patrón de **Bento Box** (diseño compartimentado) usando Tailwind v4.

*   **Escala Rem**: `gap: 1.5rem` (24px) estándar.
*   **Diseño Fluido**: Uso de `grid-cols-12` para máxima flexibilidad en escritorio.

---

## 3. Comportamiento de Contenedores

### A. Sidebar (Navigation Hub)
*   **Desktop**: Anclado a la izquierda (`fixed` o `sticky`). Ancho: `16rem` (256px).
*   **Mobile**: Se convierte en un `Navigation Drawer` (`z-index: 40`) con un overlay de cristal oscuro.
*   **Glass Level**: Nivel 1 (Desenfoque profundo para contraste con el contenido).

### B. Sticky Topbar
*   **Dinámica**: Transparente al inicio (`scroll-y = 0`). Al hacer scroll, activa el cristal esmerilado de Nivel 2.
*   **Jerarquía**: Altura fija de `4rem` (64px) con `z-index: 10`.

---

## 4. Jerarquía de Capas (Z-Index Stack)

Para evitar colisiones visuales y "bugs" de superposición, aplicamos un sistema de capas estricto de 10 en 10:

| Nivel | Token | Elementos |
| :--- | :--- | :--- |
| **0** | `z-base` | Fondo Ambiental, Orbes de Luz, Cards Estáticas. |
| **10**| `z-sticky` | Topbar, Headers de tablas fijos. |
| **20**| `z-nav` | Sidebar (Desktop). |
| **30**| `z-popover`| Tooltips, Dropdowns, Selects, Menús contextuales. |
| **40**| `z-overlay`| Mobile Sidebar / Drawer, Backdrops de Modales. |
| **50**| `z-modal` | Ventanas de Diálogo, Modales de Proceso. |
| **60**| `z-toast` | Notificaciones, Alertas críticas (Always Top). |

---

## 5. Accesibilidad de Layout

1.  **Skip Links**: Debe existir un enlace oculto al inicio para saltar directamente al contenido principal (`#main-content`).
2.  **Focus Trapping**: Los modales (`z-50`) deben atrapar el foco del teclado obligatoriamente.
3.  **Responsive Touch Targets**: En móvil, todos los elementos interactivos del layout deben tener un área mínima de `2.75rem` (44px) para evitar errores de clic.

---

> **Regla de Oro:** "No nested scrollbars." Si un componente requiere scroll interno, debe ser una excepción documentada y nunca competir con el scroll principal de la página.
