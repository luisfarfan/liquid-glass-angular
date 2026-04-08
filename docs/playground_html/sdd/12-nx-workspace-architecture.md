---
title: Nx Monorepo Architecture
description: Documentación oficial sobre la estrategia de empaquetado, caché paralelo y sub-librerías usando Nx para Liquid Glass.
---

# Nx Workspace & Architecture

## Overview
Para garantizar la máxima escalabilidad y prevenir la colisión de temas (Tailwind config), **Liquid Glass** no será exportado como un simple proyecto Angular CLI, sino como un **Monorepo gestionado bajo Nx**.

La principal ventaja de este enfoque es la estructura de doble entorno: el código de la librería (`liquid-glass-ui`) vivirá y se interconectará estrechamente con la aplicación de validación visual (`playground`), permitiéndonos tener "Hot-Reload" global mientras construimos paquetes distribuidos individualmente.

## Estructura del Monorepo

La organización de carpetas del Workspace obedecerá la siguiente topología de `apps/` y `libs/`:

```
glass-workspace/
├── apps/
│   └── playground/                # (App) Aplicación de validación visual (Angular 21)
├── libs/
│   ├── liquid-glass-ui/           # (Lib) La librería oficial de UI
│   │   ├── src/lib/components/    # Primitivas (Buttons, Modals, Forms)
│   │   ├── package.json           # Declaración publica @liquid-glass/ui
│   │   └── project.json
│   │
│   └── theme-core/                # (Lib Agnóstica) Presets de Tailwind
│       ├── tokens.css             # Variables dinámicas de inversión (Day/Night)
│       ├── glass.preset.js        # Reglas base transferibles
│       └── package.json           # Declaración publica @liquid-glass/theme
├── nx.json                        # Capa de automatización y caché
└── package.json                   # Dependencias globales del Workspace (CDK, Tailwind)
```

## Patrones de Empaquetado y Distribución

Dado el fuerte acoplamiento que la librería tiene con las utilidades de color y CSS de Tailwind, no podemos compilar Tailwind *dentro* del paquete `@liquid-glass/ui`. Hacerlo contaminaría los proyectos consumidores.

En su lugar, hemos implementado el **Patrón de Preset Extraído**:

1. **`@liquid-glass/theme`:** Es un paquete npm que solo expone archivos CSS brutos y archivos JS de exportación de Tailwind.
2. **Aplicación Consumidora:** Cualquiera que haga `npm i @liquid-glass/ui` estará obligado a declarar nuestro preset interno dentro de su propio `tailwind.config.ts`, permitiendo que su propio compilador JIT local inyecte las clases `.glass-1` sólo donde se necesiten.

### Integración de Consumo Ideal:
```javascript
// tailwind.config.ts de una aplicación de 3eros
export default {
  presets: [
    require('@liquid-glass/theme/glass.preset') // Inyección obligatoria
  ],
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@liquid-glass/ui/**/*.{html,ts,mjs}" // Lectura del DOM de la libería
  ]
}
```

## Estrategia de Dependencias Base (CDK)

El paquete Angular CDK (`@angular/cdk`) es la columna vertebral de nuestra accesibilidad (A11y) y superposición del eje-Z.
- **En la librería:** CDK estará marcado como una `peerDependency` obligatoria.
- **Razonamiento:** Evita que npm intente duplicar instancias del CDK si la aplicación que instaló la librería ya utilizaba sus propios paquetes de Angular Material u otra herramienta CDK en múltiples versiones.

## Ejecución Automatizada (Nx Executors)

- `nx serve playground`: Compilará simultáneamente `liquid-glass-ui` en memoria compartida, habilitando recarga ultra-rápida.
- `nx build liquid-glass-ui`: Compilará bajo **Angular Package Format (APF)** usando `ng-packagr` generando el estricto empaquetado final distribuible en un repositorio privado o NPM.
- `nx lint`: Procesará reglas conjuntas de ESLint / TSLint de extremo a extremo sin cruzar variables perdidas.
