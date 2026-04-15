import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GlassCardComponent,
  InputComponent,
  FormFieldComponent,
  SelectComponent,
  SelectOptionComponent,
  TextareaComponent,
} from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    GlassCardComponent,
    InputComponent,
    FormFieldComponent,
    SelectComponent,
    SelectOptionComponent,
    TextareaComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Forms</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Entrada de datos y composición.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 mb-4">
        <i class="ri-survey-line text-[var(--lg-t-primary)]"></i>
        <h3 class="text-sm font-bold uppercase tracking-widest opacity-60">Data Entry &amp; Composition</h3>
      </div>

      <lg-glass-card class="!p-6 border-none shadow-none">
        <div class="space-y-2">
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
            <lg-input label="Repetir" type="password" placeholder="••••••••"></lg-input>
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

          <div class="pt-6 border-t border-glass-border/30 mt-6">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-4">Multi-line Glass Etching (Autosize)</p>
            <lg-form-field [cols]="1">
              <lg-textarea
                label="Comentarios del Proyecto"
                placeholder="Describe los requerimientos detallados..."
                [maxChars]="200"
                [autosize]="true"
              ></lg-textarea>
            </lg-form-field>

            <lg-form-field [cols]="1" class="mt-4">
              <lg-textarea
                label="Mensaje de Error (Prueba)"
                placeholder="Campo con error para validar UI..."
                error="Este es un mensaje de error táctil neón."
                [maxChars]="100"
              ></lg-textarea>
            </lg-form-field>
          </div>
        </div>
      </lg-glass-card>
    </section>
  `,
})
export class FormsPage {}
