import { Component, Input, ElementRef, inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lg-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <button 
      class="lg-sidebar-item"
      [routerLink]="link"
      routerLinkActive="is-active"
      #rla="routerLinkActive"
      [attr.aria-current]="rla.isActive ? 'page' : null"
    >
      <div class="lg-sidebar-item-icon">
        <ng-content select="[icon]"></ng-content>
      </div>
      
      <span class="lg-sidebar-item-label">
        <ng-content></ng-content>
      </span>

      <!-- Optional Badge -->
      <div *ngIf="badge" class="lg-sidebar-item-badge">
        {{ badge }}
      </div>
    </button>
  `,
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidSidebarItemComponent {
  public elementRef = inject(ElementRef);

  @Input() link: string | any[] = '/';
  @Input() badge?: string | number;

  /** Used by parent to track active state for liquid indicator */
  get isActive(): boolean {
    const btn = this.elementRef.nativeElement.querySelector('.lg-sidebar-item');
    return btn?.classList.contains('is-active') ?? false;
  }

  /** Gets the relative Y position of this item */
  get offsetTop(): number {
    return this.elementRef.nativeElement.offsetTop;
  }
}
