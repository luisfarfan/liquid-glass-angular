import { Injectable, signal, effect } from '@angular/core';

export type LGTheme = 'light' | 'dark' | 'cyberpunk' | 'emerald';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /**
   * Signal reactiva para el tema actual.
   * Inicializa desde localStorage o defecto 'dark'.
   */
  private _theme = signal<LGTheme>(
    (localStorage.getItem('lg-theme') as LGTheme) || 'dark'
  );

  /**
   * Exposición pública de lectura.
   */
  readonly currentTheme = this._theme.asReadonly();

  constructor() {
    // Sincronizar cambios de la señal con el DOM y localStorage automaticamente
    effect(() => {
      const theme = this._theme();
      this.applyTheme(theme);
      localStorage.setItem('lg-theme', theme);
    });
  }

  /**
   * Cicla a través de todos los temas disponibles.
   */
  toggleTheme() {
    const themes: LGTheme[] = ['light', 'dark', 'cyberpunk', 'emerald'];
    const currentIndex = themes.indexOf(this._theme());
    const nextIndex = (currentIndex + 1) % themes.length;
    this._theme.set(themes[nextIndex]);
  }

  /**
   * Establece un tema específico.
   */
  setTheme(theme: LGTheme) {
    this._theme.set(theme);
  }

  /**
   * Lógica interna para manipular las clases en el tag <html>.
   * Limpia temas anteriores y aplica el nuevo si no es el default.
   */
  private applyTheme(theme: LGTheme) {
    const html = document.documentElement;
    const themeClasses = ['light-theme', 'cyberpunk-theme', 'emerald-theme'];
    
    // Remover todos los temas posibles
    html.classList.remove(...themeClasses);
    
    // Aplicar el nuevo si no es 'dark' (el default :root)
    if (theme !== 'dark') {
      html.classList.add(`${theme}-theme`);
    }
  }
}
