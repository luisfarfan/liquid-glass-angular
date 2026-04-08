---
title: Glass Select Component Specs
description: Especificación técnica avanzada del selector premium con integración de CDK Overlay, ControlValueAccessor y efectos ópticos de profundidad.
version: 1.1.0
---

# 10. Glass Select (Atom)

El componente `lib-glass-select` es un selector de estado avanzado que utiliza una placa de cristal flotante para desplegar opciones, manteniendo una conexión física mediante refracción óptica con el disparador.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `input.required<string>` | - | Etiqueta accesible. |
| `options` | `input<SelectOption[]>` | `[]` | Lista de opciones `{ value: any, label: string, icon?: string }`. |
| `placeholder` | `input<string>` | `'Seleccionar...'` | Texto de ayuda visual. |
| `multiple` | `input<boolean>` | `false` | Habilita la selección de múltiples ítems (modo Crystals). |
| `searchable` | `input<boolean>` | `false` | Añade un input de filtrado interno en la placa. |

### Signals de Comportamiento
*   `isOpen = signal(false)`: Estado del overlay.
*   `value = model<any>(null)`: Sincronización bidireccional mediante `ControlValueAccessor`.

---

## 2. Premium Interaction Features

### A. Glass-Magnify Trigger
Al abrirse o recibir foco:
- El disparador aplica el efecto **Magnify**: un ligero aumento del `letter-spacing` y un `glow` perimetral neón.
- **Haptic Click**: Al abrir el panel, se lanza un pulso táctil corto (`vibrate(5)`) para simular un desbloqueo mecánico.

### B. Floating Plate Physics (CDK Overlay)
El panel utiliza `CdkOverlay` con una estrategia de **Reposition**:
- **Liquid Slide**: El panel emerge desde el trigger con un ligero desenfoque vertical que se aclara al detenerse.
- **Backdrop**: Un `backdrop-blur-xl` intenso que oscurece sutilmente lo que hay detrás para centrar la atención en las opciones.

### C. Spotlight Selection & Crystals
- **Focus Ring**: Cada opción tiene un `ring` de neón interno cuando se navega por teclado.
- **Multi-select (Crystals)**: Las opciones seleccionadas en modo múltiple aparecen como "Cristales" (chips) dentro del trigger con animación de entrada elástica.

---

## 3. Arquitectura Técnica (CDK + Signals)

### Form Integration (CVA)
El componente implementa obligatoriamente `ControlValueAccessor` para una integración nativa con **Reactive Forms**.

### Keyboard Navigation
Utilizamos `ActiveDescendantKeyManager` para gestionar:
- `ArrowDown / ArrowUp`: Navegación entre opciones.
- `Enter / Space`: Selección y cierre.
- `Escape`: Cierre sin cambios.

```typescript
// Gestión de accesibilidad de lista
readonly keyManager = new ActiveDescendantKeyManager(this.optionsQueryList)
  .withWrap()
  .withTypeAhead();
```

---

## 4. Estilos y Tokens (Tailwind v4)

*   **Trigger**: `min-h-[2.75rem] px-4 bg-black/20 border border-white/5 rounded-lg flex items-center justify-between`.
*   **Overlay Panel**: `max-h-[300px] overflow-y-auto rounded-xl border border-white/20 bg-glass-deep shadow-2xl pulse-glow`.
*   **Units**: Todo el espaciado interno y el escalado de la placa se define en `rem`.

---

## 5. Accesibilidad (A11y)

*   **Roles**: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`.
*   **Identidad**: Cada opción generada tiene un `id` único vinculado mediante `aria-activedescendant`.
*   **Safety**: El panel se cierra automáticamente si el usuario hace clic fuera (`backdropClick`).

---

> **Regla de Diseño:** "Selection is commitment." El usuario debe sentir que está interactuando con un objeto de valor. El sonido (háptica) y la luz (spotlight) deben confirmar cada elección.
