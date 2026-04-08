---
title: Angular 21 Architecture & Strategy
description: Master technical specification for migrating Liquid Glass pure HTML/CSS components into a distributable Angular 21 Component Library.
version: 1.0.0
---

# 11. Angular 21 Architecture Strategy

Este documento establece la arquitectura estricta para empaquetar la base HTML/CSS del ecosistema "Liquid Glass" en una **Biblioteca de Componentes de Angular** de grado empresarial, optimizada para **NPM** y utilizando los patrones más modernos disponibles en Angular 21.

> **Regla de Oro:** Angular "gobierna la lógica", pero nuestro `lab.css`/`tokens.css` "gobierna el pincel". Bajo ninguna circunstancia recrearemos estilos CSS avanzados mediante JavaScript.

---

## 1. Patrones Arquitectónicos Base (Angular 21)

Todos los componentes construidos en la librería `@liquid-glass/angular` deben adherirse estrictamente a las siguientes primitivas modernas de Angular:

### 1.1 Señales Reactivas (Signals First)
Absolutamente cero uso de RxJS (`BehaviorSubject`, `Observable`) para el manejo de estado interno de los componentes UI. Todo el estado síncrono local usará **Signal API**.
*   **Inputs:** Uso exclusivo de `input()`, `input.required()`. Eliminado por completo el uso del decorador `@Input()`.
*   **Outputs:** Uso de `output()`. Eliminado `@Output()` y `EventEmitter`.
*   **Two-Way Binding:** Uso estricto de `model()` para propiedades conectadas (ej. la visibilidad de un Modal o el estado de un Toggle).

### 1.2 Componentes Independientes (Standalone)
*   Todo el diseño UI será `standalone: true` por defecto.
*   Se erradica el concepto de `NgModule` dentro de la librería para favorecer la importación árbol por árbol (`Tree-shakeable`).
*   Configuración `changeDetection: ChangeDetectionStrategy.OnPush` es **obligatoria** en el 100% de los elementos para asegurar los 60fps en grandes dashboards.

### 1.3 Control Flow Moderno
Las plantillas HTML "envolverán" exactamente lo que maquetamos en el Playground, pero reemplazando lógica con el nuevo *Control Flow* de bloque:
*   Dejar de usar `*ngIf` -> Usar `@if`
*   Dejar de usar `*ngFor` -> Usar `@for` (con el mandato estricto de `track` id)
*   Variables de plantilla -> Usar la sintaxis `@let` (Angular 21) para cálculos computados renderizados.

---

## 2. Ingesta del CSS Agnóstico

El pilar sobre el que descansa esta librería es que **no compila CSS de Tailwind**. La librería asume que quien la consuma ya tiene instalada nuestra base de tokens.

1.  **El paquete `@liquid-glass/styles`**: Publicado por separado. Contiene el reseteo base y las variables `--glass-*`.
2.  **View Encapsulation**: Exclusivamente `ViewEncapsulation.None` o Host binding con CSS de alcance. Debido a que dependemos de utilidades de Tailwind genéricas en todo el layout, el encapsulamiento emulado inyectaría atributos que podrían romper el efecto cascada del Glassmorphism.

---

## 3. Estrategia por Capas de Componentes

### Nivel 1: Wrapper Components (Componentes "Tontos")
Componentes que solo inyectan nuestro HTML/CSS y procesan una señal.
Ejemplo de `LiquidButton`:
```typescript
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'liquid-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClasses()'
  },
  template: `<ng-content></ng-content>`
})
export class LiquidButton {
  variant = input<'primary' | 'ghost' | 'destructive'>('primary');
  
  // Señal computada para inyectar Tailwind dinámicamente
  computedClasses = computed(() => {
    const base = 'glass-1 rounded-lg px-6 py-2 transition-all ...';
    const variants = {
      'primary': 'bg-neon-primary/20 text-neon-primary ...',
      'ghost': 'hover:bg-white/5 ...'
    };
    return `${base} ${variants[this.variant()]}`;
  });
}
```

### Nivel 2: Reactive Forms Bridge (Formularios Inclusivos)
Todo componente de entrada de datos (Toggle, Input, Checkbox) **DEBE** implementar `ControlValueAccessor` (CVA).
En Angular 21, envolveremos el CVA en un patrón basado en `Signals` para no sacrificar el rendimiento reactivo. La lógica de CSS `peer-checked` la delegaremos a los Data Bindings nativos y atributos booleanos del Host.

### Nivel 3: Integración profunda con Angular CDK
Nos negamos a programar JS manual para cosas que el Component Dev Kit resuelve de forma madura, performante e hiper-accesible (A11y).
*   *Liquid Modal* usará `CdkDialog` en lugar del contenedor `<div fixed>` manual. Insertaremos nuestras clases `glass-3` como el parámetro de configuración del backdrop.
*   *Liquid Select (Dropdown)* construirá su lista flotante utilizando `CdkOverlay` (y su Directiva `cdkConnectedOverlay`).
*   *Tablas (Data Grid)* heredará e implementará `CdkTable`, manteniendo el rastro de filas mediante el Control Flow `@for`.

---

## 4. Estructura del Monorepo Angular

El espacio de trabajo sugerido será generado bajo el CLI oficial de Angular utilizando el patrón de "Proyectos múltiples":

```bash
glass-angular-workspace/
├── projects/
│   ├── liquid-glass-ui/         # (LA LIBRERÍA NPM) La que publicaremos
│   │   ├── src/lib/
│   │   │   ├── buttons/
│   │   │   ├── forms/
│   │   │   ├── datagrid/
│   │   │   └── overlays/
│   │   └── package.json         # Dependencias peer: @angular/core, @angular/cdk
│   │
│   └── test-harness-app/        # (LA APP DE TESTEO) Usada para consumir localmente la libería
├── tailwind.config.js           # La misma del playground HTML base
└── angular.json
```

---

## 5. Próximo Paso (Hoja de ejecución)

Para iniciar formalmente el desarrollo de la arquitectura conectada, las fases serán:
1.  **Fase 8 (Setup Angular):** Generación manual o por IA del workspace, instalación del CDK e importación del CSS de la Fase 1.
2.  **Fase 9 (Migración Primitivas):** Porting inmediato de `liquid-btn`, `liquid-badge`.
3.  **Fase 10 (Migración CDK Forms):** Inputs, Toggles y Combobox basados en Signals + CVA.
4.  **Fase 11 (Refactor Overlays CDK):** Modals, Toasts y Tablas Avanzadas impulsadas por CDK Portals.
