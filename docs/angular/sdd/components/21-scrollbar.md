---
title: Glass Scrollbar Specification
description: Especificación de estilo para barras de desplazamiento, optimizando la visibilidad mínima y el tacto de cristal en áreas scrolleables.
version: 1.0.0
---

# 21. Glass Scrollbar (Utility / Foundation)

## 1. Overview
- **Purpose:** Reemplazar las barras de desplazamiento por defecto del navegador por una versión estilizada que armonice con el entorno de cristal.
- **UX Intent:** Una barra que aparece solo cuando el usuario interactúa, siendo casi invisible en reposo.
- **Visual Intent:** Segmentos de cristal flotantes que no ocupan espacio real en el layout (ancho mínimo).

---

## 2. Visual Behavior

### A. Minimal Presence
- **Track (Carril)**: Debe ser siempre transparente. No permitas fondos de carril grises u opacos.
- **Thumb (Barra)**: Un segmento de `bg-white/10` con bordes redondeados al 100% (`rounded-full`).

### B. Interactive States
- **Idle**: La barra tiene una opacidad del 10%.
- **Hover/Scroll**: Al interactuar, la opacidad sube al 30% y el ancho puede expandirse de `4px` a `6px` para facilitar el agarre.
- **Active (Dragging)**: La barra se ilumina con el color `primary/40` neón o simplemente un blanco más brillante.

---

## 3. Technical Implementation (Tailwind v4 / CSS)

### Implementación en `@liquid-glass-ui/angular`

- Hoja de utilidad: `libs/liquid-glass-ui/src/lib/components/scrollbar/scrollbar.css` — clase **`.lg-glass-scroll`**.
- Carga típica: `styles/layout.css` ya importa esa hoja; el drawer también la importa para que el panel con scroll no dependa solo del host de la app.
- Directiva opcional: **`LgGlassScrollDirective`** (`[lgGlassScroll]`) aplica la clase en el host.
- Demo: playground **`/demos/scrollbar`**.

### Pure CSS Implementation
Dado que las scrollbars son difíciles de manejar vía componentes, definimos una utilidad de clase global que puede aplicarse a cualquier contenedor `overflow-auto`.

```css
/* Utilidad global .glass-scroll */
@utility glass-scroll {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 99px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(2px);
    transition: background 0.2s ease;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
  }
}
```

---

## 4. Usage Patterns

### A. Internal Scrolling (Cards/Modals)
Las scrollbars siempre deben usarse dentro del área de contenido, nunca fuera de los bordes redondeados del contenedor.

### B. Mobile Consideration
En dispositivos táctiles, se deben deshabilitar los estilos personalizados para permitir el comportamiento nativo del sistema operativo (que suele ser ya minimalista y traslúcido).

---

## 5. Acceptance Criteria
- [ ] El carril de scroll es 100% transparente.
- [ ] La barra (thumb) tiene bordes redondeados circulares.
- [ ] El scroll no desplaza el contenido (usa `scrollbar-gutter: stable` si es necesario, o barras flotantes).
- [ ] El contraste es suficiente para ser visto sobre fondos oscuros, pero lo suficientemente bajo para no distraer.

---

> **Regla de Diseño:** "Frictionless depth." El scrollbar no debe sentirse como una herramienta manual pesada, sino como una guía de luz que indica nuestra posición en el cristal.
