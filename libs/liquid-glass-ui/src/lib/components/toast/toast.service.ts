import { Injectable, inject, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LiquidToastConfig, LiquidToastRef, LiquidToastType, LIQUID_TOAST_DEFAULT_CONFIG, LiquidToastGlobalConfig } from './toast.types';
import { LiquidToastContainerComponent } from './toast-container.component';
import { Subject } from 'rxjs';

interface ContainerInstance {
  overlayRef: OverlayRef;
  containerRef: ComponentRef<LiquidToastContainerComponent>;
}

@Injectable({
  providedIn: 'root'
})
export class LiquidToastService {
  private _overlay = inject(Overlay);
  private _globalConfig = inject(LIQUID_TOAST_DEFAULT_CONFIG, { optional: true }) || {} as LiquidToastGlobalConfig;
  
  // Mantiene un contenedor por cada posición (ej. "top-right", "bottom-center")
  private _containers = new Map<string, ContainerInstance>();

  /**
   * Shows a toast notification.
   */
  show(config: LiquidToastConfig): LiquidToastRef {
    // Determinar la posición final combinando la configuración global y la local
    const vPos = config.verticalPosition || this._globalConfig.verticalPosition || 'top';
    const hPos = config.horizontalPosition || this._globalConfig.horizontalPosition || 'right';
    const positionKey = `${vPos}-${hPos}`;

    const containerInfo = this._getOrCreateContainer(positionKey, vPos, hPos);
    
    // Asignar duración global si no tiene una propia y existe en global
    if (config.duration === undefined && this._globalConfig.duration !== undefined) {
      config.duration = this._globalConfig.duration;
    }

    const id = containerInfo.containerRef.instance.add(config);
    
    const closeSubject = new Subject<void>();

    const ref: LiquidToastRef = {
      close: () => {
        containerInfo.containerRef.instance._remove(id);
        closeSubject.next();
        closeSubject.complete();
        this._checkCleanup(positionKey);
      },
      afterClosed: () => closeSubject.asObservable()
    };

    return ref;
  }

  /** Success shortcut */
  success(message: string, title?: string, config?: Partial<LiquidToastConfig>) {
    return this.show({ message, title, type: 'success', ...config });
  }

  /** Error shortcut */
  error(message: string, title?: string, config?: Partial<LiquidToastConfig>) {
    return this.show({ message, title, type: 'error', ...config });
  }

  /** Info shortcut */
  info(message: string, title?: string, config?: Partial<LiquidToastConfig>) {
    return this.show({ message, title, type: 'info', ...config });
  }

  /**
   * Internal: Ensures the overlay container exists for a given position.
   */
  private _getOrCreateContainer(positionKey: string, vPos: string, hPos: string): ContainerInstance {
    if (this._containers.has(positionKey)) {
      return this._containers.get(positionKey)!;
    }

    const positionStrategy = this._overlay.position().global();

    // Configuración Horizontal
    if (hPos === 'start' || hPos === 'left') {
      positionStrategy.left('1.5rem');
    } else if (hPos === 'center') {
      positionStrategy.centerHorizontally();
    } else {
      positionStrategy.right('1.5rem'); // end o right
    }

    // Configuración Vertical
    if (vPos === 'bottom') {
      positionStrategy.bottom('1.5rem');
    } else {
      positionStrategy.top('1.5rem');
    }

    const overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.noop(),
      panelClass: ['lg-toast-overlay-panel', `lg-toast-pos-${vPos}`]
    });

    const portal = new ComponentPortal(LiquidToastContainerComponent);
    const containerRef = overlayRef.attach(portal);

    const instance: ContainerInstance = { overlayRef, containerRef };
    this._containers.set(positionKey, instance);

    return instance;
  }

  /**
   * Internal: Closes the overlay if no toasts are left in that specific position.
   */
  private _checkCleanup(positionKey: string) {
    const instance = this._containers.get(positionKey);
    if (instance && instance.containerRef.instance.toasts().length === 0) {
      instance.overlayRef.dispose();
      this._containers.delete(positionKey);
    }
  }
}
