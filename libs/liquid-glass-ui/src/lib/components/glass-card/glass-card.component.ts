import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LG_GLASS_CARD_DEFAULT_OPTIONS } from '../../core/component-options';

/**
 * GlassCardComponent 
 * Basado en SDD-06: Component Architecture Standards.
 */
@Component({
  selector: 'lg-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-lg-id]': '"lg-glass-card"',
    'tabindex': '0'
  },
  styles: [`
    lg-glass-card {
      display: block;
    }
    
    /* Efecto de elevación refinado */
    .lg-glass-card-hover:hover {
      border-color: var(--lg-t-primary);
      box-shadow: var(--lg-t-neon-shadow);
      transform: translateY(-4px);
    }
  `]
})
export class GlassCardComponent {
  private readonly _defaultOptions = inject(LG_GLASS_CARD_DEFAULT_OPTIONS, { optional: true });

  /** Clases calculadas para el host */
  readonly hostClasses = computed(() => {
    const baseClasses = [
      'block',
      'p-6',
      'rounded-[var(--lg-g-radius-card)]',
      'bg-glass',
      'border',
      'border-glass-border',
      'backdrop-blur-[var(--lg-t-glass-blur)]',
      'lg-transition-glass',
      'lg-focus-ring',
      'lg-glass-card-hover',
      'cursor-pointer'
    ].join(' ');
    
    const customClass = this._defaultOptions?.customClass ?? '';
    return `${baseClasses} ${customClass}`.trim();
  });
}
