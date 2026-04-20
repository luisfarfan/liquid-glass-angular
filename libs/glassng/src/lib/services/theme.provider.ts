import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { 
  LGThemeConfig, 
  GNG_THEME_CONFIG, 
  DEFAULT_GNG_THEME_CONFIG 
} from './theme.models';

/**
 * Provee la configuración del sistema de temas de Gng Glass.
 * Úsalo en el app.config.ts de tu aplicación.
 * 
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideGngThemes({
 *       defaultThemeId: 'dark',
 *       themes: [ ...misTemasPersonalizados ]
 *     })
 *   ]
 * });
 * ```
 */
export function provideGngThemes(config: Partial<LGThemeConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: GNG_THEME_CONFIG,
      useValue: {
        ...DEFAULT_GNG_THEME_CONFIG,
        ...config
      }
    }
  ]);
}
