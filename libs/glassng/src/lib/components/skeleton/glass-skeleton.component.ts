import { Component, input, HostBinding, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GngSkeletonType = 'rect' | 'circle' | 'text';

/**
 * GngSkeleton
 * Premium loading placeholder with glass-morphism and animated shimmer effects.
 */
@Component({
  selector: 'gng-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styleUrl: './skeleton.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngSkeleton {
  /** Shape of the skeleton */
  type = input<GngSkeletonType>('rect');

  /** Width of the skeleton block */
  width = input<string>('100%');

  /** Height of the skeleton block */
  height = input<string>('1rem');

  /** Whether the light leak shimmer is enabled */
  animated = input<boolean>(true);

  @HostBinding('class')
  protected get hostClasses(): string {
    return [
      'gng-skeleton',
      `gng-skeleton-${this.type()}`,
      this.animated() ? 'gng-skeleton-animated' : ''
    ].filter(Boolean).join(' ');
  }

  @HostBinding('style.--gng-skeleton-width')
  protected get customWidth(): string {
    return this.width();
  }

  @HostBinding('style.--gng-skeleton-height')
  protected get customHeight(): string {
    return this.height();
  }

  /** Accessibility */
  @HostBinding('attr.aria-hidden')
  protected readonly ariaHidden = 'true';
}
