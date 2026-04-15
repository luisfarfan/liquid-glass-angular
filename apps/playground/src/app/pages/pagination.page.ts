import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GlassCardComponent,
  ButtonComponent,
  PaginationComponent,
  type LgPageEvent,
} from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-pagination-page',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, ButtonComponent, PaginationComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Pagination</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Navegación de páginas y tamaño de página (spec 19).</p>
    </header>

    <section class="space-y-8">
      <lg-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Dataset length</p>
        <div class="flex flex-wrap gap-2">
          <button lg-button variant="ghost" size="sm" type="button" (click)="length.set(0)">0</button>
          <button lg-button variant="ghost" size="sm" type="button" (click)="length.set(47)">47</button>
          <button lg-button variant="secondary" size="sm" type="button" (click)="length.set(100)">100</button>
          <button lg-button variant="ghost" size="sm" type="button" (click)="length.set(523)">523</button>
        </div>

        <lg-pagination
          [length]="length()"
          [pageIndex]="pageIndex()"
          (pageIndexChange)="pageIndex.set($event)"
          [pageSize]="pageSize()"
          (pageSizeChange)="pageSize.set($event)"
          [pageSizeOptions]="[5, 10, 25, 50]"
          [showFirstLast]="true"
          ariaLabel="Paginación del listado demo"
          (pageChange)="onPageChange($event)"
        />

        @if (lastEvent(); as ev) {
          <p class="text-xs font-mono text-zinc-500 border-t border-glass-border pt-4">
            Último pageChange: index {{ ev.pageIndex }}, size {{ ev.pageSize }}, length {{ ev.length }}
          </p>
        }
      </lg-glass-card>

      <lg-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Compacto (sin primera / última)</p>
        <lg-pagination
          [length]="180"
          [pageIndex]="compactPage()"
          (pageIndexChange)="compactPage.set($event)"
          [pageSize]="15"
          [hidePageSizeSelector]="true"
          [showFirstLast]="false"
          ariaLabel="Paginación compacta"
        />
      </lg-glass-card>
    </section>
  `,
})
export class PaginationPage {
  readonly length = signal(100);
  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);
  readonly compactPage = signal(0);
  readonly lastEvent = signal<LgPageEvent | null>(null);

  onPageChange(ev: LgPageEvent): void {
    this.lastEvent.set(ev);
  }
}
