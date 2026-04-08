---
title: Glass Drawer Specification
description: Especificación técnica del panel lateral deslizante (Side Sheet), integrando Angular CDK Dialog y animaciones de transición lateral.
version: 1.0.0
---

# 22. Glass Drawer (Organism)

## 1. Overview
- **Purpose:** Gestionar tareas complejas o edición de detalles sin perder el contexto visual de la página principal.
- **UX Intent:** Una hoja de cristal que se desliza suavemente desde el borde derecho, ocupando la altura total del viewport.
- **Visual Intent:** Elevación Nivel 3 con desenfoque extremo, anclada físicamente al borde de la pantalla.

---

## 2. Guidelines
- **When to use:**
  - Edición de perfiles o configuraciones detalladas.
  - Filtros de búsqueda avanzados en tablas.
  - Vistas de "Detalle de ítem" que requieren scroll interno.
- **When NOT to use:**
  - Confirmaciones simples de un botón (usar **01. Button** + **12. Tooltip**).
  - Diálogos cortos (usar **07. Modal**).

---

## 3. Structure & Anatomy
El Drawer comparte la lógica de portal de los Modals pero con un contenedor diferente:

- **`Scrim / Backdrop`**: Capa oscura traslúcida que bloquea la interacción con el fondo.
- **`Drawer Sheet`**: El contenedor de cristal (`h-full`).
  - **Header**: Título y botón de cierre.
  - **Body**: Área con scroll dedicado (`glass-scroll`).
  - **Footer**: Acciones fijas (Guardar/Cancelar) con un gradiente de separación superior.

---

## 4. API Reference (Angular Services)

### LiquidDrawerService
Se consume mediante un servicio que inyecta componentes dinámicamente:

```typescript
this.drawer.open(EditMemberComponent, {
  position: 'right',
  width: '450px'
});
```

---

## 5. Visual Behavior & Motion

### A. Slide Animation
- **Entrada**: `translateX(100%)` a `translateX(0%)` con una duración de **400ms** y curva `ease-out`.
- **Salida**: Inversa de la entrada.
- **Backdrop**: Fade-in de `0` a `1` (opacidad de 40%) simultáneo al deslizamiento de la hoja.

### B. Elevation & Shadow
Al estar anclado a la derecha, el Drawer solo proyecta sombra hacia la izquierda:
- **Sombra**: `shadow-[-20px_0_50px_rgba(0,0,0,0.5)]`.

---

## 6. Technical Implementation (Angular CDK)

Utiliza `@angular/cdk/dialog` con una `panelClass` personalizada para gestionar el ciclo de vida y el foco:

```typescript
const dialogRef = this.dialog.open(template, {
  width: '100%',
  maxWidth: '500px',
  positionStrategy: this.overlay.position().global().right('0').top('0').bottom('0'),
  panelClass: 'glass-drawer-panel'
});
```

---

## 7. Estilos (Tailwind v4)

*   **Drawer Container**: `h-screen bg-zinc-950/60 backdrop-blur-2xl border-l border-white/10 flex flex-col`.
*   **Header**: `p-6 border-b border-white/5 flex justify-between items-center`.
*   **Body**: `flex-1 overflow-y-auto glass-scroll p-6`.
*   **Footer**: `p-6 border-t border-white/5 bg-zinc-950/20`.

---

## 8. Acceptance Criteria
- [ ] El Drawer ocupa exactamente el 100% de la altura visible.
- [ ] El scroll del body de la aplicación está bloqueado mientras el Drawer esté abierto.
- [ ] Soporta el cierre mediante la tecla `ESC`.
- [ ] El contenido interno utiliza la utilidad `glass-scroll` para sus barras de desplazamiento.

---

> **Regla de Diseño:** "Expanded transparency." El Drawer es el espacio para la profundidad. Debe permitir al usuario realizar tareas pesadas sin sentir que ha abandonado la aplicación principal.
