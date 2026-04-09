import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService, GlassCardComponent, ButtonComponent, InputComponent, FormFieldComponent, ToggleComponent, CheckboxComponent } from '@liquid-glass-ui/angular';
import { RadioGroupComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/radio/radio-group.component';
import { RadioButtonComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/radio/radio-button.component';
import { SelectComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/select/select.component';
import { SelectOptionComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/select/select-option.component';
import { TextareaComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/textarea/textarea.component';

@Component({
  imports: [RouterModule, GlassCardComponent, ButtonComponent, InputComponent, FormFieldComponent, ToggleComponent, CheckboxComponent, RadioGroupComponent, RadioButtonComponent, SelectComponent, SelectOptionComponent, TextareaComponent],
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

          <!-- SECCIÓN SELECCIÓN -->
          <section class="space-y-6">
            <div class="flex items-center gap-2 mb-4">
              <i class="ri-toggle-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-sm font-bold uppercase tracking-widest opacity-60">Selection & Interaction</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Toggle Switch (Stretch Physics)</p>
                  <div class="flex flex-col gap-4">
                    <lg-toggle [checked]="true">Notificaciones Push</lg-toggle>
                    <lg-toggle [checked]="false">Modo Avión</lg-toggle>
                    <lg-toggle [checked]="false" size="sm">Ahorro de batería (Small)</lg-toggle>
                    <lg-toggle [disabled]="true">Opción bloqueada (Disabled)</lg-toggle>
                  </div>
               </div>
               <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Glass Checkbox (Laser Draw)</p>
                  <div class="flex flex-col gap-4">
                    <lg-checkbox [checked]="true">Acepto los términos premium</lg-checkbox>
                    <lg-checkbox [checked]="false">Suscribirse al newsletter</lg-checkbox>
                    <lg-checkbox [indeterminate]="true">Selección parcial (Indeterminate)</lg-checkbox>
                    <lg-checkbox [disabled]="true">Solo lectura (Disabled)</lg-checkbox>
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

                <lg-form-field [cols]="1" hint="Selección Premium (CDK Overlay)">
                  <lg-select label="País de Residencia" placeholder="Selecciona tu país">
                    <lg-option value="es" label="España"></lg-option>
                    <lg-option value="mx" label="México"></lg-option>
                    <lg-option value="us" label="Estados Unidos"></lg-option>
                    <lg-option value="ar" label="Argentina"></lg-option>
                  </lg-select>
                </lg-form-field>

                <lg-form-field [cols]="1" hint="Modo Multi-Select (Crystals)">
                  <lg-select label="Habilidades Técnicas" [multiple]="true" placeholder="Elige tus skills">
                    <lg-option value="angular" label="Angular 21"></lg-option>
                    <lg-option value="nx" label="Nx Monorepo"></lg-option>
                    <lg-option value="tailwind" label="Tailwind v4"></lg-option>
                    <lg-option value="signals" label="Signals"></lg-option>
                  </lg-select>
                </lg-form-field>

                <lg-form-field [cols]="1" hint="Buscable con Iconos">
                  <lg-select label="Tipo de Cuenta" [searchable]="true" placeholder="Busca un plan...">
                    <lg-option value="starter" label="Starter Plan">
                      <i lg-icon-left class="ri-seedling-line"></i>
                    </lg-option>
                    <lg-option value="pro" label="Professional">
                      <i lg-icon-left class="ri-rocket-line"></i>
                    </lg-option>
                    <lg-option value="enterprise" label="Enterprise">
                      <i lg-icon-left class="ri-building-line"></i>
                    </lg-option>
                  </lg-select>
                </lg-form-field>

                <!-- Textarea Showcase -->
                <div class="pt-6 border-t border-glass-border/30 mt-6">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-4">Multi-line Glass Etching (Autosize)</p>
                  <lg-form-field [cols]="1">
                    <lg-textarea 
                      label="Comentarios del Proyecto" 
                      placeholder="Describe los requerimientos detallados..."
                      [maxChars]="200"
                      [autosize]="true">
                    </lg-textarea>
                  </lg-form-field>
                  
                  <lg-form-field [cols]="1" class="mt-4">
                    <lg-textarea 
                      label="Mensaje de Error (Prueba)" 
                      placeholder="Campo con error para validar UI..."
                      error="Este es un mensaje de error táctil neón."
                      [maxChars]="100">
                    </lg-textarea>
                  </lg-form-field>
                </div>
              </div>
            </lg-glass-card>
          </section>

          <!-- SECCIÓN ACCESIBILIDAD Y ESTADOS -->
          <section class="space-y-6">
            <div class="flex items-center gap-2 mb-4">
              <i class="ri-shield-user-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-sm font-bold uppercase tracking-widest opacity-60">Production Hardening (A11y & States)</h3>
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
              Nota: Usa la tecla TAB para verificar que los elementos deshabilitados son ignorados y los activos tienen anillos de enfoque.
            </p>
            <!-- Selection: Radio Systems -->
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
               <span class="p-1 rounded bg-primary/20 text-primary">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
               </span>
               <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Selection: Radio Systems (Neon Ignition)</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
               <!-- Standard Group -->
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
