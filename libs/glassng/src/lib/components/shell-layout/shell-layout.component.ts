import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

/**
 * GngShell
 * Premium high-fidelity layout container that coordinates sidebars, topbars, 
 * and main content with cinematic glassmorphism transitions.
 *
 * Accessibility: CDK FocusTrap ensures interaction is contained within the sidebar
 * when the backdrop is active on mobile surfaces.
 */
@Component({
  selector: 'gng-shell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="gng-shell"
      [class.gng-shell--backdrop-open]="backdropVisible()"
    >
      <div
        #sidebarRegion
        class="gng-shell__sidebar-slot"
        role="presentation"
      >
        <ng-content select="[gngShellSidebar]"></ng-content>
      </div>
      @if (backdropVisible()) {
        <button
          type="button"
          [ngClass]="backdropButtonClasses()"
          [attr.aria-label]="backdropDismissLabel()"
          (click)="backdropDismiss.emit()"
        ></button>
      }
      <div
        class="gng-shell__main"
        role="region"
        [attr.aria-label]="mainRegionLabel()"
        [style.margin-left]="contentInset()"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './shell-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GngShell {
  private readonly destroyRef = inject(DestroyRef);
  private readonly focusTrapFactory = inject(FocusTrapFactory);

  private readonly sidebarRegion = viewChild<ElementRef<HTMLElement>>('sidebarRegion');
  private focusTrap: FocusTrap | null = null;

  /** Margen izquierdo de la columna principal (p. ej. `0`, `GNG_SHELL_SIDEBAR_*_INSET`). */
  contentInset = input<string>('0');

  /** Muestra el scrim (típico en móvil con drawer `over`). */
  backdropVisible = input<boolean>(false);

  /** Clases CSS extra para el backdrop (string con espacios). */
  backdropClass = input<string | undefined>(undefined);

  /** Accesible name del botón-scrim (i18n). */
  backdropDismissLabel = input<string>('Dismiss navigation');

  /** Nombre accesible de la región principal (topbar + contenido). */
  mainRegionLabel = input<string>('Application content');

  /** El usuario pulsó el scrim. */
  readonly backdropDismiss = output<void>();

  readonly backdropButtonClasses = computed(() => {
    const extra =
      this.backdropClass()
        ?.trim()
        .split(/\s+/)
        .filter(Boolean) ?? [];
    return ['gng-shell__backdrop', ...extra];
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.releaseFocusTrap());

    effect(() => {
      const open = this.backdropVisible();
      this.releaseFocusTrap();

      if (!open) {
        return;
      }

      const region = this.sidebarRegion()?.nativeElement;
      if (!region) {
        return;
      }

      queueMicrotask(() => {
        if (!this.backdropVisible()) {
          return;
        }
        const el = this.sidebarRegion()?.nativeElement;
        if (!el) {
          return;
        }
        this.focusTrap = this.focusTrapFactory.create(el, true);
        void this.focusTrap.focusInitialElementWhenReady();
      });
    });
  }

  private releaseFocusTrap(): void {
    this.focusTrap?.destroy();
    this.focusTrap = null;
  }
}
