import { Component, ChangeDetectionStrategy, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TagVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';
export type TagStyle = 'glass' | 'solid';

/**
 * Glass Tag Component (formerly Badge)
 * Label for status, categories and metadata with premium glass aesthetics.
 */
@Component({
  selector: 'lg-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="lg-tag" 
      [ngClass]="[
        'is-' + variant(), 
        'lg-tag-' + style()
      ]"
      [attr.aria-label]="a11yLabel() || null"
    >
      @if (showDot()) {
        <span 
          class="lg-tag-dot" 
          [class.is-pulsating]="isPulsating()"
          aria-hidden="true"
        ></span>
      }

      <ng-content></ng-content>

      <span class="lg-sr-only">Status: {{ variant() }}</span>
    </span>
  `,
  styleUrl: './tag.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.lg-tag-host]': 'true',
    'role': 'status',
    '[attr.aria-atomic]': 'true'
  }
})
export class TagComponent {
  /** Inputs */
  variant = input<TagVariant>('info');
  style = input<TagStyle>('glass');
  isPulsating = input<boolean>(false);
  showDot = input<boolean>(true);
  a11yLabel = input<string | null>(null);
}
