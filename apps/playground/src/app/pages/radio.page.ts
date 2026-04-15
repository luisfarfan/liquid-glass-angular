import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent, RadioButtonComponent } from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-radio-page',
  standalone: true,
  imports: [CommonModule, RadioGroupComponent, RadioButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Radio</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Grupos de opción única.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <span class="p-1 rounded bg-primary/20 text-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Selection: Radio Systems (Neon Ignition)</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="p-6 rounded-2xl bg-glass border border-glass-border space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Standard Mode</p>
          <lg-radio-group [value]="'opt1'">
            <div class="flex flex-col gap-3">
              <lg-radio-button value="opt1">Option One (Primary)</lg-radio-button>
              <lg-radio-button value="opt2" color="#f43f5e">Option Two (Rose)</lg-radio-button>
              <lg-radio-button value="opt3" color="#10b981" labelPosition="before">Option Three (Emerald)</lg-radio-button>
              <lg-radio-button value="opt4" [disabled]="true">Option Four (Disabled)</lg-radio-button>
            </div>
          </lg-radio-group>
        </div>
      </div>
    </section>
  `,
})
export class RadioPage {}
