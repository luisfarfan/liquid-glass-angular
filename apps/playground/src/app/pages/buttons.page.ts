import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-buttons-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Button System</h1>
      <p class="text-body-sm text-[var(--lg-t-text-muted)] mt-1">Una colección de controles interactivos con estética premium de vidrio y efectos neón.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Base Variants -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--lg-t-text-muted)]">Base Variants</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Brand</p>
            <div class="flex flex-wrap gap-3">
              <button lg-button variant="primary">Primary</button>
              <button lg-button variant="secondary">Secondary</button>
              <button lg-button variant="ghost">Ghost</button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Semantic</p>
            <div class="flex flex-wrap gap-3">
              <button lg-button variant="success">Success</button>
              <button lg-button variant="warning">Warning</button>
              <button lg-button variant="info">Information</button>
              <button lg-button variant="destructive">Destructive</button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Structural</p>
            <div class="flex flex-wrap gap-3">
              <button lg-button variant="outlined">Outlined</button>
              <button lg-button variant="text">Plain Text</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Shapes & Architecture -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--lg-t-text-muted)]">Shapes & Width</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Shapes</p>
            <div class="flex flex-wrap gap-3">
              <button lg-button variant="primary">Default</button>
              <button lg-button variant="primary" shape="pill">Pill Shape</button>
              <button lg-button variant="secondary" shape="square">Square</button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Full Width</p>
            <div class="space-y-2">
              <button lg-button variant="primary" [fullWidth]="true">Block Button</button>
              <button lg-button variant="outlined" [fullWidth]="true" shape="pill">Outlined Pill Block</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes & States -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--lg-t-text-muted)]">Sizes & Icons</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <button lg-button variant="secondary" size="sm">Small</button>
              <button lg-button variant="secondary" size="md">Medium</button>
              <button lg-button variant="secondary" size="lg">Large</button>
            </div>
            <div class="flex items-center gap-4">
              <button lg-button variant="primary" size="sm" [iconOnly]="true"><i class="ri-add-line"></i></button>
              <button lg-button variant="primary" size="md" [iconOnly]="true"><i class="ri-add-line"></i></button>
              <button lg-button variant="primary" size="lg" [iconOnly]="true"><i class="ri-add-line"></i></button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Icons with Text</p>
            <div class="flex flex-wrap gap-3">
              <button lg-button variant="info"><i lg-icon-left class="ri-information-line"></i> Info</button>
              <button lg-button variant="success">Save <i lg-icon-right class="ri-check-line"></i></button>
              <button lg-button variant="ghost" shape="pill">Settings <i lg-icon-right class="ri-settings-4-line"></i></button>
            </div>
          </div>
        </div>
      </section>

      <!-- Status & Feedback -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--lg-t-text-muted)]">Status & Feedback</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Loading & Disabled</p>
            <div class="flex flex-wrap gap-3">
              <button lg-button variant="primary" [isLoading]="true">Primary</button>
              <button lg-button variant="success" [isLoading]="true">Success</button>
              <button lg-button variant="secondary" [disabled]="true">Disabled</button>
              <button lg-button variant="outlined" [disabled]="true">Outlined</button>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p class="text-xs text-[var(--lg-t-text-muted)]">
              <i class="ri-feedback-line mr-1"></i>
              Todos los botones incluyen retroalimentación háptica (en dispositivos compatibles) y efectos de brillo dinámico al pasar el cursor.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ButtonsPage {}
