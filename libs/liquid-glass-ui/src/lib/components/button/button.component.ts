import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  inject, 
  computed,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from './ripple.directive';
import { 
  LG_BUTTON_DEFAULT_OPTIONS, 
  ButtonVariant, 
  ButtonSize 
} from '../../core/component-options';

/**
 * Glass Button Component
 * Selector: button[lg-button], a[lg-button]
 */
@Component({
  selector: 'button[lg-button], a[lg-button]',
  standalone: true,
  imports: [CommonModule, RippleDirective],
  template: `
    <span class="relative z-10 flex items-center justify-center gap-2">
      <ng-content></ng-content>
    </span>
  `,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-lg-id]': '"lg-button"',
    'lgRipple': '' // Aplica la directiva de ripple automáticamente
  },
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  private readonly _defaultOptions = inject(LG_BUTTON_DEFAULT_OPTIONS, { optional: true });

  // Inputs via Signals
  variant = input<ButtonVariant>(this._defaultOptions?.variant ?? 'secondary');
  size = input<ButtonSize>(this._defaultOptions?.size ?? 'md');
  isIconOnly = input<boolean>(this._defaultOptions?.testId ? true : false); // Placeholder logic
  enableHaptics = input<boolean>(this._defaultOptions?.enableHaptics ?? true);

  /** Clases calculadas para el host */
  readonly hostClasses = computed(() => {
    const v = this.variant();
    const s = this.size();
    
    const base = 'inline-flex items-center justify-center font-bold lg-transition-glass lg-focus-ring lg-active-scale lg-btn-neon whitespace-nowrap overflow-hidden';
    
    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'lg-btn-primary',
      secondary: 'bg-glass border border-glass-border backdrop-blur-md text-[var(--lg-t-text-main)] hover:bg-white/10',
      ghost: 'bg-transparent text-[var(--lg-t-text-main)] hover:bg-white/5',
      destructive: 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-5 py-2.5 text-sm rounded-[calc(var(--lg-g-unit)*2.5)]',
      lg: 'px-8 py-3.5 text-base rounded-2xl'
    };

    return `${base} ${variantClasses[v]} ${sizeClasses[s]}`.trim();
  });

  @HostListener('click')
  onPointerDown() {
    if (this.enableHaptics() && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  }
}
