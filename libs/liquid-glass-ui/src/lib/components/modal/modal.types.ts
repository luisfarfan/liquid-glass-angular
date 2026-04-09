import { InjectionToken } from '@angular/core';
import { DialogConfig } from '@angular/cdk/dialog';

/**
 * Valid animation profiles for the Liquid Glass Modal
 */
export type LiquidModalAnimation = 'cinema' | 'glass' | 'zoom' | 'slide' | 'void' | 'none';

/**
 * Configuration for the Liquid Glass Modal
 */
export interface LiquidModalConfig<D = any> extends Omit<DialogConfig<D>, 'container' | 'backdropClass'> {
  /** Elevation level (1-3) for glass depth */
  elevation?: 1 | 2 | 3;
  
  /** Enable 3D parallax effect on mouse move */
  enableParallax?: boolean;
  
  /** Animation profile to use for entry */
  animation?: LiquidModalAnimation;

  /** 
   * Explicitly disable all cinematic animations for this modal. 
   * When true, it overrides the 'animation' profile to 'none'.
   */
  disableAnimation?: boolean;
  
  /** View Transition Name for morphing effect (requires browser support) */
  viewTransitionName?: string;
  
  /** Custom CSS classes for the modal panel */
  panelClass?: string | string[];
}

/** 
 * Injection Token for data passed into the modal component 
 */
export const LIQUID_MODAL_DATA = new InjectionToken<any>('LIQUID_MODAL_DATA');

/**
 * Injection Token for global modal configuration
 */
export const LIQUID_MODAL_DEFAULT_CONFIG = new InjectionToken<LiquidModalConfig>('LIQUID_MODAL_DEFAULT_CONFIG');

/**
 * Interface for LiquidModalRef (wrapper over DialogRef)
 */
export abstract class LiquidModalRef<R = any> {
  abstract close(result?: R): void;
  abstract afterClosed(): import('rxjs').Observable<R | undefined>;
  abstract afterOpened(): import('rxjs').Observable<void>;
  abstract backdropClick(): import('rxjs').Observable<MouseEvent>;
}
