import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class LiquidSidebarService {
  /** Global collapsed state of the sidebar */
  isCollapsed = signal<boolean>(false);

  /** 
   * Active item Y position tracking.
   * Centralized here so children can trigger updates easily.
   */
  private _activeItemY = signal<number>(0);
  activeItemY = this._activeItemY.asReadonly();

  /** 
   * Whether an active item is currently present in the sidebar 
   */
  hasActiveItem = signal<boolean>(false);

  /** 
   * Triggers a recalculation of the indicator position 
   */
  updateIndicator(y: number, active: boolean = true) {
    this._activeItemY.set(y);
    this.hasActiveItem.set(active);
  }

  /**
   * Expand/Collapse toggle helper
   */
  toggle() {
    this.isCollapsed.update(v => !v);
  }
}
