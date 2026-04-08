---
title: Textarea Specification
description: Implementation ready SDD for multiline inputs.
---

# Textarea

## Overview
- **Purpose:** Multi-line text data collection.
- **UX Intent:** A deep, etched well on the glass surface.
- **Visual Intent:** Similar to Input, but necessitates custom scrollbar styling to prevent breaking the glass aesthetic.

## Guidelines
- **When to use:** Long-form text entry, descriptions, comments.
- **When NOT to use:** Single-line data (emails, names).

## Structure
- **Anatomy:**
  - `Textarea wrapper`
  - `HTML Textarea`
  - `Resizer handle`
- **Required parts:** `<textarea>`, `<label>`.

## Properties
- **Variants:** Standard (etched).
- **Sizes:** Governed by `rows` property.
- **States:** Default, Focus (Neon ring), Error.

## Behavior
- **Interaction behavior:** Can be resized vertically only (`resize-y`). Scrollbar fades in when content overflows.
- **Accessibility requirements:** Associate with label using `id` and `for`.

## Technical Implementation
- **Dependencies:** Base `Input` tokens, Neon focus ring, Scrollbar styling variables.
- **Edge cases:** Huge blocks of text slowing down composition.
- **Anti-patterns:** Exposing default OS scrollbars which break the dark-mode glass look.
- **Acceptance criteria:**
  - [ ] Webkit scrollbars are styled as translucent, rounded "glass" thumbs.
  - [ ] Focus triggers the identical Neon glow as single text Inputs.


## Angular API (v21)
- **Selector:** `<liquid-textarea>`
- **Standalone:** `true`
- **Integración:** `ControlValueAccessor` igual que `Input`.
- **Integración CDK:** Recomendado utilizar `@angular/cdk/text-field` (`cdkTextareaAutosize`) para ajustar su altura automáticamente al texto del usuario sin scrollbars molestas.
