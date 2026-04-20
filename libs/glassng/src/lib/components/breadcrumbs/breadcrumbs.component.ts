import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { GngBreadcrumbItem } from './breadcrumb.types';

/**
 * GngBreadcrumbs
 * Premium hierarchical navigation with glassmorphism and configurable separators.
 */
@Component({
  selector: 'gng-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="gng-breadcrumbs" [attr.aria-label]="ariaLabel()">
      <ol class="gng-breadcrumbs__list">
        @for (item of items(); track trackKey($index, item); let last = $last) {
          <li class="gng-breadcrumbs__item">
            @if (!last) {
              @if (hasLink(item)) {
                <a class="gng-breadcrumbs__link" [routerLink]="routerCommands(item)">
                  @if (item.icon) {
                    <i [class]="item.icon + ' gng-breadcrumbs__icon'" aria-hidden="true"></i>
                  }
                  <span class="gng-breadcrumbs__label">{{ item.label }}</span>
                </a>
              } @else {
                <span class="gng-breadcrumbs__text">
                  @if (item.icon) {
                    <i [class]="item.icon + ' gng-breadcrumbs__icon'" aria-hidden="true"></i>
                  }
                  <span class="gng-breadcrumbs__label">{{ item.label }}</span>
                </span>
              }
              <span class="gng-breadcrumbs__sep" aria-hidden="true">{{ separator() }}</span>
            } @else {
              <span class="gng-breadcrumbs__current" aria-current="page">
                @if (item.icon) {
                  <i [class]="item.icon + ' gng-breadcrumbs__icon'" aria-hidden="true"></i>
                }
                <span class="gng-breadcrumbs__label">{{ item.label }}</span>
              </span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './breadcrumbs.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngBreadcrumbs {
  readonly items = input<GngBreadcrumbItem[]>([]);
  readonly separator = input<string>('/');
  readonly ariaLabel = input<string>('Breadcrumb');

  trackKey(index: number, item: GngBreadcrumbItem): string {
    return `${index}-${item.label}`;
  }

  hasLink(item: GngBreadcrumbItem): boolean {
    const link = item.link;
    return link !== undefined && link !== null && link !== '';
  }

  routerCommands(item: GngBreadcrumbItem): string | readonly unknown[] {
    const link = item.link;
    if (link == null || link === '') {
      return '/';
    }
    return link;
  }
}
