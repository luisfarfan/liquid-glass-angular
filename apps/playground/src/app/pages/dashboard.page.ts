import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassCardComponent, ThemeService } from 'glassng';

@Component({
  selector: 'pg-dashboard-page',
  standalone: true,
  imports: [CommonModule, GlassCardComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <lg-glass-card class="max-w-2xl w-full mb-8">
      <div class="flex flex-col gap-8">
        <header class="flex justify-between items-start">
          <div>
            <h1 class="text-h1 font-display font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Liquid Glass UI
            </h1>
            <p class="text-body-sm text-zinc-400 mt-1">
              Playground: cada componente vive en su propia ruta; usa el menú lateral para navegar.
            </p>
          </div>
          <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-glass border border-glass-border">
            <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span class="text-[10px] font-bold uppercase tracking-tighter opacity-70">v0.1.0 Alpha</span>
          </div>
        </header>

        <footer class="flex items-center justify-between pt-6 border-t border-glass-border">
          <span class="text-xs uppercase tracking-widest text-zinc-500 font-medium">
            Tema: {{ themeService.currentTheme() }}
          </span>
          <div class="flex gap-3">
            <button
              type="button"
              (click)="themeService.setTheme('dark')"
              class="w-8 h-8 rounded-full border border-zinc-700 bg-[#09090b] shadow-xl hover:scale-110 active:scale-95 transition-all"
              title="Dark Mode"
            ></button>
            <button
              type="button"
              (click)="themeService.setTheme('light')"
              class="w-8 h-8 rounded-full border border-zinc-300 bg-[#f8fafc] shadow-xl hover:scale-110 active:scale-95 transition-all"
              title="Light Mode"
            ></button>
            <button
              type="button"
              (click)="themeService.setTheme('cyberpunk')"
              class="w-8 h-8 rounded-full border border-fuchsia-500/50 bg-[#020617] shadow-[0_0_10px_rgba(232,121,249,0.3)] hover:scale-110 active:scale-95 transition-all"
              title="Cyberpunk"
            ></button>
            <button
              type="button"
              (click)="themeService.setTheme('emerald')"
              class="w-8 h-8 rounded-full border border-emerald-500/50 bg-[#064e3b] shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:scale-110 active:scale-95 transition-all"
              title="Emerald"
            ></button>
          </div>
        </footer>
      </div>
    </lg-glass-card>

    <div class="mt-12 lg-bento-grid max-w-4xl w-full">
      <div class="lg:col-span-8 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in">
        <h3 class="text-h3 font-display mb-2">Bento Grid Architecture</h3>
        <p class="text-body-sm leading-relaxed text-zinc-400">
          Utilizamos un sistema de compartimentos basado en un grid de 12 columnas. Este layout es responsivo y se adapta
          automáticamente de móvil a escritorio.
        </p>
      </div>
      <div
        class="lg:col-span-4 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in"
        style="animation-delay: 100ms"
      >
        <h3 class="text-h3 font-display mb-2">Safe Area</h3>
        <p class="text-body-sm text-zinc-400">Contenedores inteligentes que respetan el Notch.</p>
      </div>
      <div
        class="lg:col-span-4 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in"
        style="animation-delay: 200ms"
      >
        <h3 class="text-h3 font-display mb-2">Z-Index Stack</h3>
        <p class="text-body-sm text-zinc-400">7 capas estandarizadas para evitar colisiones visuales.</p>
      </div>
      <div
        class="lg:col-span-8 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in"
        style="animation-delay: 300ms"
      >
        <h3 class="text-h3 font-display mb-2">Premium Polish</h3>
        <p class="text-body-sm text-zinc-400">Scrollbars de cristal y selección de texto neon integradas en el core.</p>
      </div>
    </div>
  `,
})
export class DashboardPage {
  readonly themeService = inject(ThemeService);
}
