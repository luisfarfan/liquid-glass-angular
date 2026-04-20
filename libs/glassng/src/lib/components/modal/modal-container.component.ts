import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDialogContainer, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { GngModalConfig } from './modal.types';

/**
 * GngModalContainer
 * Internal component that wraps the modal content.
 * It manually handles the 3D parallax, structural glass effects, and cinematic animations.
 */
@Component({
  selector: 'gng-modal-container',
  standalone: true,
  imports: [CommonModule, DialogModule, PortalModule, A11yModule],
  template: `
    <div class="gng-modal-wrapper" (click)="_onWrapperClick($event)">
      <div 
        class="gng-modal-container"
        [class]="'el-' + (liquidConfig.elevation || 2)"
        [class]="'gng-modal-anim-' + (liquidConfig.animation || 'cinema')"
        [style.transform]="_parallaxTransform()"
        cdkTrapFocus
        cdkTrapFocusAutoCapture
        (click)="$event.stopPropagation()"
      >
        <!-- The actual component content will be rendered here -->
        <ng-template cdkPortalOutlet></ng-template>
      </div>
    </div>
  `,
  styleUrl: './modal.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngModalContainer extends CdkDialogContainer {
  /** Inject the dialog reference explicitly since the base one is private */
  private _modalRef = inject(DialogRef);

  /** 3D Parallax State */
  protected _parallaxTransform = signal<string>('rotateX(0deg) rotateY(0deg)');

  /** Access to typed config */
  get liquidConfig(): GngModalConfig {
    return this._config as GngModalConfig;
  }

  /**
   * 3D Parallax Effect
   * Captures mouse movement relative to the center of the viewport.
   */
  @HostListener('window:mousemove', ['$event'])
  _onMouseMove(event: MouseEvent) {
    if (!this.liquidConfig.enableParallax) return;

    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 2;
    const y = (event.clientY / innerHeight - 0.5) * 2;
    
    // Subtle rotation based on mouse position
    const rotateY = x * 1.5;
    const rotateX = -y * 1.5;
    
    this._parallaxTransform.set(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }

  /**
   * Handles backdrop clicks to close the modal if disableClose is false.
   */
  _onWrapperClick(event: MouseEvent) {
    if (this._config.disableClose) return;
    this._modalRef.close();
  }
}
