---
title: Glass Shell Layout Specification
description: Contenedor de aplicación alineado con MatSidenavContainer — inset, scrim móvil, ARIA y foco.
version: 1.0.0
---

# 27. Glass Shell Layout (Organism)

## 1. Overview

- **Purpose:** Coordinar `lg-sidebar` fijo, columna principal (topbar + contenido) y scrim móvil sin duplicar lógica en cada app.
- **Selector:** `lg-shell-layout`
- **Tokens:** el scrim usa `--lg-t-scrim` ([01-theming-engine](../01-theming-engine.md)); los anchos del sidebar siguen `--lg-sidebar-width-*` en el CSS del sidebar; el inset recomendado en TS es `lgShellSidebarContentInset()` exportado junto a `LG_SHELL_SIDEBAR_*_INSET`.

---

## 2. Anatomy

| Zona | Contenido |
|------|------------|
| Slot `[lgShellSidebar]` | `lg-sidebar` (u otro nav con el atributo). |
| Slot por defecto | Topbar + `main` / router-outlet. |
| Scrim | Botón a pantalla completa solo si `backdropVisible` es true (típico móvil). |

---

## 3. API (Angular signals)

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `contentInset` | `input<string>` | `'0'` | `margin-left` de la columna principal (p. ej. resultado de `lgShellSidebarContentInset`). |
| `backdropVisible` | `input<boolean>` | `false` | Muestra el scrim y activa **FocusTrap** CDK solo en la región del sidebar. |
| `backdropClass` | `input<string \| undefined>` | `undefined` | Clases extra en el botón-scrim. |
| `backdropDismissLabel` | `input<string>` | `'Dismiss navigation'` | Nombre accesible del scrim (i18n). |
| `mainRegionLabel` | `input<string>` | `'Application content'` | `aria-label` de la región principal (`role="region"`). |

| Output | Description |
|--------|-------------|
| `backdropDismiss` | Clic en el scrim; el padre suele llamar `toggleMobile()` del sidebar. |

---

## 4. Accesibilidad y foco

- La columna principal expone `role="region"` y etiqueta configurable.
- Con `backdropVisible === true`, se crea un `FocusTrap` de `@angular/cdk/a11y` **únicamente** alrededor del contenedor del sidebar; al destruirse (cerrar scrim o destruir el componente), CDK **restaura el foco** al elemento activo previo.
- El scrim es un `button` con `aria-label` configurable y estilo `:focus-visible` alineado con tokens de foco.

---

## 5. Buenas prácticas

1. Calcular `contentInset` con `lgShellSidebarContentInset({ isMobileViewport, isSidebarCollapsed })` para no desalinear de `--lg-sidebar-width-*`.
2. En móvil, `contentInset` debe ser `0`; el sidebar actúa como drawer encima del contenido.
3. Sincronizar `backdropVisible` con el estado de panel móvil del sidebar (p. ej. `isMobileOpen()`).

---

## 6. Acceptance criteria

- [ ] El scrim usa `--lg-t-scrim` (sin color mágico en el componente).
- [ ] Con scrim visible, el foco no “cae” detrás del contenido principal hasta cerrar.
- [ ] Las etiquetas ARIA son configurables para i18n.
