---
title: Glass Card System Specs
description: Especificación técnica avanzada del sistema de contenedores modulares con efectos ópticos dinámicos.
version: 1.3.0
---

# 03. Glass Card System (Container)

La Card es el bloque fundamental del Layout Bento. Elevamos su calidad con efectos de seguimiento de luz y soporte para medios inmersivos.

---

## 1. Sub-componentes & Estructura

*   **`<lib-glass-card>`**: Raíz (Contexto de cristal).
*   **`<lib-glass-card-header>`**: Títulos y Avatares.
*   **`<lib-glass-card-content>`**: Padding optimizado.
*   **`<lib-glass-card-footer>`**: Acciones/Botones.

---

## 2. Advanced Visual Features

### A. Spotlight Mouse Tracking (Efecto Linterna)
Cuando `interactive="true"`, la Card activa un sistema de seguimiento lumínico:
- **Efecto**: Un gradiente radial sutil (`white/10`) sigue la posición del cursor (`clientX/Y`).
- **Propósito**: Simular una fuente de luz que se desplaza bajo la superficie del vidrio, aumentando la sensación de profundidad.

### B. Media-Bleed Support
La Card permite contenido "a sangre" (de borde a borde) mediante la directiva `lgCardImage`:
- **Comportamiento**: Las imágenes o videos marcados con esta directiva se extienden hasta los límites de la tarjeta, ignorando el padding del contenedor pero respetando el `border-radius` del parent.
- **Transparencia**: El header y footer pueden superponerse a la imagen con un `backdrop-blur` extra para mantener la legibilidad.

---

## 3. API Reference (Signals)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `elevation` | `input<1 \| 2 \| 3>` | `1` | Nivel de profundidad del cristal. |
| `interactive` | `input<boolean>` | `false` | Activa Spotlight y transformaciones de escala. |
| `spotlightColor` | `input<string>` | `'white'` | Personaliza el color del destello de seguimiento. |

---

## 4. Visual Styles

*   **Border Glow**: Borde superior izquierdo de `1px` con `white/20`.
*   **Glass Levels**:
    *   L1: Blur 1.5rem, bg-white/5.
    *   L2: Blur 2rem, bg-white/10.

---

## 5. Ejemplo de Media-Bleed

```html
<lib-glass-card>
  <img lgCardImage src="hero.jpg" alt="Fondo" class="h-48 object-cover">
  <lib-glass-card-header class="absolute top-0 w-full bg-black/20 backdrop-blur-md">
    <lib-glass-card-title>Destino: Marte</lib-glass-card-title>
  </lib-glass-card-header>
</lib-glass-card>
```
