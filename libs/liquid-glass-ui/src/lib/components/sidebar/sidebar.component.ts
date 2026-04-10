import { 
  Component, 
  Input, 
  model, 
  signal, 
  computed, 
  contentChildren, 
  AfterViewInit, 
  inject, 
  NgZone, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LiquidSidebarItemComponent } from './sidebar-item.component';

@Component({
  selector: 'lg-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav 
      class="lg-sidebar" 
      [class.is-collapsed]="isCollapsed()"
      [class.is-mobile-open]="isMobileOpen()"
      [attr.aria-expanded]="!isCollapsed()"
      role="navigation"
    >
      <!-- Logo / Header -->
      <div class="lg-sidebar-header">
        <ng-content select="[header]"></ng-content>
      </div>

      <!-- Main Navigation -->
      <div class="lg-sidebar-content" #scrollContainer>
        <!-- Liquid Active Indicator Capsule -->
        <div 
          class="lg-active-indicator"
          [style.transform]="activeTransform()"
          [style.opacity]="hasActiveItem() ? 1 : 0"
        ></div>

        <div class="lg-sidebar-items-wrapper">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Footer -->
      <div class="lg-sidebar-footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </nav>
  `,
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidSidebarComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();

  /** Two-way bindable expansion state */
  isCollapsed = model<boolean>(false);
  
  /** Mobile-only side drawer state */
  isMobileOpen = signal<boolean>(false);

  /** All sidebar items projected into the component */
  items = contentChildren(LiquidSidebarItemComponent);

  /** Current Y offset for the liquid indicator */
  private _indicatorY = signal<number>(0);
  
  /** Whether there is an active item to show the indicator */
  hasActiveItem = signal<boolean>(false);

  /** Transform string for the indicator physics */
  activeTransform = computed(() => `translateY(${this._indicatorY()}px)`);

  constructor() {
    // Escuchar cambios de ruta para re-calcular posición
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      // Pequeño delay para permitir que routerLinkActive refresque clases
      setTimeout(() => this.updateIndicator(), 50);
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateIndicator(), 200);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Recalculates the active indicator position based on the currently
   * active sidebar item.
   */
  public updateIndicator() {
    const activeItem = this.items().find(item => item.isActive);
    
    if (activeItem) {
      this._indicatorY.set(activeItem.offsetTop);
      this.hasActiveItem.set(true);
    } else {
      this.hasActiveItem.set(false);
    }
  }

  /** Public API to toggle collapse */
  toggle() {
    this.isCollapsed.update(v => !v);
  }

  /** Public API for mobile toggle */
  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }
}
