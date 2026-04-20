import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GngFormLayout
 * A premium grid-based layout container for grouping multiple GngFormFields 
 * with cinematic alignment and responsive spacing.
 */
@Component({
  selector: 'gng-form-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-form-layout grid" [ngClass]="[gridClass(), gapClass()]" [class]="customClass()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './form-layout.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngFormLayout {
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
