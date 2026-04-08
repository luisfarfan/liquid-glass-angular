---
title: Glass Dropdown Menu Specification
description: Especificación técnica del menú contextual y de acciones, utilizando Angular CDK Menu para una navegación por teclado perfecta y estética de cristal Nivel 3.
version: 1.0.0
---

# 26. Glass Dropdown Menu (Molecule/Organism)

## 1. Overview
- **Purpose:** Exponer una lista de acciones o enlaces contextuales al interactuar con un disparador (trigger).
- **UX Intent:** Una cascada de opciones que aparece de forma precisa y desaparece al seleccionar o perder el foco.
- **Visual Intent:** Niveles de elevación altos (Nivel 3), bordes definidos y desenfoque que permite entrever el fondo de la aplicación.

---

## 2. API Reference (Angular CDK Menu)

### Selector: `[lib-glass-menu-trigger]`
Directiva que se aplica a cualquier botón para disparar el menú.

### Components
- **`lib-glass-menu`**: El contenedor flotante.
- **`lib-glass-menu-item`**: Cada opción individual.
- **`lib-glass-menu-divider`**: Línea de separación sutil.

---

## 3. Visual Behavior

### A. Origin Expansion
El menú no solo aparece con fade; se expande desde el punto de origen (el botón disparador) usando un efecto de escalado desde el `transform-origin` correspondiente (ej. `top right`).

### B. High Elevation
- **Filtro**: `backdrop-blur-xl` (20px).
- **Shadow**: `shadow-2xl` profunda para despegar el menú de la interfaz principal.
- **Bordes**: `border border-white/10`.

---

## 4. Technical Implementation (Angular v21)

Utiliza el nuevo `@angular/cdk/menu` (experimental o estable según versión) para garantizar la navegación con flechas de dirección y soporte de submenús:

```html
<button [cdkMenuTriggerFor]="userMenu" lib-glass-button variant="ghost">
  Perfil
</button>

<ng-template #userMenu>
  <div cdkMenu class="glass-menu-container">
    <button cdkMenuItem class="glass-menu-item">
      <i class="ri-user-line"></i> Mi Perfil
    </button>
    <button cdkMenuItem class="glass-menu-item">
      <i class="ri-settings-line"></i> Ajustes
    </button>
    <div class="glass-menu-divider"></div>
    <button cdkMenuItem class="glass-menu-item destructive">
      <i class="ri-logout-box-line"></i> Salir
    </button>
  </div>
</ng-template>
```

---

## 5. Estilos (Tailwind v4)

*   **Menu Container**: `min-w-[200px] p-2 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-2xl`.
*   **Menu Item**: `w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 rounded-lg hover:bg-white/5 hover:text-white transition-all cursor-pointer outline-none focus:bg-white/10`.
*   **Destructive Item**: `text-rose-400 hover:bg-rose-500/10 hover:text-rose-300`.
*   **Divider**: `h-[1px] bg-white/5 my-2 mx-1`.

---

## 6. Acceptance Criteria
- [ ] El menú se posiciona automáticamente para no salirse del viewport.
- [ ] Soporte completo de navegación con flechas (`ArrowUp`, `ArrowDown`).
- [ ] Los items tienen estados de hover y focus visualmente diferenciados.
- [ ] Soporte para iconos a la izquierda del texto en cada item.

---

> **Regla de Diseño:** "Depth creates focus." El menú desplegable debe ser el elemento más "pesado" visualmente (en términos de blur y sombra) para que el usuario se concentre exclusivamente en la elección que va a realizar.
