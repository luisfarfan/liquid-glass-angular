import { Injectable, signal, effect } from '@angular/core';

export type LGTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /**
   * Signal reactiva para el tema actual.
   * Inicializa desde localStorage o defecto 'dark' (Vision Liquid Glass).
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
   * Alterna entre light y dark mode.
   */
  toggleTheme() {
    this._theme.update((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  /**
   * Establece un tema específico.
   */
  setTheme(theme: LGTheme) {
    this._theme.set(theme);
  }

  /**
   * Lógica interna para manipular las clases en el tag <html>.
   * Usamos 'light-theme' ya que 'dark-theme' es el default (:root).
   */
  private applyTheme(theme: LGTheme) {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light-theme');
    } else {
      html.classList.remove('light-theme');
    }
  }
}
