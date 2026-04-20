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
import { GngSidebarService } from './sidebar.service';

/**
 * GngSidebar
 * Premium side navigation with glassmorphism, indicators and rail/drawer modes.
 */
@Component({
  selector: 'gng-sidebar',
  standalone: true,
  imports: [],
  providers: [GngSidebarService],
  template: `
    <nav 
      class="gng-sidebar" 
      [class.is-collapsed]="service.isCollapsed()"
      [class.is-mobile-open]="isMobileOpen()"
      [attr.aria-expanded]="!service.isCollapsed()"
      role="navigation"
    >
      <!-- Logo / Header -->
      <div class="gng-sidebar-header">
        <ng-content select="[header]"></ng-content>
      </div>
 
      <!-- Main Navigation -->
      <div class="gng-sidebar-content">
        <!-- Gng Active Indicator Capsule -->
        <div 
          class="gng-active-indicator"
          [style.transform]="activeTransform()"
          [style.opacity]="service.hasActiveItem() ? 1 : 0"
        ></div>

        <div class="gng-sidebar-items-wrapper">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Footer -->
      <div class="gng-sidebar-footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </nav>
  `,
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngSidebar {
  public readonly service = inject(GngSidebarService);
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

    // Indicator logic
    effect(() => {
      const activeItem = this.service.activeItem();
      this.service.layoutTick(); 

      if (!activeItem) {
        this.service.updateIndicator(0, false);
        return;
      }

      afterNextRender(() => {
        const anchor = activeItem.getIndicatorAnchor();
        if (!anchor) {
          this.service.updateIndicator(0, false);
          return;
        }

        const rect = anchor.getBoundingClientRect();
        const content = anchor.closest('.gng-sidebar-content') as HTMLElement | null;
        
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
