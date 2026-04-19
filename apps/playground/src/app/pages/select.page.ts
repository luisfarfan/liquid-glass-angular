import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  SelectComponent, 
  SelectOptionComponent, 
  SelectGroupComponent,
  SelectTriggerDirective,
  SelectHeaderDirective,
  SelectFooterDirective,
  GlassCardComponent, 
  FormFieldComponent,
  ButtonComponent
} from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-select-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    SelectComponent, 
    SelectOptionComponent, 
    SelectGroupComponent,
    SelectTriggerDirective,
    SelectHeaderDirective,
    SelectFooterDirective,
    GlassCardComponent, 
    FormFieldComponent,
    ButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Select &amp; Tag Input</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Sistemas de selección múltiple con estética de cristales líquidos.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Multi-Select / Tag Input -->
      <lg-glass-card class="!p-8">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
             <i class="ri-price-tag-3-line"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold">Multi-Select (Tag Input)</h3>
            <p class="text-xs opacity-50 uppercase tracking-tighter">Removable glass tags & keyboard support</p>
          </div>
        </div>

        <div class="space-y-6">
          <lg-form-field label="Tecnologías Favoritas" hint="Selecciona los lenguajes que dominas">
            <lg-select 
              placeholder="Elige tecnologías..." 
              [multiple]="true" 
              [searchable]="true"
              [(ngModel)]="selectedTechs"
            >
              <lg-option value="angular" icon="🅰️">Angular</lg-option>
              <lg-option value="react" icon="⚛️">React</lg-option>
              <lg-option value="vue" icon="🖖">Vue.js</lg-option>
              <lg-option value="typescript" icon="🟦">TypeScript</lg-option>
              <lg-option value="rust" icon="🦀">Rust</lg-option>
              <lg-option value="go" icon="🐹">Go</lg-option>
            </lg-select>
          </lg-form-field>

          <div class="p-4 rounded-xl bg-white/5 border border-white/10">
            <p class="text-[10px] opacity-40 uppercase mb-2">Valor actual (Signal):</p>
            <code class="text-xs text-primary">{{ selectedTechs() | json }}</code>
          </div>

          <div class="flex gap-2">
            <button lg-button size="sm" variant="outlined" (click)="selectedTechs.set(['angular', 'typescript'])">
              Set Defaults
            </button>
            <button lg-button size="sm" variant="ghost" (click)="selectedTechs.set([])">
              Clear All
            </button>
          </div>
        </div>
      </lg-glass-card>

      <!-- Single Select & States -->
      <lg-glass-card class="!p-8">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-lg bg-zinc-500/20 flex items-center justify-center">
             <i class="ri-list-check"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold">Standard Select</h3>
            <p class="text-xs opacity-50 uppercase tracking-tighter">Single selection & different states</p>
          </div>
        </div>

        <div class="space-y-6">
          <lg-form-field label="Plan de Suscripción">
            <lg-select placeholder="Selecciona un plan" [(ngModel)]="selectedPlan" [clearable]="true">
              <lg-option value="free" icon="🌱">Free - $0/mo</lg-option>
              <lg-option value="pro" icon="🚀">Pro - $29/mo</lg-option>
              <lg-option value="enterprise" icon="🏢">Enterprise - Custom</lg-option>
              <lg-option value="disabled" [disabled]="true" icon="🔒">Legacy Plan (Coming Soon)</lg-option>
            </lg-select>
          </lg-form-field>

          <lg-form-field label="Selector Deshabilitado">
            <lg-select [disabled]="true" placeholder="No puedes editar esto"></lg-select>
          </lg-form-field>

          <lg-form-field label="Estado de Carga">
            <lg-select [loading]="true" placeholder="Cargando datos..."></lg-select>
          </lg-form-field>
        </div>
      </lg-glass-card>

      <!-- Advanced Extensions -->
      <lg-glass-card class="!p-8 lg:col-span-2">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
             <i class="ri-rocket-2-line"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold">Advanced Extensions</h3>
            <p class="text-xs opacity-50 uppercase tracking-tighter">Grouping, custom branding & loading states</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Grouping -->
          <lg-form-field label="Cargos por Departamento" hint="Ejemplo de OptGroup">
            <lg-select placeholder="Seleccionar cargo..." [(ngModel)]="selectedRole">
              <lg-option-group label="Desarrollo">
                <lg-option value="frontend">Frontend Engineer</lg-option>
                <lg-option value="backend">Backend Developer</lg-option>
                <lg-option value="fullstack">Fullstack Ninja</lg-option>
              </lg-option-group>
              <lg-option-group label="Diseño">
                <lg-option value="ui">UI Designer</lg-option>
                <lg-option value="ux">UX Researcher</lg-option>
              </lg-option-group>
            </lg-select>
          </lg-form-field>

          <!-- Custom Trigger -->
          <lg-form-field label="Custom Template (User Selector)">
            <lg-select [(ngModel)]="selectedUser">
              <ng-template lgSelectTrigger>
                <div class="flex items-center gap-2">
                  <div class="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold">
                    {{ selectedUser()?.charAt(0)?.toUpperCase() }}
                  </div>
                  <span class="font-bold text-primary">{{ selectedUser() }}</span>
                  <span class="text-[10px] opacity-40">(Miembro Pro)</span>
                </div>
              </ng-template>

              <lg-option value="Lucho">Lucho</lg-option>
              <lg-option value="Admin">Admin</lg-option>
              <lg-option value="Guest">Guest</lg-option>
            </lg-select>
          </lg-form-field>
        </div>
      </lg-glass-card>

      <!-- Pro Select (Headers, Footers, Events) -->
      <lg-glass-card class="!p-8 lg:col-span-2">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
             <i class="ri-settings-4-line"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold">Pro Select: Full Extensibility</h3>
            <p class="text-xs opacity-50 uppercase tracking-tighter">Demostración de Headers, Footers y Eventos Enterprise.</p>
          </div>
        </div>
        
        <lg-select 
          placeholder="Selecciona una tarea..."
          [searchable]="true"
          (opened)="log('Panel Abierto')"
          (closed)="log('Panel Cerrado')"
          (selectionChange)="log('Selección cambiada:', $event)"
        >
          <!-- Custom Header -->
          <ng-template lgSelectHeader>
            <div class="flex items-center justify-between px-2 py-1">
              <span class="text-xs font-bold uppercase text-primary">Acciones Rápidas</span>
              <button class="text-xs hover:underline" (click)="log('Acción: Crear Nuevo')">+ Crear Nuevo</button>
            </div>
          </ng-template>

          <lg-option-group label="Desarrollo">
            <lg-option [value]="1">Refactor de UI</lg-option>
            <lg-option [value]="2">Optimización de Core</lg-option>
          </lg-option-group>

          <lg-option-group label="Diseño">
            <lg-option [value]="3">Sistema de Diseño v2</lg-option>
            <lg-option [value]="4">Prototipado Liquid Glass</lg-option>
          </lg-option-group>

          <!-- Custom Footer -->
          <ng-template lgSelectFooter>
            <div class="text-[10px] text-center text-zinc-500 py-1 border-t border-white/5 mt-1">
              Última actualización: hace 5 minutos
            </div>
          </ng-template>
        </lg-select>
      </lg-glass-card>
    </div>
  `,
})
export class SelectPage {
  readonly selectedTechs = signal<string[]>(['angular']);
  readonly selectedPlan = signal<string>('pro');
  readonly selectedRole = signal<string | null>(null);
  readonly selectedUser = signal<string>('Lucho');

  log(msg: string, data?: any) {
    console.log(`[Select] ${msg}`, data || '');
  }
}
