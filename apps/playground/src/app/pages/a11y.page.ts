import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent, ToggleComponent, CheckboxComponent } from 'glassng';

@Component({
  selector: 'pg-a11y-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, ToggleComponent, CheckboxComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">A11y &amp; states</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Estados deshabilitados y enfoque.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="ri-shield-user-line text-[var(--lg-t-primary)]"></i>
        <h3 class="text-sm font-bold uppercase tracking-widest opacity-60">Production Hardening (A11y &amp; States)</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-glass border border-glass-border space-y-3">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">A11y Button</p>
          <button lg-button [disabled]="true" variant="primary" size="sm" class="w-full">Disabled State</button>
        </div>
        <div class="p-4 rounded-xl bg-glass border border-glass-border space-y-3">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">A11y Input</p>
          <lg-input [disabled]="true" placeholder="No Editable" size="sm"></lg-input>
        </div>
        <div class="p-4 rounded-xl bg-glass border border-glass-border space-y-3 flex flex-col justify-between">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">A11y Toggle (Before)</p>
          <lg-toggle [checked]="true" labelPosition="before">Status: Active</lg-toggle>
        </div>
        <div class="p-4 rounded-xl bg-glass border border-glass-border space-y-3 flex flex-col justify-between">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">A11y Checkbox (Before)</p>
          <lg-checkbox [checked]="true" labelPosition="before">I Agree</lg-checkbox>
        </div>
      </div>
      <p class="text-[10px] text-zinc-500 italic px-2">
        Nota: Usa la tecla TAB para verificar que los elementos deshabilitados son ignorados y los activos tienen anillos de
        enfoque.
      </p>
    </section>
  `,
})
export class A11yPage {}
