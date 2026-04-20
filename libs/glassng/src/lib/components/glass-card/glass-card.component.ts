import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GNG_GLASS_CARD_DEFAULT_OPTIONS } from '../../core/component-options';

/**
 * GngGlassCard 
 * Premium glass-morphism container for content blocks and dashboard widgets.
 */
@Component({
  selector: 'gng-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-gng-id]': '"gng-glass-card"',
    'tabindex': '0'
  },
  styles: [`
    gng-glass-card {
      display: block;
    }
    
    /* Gng Elevation Effect */
    .gng-glass-card-hover:hover {
      border-color: var(--gng-t-primary);
      box-shadow: var(--gng-t-neon-shadow);
      transform: translateY(-4px);
    }
  `]
})
export class GngGlassCard {
  private readonly _defaultOptions = inject(GNG_GLASS_CARD_DEFAULT_OPTIONS, { optional: true });

  /** Clases calculadas para el host */
  readonly hostClasses = computed(() => {
    const baseClasses = [
      'block',
      'p-6',
      'rounded-[var(--gng-g-radius-card)]',
      'bg-glass',
      'border',
      'border-glass-border',
      'backdrop-blur-[var(--gng-t-glass-blur)]',
      'gng-transition-glass',
      'gng-focus-ring',
      'gng-glass-card-hover',
      'cursor-pointer'
    ].join(' ');
    
    const customClass = this._defaultOptions?.customClass ?? '';
    return `${baseClasses} ${customClass}`.trim();
  });
}
