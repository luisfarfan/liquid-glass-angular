import { Injectable, signal, effect, inject, computed } from '@angular/core';
import { 
  LGThemeConfig, 
  LG_THEME_CONFIG, 
  LGThemeDefinition 
} from './theme.models';

/**
 * Servicio de Temas (Refactorizado)
 * Proporciona una arquitectura extensible para gestionar temas integrados y personalizados.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private config = inject(LG_THEME_CONFIG);

  /**
   * Colección de temas registrados (base + dinámicos).
   */
  private _themes = signal<LGThemeDefinition[]>([...this.config.themes]);

  /**
   * Signal reactiva para el ID del tema actual.
   */
  private _currentThemeId = signal<string>(this.getInitialThemeId());

  /**
   * Exposición pública de lectura.
   */
  readonly currentTheme = this._currentThemeId.asReadonly();
  
  /**
   * Definición completa del tema actual.
   */
  readonly currentThemeDefinition = computed(() => 
    this._themes().find(t => t.id === this._currentThemeId()) || this._themes()[0]
  );

  /**
   * Lista de temas disponibles.
   */
  readonly availableThemes = this._themes.asReadonly();

  constructor() {
    // Sincronizar cambios con el DOM y almacenamiento
    effect(() => {
      const theme = this.currentThemeDefinition();
      this.applyTheme(theme);
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.config.storageKey, theme.id);
      }
    });
  }

  /**
   * Registra un nuevo tema en tiempo de ejecución.
   */
  registerTheme(theme: LGThemeDefinition) {
    this._themes.update(prev => {
      const exists = prev.findIndex(t => t.id === theme.id);
      if (exists !== -1) {
        const next = [...prev];
        next[exists] = theme;
        return next;
      }
      return [...prev, theme];
    });
  }

  /**
   * Cicla a través de todos los temas registrados.
   */
  toggleTheme() {
    const themes = this._themes();
    const currentIndex = themes.findIndex(t => t.id === this._currentThemeId());
    const nextIndex = (currentIndex + 1) % themes.length;
    this._currentThemeId.set(themes[nextIndex].id);
  }

  /**
   * Establece un tema específico por su ID.
   */
  setTheme(themeId: string) {
    const exists = this._themes().some(t => t.id === themeId);
    if (!exists) {
      console.warn(`[ThemeService] Intento de establecer un tema no registrado: ${themeId}`);
      return;
    }
    this._currentThemeId.set(themeId);
  }

  /**
   * Determina el tema inicial basado en almacenamiento o preferencias del sistema.
   */
  private getInitialThemeId(): string {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.config.storageKey);
      if (saved && this.config.themes.some(t => t.id === saved)) {
        return saved;
      }
    }

    // Opcional: Detección automática de preferencia de color si el default es 'dark' o 'light'
    if (typeof window !== 'undefined' && window.matchMedia) {
      const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (isLightMode && this._themes().some(t => t.id === 'light')) {
        return 'light';
      }
    }

    return this.config.defaultThemeId;
  }

  /**
   * Lógica interna para manipular las clases y variables en el tag <html>.
   */
  private applyTheme(theme: LGThemeDefinition) {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    // 1. Limpiar todas las posibles clases de temas registrados
    const allThemeClasses = this._themes()
      .map(t => t.class)
      .filter((c): c is string => !!c);
    
    html.classList.remove(...allThemeClasses);

    // 2. Aplicar clase del nuevo tema si existe
    if (theme.class) {
      html.classList.add(theme.class);
    }

    // 3. Gestionar variables dinámicas
    this.clearDynamicVariables();
    if (theme.variables) {
      Object.entries(theme.variables).forEach(([key, value]) => {
        html.style.setProperty(key, value);
      });
    }
  }

  /**
   * Limpia las variables CSS inyectadas anteriormente en el style inline del :root.
   */
  private clearDynamicVariables() {
    if (typeof document === 'undefined') return;
    
    // Solo removemos las variables que coinciden con nuestro prefijo de tokens
    const html = document.documentElement;
    const style = html.getAttribute('style');
    if (!style) return;

    // Buscamos todas las variables --lg-t-* en el atributo style para limpiarlas
    const tokens = style.split(';').filter(s => s.trim().startsWith('--lg-t-'));
    tokens.forEach(t => {
      const key = t.split(':')[0].trim();
      html.style.removeProperty(key);
    });
  }
}
