---
title: Glass Tabs Component Specs
description: Especificación técnica completa (Arquitectura CDK + Visual) del sistema de pestañas para Liquid Glass UI.
version: 1.1.0
---

# 08. Glass Tabs (Navigation)

Las Tabs permiten alternar entre sub-vistas relacionadas. Implementamos una arquitectura robusta sobre el Angular CDK para garantizar accesibilidad y fluidez total.

---

## 1. Arquitectura Técnica & CDK

A diferencia de los enfoques puramente CSS, utilizamos el **Angular CDK** para gestionar la interactividad compleja:

### A. CDK ListKeyManager
*   **Propósito**: Gestiona la navegación de pestañas mediante teclado (flechas `R/L`, `Home`, `End`).
*   **Implementación**: El componente `lib-glass-tabs` actúa como el manager de una colección de `lib-glass-tab` que implementan la interfaz `FocusableOption`.
*   **Efecto**: Soporte automático para loops de navegación y compatibilidad con lectores de pantalla.

### B. ViewChildren & Querying
*   Usamos `contentChildren(LiquidTabComponent)` para detectar dinámicamente cuántas pestañas hay y sincronizar el indicador "líquido" con sus dimensiones físicas.

---

## 2. Advanced Visual Features

### A. Elastic Slider Indicator
- **Dinámica**: El indicador neón (Underline) o la cápsula (Pill) se desplaza mediante `transform: translateX()`.
- **Física**: Aplicamos una transición `cubic-bezier` que simula inercia, especialmente en saltos entre pestañas no contiguas.

---

## 3. API Reference (Angular Signals)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeTabId` | `model<string>` | `undefined` | ID de la pestaña activa (Two-way). |
| `variant` | `input<'underline' \| 'pill'>` | `'underline'` | Estilo visual del sistema. |
| `isLazy` | `input<boolean>` | `true` | Renderizado perezoso impulsado por `@if`. |

---

## 4. Visual Styles

*   **Underline**: Línea neón de `2px` con `glow` intenso.
*   **Pill (Glass Track)**: Track excavado en `bg-black/20` con un `thumb` de cristal elevado.

---

## 5. Accesibilidad (A11y)

*   **Roles**: `role="tablist"`, `role="tab"`, y `role="tabpanel"`.
*   **Sync**: Los atributos `aria-selected` y `aria-controls` se sincronizan automáticamente entre el disparador y el panel de contenido.

---

> **Regla de Oro:** "Navigation is a physical journey." El movimiento del indicador ayuda al usuario a mapear mentalmente la estructura de la información. No permitas saltos de imagen sin transición.
