import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  input,
  model,
  output,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { SelectOptionComponent } from '../select/select-option.component';
import type { LgPageEvent } from './pagination.types';

@Component({
  selector: 'lg-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, SelectComponent, SelectOptionComponent],
  template: `
    <nav class="lg-pagination" [attr.aria-label]="ariaLabel()">
      <div class="lg-pagination-meta">
        <span class="lg-pagination-range">{{ rangeLabel() }}</span>
      </div>

      <div class="lg-pagination-controls">
        @if (showPageSizeSelector()) {
          <div class="lg-pagination-select">
            <lg-select
              [label]="pageSizeLabel()"
              [placeholder]="pageSizePlaceholder()"
              [ngModel]="pageSize()"
              (ngModelChange)="onPageSizeChange($event)"
              [disabled]="disabled()"
            >
              @for (opt of pageSizeOptions(); track opt) {
                <lg-option [value]="opt" [label]="pageSizeOptionLabel(opt)"></lg-option>
              }
            </lg-select>
          </div>
        }

        <div
          class="lg-pagination-pages"
          role="group"
          [attr.aria-label]="pagesGroupLabel()"
          (keydown)="onPagesKeydown($event)"
        >
          @if (showFirstLast()) {
            <button
              lg-button
              variant="ghost"
              size="sm"
              type="button"
              class="lg-pagination-page-btn"
              [iconOnly]="true"
              [enableRipple]="false"
              [disabled]="disabled() || pageIndex() === 0 || totalPages() === 0"
              [attr.aria-label]="firstPageLabel()"
              (click)="goFirst()"
            >
              <i class="ri-skip-back-line" aria-hidden="true"></i>
            </button>
          }

          <button
            lg-button
            variant="ghost"
            size="sm"
            type="button"
            class="lg-pagination-page-btn"
            [iconOnly]="true"
            [enableRipple]="false"
            [disabled]="disabled() || pageIndex() === 0 || totalPages() === 0"
            [attr.aria-label]="prevPageLabel()"
            (click)="goPrev()"
          >
            <i class="ri-arrow-left-s-line" aria-hidden="true"></i>
          </button>

          @for (slot of displayedPageSlots(); track $index) {
            @if (slot === 'ellipsis') {
              <span class="lg-pagination-ellipsis" aria-hidden="true">···</span>
            } @else {
              <button
                lg-button
                variant="ghost"
                size="sm"
                type="button"
                class="lg-pagination-page-btn"
                [enableRipple]="false"
                [class.is-active]="slot === pageIndex()"
                [disabled]="disabled() || totalPages() === 0"
                [attr.aria-current]="slot === pageIndex() ? 'page' : null"
                [attr.aria-label]="pageNumberLabel(slot)"
                (click)="goPage(slot)"
              >
                {{ slot + 1 }}
              </button>
            }
          }

          <button
            lg-button
            variant="ghost"
            size="sm"
            type="button"
            class="lg-pagination-page-btn"
            [iconOnly]="true"
            [enableRipple]="false"
            [disabled]="disabled() || pageIndex() >= totalPages() - 1 || totalPages() === 0"
            [attr.aria-label]="nextPageLabel()"
            (click)="goNext()"
          >
            <i class="ri-arrow-right-s-line" aria-hidden="true"></i>
          </button>

          @if (showFirstLast()) {
            <button
              lg-button
              variant="ghost"
              size="sm"
              type="button"
              class="lg-pagination-page-btn"
              [iconOnly]="true"
              [enableRipple]="false"
              [disabled]="disabled() || pageIndex() >= totalPages() - 1 || totalPages() === 0"
              [attr.aria-label]="lastPageLabel()"
              (click)="goLast()"
            >
              <i class="ri-skip-forward-line" aria-hidden="true"></i>
            </button>
          }
        </div>
      </div>
    </nav>
  `,
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
  /** Total items in the dataset. */
  readonly length = input(0);

  /** Items per page (two-way). */
  readonly pageSize = model(10);

  /** Current page index, zero-based (two-way). */
  readonly pageIndex = model(0);

  /** Options shown in the page size selector. */
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);

  /** Show jump-to-first / jump-to-last controls. */
  readonly showFirstLast = input(false);

  /** Accessible name for the navigation region. */
  readonly ariaLabel = input<string>('Paginación de tabla');

  /** Disable all controls. */
  readonly disabled = input(false);

  /** Hide the page size selector (e.g. fixed page size). */
  readonly hidePageSizeSelector = input(false);

  /** Emitted when the user changes page index or page size. */
  readonly pageChange = output<LgPageEvent>();

  readonly pageSizeLabel = input<string>('');
  readonly pageSizePlaceholder = input<string>('Por página');
  readonly pagesGroupLabel = input<string>('Números de página');
  readonly firstPageLabel = input<string>('Primera página');
  readonly prevPageLabel = input<string>('Página anterior');
  readonly nextPageLabel = input<string>('Página siguiente');
  readonly lastPageLabel = input<string>('Última página');

  readonly totalPages = computed(() => {
    const len = this.length();
    const ps = this.pageSize();
    if (ps <= 0) return 0;
    if (len <= 0) return 0;
    return Math.ceil(len / ps);
  });

  readonly rangeLabel = computed(() => {
    const len = this.length();
    const ps = this.pageSize();
    const idx = this.pageIndex();
    if (len <= 0 || ps <= 0) {
      return '0 - 0 de 0';
    }
    const start = idx * ps + 1;
    const end = Math.min((idx + 1) * ps, len);
    return `${start} - ${end} de ${len}`;
  });

  readonly displayedPageSlots = computed(() => {
    const total = this.totalPages();
    const cur = this.pageIndex();
    if (total <= 0) return [] as (number | 'ellipsis')[];
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i) as (number | 'ellipsis')[];
    }
    const set = new Set<number>();
    set.add(0);
    set.add(total - 1);
    for (let d = -1; d <= 1; d++) {
      const i = cur + d;
      if (i >= 0 && i < total) set.add(i);
    }
    const sorted = [...set].sort((a, b) => a - b);
    const out: (number | 'ellipsis')[] = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
        out.push('ellipsis');
      }
      out.push(sorted[i]);
    }
    return out;
  });

  readonly showPageSizeSelector = computed(
    () => !this.hidePageSizeSelector() && this.pageSizeOptions().length > 0,
  );

  constructor() {
    effect(() => {
      const total = this.totalPages();
      const maxIdx = Math.max(0, total - 1);
      const idx = this.pageIndex();
      if (total > 0 && idx > maxIdx) {
        untracked(() => {
          this.pageIndex.set(maxIdx);
          this.emitPageChange();
        });
      }
      if (total === 0 && idx !== 0) {
        untracked(() => {
          this.pageIndex.set(0);
          this.emitPageChange();
        });
      }
    });
  }

  pageSizeOptionLabel(opt: number): string {
    return String(opt);
  }

  pageNumberLabel(index: number): string {
    return `Página ${index + 1}`;
  }

  onPageSizeChange(value: unknown): void {
    if (this.disabled()) return;
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n) || n <= 0) return;
    const prevSize = this.pageSize();
    if (n === prevSize) return;
    this.pageSize.set(n);
    const maxIdx = Math.max(0, Math.ceil(this.length() / n) - 1);
    if (this.pageIndex() > maxIdx) {
      this.pageIndex.set(maxIdx);
    }
    this.emitPageChange();
  }

  goFirst(): void {
    if (this.disabled() || this.pageIndex() === 0) return;
    this.pageIndex.set(0);
    this.emitPageChange();
  }

  goLast(): void {
    if (this.disabled()) return;
    const last = Math.max(0, this.totalPages() - 1);
    if (this.pageIndex() === last) return;
    this.pageIndex.set(last);
    this.emitPageChange();
  }

  goPrev(): void {
    if (this.disabled() || this.pageIndex() <= 0) return;
    this.pageIndex.update((v) => Math.max(0, v - 1));
    this.emitPageChange();
  }

  goNext(): void {
    if (this.disabled()) return;
    const last = Math.max(0, this.totalPages() - 1);
    if (this.pageIndex() >= last) return;
    this.pageIndex.update((v) => Math.min(last, v + 1));
    this.emitPageChange();
  }

  goPage(index: number): void {
    if (this.disabled()) return;
    const last = Math.max(0, this.totalPages() - 1);
    const clamped = Math.max(0, Math.min(last, index));
    if (clamped === this.pageIndex()) return;
    this.pageIndex.set(clamped);
    this.emitPageChange();
  }

  onPagesKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.totalPages() === 0) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest('button.lg-pagination-page-btn');
    const host = event.currentTarget;
    if (!(host instanceof HTMLElement) || !btn || !host.contains(btn)) return;

    const buttons = Array.from(host.querySelectorAll('button.lg-pagination-page-btn')) as HTMLButtonElement[];
    const idx = buttons.indexOf(btn as HTMLButtonElement);
    if (idx < 0) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      const next = buttons[idx + 1];
      if (next && !next.disabled) {
        event.preventDefault();
        next.focus();
      }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      const prev = buttons[idx - 1];
      if (prev && !prev.disabled) {
        event.preventDefault();
        prev.focus();
      }
    }
  }

  private emitPageChange(): void {
    this.pageChange.emit({
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
      length: this.length(),
    });
  }
}
