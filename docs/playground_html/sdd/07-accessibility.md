---
title: Accessibility (a11y) Architecture
description: Strict guidelines ensuring the Liquid Glass framework is compliant with WCAG 2.1 AA standards without compromising aesthetics.
version: 1.0.0
---

# 07. Accessibility (a11y) Architecture

## 1. Contrast Rules (Over Glass)
- **Rules:** Texto principal e íconos críticos DEBEN mantener una relación de contraste mínima de `4.5:1` contra su fondo inmediato, incluso considerando cómo el *backdrop-blur* afecta el renderizado del color que hay detrás del cristal.
- **Best practices:** Usar blancos de alta opacidad (`rgba(255, 255, 255, 0.9)`) para tipografía primaria en vez de blanco puro; esto mantiene integración orgánica mientras aprueba la barrera matemática del WCAG sobre fondos oscuros (Zinc-900).
- **Anti-patterns:** Usar fuentes delgadas (`font-weight: 300`) sobre interfaces con desenfoque de cristal; el filtro *anti-aliasing* puede romper la legibilidad y bajar la percepción de contraste dramáticamente.
- **Acceptance criteria:**
  - [ ] Todo texto (excepto labels deshabilitados intencionalmente) cumple matemáticamente AA o AAA bajo comprobación de contraste en modo oscuro.

## 2. Keyboard Navigation & Focus Management
- **Rules:** Toda la UI debe ser operada fluidamente usando tabulación (`Tab` / `Shift+Tab`) y botones de interacción (`Enter`, `Space`, Arrows). El "Neon Focus System" está diseñado *exclusivamente* para esto.
- **Best practices:** El Glow Neón no debe renderizarse con un mero borde interno que desplace elementos. Debe aplicarse visualmente *hacia afuera* (outline/box-shadow offset) para ser siempre un indicador inconfundible del elemento enfocado.
- **Anti-patterns:** Usar `outline: none` en Tailwind para remover el recuadro del browser sin inyectar inmediatamente el anillo de sistema de diseño alterno (`focus-visible:ring-neon`). Asignar `tabindex` positivo arbitrariamente (rompe el flujo natural del DOM).
- **Acceptance criteria:**
  - [ ] El Dashboard entero puede operarse sin un mouse/trackpad.
  - [ ] Los anillos de enfoque (`focus-visible`) nunca quedan recortados u ocultos bajo otros elementos con `overflow: hidden`.

## 3. Semantic HTML & Screen Reader Behavior
- **Rules:** Se debe emplear una estricta jerarquía de etiquetas HTML5 semánticas (`<form>`, `<nav>`, `<aside>`, `<main>`, `<button>`).
- **Best practices:** Usar generosamente la utilidad visual `.sr-only` (Screen Reader Only) para ocultar texto que ayuda a la tecnología asistiva cuando queremos preservar una estética puramente basada en íconos.
- **Anti-patterns:** Evitar atar validadores de clic de JS (`onClick`) sobre un `<div>` o `<span>` crudo. Si debe ser así, es mandatorio inyectar `role="button"` y `tabindex="0"`.
- **Acceptance criteria:**
  - [ ] Landmarks principales (Navigation, Banner, Main content) están presentes en el Shell de la App.
  - [ ] Todo "Icon Button" posee un `<span class="sr-only">X</span>` interno y descriptivo.

## 4. Modal Accessibility (Focus Trap)
- **Rules:** Una vez abierto un Modal o Drawer, el foco debe transportarse forzosamente al primer elemento interactivo dentro de él y NO puede salir de su contenedor (Focus Trap).
- **Best practices:** Configurar el evento `ESC` de teclado como gatillo global universal para regresar o cerrar estructuras `Z-50`. Al cerrar la superposición, el foco del cursor **DEBE regresar automáticamente** al botón o elemento exacto que inició la apertura.
- **Anti-patterns:** Permitir que usuarios puedan navegar con `Tab` hacia campos de texto debajo del Backdrop/Overlay dentro de una visual que está oscurecida.
- **Acceptance criteria:**
  - [ ] El `#app-root` o main body adquiere el atributo `aria-hidden="true"` al abrir el Modal.
  - [ ] La tabulación rota de final a inicio internamente dentro de los límites físicos del Dialog.

## 5. Input & Form Validation Accessibility
- **Rules:** El estado "Error" nunca debe manifestarse únicamente con colores (Ej: Un campo que solo se torna rojo). El diseño debe proveer una pista escrita, ícono semántico o bloque de advertencia para usuarios con restricciones o deuteranopía.
- **Best practices:** Utilizar el atributo `aria-describedby` dentro del `<input>` apuntando al `id` del contenedor de error o del label helper asociado debajo.
- **Anti-patterns:** Depender exclusivamente de atributos HTML "placeholder" para describir la data a los usuarios y carecer de etiquetas `<label>`.
- **Acceptance criteria:**
  - [ ] Screen readers anuncian explícitamente y en tiempo real el error de validación cuando el input correspondiente se desenfoca (`onBlur`).

## 6. Reduced Motion Support
- **Rules:** El sistema de diseño (Dashboard) está obligado formalmente a respetar las preferencias de mitigación de movimiento del Sistema Operativo del Usuario.
- **Best practices:** A través de todo el proyecto, aplicar el utilitario que invierta la animación a `0ms` u opte por fundidos básicos, interceptado con la media query `@media (prefers-reduced-motion: reduce)`.
- **Anti-patterns:** Retardar flujos críticos de la pantalla obligando al usuario a ver animaciones largas para mostrarle su información fundamental.
- **Acceptance criteria:**
  - [ ] Si la preferencia de reducción está activa, eventos como Slide-overs de los Drawers y Slides In de Toasts simplemente cambian visibilidad/opacidad al instante sin mover el ojo del usuario.

## 7. Target Sizes
- **Rules:** Por reglamentación de WCAG 2.1, ningún objetivo de clic primario, link, o touch control point debe tener una superficie menor de impacto a `44x44px`.
- **Best practices:** Los "Badge" interactivos u "Icon Buttons" compactos (`w-8 h-8`, es decir 32x32) parecerán pequeños en la UI (siguiendo el minimalismo de diseño SaaS), pero deben extender de forma artificial su superficie táctil mediante pseudo-elementos vacíos centrados transparentes o mayor `padding` invisible.
- **Anti-patterns:** Conglomeraciones hiperdensas de filas de iconos interactivos (ej: Editar, Borrar, Duplicar, Compartir) con `2px` de margen entre sí.
- **Acceptance criteria:**
  - [ ] Cero intersecciones ni overlap en polígonos cliqueables colindantes en un mapa de calor 44x44 en móvil / tablet touch displays.
