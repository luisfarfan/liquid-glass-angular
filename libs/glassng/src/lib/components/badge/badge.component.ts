import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  computed 
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'error' | 'success' | 'warning' | 'info' | 'primary';
export type BadgeOverlap = 'circle' | 'rectangle';

/**
 * GngBadge 
 * A wrapper component that overlays a numeric or dot indicator on its content.
 * Perfect for notification counts on icons or avatars.
 */
@Component({
  selector: 'gng-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-badge-wrapper" [class.is-dot]="dot()">
      <ng-content></ng-content>
      
      @if (showBadge()) {
        <span 
          class="gng-badge-indicator" 
          [class]="'is-' + variant() + ' overlap-' + overlap()"
          [class.has-value]="!dot()"
          role="status"
        >
          @if (!dot()) {
            {{ value() }}
          }
          <span class="gng-sr-only">{{ label() }}: {{ dot() ? 'New notification' : value() }}</span>
        </span>
      }
    </div>
  `,
  styleUrl: './badge.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngBadge {
  /** Value to display inside the badge (e.g. 3, 99+, 'New') */
  value = input<string | number | null>(null);

  /** If true, shows a small dot without text */
  dot = input<boolean>(false);

  /** Color variant */
  variant = input<BadgeVariant>('error');

  /** adjust position based on host shape */
  overlap = input<BadgeOverlap>('rectangle');

  /** screen reader descriptive label (e.g. "Notifications") */
  label = input<string>('Notifications');

  /** Whether to show the badge indicator */
  showBadge = computed(() => {
    if (this.dot()) return true;
    const v = this.value();
    return v !== null && v !== undefined && v !== '';
  });
}
