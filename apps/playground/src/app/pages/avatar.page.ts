import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngGlassCard, GngAvatar, GngButton } from 'glassng';

@Component({
  selector: 'pg-avatar-page',
  standalone: true,
  imports: [CommonModule, GngGlassCard, GngAvatar, GngButton],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Avatar</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Imagen, iniciales, skeleton y estado (spec 24).</p>
    </header>

    <section class="space-y-8 max-w-4xl">
      <gng-glass-card class="!p-6 border-none shadow-none space-y-6">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Tamaños</p>
        <div class="flex flex-wrap items-end gap-6">
          <gng-avatar name="S M" size="sm" />
          <gng-avatar name="Medio" size="md" />
          <gng-avatar name="Large" size="lg" />
          <gng-avatar name="Extra" size="xl" />
        </div>
      </gng-glass-card>

      <gng-glass-card class="!p-6 border-none shadow-none space-y-6">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Imagen e iniciales</p>
        <div class="flex flex-wrap items-center gap-6">
          <gng-avatar
            [src]="'https://i.pravatar.cc/128?img=12'"
            name="María García"
            size="lg"
            [status]="'online'"
          />
          <gng-avatar name="Alex Rivera" size="lg" [status]="'busy'" />
          <gng-avatar name="Equipo" size="lg" [status]="'offline'" />
        </div>
      </gng-glass-card>

      <gng-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Carga (skeleton)</p>
        <div class="flex items-center gap-6">
          <gng-avatar name="Cargando demo" size="xl" [isLoading]="loading()" />
          <button gng-button variant="secondary" size="sm" type="button" (click)="loading.set(!loading())">
            Toggle loading
          </button>
        </div>
      </gng-glass-card>
    </section>
  `,
})
export class AvatarPage {
  readonly loading = signal(true);
}
