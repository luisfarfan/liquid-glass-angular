import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Form Layout Component
 * A grid-based layout container for grouping multiple FormFields.
 */
@Component({
  selector: 'lg-form-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-form-layout grid" [ngClass]="[gridClass(), gapClass()]" [class]="customClass()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './form-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormLayoutComponent {
  /** Número de columnas para el layout (1 a 4) */
  cols = input<1 | 2 | 3 | 4>(1);
  
  /** Espaciado entre campos */
  gap = input<'none' | 'sm' | 'md' | 'lg'>('md');

  /** Clase CSS adicional */
  customClass = input<string>('');

  gridClass = computed(() => {
    const c = this.cols();
    return `grid-cols-${c}`;
  });

  gapClass = computed(() => {
    const g = this.gap();
    return `gap-${g === 'none' ? '0' : g}`;
  });
}
