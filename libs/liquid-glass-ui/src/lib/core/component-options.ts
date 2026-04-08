import { InjectionToken } from '@angular/core';

/**
 * Patrón base para la configuración global de componentes.
 * Basado en SDD-06: Component Architecture Standards.
 */

export interface LgComponentOptions {
  /** Test ID base para el componente */
  testId?: string;
  /** Clase CSS adicional para el host */
  customClass?: string;
}

/**
 * Función helper para crear tokens de configuración global.
 */
export function createLgConfigToken<T>(name: string): InjectionToken<T> {
  return new InjectionToken<T>(`LG_${name.toUpperCase()}_DEFAULT_OPTIONS`);
}

/**
 * Configuración por defecto para GlassCard
 */
export interface LgGlassCardOptions extends LgComponentOptions {
  /** Blur por defecto (ej: '8px') */
  defaultBlur?: string;
}

export const LG_GLASS_CARD_DEFAULT_OPTIONS = createLgConfigToken<LgGlassCardOptions>('GLASS_CARD');
