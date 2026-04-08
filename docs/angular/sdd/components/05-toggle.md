---
title: Toggle Switch Specification
description: Especificación técnica avanzada del interruptor binario (Toggle) para Liquid Glass UI.
version: 1.1.0
---

# 05. Toggle (Switch)

El Toggle es el componente de control binario por excelencia. Se define por su "física de impacto" y su retroalimentación lumínica inmediata.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `model<boolean>` | `false` | Estado activo/inactivo (Two-way binding). |
| `size` | `input<'sm' \| 'md'>` | `'md'` | Escala del interruptor en rem. |
| `enableHaptics` | `input<boolean>` | `true` | Habilita pequeña vibración al cambiar de estado. |

---

## 2. Dynamic Interaction Features

### A. Mechanical Stretch Effect
Para simular masa y velocidad, el "Thumb" (puntero) del interruptor aplica un efecto de estiramiento elástico:
- **Movimiento**: Durante la transición de `translateX`, aplica un `scaleX(1.2)` sutil.
- **Resultado**: El puntero parece "estirarse" hacia su destino antes de recuperar su forma circular al detenerse, dando una sensación orgánica y dinámica.

### B. Haptic Feedback (Mechanical Click)
Si `enableHaptics` es true:
- Al disparar el evento `change`, el componente ejecuta `window.navigator.vibrate(5)`.
- Este micro-pulso simula el "click" mecánico que el usuario esperaría sentir en un interruptor real.

---

## 3. Visual & Theming Design

*   **Unchecked State**: Track en `bg-black/40` con `inset-shadow-sm`. Thumb en cristal neutro.
*   **Checked State**: El Track se ilumina con el color `primary-neon`. El Thumb gana un resplandor perimetral intenso.
*   **Motion Architecture**: Duración de `200ms` usando la curva `lc-ease-standard` (Cubic-bezier equilibrado).

---

## 4. Accesibilidad (A11y)

*   **HTML Role**: Mapping automático a `role="switch"`.
*   **Aria Attributes**: Sincronización de `aria-checked` y `aria-disabled`.
*   **Keyboard**: Interacción total mediante la tecla `Space`.

---

## 5. Implementación con Forms

El componente implementa `ControlValueAccessor` para integrarse con el modelo de formularios de Angular:

```html
<lib-glass-toggle 
  formControlName="notifications" 
  [enableHaptics]="true">
  Activar Notificaciones
</lib-glass-toggle>
```

---

> **Regla de Diseño:** "Interaction is tactile." El usuario debe sentir que está moviendo algo real, no solo cambiando píxeles de color.
