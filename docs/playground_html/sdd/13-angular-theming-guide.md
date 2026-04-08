---
title: Angular 21 Theming Engine Specification
description: Technical guide for implementing a Signal-based, CSS-Variable driven theming engine for Liquid Glass UI.
version: 1.0.0
---

# 13. Angular 21 Theming Engine Guide

Este documento define cómo la librería `liquid-glass-ui` gestiona los temas, permitiendo personalización total (estilo Angular Material) pero con el performance de CSS Variables y la reactividad de **Angular Signals**.

---

## 1. Arquitectura de Tokens (Theming.css)

No usaremos archivos JS grandes para los temas. Definiremos una estructura de **Design Tokens** nativos que Tailwind v4 mapeará automáticamente.

### Estructura de Capas:
1.  **Core Tokens**: Valores fijos y escalas (spacings, radii).
2.  **Semantic Tokens**: Variables que cambian según el tema (`--lg-primary`, `--lg-bg-app`).
3.  **Component Tokens**: Variables específicas para un componente (`--lg-btn-bg`).

### Definición sugerida:
```css
@import "tailwindcss";

@theme {
  /* Mapeo de variables CSS a utilidades de Tailwind */
  --color-lg-primary: var(--lg-primary);
  --color-lg-accent: var(--lg-accent);
  --color-lg-card: var(--lg-card-bg);
  --backdrop-blur-glass: var(--lg-glass-blur);
}

:root {
  /* Valores por defecto (Dark Theme) */
  --lg-primary: #06b6d4;
  --lg-accent: #3b82f6;
  --lg-card-bg: rgba(255, 255, 255, 0.05);
  --lg-glass-blur: 24px;
}

.light-theme {
  --lg-primary: #0891b2;
  --lg-card-bg: rgba(0, 0, 0, 0.05);
  --lg-bg-app: #f4f4f5;
}
```

---

## 2. Gestión Reactiva (ThemeService)

Crearemos un servicio en el `core/` de la librería para gestionar el estado del tema mediante **Signals**.

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme = signal<'light' | 'dark' | 'custom'>('dark');
  currentTheme = this.theme.asReadonly();

  setTheme(newTheme: 'light' | 'dark' | 'custom') {
    this.theme.set(newTheme);
    this.updateBodyClass(newTheme);
  }

  private updateBodyClass(theme: string) {
    const body = document.body;
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(`${theme}-theme`);
  }
}
```

---

## 3. Consumo en Componentes

Los componentes **no deben** conocer el tema activo. Deben consumir los tokens semánticos definidos en el CSS.

### Ejemplo de componente atomizado:
```typescript
@Component({
  selector: 'lib-glass-card',
  template: `<div class="bg-lg-card backdrop-blur-glass border border-white/10 rounded-2xl p-6">
               <ng-content></ng-content>
             </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlassCardComponent {}
```

---

## 4. Extensibilidad (Custom Themes)

Para crear un "Custom Theme" (estilo Angular Material), el usuario solo necesita inyectar una clase CSS:

```css
/* apps/playground/src/styles.css */
.theme-gold {
  --lg-primary: #fbbf24;
  --lg-accent: #f59e0b;
  --lg-glow: rgba(251, 191, 36, 0.5);
}
```

---

## 5. Matriz de Variables Core

| Token | Propiedad CSS | Propósito |
| :--- | :--- | :--- |
| `--lg-primary` | Color | Énfasis principal (Botones, Links) |
| `--lg-glass-blur` | Blur | Nivel de desenfoque del cristal |
| `--lg-border-light`| Color | Brillo en el borde superior (light leak) |
| `--lg-glow-radius` | Shadow | Intensidad del resplandor neón |
