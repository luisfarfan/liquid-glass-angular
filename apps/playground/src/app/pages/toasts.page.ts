import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, LiquidToastService } from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-toasts-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Toasts</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Notificaciones globales.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
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
            <button lg-button variant="ghost" size="sm" (click)="showToast('pos', { v: 'top', h: 'left' })" title="Top Left">
              <i class="ri-arrow-left-up-line"></i>
            </button>
            <button
              lg-button
              variant="secondary"
              size="sm"
              (click)="showToast('pos', { v: 'top', h: 'center' })"
              title="Top Center"
            >
              <i class="ri-arrow-up-line"></i>
            </button>
            <button lg-button variant="ghost" size="sm" (click)="showToast('pos', { v: 'top', h: 'right' })" title="Top Right">
              <i class="ri-arrow-right-up-line"></i>
            </button>
            <div class="col-span-3 h-4"></div>
            <button
              lg-button
              variant="ghost"
              size="sm"
              (click)="showToast('pos', { v: 'bottom', h: 'left' })"
              title="Bottom Left"
            >
              <i class="ri-arrow-left-down-line"></i>
            </button>
            <button
              lg-button
              variant="secondary"
              size="sm"
              (click)="showToast('pos', { v: 'bottom', h: 'center' })"
              title="Bottom Center"
            >
              <i class="ri-arrow-down-line"></i>
            </button>
            <button
              lg-button
              variant="ghost"
              size="sm"
              (click)="showToast('pos', { v: 'bottom', h: 'right' })"
              title="Bottom Right"
            >
              <i class="ri-arrow-right-down-line"></i>
            </button>
          </div>
        </div>

        <p class="text-[10px] text-zinc-500 italic px-2">
          Nota: Pasa el cursor sobre un toast para pausar su tiempo de vida. Los toasts se apilan automáticamente.
        </p>
      </div>
    </section>
  `,
})
export class ToastsPage {
  private readonly toastService = inject(LiquidToastService);

  showToast(type: string, posOptions?: { v: string; h: string }): void {
    if (type === 'pos' && posOptions) {
      this.toastService.info(`Posición: ${posOptions.v} - ${posOptions.h}`, 'Demo de Posicionamiento', {
        verticalPosition: posOptions.v as 'top' | 'bottom',
        horizontalPosition: posOptions.h as 'left' | 'center' | 'right',
      });
      return;
    }

    switch (type) {
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
          duration: 8000,
        });
        break;
    }
  }
}
