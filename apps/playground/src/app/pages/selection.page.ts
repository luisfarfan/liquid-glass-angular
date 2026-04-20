import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngToggle, GngCheckbox } from 'glassng';

@Component({
  selector: 'pg-selection-page',
  standalone: true,
  imports: [CommonModule, GngToggle, GngCheckbox],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Toggle &amp; Checkbox</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Selección e interacción.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="ri-toggle-line text-[var(--gng-t-primary)]"></i>
        <h3 class="text-sm font-bold uppercase tracking-widest opacity-60">Selection &amp; Interaction</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Toggle Switch (Stretch Physics)</p>
          <div class="flex flex-col gap-4">
            <gng-toggle [checked]="true">Notificaciones Push</gng-toggle>
            <gng-toggle [checked]="false">Modo Avión</gng-toggle>
            <gng-toggle [checked]="false" size="sm">Ahorro de batería (Small)</gng-toggle>
            <gng-toggle [disabled]="true">Opción bloqueada (Disabled)</gng-toggle>
          </div>
        </div>
        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Glass Checkbox (Laser Draw)</p>
          <div class="flex flex-col gap-4">
            <gng-checkbox [checked]="true">Acepto los términos premium</gng-checkbox>
            <gng-checkbox [checked]="false">Suscribirse al newsletter</gng-checkbox>
            <gng-checkbox [indeterminate]="true">Selección parcial (Indeterminate)</gng-checkbox>
            <gng-checkbox [disabled]="true">Solo lectura (Disabled)</gng-checkbox>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SelectionPage {}
