---
title: Glass Sidebar Component Specs
description: Especificación técnica del panel de navegación lateral con soporte para colapso fluido, arquitectura de Signals y estados Liquid-Active.
version: 1.0.0
---

# 13. Glass Sidebar (Molecule/Organism)

El componente `lib-glass-sidebar` es el eje de navegación de la aplicación, diseñado como una placa monolítica de cristal que organiza la jerarquía de la interfaz mediante transparencias y micro-movimientos.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isCollapsed` | `model<boolean>` | `false` | Estado de expansión del panel. |
| `mode` | `input<'side' | 'over' | 'push'>` | `'side'` | Comportamiento del panel respecto al contenido. |
| `width` | `input<string>` | `'280px'` | Ancho base en modo expandido. |

### Signals de Comportamiento
*   `activeRoute = signal<string>('')`: Rastrea la ruta activa para posicionar el indicador.
*   `isHovered = signal(false)`: Activa efectos de aproximación.

---

## 2. Premium Interaction Features

### A. Liquid Active Indicator (El "Núcleo")
El indicador de la pestaña activa no es un estilo estático:
- **Movimiento**: Es un contenedor flotante (cápsula) que se desplaza físicamente entre los ítems usando una transición elástica.
- **Efecto**: Si el usuario cambia de la opción 1 a la 3, el indicador "fluye" por el lateral, pasando por la opción 2 con una distorsión visual de estiramiento.

### B. Monolithic Glass Blur
- **Profundidad**: Utiliza `backdrop-blur-2xl` y un tinte `bg-black/20`.
- **Borde de Refracción**: Un borde derecho de `1px` con un degradado animado que simula un reflejo de luz recorriendo el panel de arriba a abajo.

### C. Fluid Collapse (View Transitions feel)
Al colapsar:
- Los textos desaparecen con un `fade-out` y un ligero `blur`.
- Los iconos se centran con una física de desaceleración suave.
- **Micro-Grip**: Un "asa" de cristal casi invisible que permite al usuario arrastrar para redimensionar (opcional).

---

## 3. Arquitectura Técnica (Angular + Signals)

### State Syncing
El Sidebar coordina sus sub-componentes (`lib-glass-sidebar-item`) mediante un servicio interno o señales vinculadas:

```typescript
// En el componente Sidebar
readonly activeItemPosition = computed(() => {
  // Cálculo de la posición Y del ítem activo para el indicador líquido
  return this.items().find(i => i.isActive())?.nativeElement.offsetTop || 0;
});
```

### Performance
- **OnPush**: Obligatorio para evitar re-calculos innecesarios durante el colapso.
- **CSS Grid**: Uso de subgrid si el navegador lo soporta para mantener alineaciones perfectas entre iconos y texto.

---

## 4. Estilos y Estructura (Tailwind v4)

*   **Panel**: `h-screen fixed left-0 top-0 border-r border-white/5 shadow-2xl transition-all duration-500 ease-in-out`.
*   **Item**: `flex items-center gap-4 px-6 py-3 cursor-pointer group hover:bg-white/5`.
*   **Icon**: `w-6 h-6 outline-none transition-transform group-hover:scale-110`.

---

## 5. Accesibilidad (A11y)

*   **Role**: `role="navigation"`, `aria-label="Navegación Principal"`.
*   **Keyboard**: Soporte para `HOME/END` y flechas para saltar entre secciones.
*   **Announcement**: Si el panel se colapsa, se anuncia el estado mediante `aria-expanded`.

---

> **Regla de Diseño:** "Sidebars are the spine of the app." Deben sentirse sólidas pero ligeras. El colapso debe ser tan fluido que el usuario quiera activarlo solo por la satisfacción visual del movimiento del cristal.
