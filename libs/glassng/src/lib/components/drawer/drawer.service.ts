import { Injectable, Type, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import {
  GNG_DRAWER_DATA,
  GNG_DRAWER_DEFAULT_CONFIG,
  GngDrawerConfig,
  GngDrawerRef,
} from './drawer.types';
import { GngDrawerContainer } from './drawer-container.component';

/**
 * GngDrawerService
 * Orqueusta drawers de tipo side-sheet con CDK Dialog.
 * Soporta glassmorphism de alta fidelidad, desfoque dinámico y transiciones cinéticas.
 */
@Injectable({ providedIn: 'root' })
export class GngDrawerService {
  private readonly _dialog = inject(Dialog);
  private readonly _overlay = inject(Overlay);
  private readonly _defaults =
    inject(GNG_DRAWER_DEFAULT_CONFIG, { optional: true }) ?? {};

  open<T, D = unknown, R = unknown>(
    component: Type<T>,
    config: GngDrawerConfig<D> = {},
  ): GngDrawerRef<R> {
    const merged = { ...this._defaults, ...config } as GngDrawerConfig<D>;
    const position = merged.position ?? 'right';
    const positionStrategy =
      position === 'right'
        ? this._overlay.position().global().right('0').top('0')
        : this._overlay.position().global().left('0').top('0');

    const panelClasses: string[] = [
      'gng-drawer-panel',
      position === 'right' ? 'gng-drawer-panel--right' : 'gng-drawer-panel--left',
    ];
    if (merged.panelClass) {
      const extra = Array.isArray(merged.panelClass)
        ? merged.panelClass
        : [merged.panelClass];
      panelClasses.push(...extra);
    }

    const backdropClass = merged.backdropClass
      ? Array.isArray(merged.backdropClass)
        ? ['gng-drawer-backdrop', ...merged.backdropClass]
        : ['gng-drawer-backdrop', merged.backdropClass]
      : 'gng-drawer-backdrop';

    const width = merged.width ?? 'min(100vw, 480px)';

    const dialogOptions: Record<string, unknown> = {
      container: GngDrawerContainer,
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
        { provide: GNG_DRAWER_DATA, useValue: merged.data },
        {
          provide: GngDrawerRef,
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
    } as GngDrawerRef<R>;
  }

  closeAll(): void {
    this._dialog.closeAll();
  }
}
