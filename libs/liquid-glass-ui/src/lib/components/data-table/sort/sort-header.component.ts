import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, HostListener, HostBinding, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LgSortDirective } from './sort.directive';

@Component({
  selector: '[lg-sort-header]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-sort-header-container">
      <ng-content></ng-content>
      
      <div class="lg-sort-header-arrow" [class.is-active]="isActive()">
        <i [class]="getIcon()"></i>
      </div>
    </div>
  `,
  styleUrl: '../data-table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgSortHeaderComponent {
  private readonly sort = inject(LgSortDirective, { optional: true });

  @Input('lg-sort-header') id!: string;

  /** ARIA & Accessibility */
  @HostBinding('attr.role') readonly role = 'button';
  @HostBinding('attr.tabindex') readonly tabIndex = 0;
  @HostBinding('attr.aria-label') get ariaLabel() { return `Sort by ${this.id}`; }
  
  @HostBinding('class.is-sort-active') get sortActiveClass() { return this.isActive(); }
  @HostBinding('class.is-sortable') readonly isSortable = true;

  isActive = computed(() => this.sort?.active() === this.id);
  direction = computed(() => this.isActive() ? this.sort?.direction() : '');

  @HostListener('click')
  @HostListener('keydown.enter')
  toggle() {
    if (this.sort && this.id) {
      this.sort.sort(this.id);
    }
  }

  getIcon(): string {
    const dir = this.direction();
    if (dir === 'asc') return 'ri-arrow-up-s-line';
    if (dir === 'desc') return 'ri-arrow-down-s-line';
    return 'ri-sort-asc-desc';
  }
}
