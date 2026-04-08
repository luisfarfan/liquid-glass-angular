---
title: Glass Empty State Specification
description: Especificación técnica del componente de gestión de estados sin datos, optimizado para centrado compositivo, iconografía persistente y efectos térmicos de iluminación ambiental.
version: 1.2.0
---

# 16. Glass Empty State (Molecule)

## 1. Overview
- **Purpose:** Proporcionar feedback visual claro cuando un contenedor (Tabla, Lista, Card) no tiene datos que mostrar.
- **UX Intent:** Convertir el estado de vacío en una micro-experiencia placentera y orientativa mediante el uso de iluminación ambiental y micro-copy contextual.
- **Visual Intent:** Uso de **Ambient Orbs** (luces de fondo) detrás de iconografía traslúcida para generar una sensación de profundidad y calma.

---

## 2. Advanced Visual Features

### A. Ambient Glow (The Lighting Context)
El componente puede proyectar una orbe de luz detrás de la iconografía central:
- **Efecto**: Un degradado radial de `primary/15` hacia `transparent`.
- **Propósito**: Actuar como una fuente de luz que "ilumina" el cristal desde atrás, reduciendo la crudeza visual del fondo vacío.
- **Señal**: Controlado mediante el input `ambientGlow: input<boolean>`.

### B. Staggered Entrance (Secuencia de Animación)
Para evitar apariciones bruscas, los elementos deben entrar en este orden:
1.  **Ambient Orb**: Fade-in gradual (800ms) con curva `ease-out`.
2.  **Icono/Ilustración**: Scale-up de `0.9` a `1.0` (600ms) con curva elástica.
3.  **Texto y Acciones**: Fade-in desde abajo (`translate-y-4` a `0`) a los 400ms después del paso 1.

---

## 3. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `input<string>` | `'Sin resultados'` | Texto principal. |
| `description` | `input<string>` | `''` | Texto secundario. |
| `searchTerm` | `input<string | null>` | `null` | Si se provee, el componente adapta el texto para búsquedas fallidas. |
| `ambientGlow` | `input<boolean>` | `true` | Habilita la orbe de luz de fondo. |
| `icon` | `input<string>` | `'search-x'` | Icono principal de la librería Lucide. |

---

## 4. Arquitectura Técnica & Contextualización

### Smart Search Labels
Se recomienda usar un `computed` para generar el micro-copy dinámicamente si hay un término de búsqueda presente:

```typescript
displayTitle = computed(() => {
  const term = this.searchTerm();
  return term 
    ? `No encontramos resultados para "${term}"` 
    : this.title();
});
```

### Motion Design (Tailwind Animations)
```css
.empty-state-orb {
  background: radial-gradient(circle, rgba(var(--color-primary), 0.15) 0%, transparent 70%);
  filter: blur(40px);
  will-change: opacity, transform;
}
```

---

## 5. Estilos (Tailwind v4)

*   **Wrapper**: `relative flex flex-col items-center justify-center p-12 text-center w-full min-h-[400px] overflow-hidden`.
*   **Ambient Orb**: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full z-0`.
*   **Ghost Icon**: `relative z-10 text-zinc-600 text-7xl opacity-20 filter blur-[0.5px] hover:opacity-30 transition-opacity`.
*   **Actions Container**: `flex items-center gap-3 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300`.

---

## 6. Acceptance Criteria
- [ ] La orbe ambiental se renderiza centrada detrás del icono sin tapar el texto.
- [ ] Si se cambia el `searchTerm`, el título se actualiza instantáneamente con las comillas adecuadas.
- [ ] Las animaciones respetan el flujo escalonado definido.
- [ ] El componente se adapta correctamente a temas oscuros y claros manteniendo la transparencia.

---

> **Regla de Diseño:** "Light defines the space." En un estado vacío, la luz es lo que mantiene viva la interfaz. No permitas que el usuario se sienta perdido en un espacio negro; ilumina su camino de regreso a la acción.
