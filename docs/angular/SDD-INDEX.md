---
title: Liquid Glass UI - Angular SDD Master Index
description: Documento raíz para la navegación técnica del sistema de diseño orientado a Angular 21.
version: 2.5.0
---

# 🧠 Angular SDD Master Index

Este es el punto central de verdad para la implementación de la librería `@liquid-glass/angular`. Cada documento en esta carpeta está diseñado para ser consumido por desarrolladores y agentes de IA para garantizar que el sistema mantenga la visión "Liquid Glass" original pero con la potencia técnica de Angular 21.

## 📁 Arquitectura Documental (Paso a Paso)

### 01. Fundamentos del Sistema
*   **[01-theming-engine.md](./sdd/01-theming-engine.md)**: El motor de temas basado en CSS Variables y el servicio reactivo de Angular.
*   **[02-core-principles.md](./sdd/02-core-principles.md)**: Reglas de oro sobre Signals, OnPush y ViewEncapsulation.

### 02. Catálogo de Componentes (Specs)
*   **Estado:** Las especificaciones **01–26** están publicadas en [`./sdd/components/`](./sdd/components/). La implementación vive en `libs/liquid-glass-ui`; la paridad spec ↔ código se resume en la subsección siguiente.
*   **01–08:** [Button](./sdd/components/01-button.md), [Input](./sdd/components/02-input.md), [Card](./sdd/components/03-card.md), [Badge](./sdd/components/04-badge.md), [Toggle](./sdd/components/05-toggle.md), [Checkbox](./sdd/components/06-checkbox.md), [Modal](./sdd/components/07-modal.md), [Tabs](./sdd/components/08-tabs.md).
*   **09–15:** [Progress bar](./sdd/components/09-progress-bar.md), [Select](./sdd/components/10-select.md), [Textarea](./sdd/components/11-textarea.md), [Tooltip](./sdd/components/12-tooltip.md), [Sidebar](./sdd/components/13-sidebar.md), [Skeleton](./sdd/components/14-skeleton.md), [Data table](./sdd/components/15-data-table.md).
*   **16–18:** [Empty state](./sdd/components/16-empty-state.md), [Radio](./sdd/components/17-radio.md), [Toast](./sdd/components/18-toast.md).
*   **19–26:** [Pagination](./sdd/components/19-pagination.md), [Topbar](./sdd/components/20-topbar.md), [Scrollbar](./sdd/components/21-scrollbar.md), [Drawer](./sdd/components/22-drawer.md), [Breadcrumbs](./sdd/components/23-breadcrumbs.md), [Avatar](./sdd/components/24-avatar.md), [Search input](./sdd/components/25-search-input.md), [Dropdown menu](./sdd/components/26-dropdown-menu.md).
*   **27 (layout):** [Shell layout](./sdd/components/27-shell-layout.md) — contenedor app shell (`lg-shell-layout`).

#### Paridad spec ↔ código

Las specs **01–26** y **27** tienen piezas exportadas desde la librería bajo `libs/liquid-glass-ui/src/lib/components/`, incluido **Dropdown menu** en `dropdown/` (`lg-dropdown-menu`, `lg-dropdown-menu-item`, `lg-dropdown-menu-divider`, constante `LG_DROPDOWN_MENU` y reexport de `CdkMenuModule`), **Search input** (`lg-search-input`), **Avatar** (`lg-avatar`), **Breadcrumbs** (`lg-breadcrumbs`), **Scrollbar** (`.lg-glass-scroll` + `lgGlassScroll`), **Pagination**, **Empty state**, **Topbar**, **Drawer**, y **Form field** para composición de formularios.

#### TODO documentación / paridad (seguimiento)

- **Data table (15) + `LgTableDataSource`:** ampliar [15-data-table.md](./sdd/components/15-data-table.md) con el patrón tipo Material (`connect`, `filterPredicate`, `sortingDataAccessor`, cableado con `lg-pagination`); referencia viva: playground **Data table** ejemplo 1. Pendientes de producto/doc: paginación servidor, cabeceras de orden estilo `MatSort`, `trackBy`, y notas de testing.
- **Scrollbar (21):** enlazar en la guía de integración que `layout.css` ya incorpora `scrollbar/scrollbar.css`; opcionalmente documentar consumo sin `layout.css` importando solo esa hoja.

#### Shell (Topbar + Sidebar + Drawer)

*   **Shell layout** (`lg-shell-layout`): contenedor estilo `MatSidenavContainer`; spec [27-shell-layout.md](./sdd/components/27-shell-layout.md). Proyección `[lgShellSidebar]` para `lg-sidebar`; el resto (topbar + main) en el slot por defecto. Inputs `contentInset` (idealmente vía `lgShellSidebarContentInset()`), `backdropVisible`, `backdropClass`, `backdropDismissLabel`, `mainRegionLabel`; output `backdropDismiss`. Con scrim visible: **FocusTrap** CDK solo en la región del sidebar; scrim con token `--lg-t-scrim`.
*   **Topbar** (`lg-topbar`): emite `sidebarToggle` para móvil; enlazar con `LiquidSidebarComponent.toggleMobile()` (o lógica propia). Zonas de proyección: `[lgTopbarStart]`, `[lgTopbarSearch]`, `[lgTopbarActions]`.
*   **Drawer**: `LiquidDrawerService.open(Componente, { width, position })` con CDK Dialog; datos vía `LIQUID_DRAWER_DATA`; scroll interno con la clase `lg-glass-scroll` (spec 21, hoja `scrollbar/scrollbar.css` importada por el drawer y por `layout.css`).
*   **Anchos del sidebar**: variables CSS `--lg-sidebar-width-expanded` / `--lg-sidebar-width-collapsed` en el host del sidebar; constantes TS `LG_SHELL_SIDEBAR_EXPANDED_INSET` y `LG_SHELL_SIDEBAR_COLLAPSED_INSET` alineadas con esos valores para el inset del shell.

### 03. Integración y Layout
*   **[05-layout-architecture.md](./sdd/05-layout-architecture.md)**: El Shell de la aplicación y el sistema de grillas Bento.
*   **[04-nx-strategy.md](./sdd/04-nx-strategy.md)**: Empaquetado de la librería y publicación NPM.

---

> **Protocolo de IA:** Antes de implementar cualquier componente, lee primero `01-theming-engine.md` para los tokens y luego el archivo específico del componente en `components/`.
