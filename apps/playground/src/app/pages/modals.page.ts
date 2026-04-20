import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, LiquidModalService } from 'glassng';
import { DemoModalComponent } from '../components/demo-modal.component';

@Component({
  selector: 'pg-modals-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Modals</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Diálogos y animaciones.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <i class="ri-window-line text-[var(--lg-t-primary)]"></i>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Cinematic Dialogs &amp; Animations</h3>
      </div>

      <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
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
    </section>
  `,
})
export class ModalsPage {
  private readonly modalService = inject(LiquidModalService);

  openModal(animation: string = 'cinema', enableParallax = true): void {
    this.modalService.open(DemoModalComponent, {
      elevation: 2,
      enableParallax,
      animation: animation as never,
      data: { title: `Animación: ${animation.toUpperCase()}` },
    });
  }
}
