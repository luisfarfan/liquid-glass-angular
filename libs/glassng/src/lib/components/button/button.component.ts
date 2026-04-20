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
import { GngRipple } from './ripple.directive';
import { 
  GNG_BUTTON_DEFAULT_OPTIONS, 
  ButtonVariant, 
  ButtonSize, 
  ButtonShape
} from '../../core/component-options';

/**
 * Glass Button Component
 * Selector: button[gng-button], a[gng-button]
 */
@Component({
  selector: 'button[gng-button], a[gng-button]',
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [
    {
      directive: GngRipple,
      inputs: ['enabled: enableRipple']
    }
  ],
  template: `
    <!-- Glass Shine Effect -->
    <div class="gng-glass-shine"></div>

    <div class="relative z-10 flex items-center justify-center gap-2" [class.opacity-0]="isLoading()">
      <!-- Prefix Icon Slot -->
      <ng-content select="[gng-icon-left]"></ng-content>
      
      <!-- Main Content Container -->
      <span [class.truncate]="!iconOnly()" [class.contents]="iconOnly()">
        <ng-content></ng-content>
      </span>

      <!-- Suffix Icon Slot -->
      <ng-content select="[gng-icon-right]"></ng-content>
    </div>

    @if (isLoading()) {
      <span class="absolute inset-0 flex items-center justify-center z-20">
        <div class="gng-loading-spinner"></div>
      </span>
    }
  `,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-gng-id]': '"gng-button"',
    '[attr.disabled]': 'disabled() || isLoading() ? true : null',
    '[attr.aria-busy]': 'isLoading()',
    '[attr.aria-disabled]': 'disabled() || isLoading()',
    '[attr.aria-label]': 'ariaLabel()',
  },
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GngButton {
  private readonly _defaultOptions = inject(GNG_BUTTON_DEFAULT_OPTIONS, { optional: true });

  // Inputs via Signals
  variant = input<ButtonVariant>(this._defaultOptions?.variant ?? 'secondary');
  size = input<ButtonSize>(this._defaultOptions?.size ?? 'md');
  shape = input<ButtonShape>(this._defaultOptions?.shape ?? 'default');
  fullWidth = input<boolean>(this._defaultOptions?.fullWidth ?? false);
  
  iconOnly = input<boolean>(false);
  ariaLabel = input<string | null>(null);
  enableHaptics = input<boolean>(this._defaultOptions?.enableHaptics ?? true);
  /** Ink ripple on pointer down (host directive). Disable for dense controls (e.g. pagination). */
  enableRipple = input<boolean>(true);
  
  // New States
  disabled = input<boolean>(false);
  isLoading = input<boolean>(false);

  /** Clases calculadas para el host */
  readonly hostClasses = computed(() => {
    const v = this.variant();
    const s = this.size();
    const shape = this.shape();
    const isIcon = this.iconOnly();
    const isFull = this.fullWidth();
    const isDisabled = this.disabled() || this.isLoading();
    
    const base = 'inline-flex items-center justify-center font-bold gng-transition-glass gng-focus-ring gng-active-scale gng-btn-neon whitespace-nowrap overflow-hidden relative';
    
    const stateClasses = isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none grayscale-[0.5]' : 'cursor-pointer';
    
    const variantClass = `gng-btn-${v}`;
    const sizeBaseClass = `gng-btn-${s}`;
    const iconClass = isIcon ? 'gng-btn-icon' : '';
    const fullClass = isFull ? 'gng-btn-full' : '';
    const shapeClass = shape !== 'default' ? `gng-btn-${shape}` : '';

    return `${base} ${stateClasses} ${variantClass} ${sizeBaseClass} ${iconClass} ${fullClass} ${shapeClass}`.trim();
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
