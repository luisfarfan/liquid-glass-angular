---
title: Motion & Interaction System
description: Specifications for transition durations, easing rules, microinteractions, and animation performance restrictions.
version: 1.0.0
---

# 06. Motion & Interaction System

## 1. Motion Philosophy

- **Purpose:** Bring the Liquid Glass interface to life, making it feel highly tactile and responsive, without distracting the user from their actual administrative tasks.
- **Philosophy:** Motion should always serve a functional purpose—directing attention, communicating spatial hierarchy, or validating user input. Transitions must mimic fluid dynamics and the feeling of interacting with physical, weighty glass items. No erratic or playful jumping.

---

## 2. Timing & Easing Rules

### Transition Durations (Tokens)
- **Snappy (`150ms`):** Hover states, opacity shifts, and active/pressed scaling on atoms.
- **Standard (`200ms`):** Focus rings turning on/off, Dropdown/Tooltip reveals, Checkbox animations.
- **Deliberate (`300ms`):** Modal bounds scaling, Sidebar expanding/collapsing, Drawer slide-overs, and macroscopic page transitions.

### Easing Curves
- **Enter/Hover (`ease-out` / `cubic-bezier(0.0, 0.0, 0.2, 1)`):** Starts fast, decelerates towards the end. Used when objects appear on screen or are hovered (creates a feeling of immediate responsiveness).
- **Exit/Leave (`ease-in` / `cubic-bezier(0.4, 0.0, 1, 1)`):** Starts slow, accelerates. Used when objects close, hide, or blur away (getting them out of the viewport quickly).
- **Interaction (`ease-in-out` / `cubic-bezier(0.4, 0.0, 0.2, 1)`):** Smooth symmetrically. Reserved for physical toggles (Switches) where the object stays on screen but changes state.

---

## 3. Interactive States

- **Hover Behavior:** Objects do not "jump" on the Y-axis. Instead, we simulate the glass catching more ambient light by increasing the fill opacity (e.g., `bg-white/5` increments to `bg-white/10`) and slightly increasing the border brightness.
- **Focus Behavior:** Instant, snappy transition (`150ms`) to inject a glowing neon ring. Bypasses physical movement entirely, prioritizing the glowing effect.
- **Active / Pressed States:** A strict physical scale down (`transform: scale(0.97)`) applied under `100ms` to simulate pressure. Releasing the click returns the element to `scale(1)` over `150ms`.

---

## 4. Structural Animations

- **Modal Animations (Z-50):**
  - *Enter:* Scales up from `0.95`, fades in opacity from `0` to `1` over `200ms ease-out`.
  - *Backdrop:* The surrounding black overlay transitions its `backdrop-filter: blur()` smoothly from `0px` to `8px`.
- **Drawer Animations (Z-40):**
  - *Enter:* Slides in from `transform: translateX(100%)` to `translateX(0)` using a springy deceleration (`300ms cubic-bezier(0.16, 1, 0.3, 1)`).
- **Page Transitions:**
  - *Enter:* Full pages or dashboard widgets do not slide. The primary layout uses a highly subtle fade-in combined with a microscopic upward lift (`translateY(10px)` to `0`) over `300ms`.

---

## 5. Microinteractions

- **Toggles/Switches:** The handle exclusively uses horizontal transformation (`translateX`), while its track strictly cross-fades between deep gray (void) and Neon color.
- **Checkboxes:** The inner checkmark SVG is drawn dynamically using `stroke-dashoffset` over `200ms`, feeling as if it is being mathematically sketched.
- **Skeleton Shimmers:** Uses a linear keyframe animation translating the CSS `background-position` endlessly and smoothly, ensuring no harsh looping restarts.

---

## 6. Allowed vs. Forbidden

### What is Allowed 👍
- Fading properties (`opacity`, `box-shadow`, `background-color`).
- Hardware accelerated positioning (`transform: translate`, `scale`).
- Filter manipulation (`backdrop-filter: blur`, `brightness`).

### What is STRICTLY Forbidden (Anti-patterns) 🚫
- **Bouncing / Jelly physics:** This is a premium SaaS dashboard, not a mobile game. Avoid elastic bounce effects.
- **Animating Layout Attributes:** NEVER animate DOM-affecting properties such as `height`, `width`, `margin`, `padding`, `top`, `left`. This forces the browser to recalculate the entire page layout on every frame, destroying 60fps performance. Always map movement to `transform`.
- **Continuous Attention Loops (Idle state):** Buttons or badges pulsating constantly while the user is idle. Motion must be triggered by an event, or relegated to Loading states only.

---

## 7. Performance & Accessibility Considerations

- **Hardware Acceleration:** All movement must happen on the compositor thread. Elements prone to sliding/scaling should receive `transform: translateZ(0)` or `will-change: transform` if jank occurs on lower-end machines.
- **Cost of Blur:** Easing the `backdrop-filter` property is incredibly GPU-intensive, especially on large panes of glass. Ensure that dynamic transitions of blur are restricted to smaller components (like Modals) and never applied to massive screen-wide entities doing active motion.
- **Prefers Reduced Motion:** The entire system must wrap transitions inside an `@media (prefers-reduced-motion: reduce)` media query rule.
  - **Acceptance Rule:** If a user has disabled motion in their OS, all CSS `transition-duration` properties must instantly truncate to `0.01ms` (or `none`), relying exclusively on state/color changes to communicate action.
