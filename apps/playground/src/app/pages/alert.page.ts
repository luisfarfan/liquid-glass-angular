import { Component, ChangeDetectionStrategy, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngAlert, GngButton } from 'glassng';

@Component({
  selector: 'pg-alert-demo',
  standalone: true,
  imports: [CommonModule, GngAlert, GngButton],
  template: `
    <div class="space-y-12 pb-20">
      <header>
        <h1 class="text-3xl font-bold tracking-tight text-[var(--gng-t-text-main)]">Alerts & Messages</h1>
        <p class="text-[var(--gng-t-text-muted)] mt-2">Banners contextuales con estética Glass para feedback crítico e informativo.</p>
      </header>

      <!-- Variants -->
      <section class="space-y-6">
        <h2 class="text-xl font-bold">Variantes Semánticas</h2>
        <div class="grid grid-cols-1 gap-4 max-w-3xl">
          <gng-alert variant="info" title="Información del Sistema">
            Hay una nueva versión del dashboard disponible. Actualiza para ver las últimas métricas.
          </gng-alert>

          <gng-alert variant="success" title="Operación Exitosa">
            Los datos del cliente han sido guardados correctamente en la base de datos distribuida.
          </gng-alert>

          <gng-alert variant="warning" title="Atención Requerida">
            Tu suscripción expira en 3 días. Por favor, revisa tus métodos de pago para evitar interrupciones.
          </gng-alert>

          <gng-alert variant="error" title="Error Crítico">
            No se pudo establecer conexión con el servidor de autenticación. Reintentando en 5 segundos...
          </gng-alert>
        </div>
      </section>

      <!-- Interaction -->
      <section class="space-y-6">
        <h2 class="text-xl font-bold">Interacción y Cierre</h2>
        <div class="max-w-3xl">
          @if (showAlert()) {
            <gng-alert 
              variant="info" 
              [closable]="true" 
              (close)="showAlert.set(false)"
              title="Tip de Productividad"
            >
              Puedes usar <strong>Ctrl+S</strong> para guardar rápidamente cualquier cambio en el editor.
            </gng-alert>
          } @else {
            <div class="p-8 border-2 border-dashed border-glass-border rounded-xl flex flex-col items-center gap-4">
              <span class="text-[var(--gng-t-text-muted)]">Cerraste el alerta.</span>
              <button gng-button variant="secondary" (click)="showAlert.set(true)">Reiniciar Alerta</button>
            </div>
          }
        </div>
      </section>

      <!-- Inline Style -->
      <section class="space-y-6">
        <h2 class="text-xl font-bold">Sin Título (Inline)</h2>
        <div class="grid grid-cols-1 gap-4 max-w-3xl">
          <gng-alert variant="info">
            Este es un mensaje corto sin título para avisos rápidos.
          </gng-alert>
          <gng-alert variant="warning" icon="ri-radar-line">
            Buscando señales de satélite cerca de tu ubicación actual...
          </gng-alert>
        </div>
      </section>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPage {
  showAlert = signal(true);
}
