---
title: Glass Progress Bar Component Specs
description: Especificación técnica avanzada del componente de progreso con efectos de neón líquido, arquitectura de Signals y accesibilidad auditada.
version: 1.1.0
---

# 09. Glass Progress Bar (Atom/Molecule)

El componente `lib-glass-progress` visualiza el estado de una operación mediante un contenedor de cristal con una carga de "neón líquido" reactiva.

---

## 1. API Reference (Angular Signals)

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `input<number>` | `0` | Progreso actual (0-100). |
| `buffer` | `input<number>` | `0` | Progreso secundario (ej. descarga de video). |
| `mode` | `input<'determinate' | 'indeterminate' | 'buffer'>` | `'determinate'` | Modo de visualización. |
| `color` | `input<'primary' | 'accent' | 'warn'>` | `'primary'` | Esquema de color del neón líquido. |
| `thickness` | `input<string>` | `'0.5rem'` | Altura del componente (usar unidades rem). |
| `ariaLabel` | `input<string>` | `'Progreso'` | Etiqueta para lectores de pantalla. |

### Outputs
| Event | Payload | Description |
| :--- | :--- | :--- |
| `complete` | `void` | Se dispara cuando `value` llega a 100. |

---

## 2. Premium Interaction & Visuals

### A. Neon Liquid Fill (El "Flujo")
El relleno de la barra no es un color plano, sino un gradiente dinámico:
- **Textura**: Gradiente lineal de 3 colores definido por el motor de temas.
- **Efecto de Refracción**: Un brillo especular blanco al 20% que se desplaza lentamente (`loop`) para simular que el líquido está contenido tras un tubo de cristal.
- **Leading Edge Glow**: Un punto de luz (`filter: blur(4px)`) en la punta del progreso para guiar la vista.

### B. Liquid Completion (Success Pulse)
Cuando `value()` alcanza el 100%:
- Se dispara un **Success Glow**: La barra emite un pulso de luz expansivo momentáneo.
- **Haptics**: En dispositivos móviles, lanza un `vibrate([20, 10, 20])` para simular el "llenado" de un contenedor físico.

---

## 3. Arquitectura Técnica (Angular + CDK)

### Reactive Signals Lifecycle
Utilizamos `effect()` para monitorear el progreso y disparar eventos de finalización sin contaminar el flujo de renderizado:

```typescript
effect(() => {
  if (this.value() >= 100) {
    this.complete.emit();
    if (this.config.enableHaptics()) hapticService.vibrateSuccess();
  }
});
```

### CSS Architecture
*   **Encapsulation**: `ViewEncapsulation.None` para integración directa con el motor global.
*   **Change Detection**: `ChangeDetectionStrategy.OnPush`.
*   **Performance**: El ancho del progreso se gestiona mediante `computed()` y `style.width` enlazado directamente para evitar el Zone.js overhead (aunque estemos en Signal-mode).

---

## 4. Accesibilidad (A11y) & Motion

- **Role**: `role="progressbar"`.
- **Attributes**: `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`.
- **Labeling**: Vinculado al input `ariaLabel`.
- **Reduced Motion**: Si el usuario tiene activo `prefers-reduced-motion`, se elimina el "Efecto de Refracción" (brillo móvil) y se usa una transición de ancho lineal sin física elástica.

---

## 5. Estilos (Tailwind v4)

*   **Contenedor**: `bg-white/5 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden relative`.
*   **Indeterminate State**: Usa un gradiente animado con `animate-liquid-flow` que traslada el background-position continuamente.

```html
<!-- Ejemplo de Uso -->
<lib-glass-progress 
  [value]="uploadPercent()" 
  mode="determinate"
  color="primary"
  ariaLabel="Subiendo archivo...">
</lib-glass-progress>
```

---

> **Regla de Integración:** "Liquid must feel viscous." El progreso no debe ser rígido; usa curvas de animación que sugieran la inercia de un fluido denso bajo el cristal.
