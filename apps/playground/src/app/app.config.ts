import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { appRoutes } from './app.routes';
import { 
  provideGngThemes, 
  DEFAULT_GNG_THEMES, 
  LGThemeDefinition 
} from 'glassng';

const customThemes: LGThemeDefinition[] = [
  ...DEFAULT_GNG_THEMES,
  {
    id: 'sunset-glow',
    displayName: 'Sunset Glow',
    isDark: true,
    variables: {
      '--gng-t-primary': '#f43f5e',      // Rose 500
      '--gng-t-primary-rgb': '244, 63, 94',
      '--gng-t-bg-app': '#180a0a',       // Deep warm dark
      '--gng-t-bg-card': '#251111',
      '--gng-t-text-main': '#fff1f2',
      '--gng-t-text-muted': '#fca5a5'
    }
  },
  {
    id: 'matrix-code',
    displayName: 'Matrix Code',
    isDark: true,
    variables: {
      '--gng-t-primary': '#22c55e',      // Green 500
      '--gng-t-primary-rgb': '34, 197, 94',
      '--gng-t-bg-app': '#050505',       // Pure black
      '--gng-t-bg-card': '#0a0a0a',
      '--gng-t-text-main': '#dcfce7',
      '--gng-t-text-muted': '#4ade80',
      '--gng-t-glass-border': 'rgba(34, 197, 94, 0.2)'
    }
  },
  {
    id: 'vaporwave',
    displayName: 'Vaporwave',
    isDark: true,
    variables: {
      '--gng-t-primary': '#06b6d4',      // Cyan 500
      '--gng-t-primary-rgb': '6, 182, 212',
      '--gng-t-bg-app': '#1e1b4b',       // Indigo 950
      '--gng-t-bg-card': '#312e81',
      '--gng-t-text-main': '#fdf2ff',
      '--gng-t-text-muted': '#d8b4fe',
      '--gng-t-primary-hover': '#c084fc'  // Purple 400
    }
  },
  {
    id: 'royal-gold',
    displayName: 'Royal Gold',
    isDark: true,
    variables: {
      '--gng-t-primary': '#eab308',      // Yellow 500
      '--gng-t-primary-rgb': '234, 179, 8',
      '--gng-t-bg-app': '#0f172a',       // Slate 900
      '--gng-t-bg-card': '#1e293b',
      '--gng-t-text-main': '#fefce8',
      '--gng-t-text-muted': '#fde047'
    }
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),
    importProvidersFrom(DialogModule),
    provideGngThemes({
      themes: customThemes,
      defaultThemeId: 'dark'
    })
  ],
};
