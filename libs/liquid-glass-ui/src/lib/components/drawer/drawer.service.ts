import { Injectable, Type, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import {
  LIQUID_DRAWER_DATA,
  LIQUID_DRAWER_DEFAULT_CONFIG,
  LiquidDrawerConfig,
  LiquidDrawerRef,
} from './drawer.types';
import { LiquidDrawerContainerComponent } from './drawer-container.component';

/**
 * Orquesta drawers tipo side sheet con CDK Dialog (SDD 22).
 * Scroll del documento bloqueado mientras el panel está abierto; Escape cierra salvo `disableClose`.
 */
@Injectable({ providedIn: 'root' })
export class LiquidDrawerService {
  private readonly _dialog = inject(Dialog);
  private readonly _overlay = inject(Overlay);
  private readonly _defaults =
    inject(LIQUID_DRAWER_DEFAULT_CONFIG, { optional: true }) ?? {};

  open<T, D = unknown, R = unknown>(
    component: Type<T>,
    config: LiquidDrawerConfig<D> = {},
  ): LiquidDrawerRef<R> {
    const merged = { ...this._defaults, ...config } as LiquidDrawerConfig<D>;
    const position = merged.position ?? 'right';
    const positionStrategy =
      position === 'right'
        ? this._overlay.position().global().right('0').top('0')
        : this._overlay.position().global().left('0').top('0');

    const panelClasses: string[] = [
      'lg-drawer-panel',
      position === 'right' ? 'lg-drawer-panel--right' : 'lg-drawer-panel--left',
    ];
    if (merged.panelClass) {
      const extra = Array.isArray(merged.panelClass)
        ? merged.panelClass
        : [merged.panelClass];
      panelClasses.push(...extra);
    }

    const backdropClass = merged.backdropClass
      ? Array.isArray(merged.backdropClass)
        ? ['lg-drawer-backdrop', ...merged.backdropClass]
        : ['lg-drawer-backdrop', merged.backdropClass]
      : 'lg-drawer-backdrop';

    const width = merged.width ?? 'min(100vw, 480px)';

    const dialogOptions: Record<string, unknown> = {
      container: LiquidDrawerContainerComponent,
      backdropClass,
      panelClass: panelClasses,
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      width,
      height: '100%',
      maxWidth: '100vw',
      disableClose: merged.disableClose ?? false,
      data: merged.data,
      providers: (ref: {
        close: (result?: R) => void;
        closed: import('rxjs').Observable<R | undefined>;
        backdropClick: import('rxjs').Observable<MouseEvent>;
      }) => [
        { provide: LIQUID_DRAWER_DATA, useValue: merged.data },
        {
          provide: LiquidDrawerRef,
          useValue: {
            close: (result?: R) => ref.close(result),
            afterClosed: () => ref.closed || of(undefined),
            afterOpened: () => of(undefined),
            backdropClick: () => ref.backdropClick || of(undefined as never),
          },
        },
      ],
    };

    const cdkRef: {
      close: (result?: R) => void;
      closed: import('rxjs').Observable<R | undefined>;
      backdropClick: import('rxjs').Observable<MouseEvent>;
    } = this._dialog.open(component, dialogOptions as never) as never;

    return {
      close: (result?: R) => cdkRef.close(result),
      afterClosed: () => cdkRef.closed || of(undefined),
      afterOpened: () => of(undefined),
      backdropClick: () => cdkRef.backdropClick || of(undefined as never),
    } as LiquidDrawerRef<R>;
  }

  closeAll(): void {
    this._dialog.closeAll();
  }
}
