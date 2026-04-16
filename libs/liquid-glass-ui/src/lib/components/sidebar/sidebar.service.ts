import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class LiquidSidebarService {
  /** Global collapsed state of the sidebar */
  isCollapsed = signal<boolean>(false);

  /**
   * Active item Y position tracking.
   * Centralized here so children can trigger updates easily.
   */
  private readonly _activeItemY = signal<number>(0);
  activeItemY = this._activeItemY.asReadonly();

  /**
   * Whether an active item is currently present in the sidebar
   */
  hasActiveItem = signal<boolean>(false);

  /**
   * Se incrementa en NavigationEnd y en eventos de layout (expand/collapse, primer paint)
   * para que los ítems recalculen la cápsula sin depender solo del intervalo.
   */
  private readonly _layoutTick = signal(0);
  readonly layoutTick = this._layoutTick.asReadonly();

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe(() => this.notifyIndicatorLayout());
  }

  /**
   * Triggers a recalculation of the indicator position
   */
  updateIndicator(y: number, active: boolean = true) {
    this._activeItemY.set(y);
    this.hasActiveItem.set(active);
  }

  /** Pide a los ítems que vuelvan a medir (navegación, submenú, etc.). */
  notifyIndicatorLayout(): void {
    this._layoutTick.update((n) => n + 1);
  }

  /**
   * Expand/Collapse toggle helper
   */
  toggle() {
    this.isCollapsed.update((v) => !v);
  }
}
