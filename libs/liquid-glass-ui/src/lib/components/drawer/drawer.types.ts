import { InjectionToken } from '@angular/core';

export type LiquidDrawerPosition = 'left' | 'right';

export interface LiquidDrawerConfig<D = unknown> {
  /** Ancho del panel (p. ej. `450px`, `min(100vw, 480px)`). */
  width?: string;
  /** Borde desde el que entra la hoja. */
  position?: LiquidDrawerPosition;
  /** Datos inyectados con `LIQUID_DRAWER_DATA`. */
  data?: D;
  /** Impide cerrar con backdrop o Escape. */
  disableClose?: boolean;
  /** Clases extra del backdrop CDK. */
  backdropClass?: string | string[];
  /** Clases extra del panel CDK. */
  panelClass?: string | string[];
}

export const LIQUID_DRAWER_DATA = new InjectionToken<unknown>('LIQUID_DRAWER_DATA');

export const LIQUID_DRAWER_DEFAULT_CONFIG = new InjectionToken<LiquidDrawerConfig>('LIQUID_DRAWER_DEFAULT_CONFIG');

export abstract class LiquidDrawerRef<R = unknown> {
  abstract close(result?: R): void;
  abstract afterClosed(): import('rxjs').Observable<R | undefined>;
  abstract afterOpened(): import('rxjs').Observable<void>;
  abstract backdropClick(): import('rxjs').Observable<MouseEvent>;
}
