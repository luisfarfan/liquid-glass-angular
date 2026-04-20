## 0.1.7 (2026-04-20)

### 🩹 Fixes

- **ci:** skip publish when no version bump, remove --first-release flag ([69f6085](https://github.com/luisfarfan/liquid-glass-angular/commit/69f6085))
- **ci:** inject README into dist after build instead of modifying source ([2ac9174](https://github.com/luisfarfan/liquid-glass-angular/commit/2ac9174))
- **e2e:** fix all playwright selector failures — 170/170 pass ([23e624c](https://github.com/luisfarfan/liquid-glass-angular/commit/23e624c))
- **glassng:** add description, keywords, and author to package.json ([62c1dd1](https://github.com/luisfarfan/liquid-glass-angular/commit/62c1dd1))

### ❤️ Thank You

- Claude Sonnet 4.6
- Lucho @luisfarfan

## 0.1.6 (2026-04-20)

### 🩹 Fixes

- **ci:** correct dist path in release workflow artifact verification ([5f23f06](https://github.com/luisfarfan/liquid-glass-angular/commit/5f23f06))
- **deps:** resolve npm ci peer dependency conflicts in CI ([285fb32](https://github.com/luisfarfan/liquid-glass-angular/commit/285fb32))
- **publish:** copy root README to library before npm publish ([1e1b25c](https://github.com/luisfarfan/liquid-glass-angular/commit/1e1b25c))

### ❤️ Thank You

- Claude Sonnet 4.6
- Lucho @luisfarfan

## 0.1.5 (2026-04-20)

### 🩹 Fixes

- **release:** add id-token:write permission for npm provenance ([a294fa4](https://github.com/luisfarfan/liquid-glass-angular/commit/a294fa4))
- **release:** add repository metadata for npm provenance validation ([201074d](https://github.com/luisfarfan/liquid-glass-angular/commit/201074d))

### ❤️ Thank You

- Luis Eduardo Farfan Melgar @luisfarfan

## 0.1.4 (2026-04-20)

### 🩹 Fixes

- **release:** force npm package manager for publishing and use explicit npm target ([27ed6cd](https://github.com/luisfarfan/liquid-glass-angular/commit/27ed6cd))

### ❤️ Thank You

- Luis Eduardo Farfan Melgar @luisfarfan

## 0.1.3 (2026-04-20)

### 🩹 Fixes

- **release:** add build dependency to publish target and CI diagnostic steps ([3e10785](https://github.com/luisfarfan/liquid-glass-angular/commit/3e10785))

### ❤️ Thank You

- Luis Eduardo Farfan Melgar @luisfarfan

## 0.1.2 (2026-04-20)

### 🩹 Fixes

- **release:** remove animations from peerDeps and finalize publish config with first-release ([f6205fb](https://github.com/luisfarfan/liquid-glass-angular/commit/f6205fb))

### ❤️ Thank You

- Luis Eduardo Farfan Melgar @luisfarfan

## 0.1.1 (2026-04-20)

### 🩹 Fixes

- **release:** refine manifest paths and tag pattern ([63d6df5](https://github.com/luisfarfan/liquid-glass-angular/commit/63d6df5))

### ❤️ Thank You

- Luis Eduardo Farfan Melgar @luisfarfan

## 0.1.0 (2026-04-20)

### 🚀 Features

- implement design system foundations (theming engine and typography) ([8d0ce12](https://github.com/luisfarfan/liquid-glass-angular/commit/8d0ce12))
- implement step 04 - motion system (easings and a11y) ([2d0bb45](https://github.com/luisfarfan/liquid-glass-angular/commit/2d0bb45))
- implement step 05 - layout architecture (z-index, bento grid and polish) ([5671862](https://github.com/luisfarfan/liquid-glass-angular/commit/5671862))
- implement step 06 - component standards (signals, host and di tokens) ([84d91ba](https://github.com/luisfarfan/liquid-glass-angular/commit/84d91ba))
- implement glass button (sdd-07) with glass ripple and haptics ([4c4493f](https://github.com/luisfarfan/liquid-glass-angular/commit/4c4493f))
- add disabled and loading states to glass button ([b235a9a](https://github.com/luisfarfan/liquid-glass-angular/commit/b235a9a))
- add glass shine effect and icon support to button ([27b90e3](https://github.com/luisfarfan/liquid-glass-angular/commit/27b90e3))
- make ripple effect conditional via enableRipple input ([861f84c](https://github.com/luisfarfan/liquid-glass-angular/commit/861f84c))
- implement semantic error tokens and cohesive error states for Input component ([b1139ff](https://github.com/luisfarfan/liquid-glass-angular/commit/b1139ff))
- remove html playground ([4140ab9](https://github.com/luisfarfan/liquid-glass-angular/commit/4140ab9))
- **avatar:** lg-avatar spec 24, skeleton loading, and playground demo ([c713908](https://github.com/luisfarfan/liquid-glass-angular/commit/c713908))
- **breadcrumbs:** lg-breadcrumbs, playground demo, and shell trail ([38b68fd](https://github.com/luisfarfan/liquid-glass-angular/commit/38b68fd))
- **button:** expand button system with semantic variants, shapes, and structural styles ([158cd5f](https://github.com/luisfarfan/liquid-glass-angular/commit/158cd5f))
- **components:** finalize timeline and add file-upload component ([b10153d](https://github.com/luisfarfan/liquid-glass-angular/commit/b10153d))
- **date-picker:** add UTC mode, i18n support, and UI refinements ([b0c32c5](https://github.com/luisfarfan/liquid-glass-angular/commit/b0c32c5))
- **date-picker:** improve accessibility and keyboard navigation ([fe34e62](https://github.com/luisfarfan/liquid-glass-angular/commit/fe34e62))
- **dropdown:** CDK menu glass wrappers spec 26 and playground demo ([d460d07](https://github.com/luisfarfan/liquid-glass-angular/commit/d460d07))
- **kpi-card:** implement premium variants and accessibility hardening ([44c3ece](https://github.com/luisfarfan/liquid-glass-angular/commit/44c3ece))
- **liquid-glass:** implement Cinematic Animation Suite for Modal with global config and A11y support ([f7f52a8](https://github.com/luisfarfan/liquid-glass-angular/commit/f7f52a8))
- **liquid-glass:** overhaul feedback system - implement LgAlert and real LgBadge wrapper, refactor status labels to LgTag ([4aef724](https://github.com/luisfarfan/liquid-glass-angular/commit/4aef724))
- **liquid-glass-ui:** implement cinematic toast positioning and glass skeleton loader ([2853a22](https://github.com/luisfarfan/liquid-glass-angular/commit/2853a22))
- **liquid-glass-ui:** shell layout, topbar, drawer, empty state, playground ([fe24f8e](https://github.com/luisfarfan/liquid-glass-angular/commit/fe24f8e))
- **playground:** split demos into lazy routes with sidebar navigation ([cd0ae4f](https://github.com/luisfarfan/liquid-glass-angular/commit/cd0ae4f))
- **playground:** wire lg-pagination into data table example ([b7a71df](https://github.com/luisfarfan/liquid-glass-angular/commit/b7a71df))
- **scrollbar:** spec 21 utility, directive, docs, and playground demo ([cc8af6e](https://github.com/luisfarfan/liquid-glass-angular/commit/cc8af6e))
- **search-input:** lg-search-input spec 25 and playground demo ([136b6b4](https://github.com/luisfarfan/liquid-glass-angular/commit/136b6b4))
- **select:** enterprise-grade multi-select with haptic mobile optimization, full A11y, and extensible templates ([da9475d](https://github.com/luisfarfan/liquid-glass-angular/commit/da9475d))
- **sidebar:** final refinements v3.2 - semantic anchors, cinematic animations and rem-unit conversion ([9ab9404](https://github.com/luisfarfan/liquid-glass-angular/commit/9ab9404))
- **sidebar:** modernization and stabilization of sidebar navigation ([406b892](https://github.com/luisfarfan/liquid-glass-angular/commit/406b892))
- **tabs:** refined glass tabs with advanced layouts and angular cdk integration ([324deeb](https://github.com/luisfarfan/liquid-glass-angular/commit/324deeb))
- **theme:** refactor hardcoded themes to configurable architecture and polish ripples ([f3b3873](https://github.com/luisfarfan/liquid-glass-angular/commit/f3b3873))
- **ui:** refine checkbox and input contrast, fix label visibility and interaction ([b82eadd](https://github.com/luisfarfan/liquid-glass-angular/commit/b82eadd))
- **ui:** production hardening with ARIA, keyboard support and focus rings for all components ([abf4933](https://github.com/luisfarfan/liquid-glass-angular/commit/abf4933))
- **ui:** add radio group and radio button components ([e850acc](https://github.com/luisfarfan/liquid-glass-angular/commit/e850acc))
- **ui:** add select component with ARIA, search and crystals support ([9abd2b3](https://github.com/luisfarfan/liquid-glass-angular/commit/9abd2b3))
- **ui:** add textarea component with autosize and neon counter ([60b73a5](https://github.com/luisfarfan/liquid-glass-angular/commit/60b73a5))
- **ui:** add glass badge component with a11y hardening and high contrast support ([07b5c11](https://github.com/luisfarfan/liquid-glass-angular/commit/07b5c11))
- **ui:** finalize liquid progress bar with 4 modes, cdk a11y & playground integration ([35d1bfe](https://github.com/luisfarfan/liquid-glass-angular/commit/35d1bfe))
- **ui:** finalize phase 3 - radio a11y, elastic textarea and project roadmap ([7e1319c](https://github.com/luisfarfan/liquid-glass-angular/commit/7e1319c))
- **ui:** finalize liquid toast premium refinements with semantic haptics and neon auras ([bc47a7d](https://github.com/luisfarfan/liquid-glass-angular/commit/bc47a7d))
- **ui:** implement glass tooltip directive and component with levitation physics ([523d0f7](https://github.com/luisfarfan/liquid-glass-angular/commit/523d0f7))
- **ui:** implement glass sidebar and sidebar item with liquid indicator ([455528f](https://github.com/luisfarfan/liquid-glass-angular/commit/455528f))
- **ui:** add lg-pagination (spec 19) and playground demo ([0898d24](https://github.com/luisfarfan/liquid-glass-angular/commit/0898d24))
- **ui:** add LgTableDataSource for Mat-style table + pagination ([b5bcd42](https://github.com/luisfarfan/liquid-glass-angular/commit/b5bcd42))
- **ui:** evolve DataTable with virtualization, server-side support, and cinematic effects ([348b846](https://github.com/luisfarfan/liquid-glass-angular/commit/348b846))
- **ui:** refine DatePicker with unified controls, performance optimizations, and mobile responsiveness ([09e3646](https://github.com/luisfarfan/liquid-glass-angular/commit/09e3646))

### 🩹 Fixes

- resolve NG8113 warning using hostDirectives for RippleDirective ([2cc0c49](https://github.com/luisfarfan/liquid-glass-angular/commit/2cc0c49))
- **release:** remove unknown --yes flag and add --first-release for initial rollout ([4f11a47](https://github.com/luisfarfan/liquid-glass-angular/commit/4f11a47))
- **release:** unify release flow into a single command to fix version handoff ([78c9fa6](https://github.com/luisfarfan/liquid-glass-angular/commit/78c9fa6))
- **sidebar:** align active indicator with nested nav items ([edc446f](https://github.com/luisfarfan/liquid-glass-angular/commit/edc446f))
- **sidebar:** indicator on collapsed rail and hide nested stack ([6a87163](https://github.com/luisfarfan/liquid-glass-angular/commit/6a87163))
- **sidebar:** stabilize selected indicator and auto-open active parent ([d92c403](https://github.com/luisfarfan/liquid-glass-angular/commit/d92c403))
- **ui:** checkbox stacking and toggle label visibility, add labelPosition support ([9fffa74](https://github.com/luisfarfan/liquid-glass-angular/commit/9fffa74))
- **ui:** disable button ripple on pagination controls ([aac5ce1](https://github.com/luisfarfan/liquid-glass-angular/commit/aac5ce1))
- **ui:** tune glass ripple for compact buttons instead of disabling it ([57d27be](https://github.com/luisfarfan/liquid-glass-angular/commit/57d27be))
- **ui:** turn off button ripple on lg-pagination only ([938ffaf](https://github.com/luisfarfan/liquid-glass-angular/commit/938ffaf))

### ❤️ Thank You

- Luis Eduardo Farfan Melgar @luisfarfan