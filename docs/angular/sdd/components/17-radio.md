---
title: Glass Radio Specification
description: Especificación técnica avanzada del sistema de selección única con coordinación de grupo, patrones de Radio-Card y efectos de ignición neón multi-cromáticos.
version: 1.2.0
---

# 17. Glass Radio (Atom & Pattern)

## 1. Overview
- **Purpose:** Permitir la selección de una única opción dentro de un conjunto de alternativas mutuamente excluyentes.
- **UX Intent:** Una interacción física que se siente como pulsar un botón retroiluminado.
- **Visual Intent:** Un anillo de cristal esmerilado con un núcleo de neón reactivo de alta precisión.

---

## 2. Advanced Visual Features

### A. Neon Ignition & Haptic Feel
- **Active State (`:active`)**: Al presionar, el anillo exterior se contrae ligeramente (`scale-95`) y el fondo del anillo se oscurece (`bg-zinc-950/60`).
- **Bloom Effect**: El núcleo de neón no solo aparece, sino que proyecta un resplandor que se extiende 12px más allá del borde del anillo.
- **Custom Accents**: El input `color: input<string>` permite definir el color del neón por ítem (ej. `#10b981` para estados positivos, `#f43f5e` para negativos).

### B. Radio Card Pattern (Composition)
El componente puede actuar como disparador para una **Card Seleccionable**:
- **UI**: El Radio se ubica en la esquina superior derecha de una `lib-glass-card`.
- **Comportamiento**: Al hacer clic en cualquier parte de la Card, el Radio se activa.
- **Visual**: La Card seleccionada gana un borde de color coincidente con el neón (`border-primary/40`) y un sombreado ambiental sutil.

---

## 3. API Reference (Angular Signals)

### Glass Radio Item
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `input<string>` | `primary` | Color del neón del núcleo (hex o variable CSS). |
| `useCard` | `input<boolean>` | `false` | Envuelve el radio en un estilo de tarjeta seleccionable. |
| `id` | `input<string>` | `generated` | ID para vinculación label-input. |

---

## 4. Arquitectura Técnica & Patrones

### Radio Card Wrapper
Cuando `useCard` es true, el componente expande su área interactiva:

```html
<div class="radio-card-wrapper" [class.selected]="isSelected()">
  <lib-glass-card (click)="onSelect()">
    <div class="card-layout">
      <!-- Slot para el contenido de la tarjeta -->
      <ng-content></ng-content>
      
      <!-- Visual representativo del Radio -->
      <div class="radio-visual-indicator" [style.color]="color()">
         <div class="ring">
           <div class="core" [class.ignited]="isSelected()"></div>
         </div>
      </div>
    </div>
  </lib-glass-card>
</div>
```

---

## 5. Estilos (Tailwind v4)

*   **Outer Ring**: `w-5 h-5 rounded-full border border-white/10 bg-zinc-950/20 backdrop-blur-sm transition-transform active:scale-90`.
*   **Neon Core**: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-300 transform scale-0`.
*   **Ignited Core**: `scale-100 opacity-100 shadow-[0_0_15px_currentColor]`.
*   **Radio Card**: `p-4 transition-all border border-white/5 hover:border-white/20 select-none`.
*   **Selected Card**: `bg-primary/5 border-primary/30`.

---

## 6. Acceptance Criteria
- [ ] La presión activa provoca una micro-escala de contracción en el componente.
- [ ] El color del neón cambia dinámicamente según el input `color`.
- [ ] En modo `useCard`, cualquier clic dentro de la tarjeta activa la selección del radio.
- [ ] El núcleo tiene una animación de "rebote" (elastic) al aparecer.

---

> **Regla de Diseño:** "Feedback is light." Cada presión debe sentirse como una conexión eléctrica. Si el usuario selecciona una opción, el sistema debe confirmárselo no solo con un cambio de valor, sino con un pulso de luz coherente.
