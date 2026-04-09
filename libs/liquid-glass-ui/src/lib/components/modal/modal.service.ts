import { Injectable, inject, Type, Optional } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { LiquidModalConfig, LIQUID_MODAL_DATA, LiquidModalRef, LIQUID_MODAL_DEFAULT_CONFIG } from './modal.types';
import { LiquidModalContainerComponent } from './modal-container.component';
import { of } from 'rxjs';

/**
 * LiquidModalService
 * Orchestrator for Glass Modals. Uses CDK Dialog for robust overlay management.
 */
@Injectable({
  providedIn: 'root'
})
export class LiquidModalService {
  private _dialog = inject(Dialog);
  
  /** Inject global defaults if provided, otherwise use an empty object */
  private _globalConfig = inject(LIQUID_MODAL_DEFAULT_CONFIG, { optional: true }) || {};

  /**
   * Opens a modal containing the given component.
   * @param component The component to render inside the modal.
   * @param config Optional configuration for the modal.
   * @returns A LiquidModalRef to control the modal.
   */
  open<T, D = any, R = any>(
    component: Type<T>,
    config: LiquidModalConfig<D> = {}
  ): LiquidModalRef<R> {
    
    // 1. Merge global defaults with local config
    const mergedConfig: LiquidModalConfig = {
      ...this._globalConfig,
      ...config,
      // Default to cinema if nothing is specified globally or locally
      animation: config.animation || this._globalConfig.animation || 'cinema',
      elevation: config.elevation || this._globalConfig.elevation || 2,
    };

    // 2. Impeccable Animation Logic: 
    // If disableAnimation is true (locally or globally), force 'none'
    if (mergedConfig.disableAnimation) {
      mergedConfig.animation = 'none';
    }

    // 3. Prepare Configuration
    const dialogOptions: any = {
      ...mergedConfig,
      container: LiquidModalContainerComponent,
      backdropClass: 
        mergedConfig.animation === 'void' ? 'lg-modal-backdrop-void' : 
        mergedConfig.animation === 'none' ? 'lg-modal-backdrop-none' : 
        'lg-modal-backdrop',
      providers: (ref: any) => [
        { provide: LIQUID_MODAL_DATA, useValue: mergedConfig.data },
        { 
          provide: LiquidModalRef, 
          useValue: {
            close: (result?: R) => ref.close(result),
            afterClosed: () => ref.closed || of(undefined),
            afterOpened: () => ref.opened || of(undefined),
            backdropClick: () => ref.backdropClick || of(undefined)
          }
        }
      ]
    };

    // 4. Open via CDK Dialog
    const cdkRef: any = this._dialog.open(component, dialogOptions);

    // 5. Return a wrapper for the caller
    return {
      close: (result?: R) => cdkRef.close(result),
      afterClosed: () => cdkRef.closed || of(undefined),
      afterOpened: () => cdkRef.opened || of(undefined),
      backdropClick: () => cdkRef.backdropClick || of(undefined)
    } as LiquidModalRef<R>;
  }

  /**
   * Closes all open modals.
   */
  closeAll(): void {
    this._dialog.closeAll();
  }
}
