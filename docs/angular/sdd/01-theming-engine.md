---
title: Angular 21 Theming Engine Specification
description: Technical guide for implementing a Signal-based, CSS-Variable driven theming engine for Liquid Glass UI.
version: 1.0.0
---

# 01. Theming Engine Guide (Angular Edition)

El motor de temas es el corazón de Liquid Glass UI. A diferencia de otros sistemas, nosotros no generamos CSS dinámico vía JS; inyectamos **Design Tokens** que el motor de CSS del navegador procesa con performance nativo.

---

## 1. Arquitectura de Tokens

Definimos tres capas de variables CSS para asegurar la escalabilidad:

### A. Global Tokens (`--lg-g-*`)
Valores universales expresados en `rem` para respetar la accesibilidad del navegador.
```css
:root {
  /* Escala de radios en rem */
  --lg-g-radius-card: 1.5rem;   /* 24px base */
  --lg-g-radius-btn: 0.75rem;   /* 12px base */
  --lg-g-radius-input: 0.625rem; /* 10px base */

  /* Spacing base */
  --lg-g-unit: 0.25rem;         /* 4px base (Sistema de 4pt/8pt) */
}
```

### B. Theme Tokens (`--lg-t-*`)
Variables que mutan según el tema activo (Light/Dark).
```css
/* Dark Theme (Default) */
:root {
  --lg-t-primary: #06b6d4;
  --lg-t-bg-app: #09090b;
  --lg-t-glass-bg: rgba(255, 255, 255, 0.05);
  --lg-t-glass-blur: 1.5rem;    /* 24px blur */
}

/* Light Theme */
.light-theme {
  --lg-t-primary: #0891b2;
  --lg-t-bg-app: #fafafa;
  --lg-t-glass-bg: rgba(0, 0, 0, 0.05);
}
```

### C. Semantic Tokens (`@theme` de Tailwind v4)
Mapeamos las variables a utilidades de Tailwind en `libs/liquid-glass-ui/src/styles.css`:
```css
@theme {
  --color-primary: var(--lg-t-primary);
  --color-glass: var(--lg-t-glass-bg);
  --blur-glass: var(--lg-t-glass-blur);
}
```

---

## 2. Gestión Reactiva en Angular: `ThemeService`

El servicio es el único punto de control para el cambio de temas. Utiliza **Angular Signals** para exponer el estado actual.

### Implementación Esperada:
```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Estado privado con señales
  private _currentTheme = signal<'dark' | 'light'>('dark');
  
  // Exposición pública de lectura
  readonly currentTheme = this._currentTheme.asReadonly();

  constructor() {
    this.applyTheme(this._currentTheme());
  }

  toggleTheme() {
    const next = this._currentTheme() === 'dark' ? 'light' : 'dark';
    this._currentTheme.set(next);
    this.applyTheme(next);
  }

  private applyTheme(theme: string) {
    const html = document.documentElement;
    html.classList.remove('dark-theme', 'light-theme');
    html.classList.add(`${theme}-theme`);
    // Opcional: Guardado en localStorage
  }
}
```

---

## 3. Integración con Componentes

Los componentes **Standalone** consumirán estas variables de forma agnóstica:

```typescript
@Component({
  selector: 'lib-glass-card',
  template: `
    <div class="bg-glass backdrop-blur-glass border border-white/10 rounded-[--lg-g-radius-card]">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None // Crucial para que Tailwind fluya
})
export class GlassCard { }
```

---

## 4. Beneficios del Enfoque "CSS-Variable First"
1.  **Zero Re-renders**: Cambiar el tema no dispara ciclos de detección de cambios de Angular innecesarios.
2.  **Extensibilidad**: Los usuarios pueden crear un componente totalmente custom y usar `bg-primary` sin importar nada.
3.  **Performance**: Delegamos la pintura al GPU a través de variables CSS nativas.
