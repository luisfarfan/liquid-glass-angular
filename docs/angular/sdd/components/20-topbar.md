---
title: Glass Topbar Specification
description: Especificación técnica avanzada de la barra de navegación superior, integrando efectos de elevación dinámica, perfil de usuario y buscador de cristal.
version: 1.0.0
---

# 20. Glass Topbar (Organism)

## 1. Overview
- **Purpose:** Proporcionar navegación global, identidad de sección y utilidades de usuario en la parte superior de la aplicación.
- **UX Intent:** Una barra que se siente como un panel de control flotante, siempre accesible pero sutil.
- **Visual Intent:** Una placa de cristal horizontal con bordes ultra-nítidos y desenfoque dinámico que separa el header del contenido.

---

## 2. Structure & Anatomy
El Topbar se organiza mediante un layout de tres secciones:

- **`Navigation Area (Start)`**: Breadcrumbs, título de página o botón de toggle para el sidebar móvil.
- **`Utility Area (Center)`**: El **OmniSearch** de cristal (buscador global).
- **`Profile Area (End)`**: Notificaciones, ajustes y el menú de perfil del usuario (Avatar).

---

## 3. Advanced Visual Features

### A. Dynamic Sticky Elevation
El Topbar debe reaccionar al scroll:
- **Idle**: Al estar al tope (`scrollTop === 0`), el fondo es más traslúcido (`bg-white/0`).
- **Scrolling**: Al scrollear, el componente gana opacidad (`bg-zinc-950/60`) y activa su `backdrop-blur-md` para mantener la legibilidad de los elementos que pasan por debajo.

### B. Glass OmniSearch
El buscador integrado no debe ser un input gris estándar:
- **Base**: `bg-white/5` con un borde de `1px` en `white/10`.
- **Efecto Focus**: El buscador expande su ancho ligeramente y el resplandor de neón bordea todo el campo de texto.

---

## 4. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `input<string>` | `''` | Título de la sección actual. |
| `user` | `input<User | null>` | `null` | Objeto de usuario para el avatar y nombre. |
| `fixed` | `input<boolean>` | `true` | Habilita el posicionamiento `sticky`. |

---

## 5. Technical Implementation (Angular v21)

### Responsive Logic
El Topbar debe ocultar elementos como el buscador en dispositivos móviles y reemplazarlos por un icono de lupa que dispare un modal de búsqueda:

```html
<header class="glass-topbar" [class.scrolled]="isScrolled()">
  <div class="start">
    @if (isMobile()) {
      <button (click)="toggleSidebar()"><i class="menu-icon"></i></button>
    }
    <lib-glass-breadcrumbs></lib-glass-breadcrumbs>
  </div>

  <div class="center">
    <!-- OmniSearch Component -->
    <lib-glass-search-input placeholder="Search everywhere..."></lib-glass-search-input>
  </div>

  <div class="end">
    <lib-glass-toast-trigger></lib-glass-toast-trigger>
    <lib-glass-avatar [src]="user()?.avatar"></lib-glass-avatar>
  </div>
</header>
```

---

## 6. Estilos (Tailwind v4)

*   **Header Wrapper**: `h-16 w-full flex items-center justify-between px-6 z-40 transition-all duration-300 border-b border-transparent`.
*   **Scrolled State**: `bg-zinc-950/80 backdrop-blur-lg border-white/5 shadow-lg`.
*   **Search Box**: `flex items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5 focus-within:border-primary/50 transition-all`.

---

## 7. Acceptance Criteria
- [ ] La barra se vuelve más opaca y borrosa al scrollear el contenido.
- [ ] El buscador integrado tiene un estado de foco coherente con el sistema de neón.
- [ ] Los menús desplegables del perfil (Avatar) utilizan el mismo efecto de cristal nivel 3 que los Toasts.
- [ ] Responsividad: En pantallas < 768px, el layout se condensa para priorizar el título y las acciones.

---

> **Regla de Diseño:** "Command from the top." El Topbar es el punto de orientación. Debe ser nítido, predecible y visualmente ligero para no "aplastar" el contenido principal bajo su peso visual.
