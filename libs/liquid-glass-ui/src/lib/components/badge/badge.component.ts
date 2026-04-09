import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeStyle = 'glass' | 'solid';

/**
 * Glass Badge Component
 * Micro-component for status indicators and labels with premium glass aesthetics.
 */
@Component({
  selector: 'lg-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="lg-badge" 
      [ngClass]="[
        'is-' + variant(), 
        'lg-badge-' + style()
      ]"
      [attr.aria-label]="a11yLabel() || null"
    >
      @if (showDot()) {
        <span 
          class="lg-badge-dot" 
          [class.is-pulsating]="isPulsating()"
          aria-hidden="true"
        ></span>
      }

      <ng-content></ng-content>

      @if (!a11yLabel()) {
        <span class="sr-only">Estado: {{ variant() }}</span>
      }
    </span>
  `,
  styleUrl: './badge.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.lg-badge-host]': 'true',
    'role': 'status',
    '[attr.aria-atomic]': 'true'
  }
})
export class BadgeComponent {
  /** Inputs */
  variant = input<BadgeVariant>('info');
  style = input<BadgeStyle>('glass');
  isPulsating = input<boolean>(false);
  showDot = input<boolean>(true);
  a11yLabel = input<string | null>(null);
}
