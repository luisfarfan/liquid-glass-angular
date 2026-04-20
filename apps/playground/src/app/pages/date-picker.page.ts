import { Component, ViewEncapsulation, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder, FormControl } from '@angular/forms';
import {
  GlassCardComponent,
  DatePickerComponent,
  FormFieldComponent,
  FormLayoutComponent,
  ButtonComponent
} from 'glassng';

@Component({
  selector: 'pg-date-picker-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GlassCardComponent,
    DatePickerComponent,
    FormFieldComponent,
    FormLayoutComponent,
    ButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">DatePicker</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Selección de fechas con precisión cristalina y reactividad total.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Main Demo Area -->
      <div class="lg:col-span-8 space-y-8 min-w-0">
        
        <!-- Standard Example -->
        <lg-glass-card class="!p-8">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
               <i class="ri-calendar-event-line"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold">Standard Selection</h3>
              <p class="text-xs opacity-50 uppercase tracking-tighter">Template-driven integration</p>
            </div>
          </div>

          <lg-form-layout [cols]="2" gap="md">
            <lg-form-field label="Arrival Date" hint="Starting of the period">
              <lg-date-picker 
                [(ngModel)]="selectedDate" 
                placeholder="Choose arrival date"
              ></lg-date-picker>
            </lg-form-field>

            <div class="flex flex-col justify-end pb-1 text-sm overflow-hidden">
              <span class="opacity-50">Value selected:</span>
              <span class="font-mono text-primary truncate">{{ selectedDate() || 'None' }}</span>
            </div>
          </lg-form-layout>
        </lg-glass-card>

        <!-- Reactive Forms Example -->
        <lg-glass-card class="!p-8">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
               <i class="ri-code-s-slash-line"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold">Reactive Forms</h3>
              <p class="text-xs opacity-50 uppercase tracking-tighter">Advanced state management</p>
            </div>
          </div>

          <form [formGroup]="dateForm" class="space-y-4">
             <lg-form-layout [cols]="2" gap="md">
                <lg-form-field label="Event Date" [required]="true" [error]="dateForm.controls.eventDate.invalid ? 'Date is required' : null">
                  <lg-date-picker formControlName="eventDate" placeholder="Pick a date"></lg-date-picker>
                </lg-form-field>
                
                <div class="flex flex-col justify-end pb-1 gap-2">
                  <span class="text-xs opacity-40">Status: {{ dateForm.controls.eventDate.status }}</span>
                  <button lg-button size="sm" variant="outlined" (click)="dateForm.reset()">Reset Form</button>
                </div>
             </lg-form-layout>
          </form>
        </lg-glass-card>

        <!-- Variants Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <lg-glass-card class="!p-6">
            <h4 class="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Error State</h4>
            <lg-date-picker label="Expiration Date" error="This date is required" placeholder="Cannot be empty"></lg-date-picker>
          </lg-glass-card>

          <lg-glass-card class="!p-6">
            <h4 class="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Disabled State</h4>
            <lg-date-picker label="Locked Date" [disabled]="true" placeholder="Field is locked"></lg-date-picker>
          </lg-glass-card>
        </div>

        <!-- UTC vs Local Comparison -->
        <lg-glass-card class="!p-8 bg-indigo-500/5">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
               <i class="ri-globe-line"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold">Global / UTC Support</h3>
              <p class="text-xs opacity-50 uppercase tracking-tighter">Solving the "off-by-one" timezone bug</p>
            </div>
          </div>

          <lg-form-layout [cols]="2" gap="lg">
            <div class="space-y-4">
              <lg-form-field label="Local Mode (Default)" hint="Uses browser timezone">
                <lg-date-picker [(ngModel)]="localDate" placeholder="Select local date"></lg-date-picker>
              </lg-form-field>
              <div class="p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono leading-tight">
                <span class="opacity-40 block mb-1 uppercase tracking-widest">ISO Output (UTC):</span>
                <span class="text-indigo-300">{{ localDate()?.toISOString() || 'Select a date' }}</span>
              </div>
            </div>

            <div class="space-y-4">
              <lg-form-field label="UTC Mode" hint="Normalized to 00:00:00Z">
                <lg-date-picker [(ngModel)]="utcDate" [useUTC]="true" placeholder="Select global date"></lg-date-picker>
              </lg-form-field>
              <div class="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono leading-tight">
                <span class="text-indigo-400 block mb-1 uppercase tracking-widest">ISO Output (Normalizado):</span>
                <span class="text-white font-bold">{{ utcDate()?.toISOString() || 'Select a date' }}</span>
              </div>
            </div>
          </lg-form-layout>

          <div class="mt-6 p-4 rounded-xl bg-black/20 border border-white/5 text-xs opacity-60 leading-relaxed">
            <i class="ri-information-line mr-1 text-primary"></i>
            <strong>Modo UTC</strong> asegura que la fecha seleccionada siempre se represente como la medianoche del día elegido en tiempo universal, 
            eliminando errores de "día anterior" cuando se envían datos a través de diferentes zonas horarias.
          </div>
        </lg-glass-card>

        <!-- i18n & Localization Section -->
        <lg-glass-card class="!p-8">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
               <i class="ri-translate"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold">Internationalization (i18n)</h3>
              <p class="text-xs opacity-50 uppercase tracking-tighter">Powered by Native Intl API</p>
            </div>
          </div>

          <lg-form-layout [cols]="2" gap="lg">
            <!-- English Example -->
            <div class="space-y-2">
              <lg-date-picker 
                label="English (US)" 
                locale="en-US" 
                todayLabel="Today"
                placeholder="Select date..."
              ></lg-date-picker>
              <p class="text-[10px] opacity-40 px-2 italic">Format: MM/DD/YYYY (Automatic)</p>
            </div>

            <!-- French Example -->
            <div class="space-y-2">
              <lg-date-picker 
                label="Français (FR)" 
                locale="fr-FR" 
                todayLabel="Aujourd'hui"
                placeholder="Sélectionner..."
              ></lg-date-picker>
              <p class="text-[10px] opacity-40 px-2 italic">Format: DD/MM/YYYY (Automatic)</p>
            </div>
          </lg-form-layout>

          <div class="mt-8 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-xs">
             <h5 class="font-bold text-orange-400 mb-2">Zero Dictionary Logic</h5>
             <p class="opacity-60 leading-relaxed">
               A diferencia de PrimeNG, no necesitas cargar archivos JSON con nombres de meses. 
               Pasando el <code>locale</code>, el navegador traduce automáticamente los meses y días de la semana. Solo necesitas traducir el label del botón (opcional).
             </p>
          </div>
        </lg-glass-card>

        <!-- Range & Time Selection Section -->
        <lg-glass-card class="!p-8">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
               <i class="ri-timer-flash-line"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold">Range & Time Selection</h3>
              <p class="text-xs opacity-50 uppercase tracking-tighter">Premium Enterprise Features</p>
            </div>
          </div>

          <lg-form-layout [cols]="2" gap="lg">
            <!-- Date Range Example -->
            <div class="space-y-4">
              <lg-date-picker 
                label="Date Range (Dual Calendar)" 
                selectionMode="range"
                placeholder="Select date range..."
                (ngModelChange)="rangeDate.set($event)"
                [ngModel]="rangeDate()"
              ></lg-date-picker>
              
              <div class="p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] space-y-1">
                <p class="opacity-40 uppercase font-bold">Range Output:</p>
                <code class="text-blue-400 block">Start: {{ rangeDate()?.[0] | date:'mediumDate' }}</code>
                <code class="text-blue-400 block">End: {{ rangeDate()?.[1] | date:'mediumDate' }}</code>
              </div>
            </div>

            <!-- Date + Time Example -->
            <div class="space-y-4">
              <lg-date-picker 
                label="Date + Time Selection" 
                [showTime]="true"
                placeholder="Select date and time..."
                (ngModelChange)="dateTime.set($event)"
                [ngModel]="dateTime()"
              ></lg-date-picker>

              <div class="p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] space-y-1">
                <p class="opacity-40 uppercase font-bold">DateTime Output:</p>
                <code class="text-purple-400">{{ dateTime() | date:'medium' }}</code>
              </div>
            </div>
          </lg-form-layout>

          <div class="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs">
             <h5 class="font-bold text-blue-400 mb-2">Technical Highlight: Dual Calendar Sync</h5>
             <p class="opacity-60 leading-relaxed">
               En el modo rango, el componente despliega automáticamente dos calendarios sincronizados. 
               La lógica interna maneja la selección de "puente" visual y la navegación de meses coordinada, 
               ofreciendo una experiencia fluida típica de aplicaciones de reserva de vuelos o gestión de eventos.
             </p>
          </div>
        </lg-glass-card>
      </div>

      <!-- Information Panel -->
      <aside class="lg:col-span-4 space-y-6 min-w-0">
        <lg-glass-card class="!p-6 bg-primary/5 border-primary/20">
          <h4 class="text-sm font-bold text-primary mb-3">Core Features</h4>
          <ul class="space-y-4 text-[11px] leading-tight">
            <li class="flex gap-2">
              <i class="ri-checkbox-circle-fill text-primary shrink-0"></i>
              <span><strong>Headless Logic</strong>: Custom engine for high performance without external dependencies.</span>
            </li>
            <li class="flex gap-2">
              <i class="ri-checkbox-circle-fill text-primary shrink-0"></i>
              <span><strong>CDK Overlay</strong>: Accurate floating positioning with backdrop dismissal.</span>
            </li>
             <li class="flex gap-2">
              <i class="ri-checkbox-circle-fill text-primary shrink-0"></i>
              <span><strong>Signals Everywhere</strong>: Built on top of the latest Angular reactivity patterns.</span>
            </li>
          </ul>
        </lg-glass-card>

        <section class="space-y-4 px-2">
           <h4 class="text-[10px] font-bold uppercase tracking-widest opacity-40">Localization Example</h4>
           <lg-glass-card class="!p-4 border-dashed border-white/10 bg-transparent shadow-none">
              <lg-date-picker label="Fecha (es-ES)" placeholder="Seleccionar..."></lg-date-picker>
              <p class="mt-4 text-[10px] opacity-40 italic">
                Soporta localización dinámica mediante la propiedad locale del CalendarComponent.
              </p>
           </lg-glass-card>
        </section>

        <lg-glass-card class="!p-6">
          <h4 class="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">Theming</h4>
          <p class="text-xs opacity-60 leading-relaxed mb-4">
            Reacts instantly to <strong>ThemeService</strong> changes.
          </p>
          <div class="flex gap-2">
             <div class="w-6 h-6 rounded-full bg-primary shadow-lg shadow-primary/30"></div>
             <div class="w-6 h-6 rounded-full bg-emerald-500/30 border border-emerald-500/50"></div>
             <div class="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-500/50"></div>
          </div>
        </lg-glass-card>
      </aside>
    </div>
  `,
})
export class DatePickerPage {
  private readonly fb = inject(NonNullableFormBuilder);

  // signals for examples
  selectedDate = signal<Date | null>(null);
  localDate = signal<Date | null>(null);
  utcDate = signal<Date | null>(null);
  rangeDate = signal<Date[] | null>(null);
  dateTime = signal<Date | null>(null);

  dateForm = this.fb.group({
    eventDate: new FormControl<Date | null>(null, { nonNullable: false })
  });

  setToToday() {
    this.selectedDate.set(new Date());
  }
}
