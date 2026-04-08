---
title: Glass Button Component Specs
description: Especificación técnica avanzada del componente de botón premium para Liquid Glass UI.
version: 1.2.0
---

# 01. Glass Button (Atom)

El botón es la unidad básica de interacción. Controlamos el tag nativo mediante el selector `[lib-glass-button]` para máxima accesibilidad.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `input<ButtonVariant>` | `'secondary'` | Variantes: `primary`, `secondary`, `ghost`, `destructive`. |
| `size` | `input<ButtonSize>` | `'md'` | Tamaños: `sm`, `md`, `lg`. |
| `isIconOnly` | `input<boolean>` | `false` | Si es true, aplica un ratio 1:1 y padding simétrico. |
| `enableHaptics` | `input<boolean>` | `true` | Habilita pequeña vibración en dispositivos móviles soportados. |

---

## 2. Premium Interaction Features

### A. Glass Ripple Effect
Al hacer clic, se dispara una onda de luz expansiva:
- **Estilo**: Fondo `white/10` con `backdrop-blur-sm`.
- **Comportamiento**: Se origina en la coordenada exacta del clic (`pointerdown`).
- **Timing**: Expansión de `400ms` con desvanecimiento suave.

### B. Haptic Feedback (Vibratactilidad)
Si `enableHaptics` es true:
- En dispositivos móviles, lanza un `window.navigator.vibrate(10)` al dispararse el evento `click`. 
- Refuerza la sensación de haber presionado un objeto físico sólido.

---

## 3. Estilos y Estructura (Tailwind v4)

*   **Selector**: `button[lib-glass-button], a[lib-glass-button]`.
*   **Icon-Only Mode**: Cuando `isIconOnly()` es true, el componente inyecta las clases `aspect-square p-0 flex items-center justify-center`.

### Variantes Visuales (Legacy Sincronizado)
1.  **Primary**: Glow neón perimetral + fondo opaco de color.
2.  **Secondary (Base Glass)**: `bg-white/5` + `backdrop-blur-md` + `border-white/10`.
3.  **Destructive**: Inset glow rojo + borde neón rojo.

---

## 4. Comportamiento y A11y

*   **Keyboard**: Soporte nativo de `Enter/Space`.
*   **Safety**: Truncado automático de texto con puntos suspensivos si el contenido excede el ancho.
*   **Motion**: Entrada `150ms`, Salida `250ms`, Presión `scale(0.97)` en `100ms`.

```html
<lib-glass-button variant="primary" (click)="save()">
  <i lg-icon-left class="ri-save-line"></i>
  Confirmar Cambios
</lib-glass-button>

<lib-glass-button variant="ghost" [isLoading]="isProcessing()">
  Cancelar
</lib-glass-button>
```

---

> **Regla de Diseño:** "Buttons must feel like buttons." Nunca sacrifiques la claridad de qué es un elemento interactivo por estética pura. El neón es nuestro aliado para guiar el ojo del usuario.
