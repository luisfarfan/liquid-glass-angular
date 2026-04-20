import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngGlassCard, GngScrollDirective } from 'glassng';

@Component({
  selector: 'pg-scrollbar-page',
  standalone: true,
  imports: [CommonModule, GngGlassCard, GngScrollDirective],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Scrollbar</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Utilidad <code class="text-primary">gng-glass-scroll</code> y directiva <code class="text-primary">gngScroll</code> (spec 21).</p>
    </header>

    <section class="space-y-8 max-w-3xl">
      <gng-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Clase CSS</p>
        <p class="text-body-sm text-zinc-400">
          Contenedor con altura fija; el thumb usa tokens de tema. En <code class="text-zinc-300">pointer: coarse</code> se delega al scrollbar del sistema.
        </p>
        <div class="gng-glass-scroll max-h-48 rounded-lg border border-glass-border bg-glass/40 p-3 space-y-2">
          @for (i of lines; track i) {
            <p class="text-sm text-zinc-300">Línea {{ i }} — desplázate para ver el scrollbar estilizado.</p>
          }
        </div>
      </gng-glass-card>

      <gng-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Directiva</p>
        <p class="text-body-sm text-zinc-400">Misma apariencia aplicando <code class="text-zinc-300">gngScroll</code> en el host.</p>
        <div gngScroll class="max-h-40 rounded-lg border border-glass-border bg-glass/40 p-3 space-y-2">
          @for (i of shortLines; track i) {
            <p class="text-sm text-zinc-300">Bloque {{ i }}</p>
          }
        </div>
      </gng-glass-card>
    </section>
  `,
})
export class ScrollbarPage {
  readonly lines = Array.from({ length: 40 }, (_, i) => i + 1);
  readonly shortLines = Array.from({ length: 24 }, (_, i) => i + 1);
}
