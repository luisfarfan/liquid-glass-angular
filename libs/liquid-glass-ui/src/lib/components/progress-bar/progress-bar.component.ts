import { 
  Component, 
  input, 
  computed, 
  effect, 
  output, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  inject,
  untracked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lg-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-progress-container" 
         [attr.role]="'progressbar'"
         [attr.aria-valuenow]="mode() === 'indeterminate' ? null : value()"
         [attr.aria-valuemin]="0"
         [attr.aria-valuemax]="100"
         [attr.aria-label]="ariaLabel()"
         [style.height]="thickness()"
         [attr.data-color]="color()"
         [attr.data-mode]="mode()"
         [class.is-complete]="isComplete()">
      
      <!-- Buffer Background Layer -->
      @if (mode() === 'buffer') {
        <div class="lg-progress-buffer" [style.width.%]="buffer()"></div>
      }

      <!-- Main Progress Fill -->
      <div class="lg-progress-fill" 
           [style.width.%]="mode() === 'indeterminate' ? 100 : value()">
        
        <!-- Refraction / Specular Highlight -->
        <div class="lg-progress-refraction"></div>
        
        <!-- Leading Edge Glow -->
        @if (mode() !== 'indeterminate' && value() > 0 && value() < 100) {
          <div class="lg-progress-glow"></div>
        }
      </div>

      <!-- Indeterminate / Query Overlay -->
      @if (mode() === 'indeterminate' || mode() === 'query') {
        <div class="lg-progress-indeterminate-bar" [class.is-query]="mode() === 'query'"></div>
      }
    </div>
  `,
  styleUrl: './progress-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent {
  /** Current progress value (0-100) */
  value = input<number>(0);

  /** Secondary progress value (for mode='buffer') */
  buffer = input<number>(0);

  /** Visual mode */
  mode = input<'determinate' | 'indeterminate' | 'buffer' | 'query'>('determinate');

  /** Theme color */
  color = input<'primary' | 'accent' | 'warn'>('primary');

  /** Thickness / Height of the bar */
  thickness = input<string>('0.5rem');

  /** A11y Label */
  ariaLabel = input<string>('Progress');

  /** Emitted when value reaches 100 */
  complete = output<void>();

  /** Internal state to trigger success animations */
  isComplete = computed(() => this.value() >= 100);

  private _announcer = inject(LiveAnnouncer);

  constructor() {
    // Escuchar el final del progreso para disparar eventos y haptics
    effect(() => {
      if (this.isComplete() && this.mode() !== 'indeterminate') {
        untracked(() => {
          this.complete.emit();
          this.triggerHaptics();
          this._announcer.announce('Carga completada');
        });
      }
    });
  }

  private triggerHaptics() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([20, 10, 20]);
    }
  }
}
