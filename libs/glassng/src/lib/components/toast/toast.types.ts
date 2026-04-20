import { InjectionToken } from '@angular/core';

/**
 * Semantic variants for the toast
 */
export type GngToastType = 'success' | 'error' | 'info';

export type GngToastHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';
export type GngToastVerticalPosition = 'top' | 'bottom';

/**
 * Configuration for an individual toast
 */
export interface GngToastConfig {
  /** The message body to display */
  message: string;
  
  /** Optional title */
  title?: string;
  
  /** Duration in ms before auto-closing (default: 3500) */
  duration?: number;
  
  /** Semantic type (default: 'info') */
  type?: GngToastType;
  
  /** Whether the toast should show a close button (default: true) */
  dismissible?: boolean;

  /** Horizontal position override */
  horizontalPosition?: GngToastHorizontalPosition;

  /** Vertical position override */
  verticalPosition?: GngToastVerticalPosition;
}

/**
 * Global configuration options for the Toast service
 */
export interface GngToastGlobalConfig {
  duration?: number;
  horizontalPosition?: GngToastHorizontalPosition;
  verticalPosition?: GngToastVerticalPosition;
}

export const GNG_TOAST_DEFAULT_CONFIG = new InjectionToken<GngToastGlobalConfig>('GNG_TOAST_DEFAULT_CONFIG');

/**
 * Handle to a toast instance for manual control
 */
export interface GngToastRef {
  /** Closes the toast immediately */
  close(): void;
  
  /** Observable that emits when the toast is closed */
  afterClosed(): import('rxjs').Observable<void>;
}

