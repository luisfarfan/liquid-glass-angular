---
title: Liquid Glass Design System - SDD Master Index
description: Master routing file for the SDD. AI Agents must use this file to locate specific documentation before generating code.
version: 1.0.0
---

# 🧠 AI Context Routing (Master Index)

> **Agent Instruction:** This is the master index for the Spec-Driven Development (SDD) of the Liquid Glass Design System. Do NOT generate code based solely on this index. Instead, identify the relevant subsystem below and read its specific `.md` file to get the exact design tokens, constraints, and implementation rules.

## 📁 SDD File Architecture

El sistema está dividido en archivos markdown modulares para evitar desbordar el contexto de los LLMs. Cada archivo representa un dominio acotado con reglas estrictas.

### `docs/sdd/01-system-vision.md`
**System Overview & Vision**
*Contiene la filosofía base, los principios de diseño (Liquid Glass) y la estrategia de implementación de Fases (HTML/Tailwind -> Angular).*

### `docs/sdd/02-foundations.md`
**Foundations & Tokens**
*Tokens de diseño puros, valores exactos requeridos para:*
- **Color:** Paleta Base, Acentos Neón, Degradados Ambientales.
- **Tipografía:** Familias, Escalas, Pesos.
- **Espaciado:** Grid de 8pt.
- **Profundidad:** Escala de Z-index, Sombras, Inset Shadows.

### `docs/sdd/03-visual-language.md`
**Visual Language & Styles**
*Mecánicas para lograr el efecto "Liquid Glass":*
- Translucidez y ratios de desenfoque (`backdrop-filter: blur`).
- Texturas superficiales (ruido visual).
- Edges: Radios de borde y bordes suaves iluminados ("Glows").
- Estados de interacción (Hover fluido, Active/Press, Focus Neón, Disabled).

### `docs/sdd/04-components-system.md`
**Components System**
*Catálogo estructurado y reglas de los componentes (No contiene código, sino especificaciones de diseño y estructura DOM esperada):*
- **Atoms:** Buttons, Inputs, Badges, Avatars.
- **Molecules:** Form Groups, Tooltips, Dropdowns.
- **Organisms:** Data Tables, Modals, Navbars, Sidebar, Metric Cards.

### `docs/sdd/05-layout-architecture.md`
**Layout & Structure**
*Reglas de contenedores macro:*
- Breakpoints responsivos.
- Admin Application Shell (Disposición del layout maestro).
- Dashboard Grids tipo "Bento-box".
- Paneles y Contenedores de Cristal.

### `docs/sdd/06-motion.md`
**Motion & Animation**
*Aceleración, Físicas e interacciones:*
- Curvas de easing y duraciones precisas.
- Micro-interacciones (click, hover).
- Animaciones de entrada/salida (Skeleton to Content).

### `docs/sdd/07-accessibility.md`
**Accessibility (a11y)**
*Restricciones para que la interfaz pase validaciones AA/AAA:*
- Manejo de contraste sobre fondos de cristal (difícil pero obligatorio).
- Roles ARIA y navegación por teclado (focus rings).

### `docs/sdd/08-implementation-guide.md`
**Implementation Guide**
*Instrucciones técnicas duras para los Agentes que van a generar el código:*
- Configuraciones exactas de Tailwind v4 y Variables CSS.
- Manejo de estados y micro-interacciones.

### `docs/sdd/11-angular-architecture.md`
**Angular 21 Architecture & Strategy**
*Especificaciones técnicas para la migración de componentes a Angular:*
- Patrones de Signals y Standalone.
- Implementación de `ControlValueAccessor` para formularios.
- Integración con Angular CDK para accesibilidad y overlays.

### `docs/sdd/12-nx-workspace-architecture.md`
**Nx Monorepo Architecture**
*Estrategia de gestión del workspace:*
- Estructura de apps/ y libs/.
- Estrategia de empaquetado y distribución via NPM.
- Configuración de caché y paralización de tareas.

---


> **Agent Protocol:** Cuando el usuario solicite crear un componente interactivo, por ejemplo un "Botón", el Agente deberá **primero** leer `02-foundations.md` para las variables, luego `03-visual-language.md` para los estados interactivos, y finalmente `04-components-system.md` antes de escribir ninguna línea de código.
