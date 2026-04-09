import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidModalRef } from './modal.types';

/**
 * LgModalHeader
 * Componente estructural para el encabezado del modal.
 */
@Component({
  selector: 'lg-modal-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-modal-header-content">
      <h2 class="lg-modal-title"><ng-content></ng-content></h2>
      @if (showClose()) {
        <button 
          type="button" 
          class="lg-modal-close-btn" 
          (click)="modalRef.close()" 
          aria-label="Cerrar modal"
        >
          <i class="ri-close-line"></i>
        </button>
      }
    </div>
  `,
  styleUrls: [], // Estilos definidos en modal.css
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgModalHeader {
  protected modalRef = inject(LiquidModalRef);
  showClose = input<boolean>(true);
}

/**
 * LgModalContent
 * Componente estructural para el área de contenido scrollable.
 */
@Component({
  selector: 'lg-modal-content',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="lg-modal-content-inner"><ng-content></ng-content></div>`,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgModalContent {}

/**
 * LgModalFooter
 * Componente estructural para las acciones del modal.
 */
@Component({
  selector: 'lg-modal-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="lg-modal-footer-inner"><ng-content></ng-content></div>`,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgModalFooter {}
