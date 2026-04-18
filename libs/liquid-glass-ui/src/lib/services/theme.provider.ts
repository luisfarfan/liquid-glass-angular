import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { 
  LGThemeConfig, 
  LG_THEME_CONFIG, 
  DEFAULT_LG_THEME_CONFIG 
} from './theme.models';

/**
 * Provee la configuración del sistema de temas de Liquid Glass.
 * Úsalo en el app.config.ts de tu aplicación.
 * 
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideLGThemes({
 *       defaultThemeId: 'dark',
 *       themes: [ ...misTemasPersonalizados ]
 *     })
 *   ]
 * });
 * ```
 */
export function provideLGThemes(config: Partial<LGThemeConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LG_THEME_CONFIG,
      useValue: {
        ...DEFAULT_LG_THEME_CONFIG,
        ...config
      }
    }
  ]);
}
