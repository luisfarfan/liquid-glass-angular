import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassCardComponent, AvatarComponent, ButtonComponent } from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-avatar-page',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, AvatarComponent, ButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Avatar</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Imagen, iniciales, skeleton y estado (spec 24).</p>
    </header>

    <section class="space-y-8 max-w-4xl">
      <lg-glass-card class="!p-6 border-none shadow-none space-y-6">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Tamaños</p>
        <div class="flex flex-wrap items-end gap-6">
          <lg-avatar name="S M" size="sm" />
          <lg-avatar name="Medio" size="md" />
          <lg-avatar name="Large" size="lg" />
          <lg-avatar name="Extra" size="xl" />
        </div>
      </lg-glass-card>

      <lg-glass-card class="!p-6 border-none shadow-none space-y-6">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Imagen e iniciales</p>
        <div class="flex flex-wrap items-center gap-6">
          <lg-avatar
            [src]="'https://i.pravatar.cc/128?img=12'"
            name="María García"
            size="lg"
            [status]="'online'"
          />
          <lg-avatar name="Alex Rivera" size="lg" [status]="'busy'" />
          <lg-avatar name="Equipo" size="lg" [status]="'offline'" />
        </div>
      </lg-glass-card>

      <lg-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Carga (skeleton)</p>
        <div class="flex items-center gap-6">
          <lg-avatar name="Cargando demo" size="xl" [isLoading]="loading()" />
          <button lg-button variant="secondary" size="sm" type="button" (click)="loading.set(!loading())">
            Toggle loading
          </button>
        </div>
      </lg-glass-card>
    </section>
  `,
})
export class AvatarPage {
  readonly loading = signal(true);
}
