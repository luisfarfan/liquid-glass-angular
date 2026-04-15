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
      <h1 class="text-h1 font-display font-bold">Buttons</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Variantes, estados y feedback.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="ri-mouse-line text-[var(--lg-t-primary)]"></i>
        <h3 class="text-sm font-bold uppercase tracking-widest opacity-60">Interactive Controls</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-4 rounded-2xl bg-glass border border-glass-border space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Base Variants</p>
          <div class="flex flex-wrap gap-2">
            <button lg-button variant="primary" size="sm">Primary</button>
            <button lg-button variant="secondary" size="sm">Secondary</button>
            <button lg-button variant="ghost" size="sm">Ghost</button>
          </div>
        </div>
        <div class="p-4 rounded-2xl bg-glass border border-glass-border space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Feedback States</p>
          <div class="flex flex-wrap gap-2">
            <button lg-button variant="primary" [isLoading]="true" size="sm"></button>
            <button lg-button variant="destructive" size="sm" [iconOnly]="true">
              <i class="ri-delete-bin-line"></i>
            </button>
            <button lg-button variant="secondary" size="sm">
              Next <i lg-icon-right class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ButtonsPage {}
