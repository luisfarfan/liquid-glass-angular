import { Component, ViewEncapsulation, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { ThemeService, GlassCardComponent, ButtonComponent, InputComponent, FormFieldComponent, ToggleComponent, CheckboxComponent, GlassSkeletonComponent, TabsComponent, TabComponent } from '@liquid-glass-ui/angular';
import { ProgressBarComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/progress-bar/progress-bar.component';
import { LgTableDirective, LgHeaderCellDirective, LgCellDirective, LgHeaderRowDirective, LgRowDirective } from '../../../../libs/liquid-glass-ui/src/lib/components/data-table/table.directives';
import { GlassDataTableContainerComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/data-table/data-table.component';
import { RadioGroupComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/radio/radio-group.component';
import { RadioButtonComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/radio/radio-button.component';
import { SelectComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/select/select.component';
import { SelectOptionComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/select/select-option.component';
import { TextareaComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/textarea/textarea.component';
import { BadgeComponent } from '../../../../libs/liquid-glass-ui/src/lib/components/badge/badge.component';
import { LiquidModalService } from '../../../../libs/liquid-glass-ui/src/lib/components/modal/modal.service';
import { LiquidToastService } from '../../../../libs/liquid-glass-ui/src/lib/components/toast/toast.service';
import { DemoModalComponent } from './components/demo-modal.component';

interface UserData {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  email: string;
  lastActive: string;
}

@Component({
  imports: [
    CommonModule, RouterModule, CdkTableModule, GlassCardComponent, ButtonComponent, 
    InputComponent, FormFieldComponent, ToggleComponent, CheckboxComponent, 
    RadioGroupComponent, RadioButtonComponent, SelectComponent, SelectOptionComponent, 
    TextareaComponent, BadgeComponent, GlassSkeletonComponent,
    LgTableDirective, LgHeaderCellDirective, LgCellDirective, 
    LgHeaderRowDirective, LgRowDirective, GlassDataTableContainerComponent,
    TabsComponent, TabComponent, ProgressBarComponent
  ],
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

          <!-- SECCIÓN PROGRESO (MOVIDA ARRIBA PARA VISIBILIDAD) -->
          <section class="space-y-6">
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
               <span class="p-1 rounded bg-primary/20 text-primary">
                  <i class="ri-loader-4-line animate-spin-slow"></i>
               </span>
               <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Status Feedback: Liquid Progress</h3>
            </div>

            <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border-2 border-primary/30 shadow-[0_0_20px_rgba(var(--lg-t-primary-rgb),0.2)] space-y-8">
               
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <!-- Case 1: Determinate -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
                      <span>1. Determinate (Standard)</span>
                      <span>{{ demoProgress() | number:'1.0-0' }}%</span>
                    </div>
                    <lg-progress-bar [value]="demoProgress()" color="primary" thickness="0.5rem"></lg-progress-bar>
                  </div>

                  <!-- Case 2: Indeterminate -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
                      <span>2. Indeterminate (Viscous Flow)</span>
                    </div>
                    <lg-progress-bar mode="indeterminate" color="accent" thickness="0.5rem"></lg-progress-bar>
                  </div>

                  <!-- Case 3: Buffer -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
                      <span>3. Buffer (Cloud Sync)</span>
                      <span>{{ demoProgress() | number:'1.0-0' }}% / {{ demoBuffer() | number:'1.0-0' }}%</span>
                    </div>
                    <lg-progress-bar mode="buffer" [value]="demoProgress()" [buffer]="demoBuffer()" color="primary" thickness="6px"></lg-progress-bar>
                  </div>

                  <!-- Case 4: Query -->
                  <div class="space-y-2">
                    <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
                      <span>4. Query (Pre-loading Inverted)</span>
                      <span class="text-primary animate-pulse">{{ demoQueryMode() === 'query' ? 'SCANNING...' : 'READY' }}</span>
                    </div>
                    <lg-progress-bar [mode]="demoQueryMode()" [value]="demoProgress()" color="warn" thickness="8px"></lg-progress-bar>
                    <p class="text-[9px] opacity-30">Transitioning to determinate automatically...</p>
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
            
            <!-- SECCIÓN ESTADOS E INDICADORES (Badge) -->
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
              <i class="ri-notification-badge-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Status & Indicators (Glass Badges)</h3>
            </div>

            <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-8">
              <div class="space-y-4">
                <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Glass Style (Subtle)</p>
                <div class="flex flex-wrap gap-3">
                  <lg-badge variant="success" [isPulsating]="true">Online</lg-badge>
                  <lg-badge variant="warning">Away</lg-badge>
                  <lg-badge variant="error">Offline</lg-badge>
                  <lg-badge variant="info">New Update</lg-badge>
                  <lg-badge variant="neutral">Beta</lg-badge>
                </div>
              </div>

              <div class="space-y-4">
                <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Solid Style (High Contrast)</p>
                <div class="flex flex-wrap gap-3">
                  <lg-badge style="solid" variant="success">Active</lg-badge>
                  <lg-badge style="solid" variant="warning">Pending</lg-badge>
                  <lg-badge style="solid" variant="error">Critical</lg-badge>
                  <lg-badge style="solid" variant="info">99+</lg-badge>
                  <lg-badge style="solid" variant="neutral">Draft</lg-badge>
                </div>
              </div>
            </div>

            <!-- SECCIÓN DIÁLOGOS (Modal System) -->
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
              <i class="ri-window-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Cinematic Dialogs & Animations</h3>
            </div>
            
            <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
               <!-- Animaciones Seleccionables -->
               <div class="space-y-4">
                 <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Select Animation Profile</p>
                 <div class="flex flex-wrap gap-3">
                    <button lg-button variant="primary" size="sm" (click)="openModal('cinema')">Cinema (Default)</button>
                    <button lg-button variant="secondary" size="sm" (click)="openModal('glass')">Glass Crystallize</button>
                    <button lg-button variant="ghost" size="sm" (click)="openModal('zoom')">Zoom Focus</button>
                    <button lg-button variant="ghost" size="sm" (click)="openModal('void')">Void Appear</button>
                    <button lg-button variant="ghost" size="sm" (click)="openModal('slide')">Minimal Slide</button>
                 </div>
               </div>

               <div class="p-4 rounded-xl bg-glass border border-glass-border/30 space-y-4">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Structural Composition</p>
                  <p class="text-xs opacity-60">Usa lg-modal-header, lg-modal-content y lg-modal-footer para una estructura impecable.</p>
                  <button lg-button variant="primary" size="sm" class="w-full" (click)="openModal('cinema', true)">
                     Abrir Workstation Config (Stacked)
                  </button>
               </div>
               
               <p class="text-[10px] text-zinc-500 italic px-2">
                 Nota: En móviles, todas las animaciones se transforman en una hoja inferior (Bottom-Sheet) ergonómica.
               </p>
            </div>

            <!-- SECCIÓN NOTIFICACIONES (Toast System) -->
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
              <i class="ri-notification-3-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Global Notifications (Glass Toast)</h3>
            </div>
            
            <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
               <div class="space-y-4">
                 <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Semantic Variants (Neon Progress)</p>
                 <div class="flex flex-wrap gap-3">
                    <button lg-button variant="primary" size="sm" (click)="showToast('success')">Show Success</button>
                    <button lg-button variant="destructive" size="sm" (click)="showToast('error')">Show Error</button>
                    <button lg-button variant="secondary" size="sm" (click)="showToast('info')">Show Info</button>
                    <button lg-button variant="ghost" size="sm" (click)="showToast('custom')">Custom (Long Duration)</button>
                 </div>
               </div>
               
               <div class="pt-4 border-t border-glass-border/30 space-y-4 text-center sm:text-left">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest text-left">Positioning System</p>
                  <div class="grid grid-cols-3 gap-2 w-full max-w-[280px] mx-auto sm:mx-0">
                     <button lg-button variant="ghost" size="sm" (click)="showToast('pos', {v: 'top', h: 'left'})" title="Top Left"><i class="ri-arrow-left-up-line"></i></button>
                     <button lg-button variant="secondary" size="sm" (click)="showToast('pos', {v: 'top', h: 'center'})" title="Top Center"><i class="ri-arrow-up-line"></i></button>
                     <button lg-button variant="ghost" size="sm" (click)="showToast('pos', {v: 'top', h: 'right'})" title="Top Right"><i class="ri-arrow-right-up-line"></i></button>
                     
                     <div class="col-span-3 h-4"></div>
                     
                     <button lg-button variant="ghost" size="sm" (click)="showToast('pos', {v: 'bottom', h: 'left'})" title="Bottom Left"><i class="ri-arrow-left-down-line"></i></button>
                     <button lg-button variant="secondary" size="sm" (click)="showToast('pos', {v: 'bottom', h: 'center'})" title="Bottom Center"><i class="ri-arrow-down-line"></i></button>
                     <button lg-button variant="ghost" size="sm" (click)="showToast('pos', {v: 'bottom', h: 'right'})" title="Bottom Right"><i class="ri-arrow-right-down-line"></i></button>
                  </div>
               </div>

               <p class="text-[10px] text-zinc-500 italic px-2">
                 Nota: Pasa el cursor sobre un toast para pausar su tiempo de vida. Los toasts se apilan automáticamente.
               </p>
            </div>

            <!-- SECCIÓN CARGA (Skeleton Loader) -->
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
              <i class="ri-loader-4-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Loading States (Glass Skeleton)</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-4">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Single Atom Types</p>
                  <div class="space-y-4">
                    <div class="flex items-center gap-4">
                      <lg-skeleton type="circle" width="48px" height="48px"></lg-skeleton>
                      <div class="flex-1 space-y-2">
                        <lg-skeleton type="rect" width="60%" height="12px"></lg-skeleton>
                        <lg-skeleton type="rect" width="40%" height="8px"></lg-skeleton>
                      </div>
                    </div>
                    <lg-skeleton type="text" width="100%"></lg-skeleton>
                    <lg-skeleton type="text" width="90%"></lg-skeleton>
                    <lg-skeleton type="text" width="70%"></lg-skeleton>
                  </div>
               </div>

               <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-4">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Card Composition Example</p>
                  <div class="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <lg-skeleton type="rect" width="100%" height="120px"></lg-skeleton>
                    <div class="space-y-2">
                      <lg-skeleton type="rect" width="80%" height="16px"></lg-skeleton>
                      <lg-skeleton type="rect" width="40%" height="10px"></lg-skeleton>
                    </div>
                    <div class="flex justify-between items-center pt-2">
                      <lg-skeleton type="rect" width="60px" height="24px"></lg-skeleton>
                      <lg-skeleton type="circle" width="32px" height="32px"></lg-skeleton>
                    </div>
                  </div>
               </div>
            </div>
          </section>
          
          <!-- SECCIÓN NAVEGACIÓN (Tabs System) -->
          <section class="space-y-6">
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
              <i class="ri-menu-5-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Navigation & Layout (Glass Tabs)</h3>
            </div>

            <div class="grid grid-cols-1 gap-8">
              <!-- Underline Variant -->
              <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
                <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Variant: Underline (Neon Blade)</p>
                <lg-tabs variant="underline">
                  <lg-tab label="Overview" icon="ri-dashboard-line">
                    <div class="py-4 space-y-4">
                      <h4 class="text-lg font-bold">System Overview</h4>
                      <p class="text-sm text-zinc-400">Esta es la vista general del sistema. El indicador de neón se desplaza con inercia elástica.</p>
                      <div class="grid grid-cols-3 gap-2">
                        <div class="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                        <div class="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                        <div class="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                      </div>
                    </div>
                  </lg-tab>
                  <lg-tab label="Security" icon="ri-shield-flash-line">
                    <div class="py-4">
                      <h4 class="text-lg font-bold">Security Protocols</h4>
                      <p class="text-sm text-zinc-400">Configuración de cortafuegos y cifrado de hardware.</p>
                      <button lg-button variant="primary" size="sm" class="mt-4">Reiniciar Firewall</button>
                    </div>
                  </lg-tab>
                  <lg-tab label="Hardware" [disabled]="true" icon="ri-cpu-line">
                    <div class="py-4 text-center">Hardware Stats (Locked)</div>
                  </lg-tab>
                  <lg-tab label="Advanced Settings">
                     <div class="py-4">
                       <lg-form-field label="Developer Mode">
                         <lg-toggle [checked]="true"></lg-toggle>
                       </lg-form-field>
                     </div>
                  </lg-tab>
                </lg-tabs>
              </div>

              <!-- Pill Variant -->
              <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
                <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Variant: Pill (Glass Capsules)</p>
                <div class="flex justify-center">
                  <lg-tabs variant="pill">
                    <lg-tab label="Monthly">
                      <div class="text-center py-6">
                        <p class="text-3xl font-display font-bold">$12.99<span class="text-sm opacity-50">/mo</span></p>
                      </div>
                    </lg-tab>
                    <lg-tab label="Yearly">
                      <div class="text-center py-6">
                        <p class="text-3xl font-display font-bold">$119.99<span class="text-sm opacity-50">/yr</span></p>
                        <lg-badge variant="success" size="sm" class="mt-2">Save 25%</lg-badge>
                      </div>
                    </lg-tab>
                    <lg-tab label="Lifetime">
                      <div class="text-center py-6">
                        <p class="text-3xl font-display font-bold">$499<span class="text-sm opacity-50">/once</span></p>
                      </div>
                    </lg-tab>
                  </lg-tabs>
                </div>
              </div>
            </div>

            <!-- Escenarios Avanzados (Inspired by Material & Beyond) -->
            <div class="grid grid-cols-1 gap-12 mt-8">
              
              <!-- Case 1: Centered & Custom Headers -->
              <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
                <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 1: Centered & Custom Templates</p>
                <lg-tabs variant="underline" align="center">
                  <lg-tab>
                    <ng-template #headerTemplate>
                      <div class="flex items-center gap-2">
                        <span>Messages</span>
                        <lg-badge variant="error" size="sm">3</lg-badge>
                      </div>
                    </ng-template>
                    <div class="py-12 text-center opacity-40">Inbox is empty</div>
                  </lg-tab>
                  <lg-tab label="Analytics" icon="ri-bar-chart-fill"></lg-tab>
                  <lg-tab label="Team">
                    <ng-template #headerTemplate>
                      <div class="flex -space-x-2">
                        <div class="w-6 h-6 rounded-full border border-black bg-primary"></div>
                        <div class="w-6 h-6 rounded-full border border-black bg-emerald-500"></div>
                      </div>
                      <span class="ml-2">Collaborators</span>
                    </ng-template>
                  </lg-tab>
                </lg-tabs>
              </div>

              <!-- Case 2: Stretched Tabs -->
              <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
                <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 2: Full Width (Stretched)</p>
                <lg-tabs variant="underline" [stretch]="true">
                  <lg-tab label="Profile" icon="ri-user-smile-line"></lg-tab>
                  <lg-tab label="Settings" icon="ri-settings-4-line"></lg-tab>
                  <lg-tab label="Billing" icon="ri-bank-card-line"></lg-tab>
                </lg-tabs>
                <div class="h-32 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-xs opacity-20">
                  Full Width Content Area
                </div>
              </div>

              <!-- Case 3: End Aligned Pills -->
              <div class="col-span-full p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-4">
                <div class="flex justify-between items-center mb-2">
                   <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 3: Right Aligned Controls</p>
                   <lg-tabs variant="pill" align="end">
                      <lg-tab label="View List" icon="ri-list-check"></lg-tab>
                      <lg-tab label="View Grid" icon="ri-grid-fill"></lg-tab>
                      <lg-tab label="View Timeline" icon="ri-history-line"></lg-tab>
                   </lg-tabs>
                </div>
                <div class="grid grid-cols-4 gap-4">
                   @for (i of [1,2,3,4]; track i) {
                     <div class="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                   }
                </div>
              </div>
            </div>
          </section>

          <!-- SECCIÓN DATOS (Data Table Organism - Advanced Refinement) -->
          <section class="space-y-6">
            <div class="flex items-center gap-2 px-2 mt-8 mb-4">
              <i class="ri-table-line text-[var(--lg-t-primary)]"></i>
              <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Data Visuals (Glass Data Table)</h3>
            </div>
            
            <div class="space-y-12 mb-12">
               <!-- Filtro Global (Demo Sorting/Filtering) -->
               <div class="p-4 rounded-xl bg-glass border border-glass-border">
                 <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
                   <div class="w-full sm:w-72">
                     <lg-input 
                       placeholder="Filter by name or role..." 
                       (input)="searchQuery.set($any($event.target).value)">
                       <i lg-icon-left class="ri-search-line"></i>
                     </lg-input>
                   </div>
                   <div class="flex gap-2">
                     <lg-badge variant="info" size="sm">Results: {{filteredUsers().length}}</lg-badge>
                     <lg-badge variant="neutral" size="sm">Selected: {{selection.selected.length}}</lg-badge>
                   </div>
                 </div>
               </div>

               <!-- Ejemplo 1: Selección y Ordenamiento -->
               <div class="space-y-4">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">Example 1: Refined Glass Headers & Reactive Sorting</p>
                  <lg-data-table-container>
                    <table lg-table cdk-table [dataSource]="filteredUsers()">
                      <!-- Checkbox Column -->
                      <ng-container cdkColumnDef="select">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef class="w-12">
                          <lg-checkbox (changed)="masterToggle()" [checked]="selection.hasValue() && isAllSelected()" [indeterminate]="selection.hasValue() && !isAllSelected()"></lg-checkbox>
                        </th>
                        <td lg-cell cdk-cell *cdkCellDef="let row">
                          <lg-checkbox (click)="$event.stopPropagation()" (changed)="selection.toggle(row)" [checked]="selection.isSelected(row)"></lg-checkbox>
                        </td>
                      </ng-container>

                      <ng-container cdkColumnDef="id">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>ID</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row" class="font-mono text-[10px] opacity-50">{{row.id}}</td>
                      </ng-container>

                      <ng-container cdkColumnDef="name">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef class="is-sortable" (click)="toggleSort('name')">
                          Member <i class="ml-1 opacity-40" [class.ri-arrow-up-s-line]="sortColumn() === 'name' && sortDirection() === 'asc'" [class.ri-arrow-down-s-line]="sortColumn() === 'name' && sortDirection() === 'desc'" [class.ri-sort-asc-desc]="sortColumn() !== 'name'"></i>
                        </th>
                        <td lg-cell cdk-cell *cdkCellDef="let row">
                          <div class="lg-cell-avatar">
                            <div class="lg-avatar-circle">{{row.name.charAt(0)}}</div>
                            <div>
                              <span class="lg-cell-primary">{{row.name}}</span>
                              <span class="lg-cell-secondary">{{row.email}}</span>
                            </div>
                          </div>
                        </td>
                      </ng-container>

                      <ng-container cdkColumnDef="role">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef class="is-sortable" (click)="toggleSort('role')">Role</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row" class="opacity-70">{{row.role}}</td>
                      </ng-container>

                      <ng-container cdkColumnDef="status">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Status</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row">
                          <lg-badge [variant]="row.status === 'online' ? 'success' : row.status === 'away' ? 'warning' : 'error'" size="sm">
                            {{row.status}}
                          </lg-badge>
                        </td>
                      </ng-container>

                      <ng-container cdkColumnDef="email">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Email</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row" class="text-xs opacity-40">{{row.email}}</td>
                      </ng-container>

                      <ng-container cdkColumnDef="actions">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef></th>
                        <td lg-cell cdk-cell *cdkCellDef="let row" class="text-right">
                          <button lg-button variant="ghost" size="sm" [iconOnly]="true"><i class="ri-more-2-line"></i></button>
                        </td>
                      </ng-container>

                      <tr lg-header-row cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
                      <tr lg-row cdk-row *cdkRowDef="let row; columns: displayedColumns;" [isSelected]="selection.isSelected(row)" (click)="selection.toggle(row)"></tr>
                    </table>
                  </lg-data-table-container>
               </div>

               <!-- Ejemplo 2: Alta Densidad y Sticky Columns -->
               <div class="space-y-4">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">Example 2: High Density & Side-Pinning (Liquid Pinned)</p>
                  <lg-data-table-container>
                    <table lg-table cdk-table [dataSource]="users()" class="min-w-[1200px]">
                      <ng-container cdkColumnDef="id" sticky="true">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>ID</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row" class="font-bold text-primary">{{row.id}}</td>
                      </ng-container>

                      <ng-container cdkColumnDef="name">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Full Name</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row">{{row.name}}</td>
                      </ng-container>

                      <ng-container cdkColumnDef="role"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Role</th><td lg-cell cdk-cell *cdkCellDef="let row">{{row.role}}</td></ng-container>
                      <ng-container cdkColumnDef="status"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Status</th><td lg-cell cdk-cell *cdkCellDef="let row">{{row.status}}</td></ng-container>
                      <ng-container cdkColumnDef="email"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Email</th><td lg-cell cdk-cell *cdkCellDef="let row">{{row.email}}</td></ng-container>
                      <ng-container cdkColumnDef="lastActive"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Last Active</th><td lg-cell cdk-cell *cdkCellDef="let row">{{row.lastActive}}</td></ng-container>
                      
                      <ng-container cdkColumnDef="col1"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric A</th><td lg-cell cdk-cell *cdkCellDef="let row">1,240</td></ng-container>
                      <ng-container cdkColumnDef="col2"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric B</th><td lg-cell cdk-cell *cdkCellDef="let row">84%</td></ng-container>
                      <ng-container cdkColumnDef="col3"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric C</th><td lg-cell cdk-cell *cdkCellDef="let row">Active</td></ng-container>
                      <ng-container cdkColumnDef="col4"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric D</th><td lg-cell cdk-cell *cdkCellDef="let row">Global</td></ng-container>
                      <ng-container cdkColumnDef="col5"><th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric E</th><td lg-cell cdk-cell *cdkCellDef="let row">Premium</td></ng-container>

                      <ng-container cdkColumnDef="actions" stickyEnd="true">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Operations</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row" class="text-right">
                          <button lg-button variant="primary" size="sm">Manage</button>
                        </td>
                      </ng-container>

                      <tr lg-header-row cdk-header-row *cdkHeaderRowDef="denseColumns"></tr>
                      <tr lg-row cdk-row *cdkRowDef="let row; columns: denseColumns;"></tr>
                    </table>
                  </lg-data-table-container>
               </div>

               <!-- Ejemplo 3: Skeleton Loader en Tabla -->
               <div class="space-y-4">
                  <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">Example 3: Skeleton UI (Loading State Integration)</p>
                  <lg-data-table-container>
                    <table lg-table cdk-table [dataSource]="[1,2,3]">
                      <ng-container cdkColumnDef="id">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Identifier</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="rect" width="60px"></lg-skeleton></td>
                      </ng-container>
                      <ng-container cdkColumnDef="name">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Member</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="rect" width="140px"></lg-skeleton></td>
                      </ng-container>
                      <ng-container cdkColumnDef="status">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Status</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="circle" width="24px" height="24px"></lg-skeleton></td>
                      </ng-container>
                      <ng-container cdkColumnDef="email">
                        <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Contact Info</th>
                        <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="text" width="180px"></lg-skeleton></td>
                      </ng-container>

                      <tr lg-header-row cdk-header-row *cdkHeaderRowDef="['id', 'name', 'status', 'email']"></tr>
                      <tr lg-row cdk-row *cdkRowDef="let row; columns: ['id', 'name', 'status', 'email'];" [isLoading]="true"></tr>
                    </table>
                  </lg-data-table-container>
               </div>
            </div>

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
  private modalService = inject(LiquidModalService);
  private toastService = inject(LiquidToastService);

  // PROGRESS SIMULATION
  public demoProgress = signal(0);
  public demoBuffer = signal(0);
  public demoQueryMode = signal<'query' | 'determinate'>('query');

  constructor() {
    // Simular carga progresiva constante
    setInterval(() => {
      this.demoProgress.update(v => v < 100 ? v + 0.3 : 0);
      this.demoBuffer.update(v => v < 100 ? v + 0.5 : 0);
    }, 50);

    // Simular transición de Query a Determinado cada 8 segundos
    setInterval(() => {
      this.demoQueryMode.set('query');
      setTimeout(() => this.demoQueryMode.set('determinate'), 3000);
    }, 8000);
  }

  // DATA TABLE MOCK DATA
  public users = signal<UserData[]>([
    { id: 'USR-001', name: 'Alexander Wright', role: 'System Architect', status: 'online', email: 'alex.w@liquid.io', lastActive: '2 mins ago' },
    { id: 'USR-002', name: 'Elena Rodriguez', role: 'UI/UX Lead', status: 'away', email: 'elena.r@liquid.io', lastActive: '15 mins ago' },
    { id: 'USR-003', name: 'Marcus Chen', role: 'Backend Developer', status: 'offline', email: 'm.chen@liquid.io', lastActive: '3 hours ago' },
    { id: 'USR-004', name: 'Sarah Jenkins', role: 'Product Manager', status: 'online', email: 's.jenkins@liquid.io', lastActive: 'Just now' },
    { id: 'USR-005', name: 'David Miller', role: 'DevOps Engineer', status: 'online', email: 'd.miller@liquid.io', lastActive: '5 mins ago' },
  ]);

  // Advanced Table Logic (Signals)
  public searchQuery = signal('');
  public sortColumn = signal<keyof UserData | null>(null);
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public filteredUsers = computed(() => {
    let result = this.users().filter(u => 
      u.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      u.role.toLowerCase().includes(this.searchQuery().toLowerCase())
    );

    const col = this.sortColumn();
    if (col) {
      result = [...result].sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        const dir = this.sortDirection() === 'asc' ? 1 : -1;
        return valA > valB ? dir : -dir;
      });
    }
    return result;
  });

  public selection = new SelectionModel<UserData>(true, []);
  public displayedColumns = ['select', 'id', 'name', 'role', 'status', 'email', 'actions'];
  public denseColumns = ['id', 'name', 'role', 'status', 'email', 'lastActive', 'col1', 'col2', 'col3', 'col4', 'col5', 'actions'];

  toggleSort(col: keyof UserData) {
    if (this.sortColumn() === col) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col);
      this.sortDirection.set('asc');
    }
  }

  /** Data Table Selection Helpers */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredUsers().length;
    return numSelected === numRows && numRows > 0;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.filteredUsers().forEach(row => this.selection.select(row));
    }
    // No necesitamos disparar CD manualmente porque el template leerá el signal de selección indirectamente o re-evaluará
    // Pero como SelectionModel no es signal, a veces ayuda re-evaluar un signal dummy o simplemente el toggle() ya dispara CD si se hace desde un evento
  }

  openModal(animation: string = 'cinema', enableParallax: boolean = true) {
    this.modalService.open(DemoModalComponent, {
      elevation: 2,
      enableParallax,
      animation: animation as any,
      data: { title: `Animación: ${animation.toUpperCase()}` }
    });
  }

  showToast(type: string, posOptions?: any) {
    if (type === 'pos') {
      this.toastService.info(
        `Posición: ${posOptions.v} - ${posOptions.h}`, 
        'Demo de Posicionamiento', 
        { 
          verticalPosition: posOptions.v, 
          horizontalPosition: posOptions.h 
        }
      );
      return;
    }

    switch(type) {
      case 'success':
        this.toastService.success('El sistema ha sido actualizado correctamente.', 'Operación Exitosa');
        break;
      case 'error':
        this.toastService.error('Hubo un problema de conexión. Intente de nuevo más tarde.', 'Error Crítico');
        break;
      case 'info':
        this.toastService.info('Tienes 3 mensajes nuevos sin leer en tu bandeja de entrada.');
        break;
      case 'custom':
        this.toastService.show({
          title: 'Conexión Establecida',
          message: 'Este mensaje durará más tiempo y muestra el diseño personalizado del toast.',
          type: 'success',
          duration: 8000
        });
        break;
    }
  }
}
