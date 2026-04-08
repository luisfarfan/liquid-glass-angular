---
title: Component Architecture Standards
description: Reglas técnicas comunes para la creación de componentes en la librería liquid-glass-ui.
version: 1.1.0
---

# 06. Component Architecture Standards

Para mantener la coherencia en una librería de 21 componentes, todos deben seguir el mismo "Plano de Ingeniería". Este documento define los patrones obligatorios de Angular 21 que aplicaremos.

---

## 1. Patrones de Comunicación (Signals First)

*   **Inputs Reactivos**: `input<T>()` e `input.required<T>()`.
*   **Model API**: Usar `model<T>()` para estados bidireccionales.
*   **Outputs**: Usar la API `output<T>()`.

---

## 2. Inyección de Configuración Global (The "Material" Pattern)

Cada componente debe permitir la sobrescritura de sus opciones por defecto mediante el sistema de **Dependency Injection (DI)**.
- **Tokens**: Crearemos tokens como `LG_BUTTON_DEFAULT_OPTIONS`.
- **Uso**: El usuario puede proveer un objeto de configuración en su `app.config.ts` para cambiar, por ejemplo, todas las variantes de los botones de la app a "ghost" por defecto.

---

## 3. Integración con Angular CDK

Para comportamientos complejos, **Liquid Glass UI es un envoltorio premium sobre Angular CDK**.
- **A11y & Overlay**: Usaremos `CdkConnectedOverlay` para dropdowns y `CdkDialog` para modales.
- **Aria Patterns**: Todo componente interactivo debe implementar los `AriaLive` y `FocusTrap` del CDK cuando sea necesario.

---

## 4. Host Binding & Estilado

*   **Host Classes**: Controlamos el tag directamente mediante la propiedad `host` en `@Component`.
*   **Encapsulation**: `ViewEncapsulation.None` es obligatorio para permitir el flujo de Tailwind v4.

---

## 5. Testing & Debugging Attributes

Para facilitar las pruebas automatizadas y el debugging:
- **Test IDs**: Cada componente inyectará un atributo `data-lg-id` único.
- **Internal Parts**: Sub-elementos complejos usarán `part` o clases de debug específicas (ej. `lg-card__header`).

---

## 6. Performance Checklist

1.  **OnPush**: Obligatorio en el 100% de los componentes.
2.  **Signal Derivatives**: Usar `computed()` para cualquier lógica de clases que dependa de los inputs.
3.  **Primitive Observables**: Prohibido usar `AsyncPipe` para estados internos; usar Signals.

---

> **Regla de Oro de Angular:** "Signals are the future, but Clean Code is forever." No reinventamos la rueda de la accesibilidad; usamos el CDK y lo hacemos brillar con cristal.
