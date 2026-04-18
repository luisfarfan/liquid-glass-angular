import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { appRoutes } from './app.routes';
import { 
  provideLGThemes, 
  DEFAULT_LG_THEMES, 
  LGThemeDefinition 
} from '@liquid-glass-ui/angular';

const customThemes: LGThemeDefinition[] = [
  ...DEFAULT_LG_THEMES,
  {
    id: 'sunset-glow',
    displayName: 'Sunset Glow',
    isDark: true,
    variables: {
      '--lg-t-primary': '#f43f5e',      // Rose 500
      '--lg-t-primary-rgb': '244, 63, 94',
      '--lg-t-bg-app': '#180a0a',       // Deep warm dark
      '--lg-t-bg-card': '#251111',
      '--lg-t-text-main': '#fff1f2',
      '--lg-t-text-muted': '#fca5a5'
    }
  },
  {
    id: 'matrix-code',
    displayName: 'Matrix Code',
    isDark: true,
    variables: {
      '--lg-t-primary': '#22c55e',      // Green 500
      '--lg-t-primary-rgb': '34, 197, 94',
      '--lg-t-bg-app': '#050505',       // Pure black
      '--lg-t-bg-card': '#0a0a0a',
      '--lg-t-text-main': '#dcfce7',
      '--lg-t-text-muted': '#4ade80',
      '--lg-t-glass-border': 'rgba(34, 197, 94, 0.2)'
    }
  },
  {
    id: 'vaporwave',
    displayName: 'Vaporwave',
    isDark: true,
    variables: {
      '--lg-t-primary': '#06b6d4',      // Cyan 500
      '--lg-t-primary-rgb': '6, 182, 212',
      '--lg-t-bg-app': '#1e1b4b',       // Indigo 950
      '--lg-t-bg-card': '#312e81',
      '--lg-t-text-main': '#fdf2ff',
      '--lg-t-text-muted': '#d8b4fe',
      '--lg-t-primary-hover': '#c084fc'  // Purple 400
    }
  },
  {
    id: 'royal-gold',
    displayName: 'Royal Gold',
    isDark: true,
    variables: {
      '--lg-t-primary': '#eab308',      // Yellow 500
      '--lg-t-primary-rgb': '234, 179, 8',
      '--lg-t-bg-app': '#0f172a',       // Slate 900
      '--lg-t-bg-card': '#1e293b',
      '--lg-t-text-main': '#fefce8',
      '--lg-t-text-muted': '#fde047'
    }
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom(DialogModule),
    provideLGThemes({
      themes: customThemes,
      defaultThemeId: 'dark'
    })
  ],
};
