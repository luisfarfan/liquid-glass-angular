# 🧊 glassng

### The Premium Glassmorphism Component Suite for Angular

**glassng** (formerly Liquid Glass UI) is a state-of-the-art component library designed for Angular 21, built with a focus on high-fidelity aesthetics, cinematic animations, and extreme performance. It brings a futuristic "Glassmorphism" design system to the Angular ecosystem, optimized for enterprise-grade dashboards and high-impact user interfaces.

[![NPM Version](https://img.shields.io/npm/v/glassng?color=blue&style=flat-square)](https://www.npmjs.com/package/glassng)
[![Angular Version](https://img.shields.io/badge/Angular-21.x-red?style=flat-square&logo=angular)](https://angular.dev)
[![Bundle Size](https://img.shields.io/bundlephobia/min/glassng?color=success&style=flat-square)](https://bundlephobia.com/package/glassng)

---

## ✨ Philosophy & Architecture

While most UI libraries focus on utility, **glassng** focuses on **Identity**. It is designed for projects that need to "Wow" the user at first glance without sacrificing the technical hygiene of a professional application.

- **Signals-First**: Built entirely with Angular Signals for ultra-granular reactivity and optimal performance.
- **Tree-Shaking Native**: Every component is standalone and the library is marked with `sideEffects: false`.
- **Zero-Gravity Physics**: Integrated animations using GSAP and CSS variables for a "natural" glass feel.
- **Tailwind CSS v4 Engine**: Leverages the latest CSS-first engine for styling, ensuring a tiny CSS footprint.

---

## 🚀 Getting Started

Install the library via NPM:

```bash
npm install glassng
```

### 1. Global Setup
Add the glassng styles to your `angular.json` or `styles.css`:

```css
@import "glassng/styles.css";
```

### 2. Usage
Import the standalone components directly into your Angular components:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, GlassCardComponent } from 'glassng';

@Component({
  standalone: true,
  imports: [ButtonComponent, GlassCardComponent],
  template: `
    <lg-card>
      <h2 glass-title>Welcome to the Future</h2>
      <button lg-button variant="primary">Initialize Console</button>
    </lg-card>
  `
})
export class AppComponent {}
```

---

## 🍱 Component Showcase

### 💎 Atoms & Primitives
- **Glass Button**: 7 variants (Primary, Secondary, Success, Warning, Info, Destructive, Ghost) with neon glow effects and haptic feedback support.
- **Glass Badge**: Translucent indicators for status and counters.
- **Skeleton**: Shimmering glass placeholders for loading states.

### 📝 Form Intelligence
- **Input / Textarea**: Etched borders with floating labels and neon focus rings.
- **Select (Single & Multi)**: Overlays with internal search, "crystal" selection chips, and liquid animations.
- **Toggle (Switch)**: Physics-based sliding toggle.
- **Radio & Checkbox**: SVG-driven animations with full keyboard accessibility.

### 🌌 Interaction Overlays
- **Modal**: Backdrop-blur with elevation logic and elastic entry animations.
- **Toast**: Notification system with neon auras and mobile-optimized haptics.
- **Tooltip**: Levitating glass bubbles with smart positioning.

### 📐 Structural & Layout
- **Sidebar**: The industry-standard "Liquid Sidebar" with cinematic expansion and active state indicators.
- **Data Table**: High-performance grid with sticky headers, custom column templates, and translucency.
- **Tabs**: Sliding focus indicators with smooth transitions.

---

## 💼 Real-World Use Cases

### 1. E-Commerce Multi-Tenant Admin
Managing large catalogs requires a balance of density and clarity. **glassng**'s `Data Table` and `Select` components allow for "dense yet breathable" layouts. Use glassmorphism to separate the management console from the content without losing visual context.

### 2. High-Fidelity Performance Dashboards
For apps that monitor real-time data, the **glassng** aesthetic provides a "Mission Control" feel. The `Progress Bar` and `Skeleton` loaders ensure that users stay informed during data fetching while maintaining a premium feel.

### 3. Creative Portfolios & Landing Pages
If your objective is to "WOW" the visitor, **glassng**'s unique light-refraction effects on buttons and cards provide a level of visual polish that standard Material or Bootstrap components cannot reach.

---

## 🗺️ Roadmap (Upcoming Features)

We are constantly evolving. The following components are currently under development:

- [ ] **Topbar**: Application header with integrated profile, search, and action zones.
- [ ] **Drawer**: Side-sliding modal for settings and quick-actions.
- [ ] **Empty State**: Animated illustrations for empty dashboards.
- [ ] **Charts (Integration)**: Pre-styled wrapper for Chart.js or D3 with glass themes.

---

## 📄 License
MIT © [Your Name/Organization]

*Built with ❤️ for the Angular Community.*
