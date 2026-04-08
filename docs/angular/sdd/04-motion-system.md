---
title: Motion & Motion Physics System
description: Definición de las curvas de aceleración, duraciones e innovaciones de 'Siguiente Nivel' (View Transitions, Refraction).
version: 1.2.0
---

# 04. Motion System (Físicas y Animaciones)

El movimiento en Liquid Glass UI no es decorativo; es **funcional**. Elevamos la estética del Playground original integrando APIs de última generación para lograr una experiencia "State of the Art".

---

## 1. Curvas de Aceleración (Easings)

Sincronizado con la especificación `06-motion.md` original, optimizado para Angular 21.

| Token | Función CSS | Uso |
| :--- | :--- | :--- |
| **`lc-ease-enter`** | `cubic-bezier(0, 0, 0.2, 1)` | Entrada de objetos, hovers (Responsividad inmediata). |
| **`lc-ease-exit`** | `cubic-bezier(0.4, 0, 1, 1)` | Salida de objetos, cierres (Fuga rápida). |
| **`lc-ease-standard`** | `cubic-bezier(0.4, 0, 0.2, 1)` | Toggles, switches y movimientos de estado dual. |
| **`lc-ease-drawer`** | `cubic-bezier(0.16, 1, 0.3, 1)` | Desaceleración elástica premium (Sidebars). |

---

## 2. Next-Gen Innovations (Premium Features)

### A. View Transitions API (Fluid Page Navigation)
Aprovechamos el soporte nativo de Angular 21 para transiciones de vista. Cuando el usuario navega entre rutas:
- **Shared Element Morphing**: El título de una página o una tarjeta "vuela" y se transforma suavemente a su nueva posición en lugar de un simple fade.
- **Background Persistence**: El fondo ambiental (orbes de luz) se mantiene estático mientras el contenido fluye sobre él.

### B. Dynamic Glass Refraction (Simulación de Luz)
Para que el cristal se sienta real, implementamos una refracción simulada basada en el movimiento del puntero:
- Al interactuar, los gradientes del borde (`border-light`) se desplazan `2px` en sentido opuesto al mouse, simulando el ángulo de incidencia de la luz sobre el material.

---

## 3. Micro-interacciones & Feedback

Heredamos y mejoramos los comportamientos del Playground:

1.  **Pressure Feedback**: Escalado físico de `0.97` en `< 100ms`.
2.  **Luz Dinámica**: Incremento de opacidad del fill (ej. `bg-white/5` -> `bg-white/10`).
3.  **Checkbox Sketching**: Animación del `stroke-dashoffset` en `200ms`.

---

## 4. Prohibiciones Estrictas (Performance Level)

*   **🚫 No Bouncing**: Prohibido efectos "jelly" infantiles. Queremos autoridad administrativa.
*   **🚫 No Layout Repaint**: Prohibido animar `width`, `height`, `margin`.
*   **🚫 No CPU-Bound Blur**: Las transiciones de `backdrop-filter` deben ser cortas y sobre áreas pequeñas para no drenar la batería.

---

## 5. Accesibilidad (Reduced Motion)

Implementamos un control global para respetar la configuración de usuario:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
