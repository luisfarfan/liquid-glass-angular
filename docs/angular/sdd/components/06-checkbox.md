---
title: Glass Checkbox Component Specs
description: Especificación técnica avanzada del componente de selección con transiciones morphing.
version: 1.1.0
---

# 06. Glass Checkbox (Atom)

El Checkbox es una celda de cristal grabada que responde con luz y movimiento fluido.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `model<boolean>` | `false` | Estado de selección primario. |
| `indeterminate` | `input<boolean>` | `false` | Estado parcial (raya horizontal). |
| `label` | `input<string>` | `''` | Texto que acompaña al control. |

---

## 2. Advanced Motion Features

### A. Mixed-to-Checked Morphing
Cuando el estado cambia de `indeterminate` a `checked`:
- El componente no sustituye el icono, sino que aplica un **morphing de path SVG**.
- La línea horizontal del estado indeterminado se "rompe" y se pliega para formar la marca de verificación en una transición de `250ms`.

### B. Click Zone Optimization (Fitts's Law)
Para garantizar una experiencia sin frustraciones:
- El área interactiva real (`touch-target`) se extiende visualmente más allá del cuadro de cristal mediante un padding invisible de `8px`.
- Permite que el usuario active el control incluso si su puntero o dedo no aterriza exactamente en el centro del componente.

---

## 3. Visual & Interaction Design

*   **Glass Draw**: Al activarse, la marca aparece con un efecto de "escritura" láser.
*   **Haptic Pulse**: Un micro-pulso de `window.navigator.vibrate(5)` confirma la selección.
*   **AESTHETIC**: Fondo `bg-primary/80` (Neón) con un brillo perimetral de `4px` en `focus-visible`.

---

## 4. Estructura y A11y

*   **HTML**: Emplea un `<input type="checkbox" class="sr-only peer">`.
*   **Labels**: El click sobre el texto de la etiqueta también dispara el estado, maximizando el área de interacción.
