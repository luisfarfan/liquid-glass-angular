import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngModalRef } from './modal.types';

/**
 * GngModalHeader
 * Structural component for the modal header.
 */
@Component({
  selector: 'gng-modal-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-modal-header-content">
      <h2 class="gng-modal-title"><ng-content></ng-content></h2>
      @if (showClose()) {
        <button 
          type="button" 
          class="gng-modal-close-btn" 
          (click)="modalRef.close()" 
          aria-label="Cerrar modal"
        >
          <i class="ri-close-line"></i>
        </button>
      }
    </div>
  `,
  styleUrls: [], // Styles defined in modal.css
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngModalHeader {
  protected modalRef = inject(GngModalRef);
  showClose = input<boolean>(true);
}

/**
 * GngModalContent
 * Structural component for the scrollable content area.
 */
@Component({
  selector: 'gng-modal-content',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="gng-modal-content-inner"><ng-content></ng-content></div>`,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngModalContent {}

/**
 * GngModalFooter
 * Structural component for modal actions.
 */
@Component({
  selector: 'gng-modal-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="gng-modal-footer-inner"><ng-content></ng-content></div>`,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngModalFooter {}
