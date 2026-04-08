---
title: Liquid Glass UI - Angular SDD Master Index
description: Documento raíz para la navegación técnica del sistema de diseño orientado a Angular 21.
version: 2.0.0
---

# 🧠 Angular SDD Master Index

Este es el punto central de verdad para la implementación de la librería `@liquid-glass/angular`. Cada documento en esta carpeta está diseñado para ser consumido por desarrolladores y agentes de IA para garantizar que el sistema mantenga la visión "Liquid Glass" original pero con la potencia técnica de Angular 21.

## 📁 Arquitectura Documental (Paso a Paso)

### 01. Fundamentos del Sistema
*   **[01-theming-engine.md](./sdd/01-theming-engine.md)**: El motor de temas basado en CSS Variables y el servicio reactivo de Angular.
*   **[02-core-principles.md](./sdd/02-core-principles.md)**: Reglas de oro sobre Signals, OnPush y ViewEncapsulation.

### 02. Catálogo de Componentes (Specs)
*   **Estado: En curso** (Documentando via SDD)
*   **01-08**: [Button](./sdd/components/01-button.md), [Input](./sdd/components/02-input.md), [Card](./sdd/components/03-card.md), [Badge](./sdd/components/04-badge.md), [Toggle](./sdd/components/05-toggle.md), [Checkbox](./sdd/components/06-checkbox.md), [Modal](./sdd/components/07-modal.md), [Tabs](./sdd/components/08-tabs.md).
*   **Punto Actual**: [09-13](./sdd/components/09-progress-bar.md), [14. Skeleton](./sdd/components/14-skeleton.md).
*   **Próximos**: Table.

### 03. Integración y Layout
*   **[03-layout-architecture.md](./sdd/03-layout-architecture.md)**: El Shell de la aplicación y el sistema de grillas Bento.
*   **[04-nx-strategy.md](./sdd/04-nx-strategy.md)**: Empaquetado de la librería y publicación NPM.

---

> **Protocolo de IA:** Antes de implementar cualquier componente, lee primero `01-theming-engine.md` para los tokens y luego el archivo específico del componente en `components/`.
