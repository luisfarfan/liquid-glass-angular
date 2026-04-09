import { Component, input, HostBinding, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GlassSkeletonType = 'rect' | 'circle' | 'text';

@Component({
  selector: 'lg-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styleUrl: './skeleton.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassSkeletonComponent {
  /** Shape of the skeleton */
  type = input<GlassSkeletonType>('rect');

  /** Width of the skeleton block */
  width = input<string>('100%');

  /** Height of the skeleton block */
  height = input<string>('1rem');

  /** Whether the light leak shimmer is enabled */
  animated = input<boolean>(true);

  @HostBinding('class')
  protected get hostClasses(): string {
    return [
      'lg-skeleton',
      `lg-skeleton-${this.type()}`,
      this.animated() ? 'lg-skeleton-animated' : ''
    ].filter(Boolean).join(' ');
  }

  @HostBinding('style.--lg-skeleton-width')
  protected get customWidth(): string {
    return this.width();
  }

  @HostBinding('style.--lg-skeleton-height')
  protected get customHeight(): string {
    return this.height();
  }

  /** Accessibility */
  @HostBinding('attr.aria-hidden')
  protected readonly ariaHidden = 'true';
}
