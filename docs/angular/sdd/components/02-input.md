---
title: Glass Input Component Specs
description: Especificación técnica avanzada del campo de texto premium para Liquid Glass UI.
version: 1.2.0
---

# 02. Glass Input (Atom)

El Input es un área "tallada" en el panel de cristal. Utiliza sombras internas para simular profundidad y un sistema de neón radiante para indicar actividad.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `input<string>` | `'text'` | Soporta `text`, `password`, `email`, `number`. |
| `label` | `input.required<string>` | - | Etiqueta accesible vinculada al input. |
| `placeholder` | `input<string>` | `''` | Texto de ayuda visual. |
| `error` | `input<string \| null>` | `null` | Mensaje de error (dispara estado visual neón rojo). |
| `mode` | `input<'standard' \| 'chips'>` | `'standard'` | Permite entrada de tags/chips de cristal. |

### Signals de Comportamiento
*   `isFocused = signal(false)`: Controla el resplandor neón.
*   `value = model<string>('')`: Enlace bidireccional de datos.

---

## 2. Premium Interaction Features

### A. Glass-Magnify Effect
Al entrar en **Focus**:
- El `letter-spacing` se incrementa sutilmente (`0.02em`) mediante una transición de `200ms`.
- Simula una distorsión óptica de lupa causada por la profundidad del cristal del fondo.

### B. Chips Mode (Etiquetas de Cristal)
Cuando `mode="chips"`:
- Los valores ingresados se transforman en píldoras de cristal (`Glass Pills`) con un botón de eliminar.
- Las píldoras heredan un `backdrop-blur-sm` y un borde neón muy fino.

### C. WebKit Autofill Resilience
Implementamos un "escudo visual" para evitar que el navegador inyecte fondos sólidos:
```css
input:-webkit-autofill {
  -webkit-text-fill-color: var(--lg-t-text-primary) !important;
  box-shadow: 0 0 0 1000px var(--lg-t-glass-deep) inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
```

---

## 3. Estilos y Variantes (Tailwind v4)

*   **Default State**: Fondo `bg-black/20`, sombra interna `inset-shadow-md`, borde `white/5`.
*   **Focus State**: El borde se ilumina con `color-primary`. Sombra externa `glow-sm` (8px de difusión neón).
*   **Error State**: Todo el sistema de neón cambia a `color-destructive`.

---

## 4. Accesibilidad (A11y)

*   **Label Link**: Uso automático de `id` único y `for` en la etiqueta.
*   **Error Messaging**: `aria-invalid="true"` y `aria-describedby` apuntando al mensaje de error.
*   **Touch Target**: Altura mínima de `2.75rem` (44px) para facilidad de clic en móviles.

---

## 5. Integración con Formularios

El componente implementa `ControlValueAccessor` (CVA), permitiendo su uso inmediato en **Reactive Forms**:

```html
<form [formGroup]="userForm">
  <lib-glass-input 
    label="Email de Usuario" 
    formControlName="email"
    [error]="userForm.get('email')?.errors ? 'Email inválido' : null">
  </lib-glass-input>
</form>
```

---

> **Regla de Diseño:** "Forms are conversations." El feedback visual (neón) debe guiar al usuario a través de cada campo sin causar fatiga visual.
