---
title: Glass Pagination Specification
description: Especificación técnica del componente de navegación de páginas, diseñado para integrarse con tablas y listas con estética de control traslúcido.
version: 1.0.0
---

# 19. Glass Pagination (Molecule)

El componente `lib-glass-pagination` proporciona controles de navegación para conjuntos de datos grandes, permitiendo saltos de página y selección de tamaño de página con una interfaz minimalista de cristal.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `length` | `input<number>` | `0` | Total de elementos en el conjunto de datos. |
| `pageSize` | `model<number>` | `10` | Cantidad de elementos por página (Signal de doble vía). |
| `pageIndex` | `model<number>` | `0` | Índice de la página actual (base 0). |
| `pageSizeOptions` | `input<number[]>` | `[5, 10, 25, 50]` | Opciones para el selector de tamaño. |
| `showFirstLast` | `input<boolean>` | `false` | Habilita botones para saltar al inicio/fin. |

### Outputs
| Property | Type | Description |
| :--- | :--- | :--- |
| `pageChange` | `output<PageEvent>` | Despachado cuando cambia cualquier parámetro de paginación. |

---

## 2. Premium Interaction & Visuals

### A. Subtle Floating Controls
- **Botones**: Utilizan la variante `ghost` de `lib-glass-button`.
- **Estado Activo**: La página actual se resalta con un fondo `bg-primary/20` y un anillo sutil de neón.
- **Transiciones**: Al cambiar de página, el número transita con un efecto de fade y ligero desplazamiento vertical (`translate-y`).

### B. Glass Selector
El selector de "Items por página" debe usar el componente **10. Select**, manteniendo la consistencia de los inputs del sistema.

---

## 3. Arquitectura Técnica

El componente es puramente funcional y reactivo. Utiliza `computed()` para calcular el número total de páginas y los rangos visibles:

```typescript
totalPages = computed(() => Math.ceil(this.length() / this.pageSize()));
rangeLabel = computed(() => {
  const start = this.pageIndex() * this.pageSize() + 1;
  const end = Math.min((this.pageIndex() + 1) * this.pageSize(), this.length());
  return `${start} - ${end} de ${this.length()}`;
});
```

---

## 4. Estilos (Tailwind v4)

*   **Container**: `flex items-center justify-end gap-6 p-4 border-t border-white/5 bg-zinc-950/20 backdrop-blur-sm`.
*   **Label**: `text-xs text-zinc-500 font-medium`.
*   **Page Button**: `min-w-[32px] h-8 flex items-center justify-center rounded-lg text-sm transition-all hover:bg-white/5`.
*   **Active Page**: `bg-primary/10 text-primary border border-primary/20`.

---

## 5. Accesibilidad (A11y)

*   **Role**: El contenedor debe tener `role="navigation"` y `aria-label="Paginación de tabla"`.
*   **Current Page**: El botón de la página actual debe tener `aria-current="page"`.
*   **Keyboard**: Soporte para teclas de flecha y `Enter`/`Space` para navegar entre páginas.

---

> **Regla de Diseño:** "Movement through clarity." La paginación no debe ser un estorbo visual al final de la tabla. Debe sentirse como una extensión natural del cristal, proporcionando control sin romper la inmersión de los datos.
