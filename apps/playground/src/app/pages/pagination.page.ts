import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GngGlassCard,
  GngButton,
  GngPagination,
  type GngPageEvent,
} from 'glassng';

@Component({
  selector: 'pg-pagination-page',
  standalone: true,
  imports: [CommonModule, GngGlassCard, GngButton, GngPagination],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Pagination</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Navegación de páginas y tamaño de página (spec 19).</p>
    </header>

    <section class="space-y-8">
      <gng-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Dataset length</p>
        <div class="flex flex-wrap gap-2">
          <button gng-button variant="ghost" size="sm" type="button" (click)="length.set(0)">0</button>
          <button gng-button variant="ghost" size="sm" type="button" (click)="length.set(47)">47</button>
          <button gng-button variant="secondary" size="sm" type="button" (click)="length.set(100)">100</button>
          <button gng-button variant="ghost" size="sm" type="button" (click)="length.set(523)">523</button>
        </div>

        <gng-pagination
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
      </gng-glass-card>

      <gng-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Compacto (sin primera / última)</p>
        <gng-pagination
          [length]="180"
          [pageIndex]="compactPage()"
          (pageIndexChange)="compactPage.set($event)"
          [pageSize]="15"
          [hidePageSizeSelector]="true"
          [showFirstLast]="false"
          ariaLabel="Paginación compacta"
        />
      </gng-glass-card>
    </section>
  `,
})
export class PaginationPage {
  readonly length = signal(100);
  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);
  readonly compactPage = signal(0);
  readonly lastEvent = signal<GngPageEvent | null>(null);

  onPageChange(ev: GngPageEvent): void {
    this.lastEvent.set(ev);
  }
}
