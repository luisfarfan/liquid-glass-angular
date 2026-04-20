import { Injectable, inject, Type, Optional } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { GngModalConfig, GNG_MODAL_DATA, GngModalRef, GNG_MODAL_DEFAULT_CONFIG } from './modal.types';
import { GngModalContainer } from './modal-container.component';
import { of } from 'rxjs';

/**
 * GngModalService
 * Orchestrator for Glass Modals. Uses CDK Dialog for robust overlay management.
 */
@Injectable({
  providedIn: 'root'
})
export class GngModalService {
  private _dialog = inject(Dialog);
  
  /** Inject global defaults if provided, otherwise use an empty object */
  private _globalConfig = inject(GNG_MODAL_DEFAULT_CONFIG, { optional: true }) || {};

  /**
   * Opens a modal containing the given component.
   * @param component The component to render inside the modal.
   * @param config Optional configuration for the modal.
   * @returns A GngModalRef to control the modal.
   */
  open<T, D = any, R = any>(
    component: Type<T>,
    config: GngModalConfig<D> = {}
  ): GngModalRef<R> {
    
    // 1. Merge global defaults with local config
    const mergedConfig: GngModalConfig = {
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
      container: GngModalContainer,
      backdropClass: 
        mergedConfig.animation === 'void' ? 'gng-modal-backdrop-void' : 
        mergedConfig.animation === 'none' ? 'gng-modal-backdrop-none' : 
        'gng-modal-backdrop',
      providers: (ref: any) => [
        { provide: GNG_MODAL_DATA, useValue: mergedConfig.data },
        { 
          provide: GngModalRef, 
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
    } as GngModalRef<R>;
  }

  /**
   * Closes all open modals.
   */
  closeAll(): void {
    this._dialog.closeAll();
  }
}
