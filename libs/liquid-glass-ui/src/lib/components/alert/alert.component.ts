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
 * LgAlertComponent 
 * Premium glass-morphism banners for contextual feedback and status messages.
 */
@Component({
  selector: 'lg-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="lg-alert" 
      [class]="'is-' + variant()"
      role="alert"
      aria-live="polite"
      [attr.aria-labelledby]="title() ? titleId : null"
      [attr.aria-describedby]="contentId"
    >
      <!-- Icon -->
      <div class="lg-alert-icon-container" aria-hidden="true">
        <i [class]="resolvedIcon()"></i>
      </div>

      <!-- Content -->
      <div class="lg-alert-content">
        @if (title()) {
          <h4 class="lg-alert-title" [id]="titleId">{{ title() }}</h4>
        }
        <div class="lg-alert-description" [id]="contentId">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Actions / Close -->
      @if (closable()) {
        <button 
          type="button" 
          class="lg-alert-close" 
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
export class LgAlertComponent {
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

  protected readonly titleId = `lg-alert-title-${Math.random().toString(36).substring(2, 9)}`;
  protected readonly contentId = `lg-alert-content-${Math.random().toString(36).substring(2, 9)}`;

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
