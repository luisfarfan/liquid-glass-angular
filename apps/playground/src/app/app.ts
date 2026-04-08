import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService, GlassCardComponent, ButtonComponent } from '@liquid-glass-ui/angular';

@Component({
  imports: [RouterModule, GlassCardComponent, ButtonComponent],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen p-8 transition-colors duration-500 overflow-y-auto">
      
      <lg-glass-card class="max-w-md w-full mb-8">
        <div class="flex flex-col gap-6">
          <header>
            <h1 class="text-h1 font-display font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Liquid Glass
            </h1>
            <p class="text-body-md text-zinc-400 mt-2">
              Component Catalog: 01. Button
            </p>
          </header>

          <section class="space-y-6">
            <div class="space-y-3">
               <p class="text-[10px] font-bold tracking-widest uppercase opacity-40">Variantes</p>
               <div class="flex flex-wrap gap-3">
                 <button lg-button variant="primary">Primary Neon</button>
                 <button lg-button variant="secondary">Secondary</button>
                 <button lg-button variant="ghost">Ghost</button>
                 <button lg-button variant="destructive">Destructive</button>
               </div>
            </div>

            <div class="space-y-3">
               <p class="text-[10px] font-bold tracking-widest uppercase opacity-40">Tamaños</p>
               <div class="flex items-center gap-4">
                 <button lg-button variant="primary" size="sm">Small</button>
                 <button lg-button variant="primary" size="md">Medium</button>
                 <button lg-button variant="primary" size="lg">Large Scale</button>
               </div>
            </div>

            <div class="space-y-3">
               <p class="text-[10px] font-bold tracking-widest uppercase opacity-40">Estados Interactivos</p>
               <div class="flex flex-wrap gap-3">
                 <button lg-button variant="primary" [disabled]="true">Disabled</button>
                 <button lg-button variant="primary" [isLoading]="true">Loading</button>
                 <button lg-button variant="destructive" [isLoading]="true">Deleting...</button>
               </div>
            </div>

            <div class="space-y-3">
               <p class="text-[10px] font-bold tracking-widest uppercase opacity-40">Iconos & Reflejos</p>
               <div class="flex flex-wrap gap-3">
                 <button lg-button variant="primary">
                   <i lg-icon-left class="ri-rocket-2-line"></i>
                   Lanzar
                 </button>
                 <button lg-button variant="secondary">
                   Siguiente
                   <i lg-icon-right class="ri-arrow-right-line"></i>
                 </button>
                 <button lg-button variant="ghost" [isIconOnly]="true">
                   <i class="ri-settings-4-line text-xl"></i>
                 </button>
                 <button lg-button variant="destructive" [isIconOnly]="true" size="sm">
                   <i class="ri-delete-bin-line"></i>
                 </button>
               </div>
            </div>
          </section>

          <footer class="flex items-center justify-between pt-6 border-t border-glass-border">
            <span class="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              Tema: {{ themeService.currentTheme() }}
            </span>
            
            <div class="flex gap-3">
              <button (click)="themeService.setTheme('dark')" 
                      class="w-8 h-8 rounded-full border border-zinc-700 bg-[#09090b] shadow-xl hover:scale-110 active:scale-95 transition-all" 
                      title="Dark Mode"></button>
              <button (click)="themeService.setTheme('light')" 
                      class="w-8 h-8 rounded-full border border-zinc-300 bg-[#f8fafc] shadow-xl hover:scale-110 active:scale-95 transition-all" 
                      title="Light Mode"></button>
              <button (click)="themeService.setTheme('cyberpunk')" 
                      class="w-8 h-8 rounded-full border border-fuchsia-500/50 bg-[#020617] shadow-[0_0_10px_rgba(232,121,249,0.3)] hover:scale-110 active:scale-95 transition-all" 
                      title="Cyberpunk"></button>
              <button (click)="themeService.setTheme('emerald')" 
                      class="w-8 h-8 rounded-full border border-emerald-500/50 bg-[#064e3b] shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:scale-110 active:scale-95 transition-all" 
                      title="Emerald"></button>
            </div>
          </footer>
        </div>
      </lg-glass-card>

      <div class="mt-12 lg-bento-grid max-w-4xl w-full">
         <div class="lg:col-span-8 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in">
            <h3 class="text-h3 font-display mb-2">Bento Grid Architecture</h3>
            <p class="text-body-sm leading-relaxed text-zinc-400">
               Utilizamos un sistema de compartimentos basado en un grid de 12 columnas. 
               Este layout es responsivo y se adapta automáticamente de móvil a escritorio.
            </p>
         </div>
         <div class="lg:col-span-4 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in" style="animation-delay: 100ms">
            <h3 class="text-h3 font-display mb-2">Safe Area</h3>
            <p class="text-body-sm text-zinc-400">Contenedores inteligentes que respetan el Notch.</p>
         </div>
         <div class="lg:col-span-4 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in" style="animation-delay: 200ms">
            <h3 class="text-h3 font-display mb-2">Z-Index Stack</h3>
            <p class="text-body-sm text-zinc-400">7 capas estandarizadas para evitar colisiones visuales.</p>
         </div>
         <div class="lg:col-span-8 p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border lg-animate-fade-in" style="animation-delay: 300ms">
            <h3 class="text-h3 font-display mb-2">Premium Polish</h3>
            <p class="text-body-sm text-zinc-400">Scrollbars de cristal y selección de texto neon integradas en el core.</p>
         </div>
      </div>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  public themeService = inject(ThemeService);
}
