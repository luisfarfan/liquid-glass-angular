import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService, GlassCardComponent, ButtonComponent, InputComponent, FormFieldComponent } from '@liquid-glass-ui/angular';

@Component({
  imports: [RouterModule, GlassCardComponent, ButtonComponent, InputComponent, FormFieldComponent],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen p-8 transition-colors duration-500 overflow-y-auto">
      
      <lg-glass-card class="max-w-2xl w-full mb-8">
        <div class="flex flex-col gap-8">
          <header class="flex justify-between items-start">
            <div>
              <h1 class="text-h1 font-display font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Liquid Glass UI
              </h1>
              <p class="text-body-sm text-zinc-400 mt-1">
                Refinement Phase: Button & Input Composition
              </p>
            </div>
            <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-glass border border-glass-border">
              <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span class="text-[10px] font-bold uppercase tracking-tighter opacity-70">v0.1.0 Alpha</span>
            </div>
          </header>

          <!-- SECCIÓN BOTONES -->
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

          <!-- SECCIÓN FORMULARIOS REFINADA -->
          <section class="space-y-6">
            <div class="flex items-center gap-2 mb-4">
              <i class="ri-survey-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-sm font-bold uppercase tracking-widest opacity-60">Data Entry & Composition</h3>
            </div>

            <lg-glass-card class="!p-6 border-none shadow-none">
              <div class="space-y-2">
                
                <!-- Grupos de Campos -->
                <lg-form-field [cols]="2" hint="Información personal básica">
                  <lg-input label="Nombre" placeholder="Ej: John"></lg-input>
                  <lg-input label="Apellidos" placeholder="Ej: Doe"></lg-input>
                </lg-form-field>

                <lg-form-field [cols]="1">
                  <lg-input label="Correo Electrónico" type="email" placeholder="john@example.com">
                    <i lg-icon-left class="ri-mail-line"></i>
                  </lg-input>
                </lg-form-field>

                <lg-form-field [cols]="2" hint="Seguridad y Acceso">
                  <lg-input label="Contraseña" type="password" placeholder="••••••••">
                    <i lg-icon-left class="ri-lock-password-line"></i>
                  </lg-input>
                  <lg-input label="Repetir" type="password" placeholder="••••••••">
                  </lg-input>
                </lg-form-field>

                <lg-form-field [cols]="1" hint="Búsqueda sin etiquetas (Bare Input)">
                  <lg-input placeholder="Presiona / para buscar..." class="w-full">
                    <i lg-icon-left class="ri-search-line"></i>
                    <i lg-icon-right class="ri-command-line"></i>
                  </lg-input>
                </lg-form-field>

                <lg-form-field [cols]="1">
                   <lg-input label="Estado del Sistema" placeholder="Validando..." [error]="'Servidor ocupado. Intente de nuevo.'">
                     <i lg-icon-left class="ri-error-warning-line"></i>
                   </lg-input>
                </lg-form-field>

              </div>
            </lg-glass-card>
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
