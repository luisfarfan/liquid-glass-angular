---
title: Responsive Typography System
description: Technical specification for fluid and accessible typography using rem units and clamp().
version: 1.0.0
---

# 03. Responsive Typography System

La tipografía en Liquid Glass UI debe ser legible, elegante y adaptable. No usamos tamaños fijos; usamos **Fluid Typography** para que el texto respire correctamente tanto en un iPhone SE como en un monitor UltraWide.

---

## 1. Configuración Base

*   **Unidad Root**: `16px` (Default del navegador) = `1rem`.
*   **Fuentes**: 
    *   *Primary*: `Outfit` (Visual/Headers).
    *   *Secondary*: `Inter` (UI/Body).
    *   *Mono*: `JetBrains Mono` (Code/Numbers).

---

## 2. Escala de Tipografía Fluida

Utilizamos la función `clamp()` para definir un tamaño mínimo (móvil) y un máximo (desktop) que escala suavemente con el ancho de la pantalla (**Viewpoint Width**).

| Nivel | Token Tailwind | Rango (rem) | Rango (px aprox) | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **Display 1** | `text-display-1` | `clamp(2.5rem, 5vw, 4.5rem)` | 40px - 72px | Hero sections |
| **Heading 1** | `text-h1` | `clamp(2rem, 4vw, 3rem)` | 32px - 48px | Page titles |
| **Heading 2** | `text-h2` | `clamp(1.5rem, 3vw, 2.25rem)` | 24px - 36px | Section titles |
| **Heading 3** | `text-h3` | `clamp(1.25rem, 2.5vw, 1.75rem)` | 20px - 28px | Card titles |
| **Body LG** | `text-body-lg` | `1.125rem` | 18px | Intro text |
| **Body MD** | `text-body-md` | `1rem` | 16px | Default content |
| **Body SM** | `text-body-sm` | `0.875rem` | 14px | Metadata / Mini cards |
| **Caption** | `text-xs` | `0.75rem` | 12px | Overlines / Tooltips |

---

## 3. Design Tokens (Typography)

Definición en `libs/liquid-glass-ui/src/styles.css`:

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui;
  --font-display: "Outfit", var(--font-sans);
  
  /* Pesos */
  --font-weight-thin: 100;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Line Heights (Relativos) */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

---

## 4. Reglas de Accesibilidad (A11y)

1.  **Line Height**: Nunca debe ser menor a `1.5` para textos de cuerpo (`text-body-md`).
2.  **Tracking (Letter Spacing)**: 
    *   Los encabezados (`h1-h3`) usan `tracking-tight` (`-0.02em`).
    *   Los textos pequeños (`text-xs`) usan `tracking-wider` (`0.05em`) para compensar la legibilidad.
3.  **Contraste**: El texto debe mantener un ratio de contraste de **4.5:1** (WCAG AA). 
    *   *Tip:* No uses opacidad menores a `0.7` para textos largos sobre cristal.

---

## 5. Implementación en Angular Component

Para mantener el diseño fluido, evitaremos clases de tamaño fijo dentro de los componentes. Preferiremos el uso de **Semantic Tags**.

```html
<!-- Mal: Hardcoded px -->
<p style="font-size: 16px">Hola</p>

<!-- Bien: Clase semántica fluida -->
<h1 class="text-h1 font-display font-bold leading-tight">
  Dashboard Overview
</h1>
```

---

> **Regla de Oro:** "Typography is 95% of web design." Si el texto no escala, el sistema de diseño ha fallado.
