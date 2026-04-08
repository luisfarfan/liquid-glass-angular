---
title: Glass Data Table Specification
description: Especificación técnica avanzada del organismo de visualización de datos de alta densidad, integrando Angular CDK Table, selección masiva, columnas ancladas y optimización de rendimiento.
version: 1.2.0
---

# 15. Glass Data Table (Organism)

## 1. Overview
- **Purpose:** Renderizar grandes conjuntos de datos de forma estructurada, legible y performante.
- **UX Intent:** Una grilla que se siente ligera y profesional, priorizando la lectura fluida y la gestión avanzada de datos.
- **Visual Intent:** Estética de cristal con capas interactivas (sticky headers/columns) y efectos de luz por fila.

---

## 2. Advanced Features

### A. Selection System (SelectionModel)
El componente soporta selección simple o múltiple mediante la integración con `SelectionModel` de `@angular/cdk/collections`.
- **UI**: La primera columna se reserva para el `lib-glass-checkbox`.
- **Master Toggle**: El encabezado incluye un checkbox que selecciona todas las filas visibles.
- **Visual State**: Las filas seleccionadas mantienen un estado de iluminación leve (`bg-primary/5`) permanente para diferenciarlas.

### B. Sticky Columns (Anclaje)
Para asegurar la accesibilidad en scroll horizontal, se permite anclar columnas:
- **Left Pinning**: Generalmente para el identificador o nombre.
- **Right Pinning**: Generalmente para la columna de "Acciones".
- **Visual**: Las columnas ancladas tienen un `backdrop-blur` más denso y una sombra interior (`box-shadow`) que aparece solo cuando el contenido se desliza por debajo.

### C. Smart Truncation & Details
- **Comportamiento**: Las celdas con texto largo aplican `truncate`.
- **Revelación**: Al hacer hover o focus en una celda truncada, se dispara un `lib-glass-tooltip` que muestra el valor íntegro.

---

## 3. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selection` | `input<SelectionModel<T>>`| `null` | Modelo de selección del CDK. |
| `pinnable` | `input<boolean>` | `false` | Habilita el anclaje de columnas laterales. |
| `virtualScroll` | `input<boolean>` | `false` | Habilita el viewport virtual para +1000 filas. |

---

## 4. Technical Implementation (Angular v21)

### Sticky Columns Logic
```html
<!-- Columna de Selección Anclada -->
<ng-container cdkColumnDef="select" sticky="true">
  <th cdk-header-cell *cdkHeaderCellDef>
    <lib-glass-checkbox (change)="masterToggle()"></lib-glass-checkbox>
  </th>
  <td cdk-cell *cdkCellDef="let row">
    <lib-glass-checkbox [checked]="selection()?.isSelected(row)"></lib-glass-checkbox>
  </td>
</ng-container>

<!-- Columna de Acciones Anclada al final -->
<ng-container cdkColumnDef="actions" stickyEnd="true">
  <th cdk-header-cell *cdkHeaderCellDef></th>
  <td cdk-cell *cdkCellDef="let row">
    <button lib-glass-button variant="ghost" icon="more-vertical"></button>
  </td>
</ng-container>
```

### Performance: Virtual Scroll
Cuando `virtualScroll` es `true`, la tabla se envuelve en un `cdk-virtual-scroll-viewport` con una altura de fila fija (`itemSize="56"`).

---

## 5. Estilos (Tailwind v4)

*   **Pinned Column (Left)**: `sticky left-0 bg-zinc-950/80 backdrop-blur-md z-20 border-r border-white/10`.
*   **Pinned Column (Right)**: `sticky right-0 bg-zinc-950/80 backdrop-blur-md z-20 border-l border-white/10`.
*   **Selected Row**: `bg-primary/5 border-l-2 border-primary transition-all`.
*   **Cell Tooltip Trigger**: `truncate cursor-help underline decoration-dotted decoration-zinc-600`.

---

## 6. Acceptance Criteria
- [ ] La selección masiva actualiza correctamente el `SelectionModel`.
- [ ] Las columnas ancladas (Select/Actions) permanecen visibles durante el scroll horizontal.
- [ ] El tooltips aparece correctamente sobre contenidos truncados.
- [ ] Si se habilita virtual scroll, la tabla mantiene 60fps durante el desplazamiento rápido.
