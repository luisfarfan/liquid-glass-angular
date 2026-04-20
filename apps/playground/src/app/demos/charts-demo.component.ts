import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent, LgTimelineComponent, LgTimelineItemComponent } from 'glassng';

@Component({
  selector: 'app-charts-demo',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, LgTimelineComponent, LgTimelineItemComponent],
  template: `
    <div class="space-y-12">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-[var(--lg-t-text-main)]">Stats & Metrics</h1>
        <p class="text-[var(--lg-t-text-muted)] mt-2">Diferentes variantes del <code>lg-kpi-card</code> inspiradas en PrimeBlocks y Tailkit.</p>
      </div>

      <!-- Variant: Trend (Default) -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold">Standard Trend Cards</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <lg-kpi-card
            label="Ventas Netas"
            value="45,210"
            prefix="$"
            [trendValue]="12.5"
            icon="ri-bubble-chart-line"
            [chartData]="[10, 15, 12, 20, 18, 25, 22, 30]"
          ></lg-kpi-card>
          <lg-kpi-card
            label="Nuevos Clientes"
            value="1,240"
            [trendValue]="-2.4"
            icon="ri-user-add-line"
            [chartData]="[40, 38, 35, 30, 32, 28, 25, 20]"
          ></lg-kpi-card>
          <lg-kpi-card
            label="Costo p/Adquisición"
            value="12.8"
            prefix="$"
            [trendValue]="5.2"
            icon="ri-copper-coin-line"
            [chartData]="[5, 6, 5.5, 7, 7.5, 8, 8.5]"
          ></lg-kpi-card>
          <lg-kpi-card
            variant="status"
            label="Ordenes Críticas"
            value="3"
            [trendValue]="-15"
            icon="ri-error-warning-line"
            [chartData]="[5, 4, 3]"
          ></lg-kpi-card>
        </div>
      </section>

      <!-- Variant: Minimal (Compact) -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold">Minimal / Compact Cards</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <lg-kpi-card
            variant="minimal"
            label="CPU Usage"
            value="42"
            suffix="%"
            [trendValue]="2.1"
            icon="ri-cpu-line"
          ></lg-kpi-card>
          <lg-kpi-card
            variant="minimal"
            label="RAM Memory"
            value="8.4"
            suffix="GB"
            [trendValue]="-0.5"
            icon="ri-database-2-line"
          ></lg-kpi-card>
          <lg-kpi-card
            variant="minimal"
            label="Disk Space"
            value="1.2"
            suffix="TB"
            [trendValue]="0"
            icon="ri-hard-drive-2-line"
          ></lg-kpi-card>
        </div>
      </section>

      <!-- Variant: Progress (Goal Completion) -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold">Progress & Goal Cards</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
           <lg-kpi-card
            variant="progress"
            label="Sales Goal (Monthly)"
            value="75,000"
            prefix="$"
            [currentValue]="62000"
            [targetValue]="100000"
            icon="ri-flag-2-line"
            [trendValue]="15.2"
          ></lg-kpi-card>
          <lg-kpi-card
            variant="progress"
            label="Storage Limit"
            value="85"
            suffix="%"
            [currentValue]="85"
            [targetValue]="100"
            icon="ri-cloud-line"
            [trendValue]="3.1"
          ></lg-kpi-card>
        </div>
      </section>

      <!-- Theme Stress Test -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold">Status Glow Variations</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
           <lg-kpi-card
            variant="status"
            label="System Health"
            value="99.9"
            suffix="%"
            [trendValue]="0.1"
            icon="ri-heart-pulse-line"
            [chartData]="[98, 99, 99, 99.5, 99.9, 99.9]"
          ></lg-kpi-card>
          <lg-kpi-card
            variant="status"
            label="Server Latency"
            value="124"
            suffix="ms"
            [trendValue]="-18"
            icon="ri-timer-flash-line"
            [chartData]="[150, 140, 130, 125, 124]"
          ></lg-kpi-card>
          <lg-kpi-card
            variant="status"
            label="Active Alerts"
            value="0"
            [trendValue]="0"
            icon="ri-notification-3-line"
          ></lg-kpi-card>
        </div>
      </section>

      <!-- Activity Timeline -->
      <section class="max-w-2xl">
        <h2 class="text-xl font-bold mb-6">Activity Timeline</h2>
        <lg-timeline>
          <lg-timeline-item
            title="Nueva orden procesada"
            timestamp="Hace 2 minutos"
            type="success"
            description="La orden #5421 se ha procesado correctamente y está lista para envío."
          ></lg-timeline-item>
          <lg-timeline-item
            title="Alerta de seguridad"
            timestamp="Hace 15 minutos"
            type="error"
            description="Se detectó un intento de inicio de sesión no autorizado desde una IP desconocida."
          ></lg-timeline-item>
          <lg-timeline-item
            title="Actualización del sistema"
            timestamp="Hace 1 hora"
            type="info"
            description="El servidor de producción se ha actualizado a la versión v0.1.2 Alpha."
          ></lg-timeline-item>
          <lg-timeline-item
            title="Mantenimiento programado"
            timestamp="Ayer, 23:00"
            type="warning"
            description="Recuerda que hoy a medianoche habrá un corte de servicio de 5 minutos."
          ></lg-timeline-item>
        </lg-timeline>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsDemoComponent {}
