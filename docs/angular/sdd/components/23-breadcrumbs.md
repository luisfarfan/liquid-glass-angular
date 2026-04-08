---
title: Glass Breadcrumbs Specification
description: Especificación técnica del sistema de navegación jerárquica con separadores traslúcidos y soporte para rutas dinámicas de Angular.
version: 1.0.0
---

# 23. Glass Breadcrumbs (Molecule)

## 1. Overview
- **Purpose:** Ayudar al usuario a entender su ubicación actual dentro de la jerarquía de la aplicación y facilitar el regreso a niveles superiores.
- **UX Intent:** Una línea de tiempo espacial sutil que no compita por la atención.
- **Visual Intent:** Enlaces de cristal con separadores de luz mínima.

---

## 2. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `input<BreadcrumbItem[]>` | `[]` | Lista de objetos con label, url e icono opcional. |
| `separator` | `input<string>` | `'/'` | Carácter o icono de separación. |

---

## 3. Visual Behavior
- **Inactive Items**: Texto en `zinc-500` con una transición de opacidad al hover.
- **Active Item (Current)**: Texto en `zinc-100` o `primary` neón, sin enlace (deshabilitado).
- **Separators**: Opacidad al 10%, creando una división "fantasma" entre niveles.

---

## 4. Technical Implementation (Angular v21)

El componente debe poder resolver las rutas automáticamente si se integra con el `Router` de Angular, o aceptar una lista estática:

```html
<nav class="glass-breadcrumbs">
  <ol class="flex items-center gap-2">
    @for (item of items(); track item.label; let last = $last) {
      <li class="breadcrumb-item">
        @if (!last) {
          <a [routerLink]="item.url" class="nav-link">{{ item.label }}</a>
          <span class="separator">{{ separator() }}</span>
        } @else {
          <span class="current">{{ item.label }}</span>
        }
      </li>
    }
  </ol>
</nav>
```

---

## 5. Estilos (Tailwind v4)

*   **Nav Link**: `text-zinc-500 hover:text-zinc-200 transition-colors duration-200 text-sm font-medium`.
*   **Current Item**: `text-zinc-100 font-semibold`.
*   **Separator**: `text-white/10 mx-1 text-xs select-none`.

---

## 6. Acceptance Criteria
- [ ] El último elemento de la ruta no es un enlace y tiene un peso visual mayor.
- [ ] Los separadores no son seleccionables por el cursor.
- [ ] Si el label es muy largo, se trunca pero mantiene el separador visible.
