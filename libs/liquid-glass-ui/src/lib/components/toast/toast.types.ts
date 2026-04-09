import { InjectionToken } from '@angular/core';

/**
 * Semantic variants for the toast
 */
export type LiquidToastType = 'success' | 'error' | 'info';

export type LiquidToastHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';
export type LiquidToastVerticalPosition = 'top' | 'bottom';

/**
 * Configuration for an individual toast
 */
export interface LiquidToastConfig {
  /** The message body to display */
  message: string;
  
  /** Optional title */
  title?: string;
  
  /** Duration in ms before auto-closing (default: 3500) */
  duration?: number;
  
  /** Semantic type (default: 'info') */
  type?: LiquidToastType;
  
  /** Whether the toast should show a close button (default: true) */
  dismissible?: boolean;

  /** Horizontal position override */
  horizontalPosition?: LiquidToastHorizontalPosition;

  /** Vertical position override */
  verticalPosition?: LiquidToastVerticalPosition;
}

/**
 * Global configuration options for the Toast service
 */
export interface LiquidToastGlobalConfig {
  duration?: number;
  horizontalPosition?: LiquidToastHorizontalPosition;
  verticalPosition?: LiquidToastVerticalPosition;
}

export const LIQUID_TOAST_DEFAULT_CONFIG = new InjectionToken<LiquidToastGlobalConfig>('LIQUID_TOAST_DEFAULT_CONFIG');

/**
 * Handle to a toast instance for manual control
 */
export interface LiquidToastRef {
  /** Closes the toast immediately */
  close(): void;
  
  /** Observable that emits when the toast is closed */
  afterClosed(): import('rxjs').Observable<void>;
}

