import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { LgTopbarUser } from './topbar.types';

/**
 * Glass Topbar — SDD 20.
 * Shell horizontal: start (menú móvil + proyección), centro (búsqueda), end (acciones + usuario).
 *
 * Patrón shell: `(sidebarToggle)` conecta con `LiquidSidebarComponent.toggleMobile()`.
 */
@Component({
  selector: 'lg-topbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="lg-topbar"
      [class.lg-topbar--sticky]="fixed()"
      [class.lg-topbar--scrolled]="isScrolled()"
      role="banner"
      [attr.aria-labelledby]="title() ? titleElementId() : null"
      [attr.aria-label]="title() ? null : 'Barra de aplicación'"
    >
      <div class="lg-topbar-start">
        @if (isMobile()) {
          <button
            type="button"
            class="lg-topbar-icon-btn"
            (click)="sidebarToggle.emit()"
            aria-label="Abrir menú de navegación"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        }
        <ng-content select="[lgTopbarStart]"></ng-content>
        @if (title()) {
          <h1 class="lg-topbar-title" [id]="titleElementId()">{{ title() }}</h1>
        }
      </div>

      <div class="lg-topbar-center" [class.lg-topbar-center--hidden-mobile]="isMobile()">
        <div class="lg-topbar-search">
          <ng-content select="[lgTopbarSearch]"></ng-content>
        </div>
      </div>

      <div class="lg-topbar-end">
        @if (isMobile()) {
          <button
            type="button"
            class="lg-topbar-icon-btn lg-topbar-search-trigger"
            (click)="searchToggle.emit()"
            aria-label="Abrir búsqueda"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        }
        <ng-content select="[lgTopbarActions]"></ng-content>
        @if (user(); as u) {
          @if (u.avatarUrl) {
            <img class="lg-topbar-avatar" [src]="u.avatarUrl" [alt]="avatarAlt()" />
          } @else {
            <span class="lg-topbar-avatar-fallback" [attr.aria-label]="avatarAlt()">{{ initials() }}</span>
          }
          <span class="lg-topbar-user-label">{{ u.name }}</span>
        }
      </div>
    </header>
  `,
  styleUrl: './topbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TopbarComponent {
  private static _titleIdSeq = 0;
  private readonly _autoTitleId = `lg-topbar-title-${++TopbarComponent._titleIdSeq}`;
  private readonly _destroyRef = inject(DestroyRef);

  /** Título de sección (visible en start). */
  title = input<string>('');

  /** Id del `h1` para `aria-labelledby` (varias instancias en página). */
  headingDomId = input<string | undefined>(undefined);

  /** Usuario para avatar / iniciales. */
  user = input<LgTopbarUser | null>(null);

  /** Sticky al tope del viewport. */
  fixed = input<boolean>(true);

  /** Pulsado en móvil: abrir/cerrar sidebar (conectar con `sidebar.toggleMobile()`). */
  readonly sidebarToggle = output<void>();

  /** Pulsado en móvil: abrir búsqueda (modal u overlay propio de la app). */
  readonly searchToggle = output<void>();

  readonly isScrolled = signal(false);
  readonly isMobile = signal(false);

  readonly titleElementId = computed(
    () => this.headingDomId() ?? this._autoTitleId,
  );

  readonly initials = computed(() => {
    const u = this.user();
    if (!u?.name?.trim()) return '?';
    const parts = u.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  });

  readonly avatarAlt = computed(() => {
    const u = this.user();
    return u?.name ? `Avatar de ${u.name}` : 'Avatar de usuario';
  });

  constructor() {
    const mq = matchMedia('(max-width: 767px)');
    const syncMq = () => this.isMobile.set(mq.matches);
    syncMq();
    mq.addEventListener('change', syncMq);
    this._destroyRef.onDestroy(() => mq.removeEventListener('change', syncMq));
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const y =
      typeof window !== 'undefined'
        ? window.scrollY || document.documentElement.scrollTop || 0
        : 0;
    this.isScrolled.set(y > 6);
  }
}
