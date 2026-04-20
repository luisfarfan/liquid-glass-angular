import { InjectionToken } from '@angular/core';

/**
 * Metadata for a single theme.
 */
export interface LGThemeDefinition {
  /** Unique identifier for the theme (e.g., 'dark', 'light', 'neon') */
  id: string;
  /** Human-readable name for UI displays */
  displayName: string;
  /** CSS class applied to the <html> tag (optional) */
  class?: string;
  /** Direct CSS variable overrides for this theme */
  variables?: Record<string, string>;
  /** Whether the theme is considered 'dark' */
  isDark: boolean;
}

/**
 * Configuration for the GngThemeService.
 */
export interface LGThemeConfig {
  /** List of available themes */
  themes: LGThemeDefinition[];
  /** Default theme to use if none is found in storage */
  defaultThemeId: string;
  /** Key used for localStorage persistence */
  storageKey: string;
}

/**
 * Default built-in themes for Gng Glass.
 */
export const DEFAULT_GNG_THEMES: LGThemeDefinition[] = [
  {
    id: 'dark',
    displayName: 'Dark (Default)',
    isDark: true
    // Note: Dark is the default :root styles, so no class needed.
  },
  {
    id: 'light',
    displayName: 'Light',
    class: 'light-theme',
    isDark: false
  },
  {
    id: 'cyberpunk',
    displayName: 'Cyberpunk',
    class: 'cyberpunk-theme',
    isDark: true
  },
  {
    id: 'emerald',
    displayName: 'Emerald',
    class: 'emerald-theme',
    isDark: true
  }
];

/**
 * Default global configuration.
 */
export const DEFAULT_GNG_THEME_CONFIG: LGThemeConfig = {
  themes: DEFAULT_GNG_THEMES,
  defaultThemeId: 'dark',
  storageKey: 'gng-theme'
};

/**
 * InjectionToken to provide the theme configuration.
 */
export const GNG_THEME_CONFIG = new InjectionToken<LGThemeConfig>('GNG_THEME_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_GNG_THEME_CONFIG
});
