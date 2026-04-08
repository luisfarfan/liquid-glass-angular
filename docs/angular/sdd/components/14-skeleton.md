---
title: Glass Skeleton Component Specs
description: Especificación técnica del componente de carga efímera con efectos de barrido de luz y refracción dinámica.
version: 1.0.0
---

# 14. Glass Skeleton (Atom)

El componente `lib-glass-skeleton` es el marcador de posición visual para contenido en proceso de carga, diseñado para mantener la estructura de la interfaz mediante bloques de cristal con "barrido de luz" interno.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `input<'rect' | 'circle' | 'text'>` | `'rect'` | Forma geométrica del skeleton. |
| `width` | `input<string>` | `'100%'` | Ancho del bloque. |
| `height` | `input<string>` | `'1rem'` | Alto del bloque. |
| `animated` | `input<boolean>` | `true` | Habilita el efecto de barrido de luz. |

---

## 2. Premium Interaction & Visuals

### A. Refractive Light Leak (El Shimmer)
A diferencia de los skeletons tradicionales (gris/blanco), el efecto Liquid Glass utiliza un "escape de luz":
- **Animación**: Un degradado lineal en ángulo de `45deg` que cruza el componente.
- **Efecto**: El brillo no es opaco; es una franja de luz blanca al 15% con desenfoque extremo (`blur(20px)`) que simula un haz de luz atravesando una placa de cristal esmerilado.
- **Ciclo**: `2.5s` con una curva de velocidad `ease-in-out` para simular un movimiento natural.

### B. Glass Base
- **Fondo**: `bg-white/5` (muy tenue).
- **Bordes**: `border border-white/5`.
- **Blur**: Un `backdrop-blur-xs` mínimo para mantener la consistencia táctil del sistema.

### C. Staggered Entrance
Cuando se usan múltiples skeletons en una lista:
- Cada componente debe aplicar un `delay` de animación incrementado automáticamente (ej. `index * 50ms`) para crear una sensación de "cascada de luz" al cargar la página.

---

## 3. Arquitectura Técnica (Angular + CSS)

### Pure CSS Shimmer
Por rendimiento, el efecto de shimmer se implementa puramente en CSS mediante un pseudo-elemento `::after` con `will-change: transform`.

```css
.glass-skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  animation: light-leak 2.5s infinite ease-in-out;
}
```

### Signal Optimization
El componente es puramente presentacional. Se utiliza `ChangeDetectionStrategy.OnPush` y se marcan los inputs como estáticos una vez renderizados para minimizar el impacto en el thread principal.

---

## 4. Estilos (Tailwind v4)

*   **Rect**: `rounded-lg`.
*   **Circle**: `rounded-full`.
*   **Text**: `rounded-sm h-[0.8em] my-[0.1em]`.

---

## 5. Accesibilidad (A11y)

*   **Busy State**: El contenedor padre debe marcarse con `aria-busy="true"`.
*   **Hidden for AT**: El skeleton en sí está oculto para lectores de pantalla mediante `aria-hidden="true"`, ya que no aporta información semántica, solo visual.
*   **Reduced Motion**: Si el usuario activa la reducción de movimiento, la animación de `light-leak` se congela en un estado estático de bajo contraste.

---

> **Regla de Diseño:** "Patience is a visual experience." El skeleton no debe ser aburrido; debe prometer contenido de valor mediante el uso de la luz, manteniendo al usuario cautivado durante la espera.
