import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService, GlassCardComponent } from '@liquid-glass-ui/angular';

@Component({
  imports: [RouterModule, GlassCardComponent],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-500">
      
      <lg-glass-card class="max-w-md w-full">
        <div class="flex flex-col gap-6">
          <header>
            <h1 class="text-h1 font-display font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Liquid Glass
            </h1>
            <p class="text-body-md text-zinc-400 mt-2">
              Angular 21 + Signals + Tailwind v4
            </p>
          </header>

          <section class="space-y-4">
            <p class="text-body-sm leading-relaxed">
              Esta es una prueba de concepto del sistema de diseño. 
              El componente <strong>GlassCard</strong> utiliza variables CSS dinámicas y desenfoque nativo.
            </p>
            
            <div class="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50">
              <code class="text-xs text-primary">--lg-font-h1: clamp(...)</code>
            </div>
          </section>

          <footer class="flex items-center justify-between pt-4 border-t border-glass-border">
            <span class="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              Tema: {{ themeService.currentTheme() }}
            </span>
            
            <button 
              (click)="themeService.toggleTheme()"
              class="px-5 py-2 rounded-full bg-primary text-black font-bold text-sm 
                     hover:bg-primary-hover transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              Cambiar Tema
            </button>
          </footer>
        </div>
      </lg-glass-card>

      <div class="mt-12 grid grid-cols-2 gap-4 max-w-2xl w-full">
         <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border">
            <h3 class="text-h3 font-display mb-2">Responsivo</h3>
            <p class="text-body-sm">Tipografía fluida que escala con el viewport.</p>
         </div>
         <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border">
            <h3 class="text-h3 font-display mb-2">Premium</h3>
            <p class="text-body-sm">Efectos de cristal y sombras neón integradas.</p>
         </div>
      </div>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  public themeService = inject(ThemeService);
}
