# glassng

**The Premium Glassmorphism Component Suite for Angular**

[![NPM Version](https://img.shields.io/npm/v/glassng?color=blue&style=flat-square)](https://www.npmjs.com/package/glassng)
[![Angular Version](https://img.shields.io/badge/Angular-21.x-red?style=flat-square&logo=angular)](https://angular.dev)
[![License](https://img.shields.io/npm/l/glassng?style=flat-square)](./LICENSE)
[![Coverage Statements](https://img.shields.io/badge/coverage%20stmts-89%25-brightgreen?style=flat-square)](#testing)
[![Coverage Branches](https://img.shields.io/badge/coverage%20branches-86%25-brightgreen?style=flat-square)](#testing)
[![E2E Tests](https://img.shields.io/badge/e2e%20tests-170%20passing-brightgreen?style=flat-square)](#testing)

**glassng** is a high-fidelity Angular component library built around a Glassmorphism design system. Engineered with Angular Signals, Angular CDK, and strict ARIA compliance — it delivers cinematic animations, accessible interactions, and enterprise-grade architecture without compromise.

---

## Table of Contents

- [Philosophy](#philosophy)
- [Installation](#installation)
- [Components](#components)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## Philosophy

Most UI libraries optimize for utility. **glassng** optimizes for **identity** — the visual impression your product makes in the first three seconds.

- **Signals-First** — Built entirely with Angular `signal()` and `input()` for optimal change detection and zero-overhead reactivity.
- **Standalone Components** — Every component is standalone, tree-shakeable, and marked with `sideEffects: false`. Import only what you use.
- **CDK-Powered Interactions** — Overlays, menus, focus traps, virtual scroll, and keyboard navigation are all built on Angular CDK primitives, not hand-rolled workarounds.
- **ARIA-Complete** — Every interactive component ships with correct roles, live regions, `aria-*` attributes, and keyboard contracts. Screen readers work out of the box.
- **Tailwind CSS v4 Engine** — CSS-first styling via design tokens, keeping the CSS footprint minimal and fully themeable.
- **Physics-Driven Animations** — Micro-interactions with elastic and spring curves that communicate state, not just style.

---

## Installation

```bash
npm install glassng
```

### Setup

Add the glassng stylesheet to your `angular.json` or global `styles.css`:

```css
@import "glassng/styles.css";
```

### Basic Usage

All components are standalone — import them directly:

```typescript
import { Component } from '@angular/core';
import { GngButton, GngGlassCard, GngAlert } from 'glassng';

@Component({
  standalone: true,
  imports: [GngButton, GngGlassCard, GngAlert],
  template: `
    <gng-glass-card>
      <gng-alert variant="info" title="Welcome">
        glassng is ready to use.
      </gng-alert>
      <button gng-button variant="primary">Get Started</button>
    </gng-glass-card>
  `
})
export class AppComponent {}
```

---

## Components

### Primitives

| Component | Selector | Description |
|-----------|----------|-------------|
| Button | `button[gng-button]` | 7 variants with ripple, loading state, and haptic feedback |
| Glass Card | `gng-glass-card` | Layered glass surface with configurable elevation |
| Badge | `gng-badge` | Numeric or dot indicator overlaid on any element |
| Tag | `gng-tag` | Standalone status label with glass and solid variants |
| Avatar | `gng-avatar` | Image, initials, status indicator, and loading skeleton |
| Skeleton | `gng-skeleton` | Shimmering loading placeholder (circle, rect, text) |
| Tooltip | `gng-tooltip` | Smart-positioned glass bubble with ARIA `tooltip` role |

### Forms

| Component | Selector | Description |
|-----------|----------|-------------|
| Input | `gng-input` | Floating label, error state, icon slots |
| Textarea | `gng-textarea` | Auto-resize, character counter, ControlValueAccessor |
| Select | `gng-select` | Single/multi-select with search, CDK overlay |
| Toggle | `gng-toggle` | Physics-based switch, `role="switch"`, ControlValueAccessor |
| Checkbox | `gng-checkbox` | Three-state (checked / unchecked / indeterminate), laser-draw animation |
| Radio | `gng-radio-group` + `gng-radio-button` | Single-selection group with neon ignition animation |
| Search Input | `gng-search-input` | Debounced search with expand-on-focus and `Ctrl/⌘+K` shortcut |
| Date Picker | `gng-date-picker` | Calendar overlay, ControlValueAccessor, range support |
| File Upload | `gng-file-upload` | Drag-and-drop zone with real-time glass preview |
| Form Field | `gng-form-field` | Label, hint, and error wrapper for any input |

### Feedback & Overlays

| Component | Selector / Service | Description |
|-----------|--------------------|-------------|
| Alert | `gng-alert` | Semantic banner (info / success / warning / error), closable |
| Toast | `GngToastService` | Global notification with 6 positions, CDK overlay |
| Modal | `GngModalService` | Backdrop-blur dialog with 5 animation profiles, CDK Dialog |
| Progress Bar | `gng-progress-bar` | Determinate, indeterminate, buffer, and query modes |

### Navigation & Layout

| Component | Selector | Description |
|-----------|----------|-------------|
| Tabs | `gng-tabs` + `gng-tab` | Underline and pill variants, `role="tablist"` / `role="tab"` |
| Pagination | `gng-pagination` | Page navigation with configurable page-size selector |
| Breadcrumbs | `gng-breadcrumbs` | Configurable separator, icon support, `aria-current="page"` |
| Dropdown Menu | `gng-dropdown-menu` | CDK Menu-based contextual menu with destructive item support |
| Sidebar | `gng-sidebar` | Collapsible navigation sidebar with cinematic expansion |

### Data Display

| Component | Selector | Description |
|-----------|----------|-------------|
| Data Table | `gng-data-table-container` | Virtual scroll, sort, column templates, CDK Table |
| Timeline | `gng-timeline` + `gng-timeline-item` | Vertical event thread with typed status indicators |
| KPI Card | `gng-kpi-card` | Metric card with trend, progress, minimal, and status variants |
| Sparkline | `gng-sparkline` | Inline SVG chart for data tables |

### Utilities

| Directive / Component | Description |
|-----------------------|-------------|
| `gngScroll` directive | Applies glass-styled custom scrollbar to any container |
| `gng-glass-scroll` CSS class | Same effect via CSS class |

---

## Accessibility

**glassng** is built for real accessibility, not checkbox compliance.

- **CDK Foundation** — Focus traps, keyboard navigation, and overlay management use Angular CDK primitives (`CdkDialog`, `CdkMenu`, `CdkListbox`, `FocusTrap`).
- **ARIA Roles** — All interactive components declare explicit ARIA roles: `role="switch"` (Toggle), `role="checkbox"`, `role="radio"`, `role="tablist"` / `role="tab"`, `role="dialog"`, `role="alert"`, `role="progressbar"`, `role="tooltip"`.
- **Reactive ARIA Attributes** — State attributes (`aria-checked`, `aria-disabled`, `aria-expanded`, `aria-selected`, `aria-valuenow`) are driven by Angular `HostBinding` and update reactively with signals.
- **Live Regions** — Alert and Toast use `aria-live` and `role="alert"` for screen reader announcements.
- **Keyboard Contracts** — Toggle and Checkbox respond to `Space`/`Enter`. Radio groups support arrow-key navigation. Modals trap focus and close on `Escape`. Menus follow the ARIA Authoring Practices Guide (APG) menu pattern.
- **Focus Visible** — All focusable elements have visible focus indicators that meet WCAG 2.1 AA contrast requirements.

---

## Testing

### Unit Tests

All components are tested with **Vitest** + `@analogjs/vitest-angular` in a jsdom environment.

```bash
npx nx run glassng:test
npx nx run glassng:test --coverage
```

**Coverage (v8):**

| Metric | Coverage |
|--------|----------|
| Statements | **89.63%** |
| Branches | **86.39%** |
| Functions | **83.69%** |
| Lines | **92.60%** |

All metrics exceed the enforced 80% threshold.

### End-to-End Tests

**170 E2E tests** across **25 spec files** cover every playground route using **Playwright** (Chromium). Tests validate real DOM output, ARIA attributes, user interactions, CDK overlay behavior, and animation state transitions.

```bash
npx nx run playground-e2e:e2e
npx nx run playground-e2e:e2e -- --project=chromium
```

**E2E coverage by area:**

| Area | Spec File | Tests |
|------|-----------|-------|
| Buttons | `buttons.spec.ts` | 4 |
| Alerts | `alerts.spec.ts` | 8 |
| Avatar | `avatar.spec.ts` | 5 |
| Badges & Tags | `badges.spec.ts` | 8 |
| Toggle & Checkbox | `selection.spec.ts` | 10 |
| Radio | `radio.spec.ts` | 7 |
| Forms & Input | `forms.spec.ts` | 4 |
| Select | `select.spec.ts` | — |
| Search Input | `search-input.spec.ts` | 7 |
| Date Picker | `date-picker.spec.ts` | 5 |
| File Upload | `file-upload.spec.ts` | 6 |
| Tabs | `tabs.spec.ts` | 7 |
| Progress Bar | `progress.spec.ts` | 13 |
| Skeleton | `skeleton.spec.ts` | 6 |
| Pagination | `pagination.spec.ts` | 6 |
| Modals | `modals.spec.ts` | 5 |
| Toasts | `toasts.spec.ts` | 7 |
| Dropdown Menu | `dropdown-menu.spec.ts` | 7 |
| Breadcrumbs | `breadcrumbs.spec.ts` | 7 |
| Timeline | `timeline.spec.ts` | 9 |
| Data Table | `data-table.spec.ts` | 7 |
| Charts & KPI | `charts.spec.ts` | 15 |
| Scrollbar | `scrollbar.spec.ts` | 5 |
| A11y | `a11y.spec.ts` | 7 |

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

```bash
# Clone and install
git clone https://github.com/lucho-farfan/liquid-glass-angular.git
cd liquid-glass-angular
npm install

# Run the playground
npx nx run playground:serve

# Run unit tests
npx nx run glassng:test

# Run e2e tests (requires running dev server or uses built-in webServer)
npx nx run playground-e2e:e2e
```

---

## Author

**Luis Eduardo Farfan Melgar**
- GitHub: [@lucho-farfan](https://github.com/lucho-farfan)
- Email: lucho.farfan9@gmail.com

Built with dedication for the Angular community.

---

## License

MIT © Luis Eduardo Farfan Melgar

*Crafted for Angular developers who refuse to ship boring interfaces.*
