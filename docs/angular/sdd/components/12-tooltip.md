---
title: Glass Tooltip Component Specs
description: Especificación técnica avanzada de la directiva de tooltip premium con soporte para plantillas dinámicas y animaciones elásticas.
version: 1.1.0
---

# 12. Glass Tooltip (Atom)

El componente `lib-glass-tooltip` es una directiva de mejora contextual que proyecta pequeñas burbujas de cristal con refracción dinámica para informar al usuario sin interrumpir su flujo.

---

## 1. API Reference (Angular Signals)

### Inputs (Directive: `libGlassTooltip`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `content` | `input.required<string \| TemplateRef<any>>` | - | Texto o plantilla HTML para el tooltip. |
| `variant` | `input<'default' | 'primary' | 'accent'>` | `'default'` | Esquema de color del borde neón sutil. |
| `position` | `input<TooltipPosition>` | `'above'` | Posición preferida (el CDK auto-ajusta si no hay espacio). |
| `showDelay` | `input<number>` | `200` | Tiempo de espera en hover. |

### Signals de Estado
*   `isVisible = signal(false)`: Estado reactivo de presencia.
*   `triggerOrigin = signal<ElementRef | null>(null)`: Referencia al host para el overlay.

---

## 2. Premium Interaction Features

### A. Elastic Expansion & Spring
La burbuja emerge mediante una física elástica:
- **Transform**: `scale(0)` -> `scale(1)` con curva `overshoot`.
- **Optical Gain**: El fondo del tooltip gana nitidez mediante el incremento del `backdrop-blur-md` conforme se expande.

### B. Ambient Levitation
Para reforzar la estética "Liquid", el tooltip mantiene un movimiento errático casi imperceptible:
- **Floating**: Micro-traslaciones de `1px` en el eje Y a baja frecuencia (`4s`).
- **Glow Shift**: Un brillo perimetral que orbita la burbuja una vez al aparecer.

### C. Mechanical Haptic (Mobile Only)
Si el usuario hace un **Long Press** en móviles para ver el tooltip:
- Se emite un pulso háptico de confirmación (`vibrate(5)`) al aparecer la burbuja.

---

## 3. Arquitectura Técnica (Angular + CDK)

### Content Versatility
El componente maneja tanto contenido plano como plantillas complejas:

```typescript
// Soporte para TemplateRef o String
readonly contentIsTemplate = computed(() => this.content() instanceof TemplateRef);
```

### Overlay Strategy
- **Positioning**: Uso de `ConnectedPositionStrategy`.
- **Backdrop**: No se usa backdrop para tooltips, pero se bloquean los eventos de puntero (`pointer-events: none`) para que el usuario pueda seguir interactuando con elementos adyacentes.

---

## 4. Estilos y Variantes (Tailwind v4)

*   **Default**: `bg-white/5 backdrop-blur-md border-white/20`.
*   **Primary**: Borde con un sutil resplandor `blue-400`.
*   **Typography**: Fuente `Inter` con `tracking-tight` para mayor legibilidad en tamaños reducidos.

---

## 5. Accesibilidad (A11y)

*   **Automatic Linking**: La directiva inyecta un `id` único y lo vincula al `aria-describedby` del elemento host automáticamente.
*   **Focus Integrity**: Aparece inmediatamente en `focus` por teclado, garantizando que los usuarios de teclado reciban la misma información.
*   **Color Contrast**: El texto hereda un contraste reforzado para cumplir con WCAG AA.

---

> **Regla de Diseño:** "Tooltips are light as air." Su presencia debe ser una confirmación, no un obstáculo visual. La levitación debe pausarse si el usuario tiene activas las preferencias de reducción de movimiento.
