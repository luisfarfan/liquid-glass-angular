import { 
  Component, 
  Input, 
  model, 
  signal, 
  computed, 
  inject, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidSidebarService } from './sidebar.service';
import { LiquidSidebarItemComponent } from './sidebar-item.component';

@Component({
  selector: 'lg-sidebar',
  standalone: true,
  imports: [CommonModule],
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
  public service = inject(LiquidSidebarService);
  
  /** Two-way bindable expansion state */
  isCollapsed = model<boolean>(false);
  
  /** Mobile-only side drawer state */
  isMobileOpen = signal<boolean>(false);

  /** Transform del indicador: centrado horizontal en rail colapsado */
  activeTransform = computed(() => {
    const yRem = this.service.activeItemY() / 16;
    if (this.service.isCollapsed()) {
      return `translateX(-50%) translateY(${yRem}rem)`;
    }
    return `translateY(${yRem}rem)`;
  });

  constructor() {
    // Sync model with service
    effect(() => {
      this.service.isCollapsed.set(this.isCollapsed());
    }, { allowSignalWrites: true });

    effect(() => {
      this.isCollapsed.set(this.service.isCollapsed());
    }, { allowSignalWrites: true });
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
