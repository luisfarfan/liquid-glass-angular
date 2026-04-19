import {
  Component,
  model,
  signal,
  computed,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  effect,
  afterNextRender,
  Injector,
} from '@angular/core';
import { LiquidSidebarService } from './sidebar.service';

@Component({
  selector: 'lg-sidebar',
  standalone: true,
  imports: [],
  providers: [LiquidSidebarService],
  template: `
    <nav 
      class="lg-sidebar" 
      [class.is-collapsed]="service.isCollapsed()"
      [class.is-mobile-open]="isMobileOpen()"
      [attr.aria-expanded]="!service.isCollapsed()"
      role="navigation"
    >
      <!-- Logo / Header -->
      <div class="lg-sidebar-header">
        <ng-content select="[header]"></ng-content>
      </div>
 
      <!-- Main Navigation -->
      <div class="lg-sidebar-content">
        <!-- Liquid Active Indicator Capsule V2 -->
        <div 
          class="lg-active-indicator"
          [style.transform]="activeTransform()"
          [style.opacity]="service.hasActiveItem() ? 1 : 0"
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
export class LiquidSidebarComponent {
  public readonly service = inject(LiquidSidebarService);
  private readonly injector = inject(Injector);
  
  /** Two-way bindable expansion state. Syncs with service. */
  public readonly isCollapsed = model(false);
  
  /** Mobile-only side drawer state */
  public readonly isMobileOpen = signal(false);

  /** Transform del indicador: centrado horizontal en rail colapsado */
  public readonly activeTransform = computed(() => {
    const yRem = this.service.activeItemY() / 16;
    if (this.service.isCollapsed()) {
      return `translateX(-50%) translateY(${yRem}rem)`;
    }
    return `translateY(${yRem}rem)`;
  });

  constructor() {
    // Sync external model with internal service state
    effect(() => {
      const val = this.isCollapsed();
      if (this.service.isCollapsed() !== val) {
        this.service.isCollapsed.set(val);
      }
    });

    effect(() => {
      const val = this.service.isCollapsed();
      if (this.isCollapsed() !== val) {
        this.isCollapsed.set(val);
      }
    });

    // --- CENTRALIZED INDICATOR LOGIC ---
    effect(() => {
      const activeItem = this.service.activeItem();
      this.service.layoutTick(); // Reactive dependency

      if (!activeItem) {
        this.service.updateIndicator(0, false);
        return;
      }

      // We need to wait for the DOM to settle (animations, routerLinkActive classes)
      afterNextRender(() => {
        const anchor = activeItem.getIndicatorAnchor();
        if (!anchor) {
          this.service.updateIndicator(0, false);
          return;
        }

        const rect = anchor.getBoundingClientRect();
        const content = anchor.closest('.lg-sidebar-content') as HTMLElement | null;
        
        if (!content || rect.height === 0) {
          this.service.updateIndicator(0, false);
          return;
        }

        const contentRect = content.getBoundingClientRect();
        const y = rect.top - contentRect.top + content.scrollTop;
        
        this.service.updateIndicator(y, true);
      }, { injector: this.injector });
    });
  }

  /** Public API to toggle collapse */
  toggle() {
    this.service.toggle();
  }

  /** Public API for mobile toggle */
  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }
}
