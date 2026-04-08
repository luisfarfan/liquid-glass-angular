---
title: Glass Badge Component Specs
description: Especificación técnica de los indicadores de estado y etiquetas (Badges) para Liquid Glass UI.
version: 1.0.0
---

# 04. Glass Badge (Atom)

El Badge es un micro-componente diseñado para la escaneabilidad inmediata. En Liquid Glass UI, se comporta como una pequeña incrustación de cristal neón.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `input<BadgeVariant>` | `'info'` | Variantes: `success`, `warning`, `error`, `info`, `neutral`. |
| `style` | `input<'glass' \| 'solid'>` | `'glass'` | `'glass'` para sutil, `'solid'` para alto contraste. |
| `isPulsating` | `input<boolean>` | `false` | Activa animación de respiración en el punto de estado. |
| `showDot` | `input<boolean>` | `true` | Muestra un círculo neón a la izquierda del texto. |

---

## 2. Visual & Interaction Design

### A. Glossy Aesthetics
- **`glass` style**: `bg-white/5`, `backdrop-blur-sm`, borde de color neón al 30% de opacidad.
- **`solid` style**: Fondo de color neón sólido con texto en alto contraste (oscuro o blanco puro).

### B. Pulsating Animation
Si `isPulsating` es true, el punto de estado (`status-dot`) usa:
- **Keyframe**: `opacity` de 0.4 a 1.0.
- **Glow**: Un resplandor (`box-shadow`) que se expande y contrae en `2s` con curva `ease-in-out`.

---

## 3. Estructura e Iconografía

Usamos slots de contenido simples:
- **Default**: Texto de la etiqueta (ej. "Activo", "Beta", "99+").
- **Icon Support**: Permite inyectar un icono muy pequeño (`0.75rem`) reemplazando al punto de estado si se desea.

---

## 4. Accesibilidad (A11y)

*   **Semantic Labeling**: Si el badge solo muestra un número o color, inyectamos automáticamente:
    ```html
    <span class="sr-only">Estado: {{ variant() }}</span>
    ```
*   **Contrast**: Los colores `success` (Verde), `warning` (Amarillo) y `error` (Rojo) están calibrados para ser legibles sobre cristal oscuro cumpliendo WCAG AA.

---

## 5. Ejemplo de Uso

```html
<!-- Badge de Cristal para Status -->
<lib-glass-badge 
  variant="success" 
  style="glass" 
  [isPulsating]="true">
  Online
</lib-glass-badge>

<!-- Badge Sólido para Alertas -->
<lib-glass-badge 
  variant="error" 
  style="solid">
  ¡Acción Requerida!
</lib-glass-badge>
```

---

> **Regla de Oro:** "Don't over-label." El badge debe ser lo más corto posible. Si el texto tiene más de 2 palabras, considera usar otro componente.
