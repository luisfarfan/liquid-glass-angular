import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { LgBreadcrumbItem } from './breadcrumb.types';

/**
 * Glass Breadcrumbs — SDD 23.
 * Navegación jerárquica: el último segmento es la página actual (`aria-current="page"`).
 */
@Component({
  selector: 'lg-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="lg-breadcrumbs" [attr.aria-label]="ariaLabel()">
      <ol class="lg-breadcrumbs__list">
        @for (item of items(); track trackKey($index, item); let last = $last) {
          <li class="lg-breadcrumbs__item">
            @if (!last) {
              @if (hasLink(item)) {
                <a class="lg-breadcrumbs__link" [routerLink]="routerCommands(item)">
                  @if (item.icon) {
                    <i [class]="item.icon + ' lg-breadcrumbs__icon'" aria-hidden="true"></i>
                  }
                  <span class="lg-breadcrumbs__label">{{ item.label }}</span>
                </a>
              } @else {
                <span class="lg-breadcrumbs__text">
                  @if (item.icon) {
                    <i [class]="item.icon + ' lg-breadcrumbs__icon'" aria-hidden="true"></i>
                  }
                  <span class="lg-breadcrumbs__label">{{ item.label }}</span>
                </span>
              }
              <span class="lg-breadcrumbs__sep" aria-hidden="true">{{ separator() }}</span>
            } @else {
              <span class="lg-breadcrumbs__current" aria-current="page">
                @if (item.icon) {
                  <i [class]="item.icon + ' lg-breadcrumbs__icon'" aria-hidden="true"></i>
                }
                <span class="lg-breadcrumbs__label">{{ item.label }}</span>
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
export class BreadcrumbsComponent {
  readonly items = input<LgBreadcrumbItem[]>([]);
  readonly separator = input<string>('/');
  readonly ariaLabel = input<string>('Breadcrumb');

  trackKey(index: number, item: LgBreadcrumbItem): string {
    return `${index}-${item.label}`;
  }

  hasLink(item: LgBreadcrumbItem): boolean {
    const link = item.link;
    return link !== undefined && link !== null && link !== '';
  }

  routerCommands(item: LgBreadcrumbItem): string | readonly unknown[] {
    const link = item.link;
    if (link == null || link === '') {
      return '/';
    }
    return link;
  }
}
