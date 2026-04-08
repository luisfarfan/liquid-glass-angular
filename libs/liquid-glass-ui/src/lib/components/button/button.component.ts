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
    <!-- Glass Shine Effect -->
    <div class="lg-glass-shine"></div>

    <div class="relative z-10 flex items-center justify-center gap-2" [class.opacity-0]="isLoading()">
      <!-- Prefix Icon Slot -->
      <ng-content select="[lg-icon-left]"></ng-content>
      
      <!-- Main Content Container -->
      <span [class.truncate]="!iconOnly()" [class.contents]="iconOnly()">
        <ng-content></ng-content>
      </span>

      <!-- Suffix Icon Slot -->
      <ng-content select="[lg-icon-right]"></ng-content>
    </div>

    @if (isLoading()) {
      <span class="absolute inset-0 flex items-center justify-center z-20">
        <div class="lg-loading-spinner"></div>
      </span>
    }
  `,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-lg-id]': '"lg-button"',
    '[attr.disabled]': 'disabled() || isLoading() ? true : null',
    '[attr.aria-busy]': 'isLoading()',
    'lgRipple': '' 
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
  iconOnly = input<boolean>(false); 
  enableHaptics = input<boolean>(this._defaultOptions?.enableHaptics ?? true);
  
  // New States
  disabled = input<boolean>(false);
  isLoading = input<boolean>(false);

  /** Clases calculadas para el host */
  readonly hostClasses = computed(() => {
    const v = this.variant();
    const s = this.size();
    const isIcon = this.iconOnly();
    const isDisabled = this.disabled() || this.isLoading();
    
    const base = 'inline-flex items-center justify-center font-bold lg-transition-glass lg-focus-ring lg-active-scale lg-btn-neon whitespace-nowrap overflow-hidden relative';
    
    const stateClasses = isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none grayscale-[0.5]' : 'cursor-pointer';
    
    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'lg-btn-primary',
      secondary: 'bg-glass border border-glass-border backdrop-blur-md text-[var(--lg-t-text-main)] hover:bg-white/10',
      ghost: 'bg-transparent text-[var(--lg-t-text-main)] hover:bg-white/5 border border-transparent hover:border-glass-border',
      destructive: 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: isIcon ? 'w-8 h-8 rounded-lg' : 'px-3 py-1.5 text-xs rounded-lg',
      md: isIcon ? 'w-11 h-11 rounded-xl' : 'px-5 py-2.5 text-sm rounded-[calc(var(--lg-g-unit)*2.5)]',
      lg: isIcon ? 'w-14 h-14 rounded-2xl' : 'px-8 py-3.5 text-base rounded-2xl'
    };

    return `${base} ${stateClasses} ${variantClasses[v]} ${sizeClasses[s]}`.trim();
  });

  @HostListener('click', ['$event'])
  onPointerDown(event: Event) {
    if (this.disabled() || this.isLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.enableHaptics() && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  }
}
