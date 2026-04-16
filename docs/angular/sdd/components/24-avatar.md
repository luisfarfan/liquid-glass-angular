---
title: Glass Avatar Specification
description: Especificación técnica del componente de identidad visual, soportando imágenes, iniciales y estados de actividad con resplandor neón.
version: 1.0.0
---

# 24. Glass Avatar (Atom)

## 1. Overview
- **Purpose:** Representar visualmente a un usuario, grupo o entidad.
- **UX Intent:** Reconocimiento facial o de marca instantáneo.
- **Visual Intent:** Un círculo de cristal con un borde brillante que contiene la imagen de perfil o las iniciales.

---

## 2. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `input<string | null>` | `null` | URL de la imagen de perfil. |
| `name` | `input<string>` | `''` | Nombre del usuario (para iniciales y alt text). |
| `size` | `input<'sm' | 'md' | 'lg' | 'xl'>` | `'md'` | Diámetro del avatar. |
| `status` | `input<'online' \| 'offline' \| 'busy' \| undefined>` | `undefined` | Indicador de actividad en la esquina. |
| `isLoading` | `input<boolean>` | `false` | Muestra `lg-skeleton` circular (spec 14). |
| `accessibleLabel` | `input<string>` | `''` | Prioridad sobre `name` para `alt` / `aria-label`. |

---

## 3. Visual Behavior

### A. Fallback Logic (Initials)
Si `src` es nulo o falla la carga, el componente debe mostrar las iniciales generadas dinámicamente sobre un fondo de cristal graduado.

### B. Status Indicator
Un pequeño círculo en la esquina inferior derecha:
- **Online**: Punto primary/neón con animación de pulso sutil.
- **Offline**: Punto zinc-600.
- **Busy**: Punto rose-500.

---

## 4. Implementación en `@liquid-glass-ui/angular`

- Componente: `libs/liquid-glass-ui/src/lib/components/avatar/avatar.component.ts` — selector **`lg-avatar`**.
- API: `src`, `name`, `size` (`sm` | `md` | `lg` | `xl`), `status` (`online` | `offline` | `busy`), `isLoading` (usa `lg-skeleton` tipo `circle`), `accessibleLabel` (opcional, prioridad sobre `name` para ARIA/`alt`).
- Demo: playground **`/demos/avatar`**.

---

## 5. Estilos (Tailwind v4)

*   **SM**: `w-8 h-8 text-[10px]`.
*   **MD**: `w-10 h-10 text-xs`.
*   **LG**: `w-12 h-12 text-sm`.
*   **XL**: `w-16 h-16 text-base`.
*   **Ring**: `ring-1 ring-white/10 p-[1px] bg-zinc-950/20 backdrop-blur-sm shadow-inner`.
*   **Status Ring**: `ring-2 ring-zinc-950 rounded-full w-3 h-3 absolute bottom-0 right-0`.

---

## 6. Acceptance Criteria
- [ ] La imagen se escala para llenar el contenedor (`object-cover`).
- [ ] Las iniciales están centradas vertical y horizontalmente.
- [ ] El indicador de status tiene un borde de separación oscuro para mejorar el contraste sobre la imagen.
- [ ] Soporta `isLoading` mostrando el **14. Skeleton Circle**.
