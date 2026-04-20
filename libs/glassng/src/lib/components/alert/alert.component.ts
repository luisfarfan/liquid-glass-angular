import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  output, 
  computed 
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * GngAlert 
 * Premium glass-morphism banners for contextual feedback and status messages.
 */
@Component({
  selector: 'gng-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="gng-alert" 
      [class]="'is-' + variant()"
      role="alert"
      aria-live="polite"
      [attr.aria-labelledby]="title() ? titleId : null"
      [attr.aria-describedby]="contentId"
    >
      <!-- Icon -->
      <div class="gng-alert-icon-container" aria-hidden="true">
        <i [class]="resolvedIcon()"></i>
      </div>

      <!-- Content -->
      <div class="gng-alert-content">
        @if (title()) {
          <h4 class="gng-alert-title" [id]="titleId">{{ title() }}</h4>
        }
        <div class="gng-alert-description" [id]="contentId">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Actions / Close -->
      @if (closable()) {
        <button 
          type="button" 
          class="gng-alert-close" 
          (click)="onClose()"
          [attr.aria-label]="closeLabel()"
        >
          <i class="ri-close-line"></i>
        </button>
      }
    </div>
  `,
  styleUrl: './alert.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngAlert {
  /** Alert variants */
  variant = input<AlertVariant>('info');

  /** Optional title */
  title = input<string | null>(null);

  /** Whether the alert can be closed by the user */
  closable = input<boolean>(false);

  /** Custom icon override */
  icon = input<string | null>(null);

  /** Emits when closed */
  close = output<void>();

  /** screen reader label for close button */
  closeLabel = input<string>('Cerrar alerta');

  protected readonly titleId = `gng-alert-title-${Math.random().toString(36).substring(2, 9)}`;
  protected readonly contentId = `gng-alert-content-${Math.random().toString(36).substring(2, 9)}`;

  resolvedIcon = computed(() => {
    if (this.icon()) return this.icon()!;
    switch (this.variant()) {
      case 'success': return 'ri-checkbox-circle-fill';
      case 'warning': return 'ri-error-warning-fill';
      case 'error': return 'ri-close-circle-fill';
      default: return 'ri-information-fill';
    }
  });

  onClose(): void {
    this.close.emit();
  }
}
