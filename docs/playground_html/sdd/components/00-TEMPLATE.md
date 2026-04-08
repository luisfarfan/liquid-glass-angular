---
title: Component Specification Template
description: Standardized Spec-Driven Development (SDD) template for all Liquid Glass components.
---

# `[Component Name]`

## Overview
- **Purpose:** What does this component do?
- **UX Intent:** How should the user feel and interact with it?
- **Visual Intent:** How does it manifest the "Liquid Glass" aesthetic?

## Guidelines
- **When to use:** Ideal use cases.
- **When NOT to use:** Wrong use cases and alternatives.

## Structure
- **Anatomy (structure):** DOM nodes / slot breakdown.
- **Required parts:** Elements that cannot be omitted.
- **Optional parts:** Elements that can be toggled via props.

## Properties
- **Variants:** Primary, Secondary, Ghost, Destructive, etc.
- **Sizes:** Small, Medium, Large.
- **States:** Default, Hover, Focus/Focus-Visible, Active/Pressed, Disabled, Error, Loading.

## Behavior
- **Interaction behavior:** Clicks, drags, hover reveals.
- **Accessibility requirements:** ARIA roles, keyboard nav, screen readers.
- **Responsive behavior:** How it adapts to mobile/tablet breakpoints.
- **Theming behavior:** Reaction strictly to Dark Mode (default).

## Technical Implementation
- **Dependencies (tokens/foundations):** Specific `docs/sdd/02-foundations.md` or `03-visual-language.md` tokens used.
- **Edge cases:** Truncation, massively long text, internationalization.
- **Anti-patterns:** How NOT to implement this in code.
- **Acceptance criteria:** Checklist for the AI QA / developer.
