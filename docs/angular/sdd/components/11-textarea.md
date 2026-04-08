---
title: Glass Textarea Component Specs
description: Especificación técnica avanzada del área de texto multilínea con auto-expandido, feedback háptico y estética Glass-Etched.
version: 1.1.0
---

# 11. Glass Textarea (Atom)

El componente `lib-glass-textarea` es una superficie táctil "tallada" en el panel de cristal, diseñada para capturar texto multilínea con una experiencia de escritura fluida y feedback visual reactivo.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `input.required<string>` | - | Etiqueta accesible vinculada al textarea. |
| `placeholder` | `input<string>` | `''` | Texto de ayuda visual. |
| `rows` | `input<number>` | `3` | Número de líneas iniciales. |
| `autosize` | `input<boolean>` | `true` | Habilita el crecimiento dinámico según el contenido. |
| `maxChars` | `input<number \| null>` | `null` | Límite de caracteres con contador visual neón. |
| `error` | `input<string \| null>` | `null` | Mensaje de error para disparo del estado neón rojo. |

---

## 2. Premium Interaction Features

### A. Glass-Magnify & Depth
Como en todos los inputs de la suite:
- **Focus Magnify**: Al entrar en foco, se incrementa sutilmente el `letter-spacing` (`0.02em`) para simular distorsión óptica.
- **Inertia Shadow**: Sombras internas reforzadas que dan la sensación de un área bajorrelieve tallada en un panel grueso de cristal.

### B. Typing Physics & Haptics
Cada interacción cuenta:
- **Micro-Glow Pulse**: Cada pulsación genera un breve pulso de luz neón que emana del cursor.
- **Boundary Haptics**: Al alcanzar el `maxChars`, el componente emite una vibración de error sutil (`vibrate(10)`) y el borde parpadea en rojo neón una vez.

### C. Dynamic Autosize (CDK)
- **Fluid Expansion**: El ajuste de altura se realiza mediante una transición de `height` para evitar saltos bruscos.
- **Glass Scrollbar**: Si se desactiva `autosize`, se utiliza una barra de scroll con opacidad dinámica que solo se hace visible al desplazar el contenido.

---

## 3. Arquitectura Técnica (Angular + CDK)

### Reactive Integration
- **CVA**: Implementación de `ControlValueAccessor` para Forms.
- **Change Detection**: `OnPush` para máximo rendimiento.
- **Signals**: Uso de `computed()` para monitorizar la salud del límite de caracteres.

```typescript
readonly status = computed(() => {
  const count = this.charCount();
  const max = this.maxChars();
  if (!max) return 'normal';
  if (count > max) return 'error';
  if (count > max * 0.9) return 'warning';
  return 'normal';
});
```

---

## 4. Estilos y Variantes (Tailwind v4)

*   **Default State**: `bg-black/30 border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]`.
*   **Focus State**: Borde iluminado con el color primario y un `glow` de 10px de difusión.
*   **Disabled**: Opacidad al 50% con un efecto de "cristal esmerilado" (`backdrop-grayscale`) que indica inactividad.

---

## 5. Accesibilidad (A11y)

*   **Live Region**: `aria-live="polite"` en el contador para informar al usuario de la proximidad al límite.
*   **Alt-Text Strategy**: `aria-describedby` vinculando el label, el contador y el mensaje de error.
*   **Selection Tint**: La selección de texto utiliza un color `primary-500` con `opacity-30` para mantener la legibilidad tras el cristal.

---

> **Regla de Diseño:** "Writing should feel like engraving light." El textarea debe ser un espacio de claridad donde las palabras del usuario brillen sobre el fondo oscuro, evitando que el componente se sienta como un bloque pesado.
