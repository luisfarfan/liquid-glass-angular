---
title: Glass Search Input Specification
description: Especificación técnica del input de búsqueda omnipotente, con debouncing integrado y efectos de expansión lumínica.
version: 1.0.0
---

# 25. Glass Search Input (Molecule)

## 1. Overview
- **Purpose:** Permitir búsquedas globales o filtrado de listas con una interfaz optimizada para rapidez y claridad.
- **UX Intent:** Una barra de búsqueda que se siente inteligente y reactiva.
- **Visual Intent:** Un campo de cristal ensanchado con un icono de búsqueda fijo que cambia de color al activarse.

---

## 2. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `placeholder` | `input<string>` | `'Search...'` | Texto de ayuda. |
| `value` | `model<string>` | `''` | Valor del input (Signal reactiva). |
| `debounceTime` | `input<number>` | `300` | Tiempo de espera antes de emitir la búsqueda. |

### Outputs
| Property | Type | Description |
| :--- | :--- | :--- |
| `search` | `output<string>` | Emite el valor tras el tiempo de debounce. |

---

## 3. Visual Behavior

### A. Dynamic Glow Border
- **Focus State**: Al entrar en foco, no solo cambia el color del borde, sino que se proyecta un resplandor neón (`primary`) que recorre todo el perímetro del input.
- **Expansion**: El input puede configurarse para expandir su ancho un `20%` al ganar el foco en el Topbar.

### B. Command K Shortcut
Soporte visual para el atajo de teclado: se muestra un pequeño badge de cristal (`K`) en el borde derecho cuando no está en foco.

---

## 4. Estilos (Tailwind v4)

*   **Wrapper**: `relative flex items-center w-full max-w-md transition-all`.
*   **Input Field**: `w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:bg-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none`.
*   **Search Icon**: `absolute left-3 text-zinc-500 transition-colors pointer-events-none`.
*   **K-Badge**: `absolute right-3 px-1.5 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] text-zinc-500`.

---

## 5. Acceptance Criteria
- [ ] El debouncing funciona correctamente (no emite por cada tecla).
- [ ] El icono de búsqueda se ilumina cuando el campo tiene foco.
- [ ] Es accesible mediante el atajo de teclado global si se implementa en la raíz.
- [ ] Soporta la limpieza del campo mediante un icono "X" que aparece solo cuando hay texto.
