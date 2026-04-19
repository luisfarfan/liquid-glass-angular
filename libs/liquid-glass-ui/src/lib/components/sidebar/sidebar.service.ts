import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Interface for components that can be registered as active items in the sidebar.
 */
export interface ILiquidSidebarItem {
  getIndicatorAnchor(): HTMLElement | null;
  isActive: boolean;
}

@Injectable()
export class LiquidSidebarService {
  /** Global collapsed state of the sidebar */
  readonly isCollapsed = signal<boolean>(false);

  /**
   * Current active component responsible for the indicator position.
   */
  readonly activeItem = signal<ILiquidSidebarItem | null>(null);

  /**
   * Active item Y position tracking.
   */
  private readonly _activeItemY = signal<number>(0);
  readonly activeItemY = this._activeItemY.asReadonly();

  /**
   * Whether an active indicator should be visible
   */
  readonly hasActiveItem = signal<boolean>(false);

  /**
   * Internal clock synchronized with animations and navigation
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
      .subscribe(() => {
        requestAnimationFrame(() => this.notifyIndicatorLayout());
      });
  }

  /**
   * Registers which component is currently active.
   */
  setActiveItem(item: ILiquidSidebarItem | null) {
    if (this.activeItem() !== item) {
      this.activeItem.set(item);
      this.notifyIndicatorLayout();
    }
  }

  updateIndicator(y: number, active: boolean = true) {
    if (this._activeItemY() !== y) this._activeItemY.set(y);
    if (this.hasActiveItem() !== active) this.hasActiveItem.set(active);
  }

  /** Pide a la arquitectura que se re-sincronice. */
  notifyIndicatorLayout(): void {
    this._layoutTick.update((n) => n + 1);
  }

  /** Expand/Collapse toggle helper */
  toggle() {
    this.isCollapsed.update((v) => !v);
    requestAnimationFrame(() => this.notifyIndicatorLayout());
  }
}
