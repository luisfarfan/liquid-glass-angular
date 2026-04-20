import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngButton } from 'glassng';

@Component({
  selector: 'pg-buttons-page',
  standalone: true,
  imports: [CommonModule, GngButton],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Button System</h1>
      <p class="text-body-sm text-[var(--gng-t-text-muted)] mt-1">Una colección de controles interactivos con estética premium de vidrio y efectos neón.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Base Variants -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--gng-t-text-muted)]">Base Variants</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Brand</p>
            <div class="flex flex-wrap gap-3">
              <button gng-button variant="primary">Primary</button>
              <button gng-button variant="secondary">Secondary</button>
              <button gng-button variant="ghost">Ghost</button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Semantic</p>
            <div class="flex flex-wrap gap-3">
              <button gng-button variant="success">Success</button>
              <button gng-button variant="warning">Warning</button>
              <button gng-button variant="info">Information</button>
              <button gng-button variant="destructive">Destructive</button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Structural</p>
            <div class="flex flex-wrap gap-3">
              <button gng-button variant="outlined">Outlined</button>
              <button gng-button variant="text">Plain Text</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Shapes & Architecture -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--gng-t-text-muted)]">Shapes & Width</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Shapes</p>
            <div class="flex flex-wrap gap-3">
              <button gng-button variant="primary">Default</button>
              <button gng-button variant="primary" shape="pill">Pill Shape</button>
              <button gng-button variant="secondary" shape="square">Square</button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Full Width</p>
            <div class="space-y-2">
              <button gng-button variant="primary" [fullWidth]="true">Block Button</button>
              <button gng-button variant="outlined" [fullWidth]="true" shape="pill">Outlined Pill Block</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes & States -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--gng-t-text-muted)]">Sizes & Icons</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <button gng-button variant="secondary" size="sm">Small</button>
              <button gng-button variant="secondary" size="md">Medium</button>
              <button gng-button variant="secondary" size="lg">Large</button>
            </div>
            <div class="flex items-center gap-4">
              <button gng-button variant="primary" size="sm" [iconOnly]="true"><i class="ri-add-line"></i></button>
              <button gng-button variant="primary" size="md" [iconOnly]="true"><i class="ri-add-line"></i></button>
              <button gng-button variant="primary" size="lg" [iconOnly]="true"><i class="ri-add-line"></i></button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Icons with Text</p>
            <div class="flex flex-wrap gap-3">
              <button gng-button variant="info"><i gng-icon-left class="ri-information-line"></i> Info</button>
              <button gng-button variant="success">Save <i gng-icon-right class="ri-check-line"></i></button>
              <button gng-button variant="ghost" shape="pill">Settings <i gng-icon-right class="ri-settings-4-line"></i></button>
            </div>
          </div>
        </div>
      </section>

      <!-- Status & Feedback -->
      <section class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--gng-t-text-muted)]">Status & Feedback</h3>
        <div class="p-6 rounded-3xl bg-glass border border-glass-border space-y-6">
          <div class="space-y-3">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Loading & Disabled</p>
            <div class="flex flex-wrap gap-3">
              <button gng-button variant="primary" [isLoading]="true">Primary</button>
              <button gng-button variant="success" [isLoading]="true">Success</button>
              <button gng-button variant="secondary" [disabled]="true">Disabled</button>
              <button gng-button variant="outlined" [disabled]="true">Outlined</button>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p class="text-xs text-[var(--gng-t-text-muted)]">
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
