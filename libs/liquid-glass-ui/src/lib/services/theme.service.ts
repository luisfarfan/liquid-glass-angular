import { Injectable, signal, effect, inject, computed } from '@angular/core';
import { 
  LGThemeConfig, 
  LG_THEME_CONFIG, 
  LGThemeDefinition 
} from './theme.models';

/**
 * Servicio de Temas (Optimizado para Alto Rendimiento)
 * Gestiona temas mediante señales y manipulación del DOM optimizada.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly config = inject(LG_THEME_CONFIG);

  // Estado interno para evitar recalculaciones costosas y layout thrashing
  private _lastThemeClass: string | null = null;
  private _appliedVariableKeys: string[] = [];

  /**
   * Colección de temas registrados.
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
    // Sincronizar cambios con el DOM de forma eficiente
    effect(() => {
      const theme = this.currentThemeDefinition();
      this.applyTheme(theme);
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.config.storageKey, theme.id);
      }
    });
  }

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

  toggleTheme() {
    const themes = this._themes();
    const currentIndex = themes.findIndex(t => t.id === this._currentThemeId());
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex].id);
  }

  setTheme(themeId: string) {
    if (this._currentThemeId() === themeId) return;
    
    const exists = this._themes().some(t => t.id === themeId);
    if (!exists) {
      console.warn(`[ThemeService] Intento de establecer un tema no registrado: ${themeId}`);
      return;
    }
    this._currentThemeId.set(themeId);
  }

  private getInitialThemeId(): string {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.config.storageKey);
      if (saved && this.config.themes.some(t => t.id === saved)) {
        return saved;
      }
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (isLightMode && this._themes().some(t => t.id === 'light')) {
        return 'light';
      }
    }

    return this.config.defaultThemeId;
  }

  /**
   * Aplica el tema al DOM optimizando las operaciones para evitar lag.
   */
  private applyTheme(theme: LGThemeDefinition) {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    /**
     * TRUCO DE RENDIMIENTO: Desactivar transiciones temporalmente.
     * Esto evita que el navegador intente animar todos los elementos de la página
     * simultáneamente al cambiar las variables CSS, lo cual causa el "lag" reportado.
     */
    html.classList.add('lg-no-transitions');

    // 1. Manejo eficiente de clases (solo remover la anterior)
    if (this._lastThemeClass) {
      html.classList.remove(this._lastThemeClass);
    }
    
    if (theme.class) {
      html.classList.add(theme.class);
      this._lastThemeClass = theme.class;
    } else {
      this._lastThemeClass = null;
    }

    // 2. Gestión de variables dinámicas mediante caché (sin parseo de strings)
    // Primero limpiamos las variables anteriores que ya no existen o han cambiado
    this._appliedVariableKeys.forEach(key => {
      if (!theme.variables?.[key]) {
        html.style.removeProperty(key);
      }
    });

    // Luego aplicamos las nuevas
    const newKeys: string[] = [];
    if (theme.variables) {
      Object.entries(theme.variables).forEach(([key, value]) => {
        html.style.setProperty(key, value);
        newKeys.push(key);
      });
    }
    this._appliedVariableKeys = newKeys;

    /**
     * Forzamos un pequeño reflow para que los cambios se asienten antes de reactivar transiciones.
     * Luego reactivamos de forma asíncrona para que el frame de renderizado sea fluido.
     */
    void html.offsetHeight; // force reflow
    
    requestAnimationFrame(() => {
      html.classList.remove('lg-no-transitions');
    });
  }
}
