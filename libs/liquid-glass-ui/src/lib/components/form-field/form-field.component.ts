import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Form Field Component
 * A layout container for grouping inputs and form controls.
 */
@Component({
  selector: 'lg-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-form-field flex flex-col gap-1 w-full" [class]="layoutClass()">
      <div class="grid gap-4" [ngClass]="gridClass()">
        <ng-content></ng-content>
      </div>
      
      @if (hint()) {
        <span class="text-[10px] opacity-30 mt-1 uppercase tracking-wider font-bold">
          {{ hint() }}
        </span>
      }
    </div>
  `,
  styles: [`
    .lg-form-field {
      margin-bottom: 1.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent {
  /** Número de columnas para el layout (1 a 4) */
  cols = input<1 | 2 | 3 | 4>(1);
  
  /** Una pequeña nota o pista para todo el grupo */
  hint = input<string | null>(null);

  gridClass = computed(() => {
    const c = this.cols();
    if (c === 1) return 'grid-cols-1';
    if (c === 2) return 'grid-cols-2';
    if (c === 3) return 'grid-cols-3';
    if (c === 4) return 'grid-cols-4';
    return 'grid-cols-1';
  });

  layoutClass = input<string>('');
}
