import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  Input, 
  Output, 
  EventEmitter, 
  ContentChild, 
  TemplateRef, 
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { GngDataTableContainer } from './data-table.component';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';

/**
 * GngVirtualDataTable
 * High-performance Data Table with Virtual Scrolling and Infinite Scroll capabilities.
 * Enforces a fixed item size for 60fps performance on massive datasets.
 * Features premium glass-morphism aesthetics and kinetic scroll synchronization.
 */
@Component({
  selector: 'gng-virtual-data-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule, CdkTableModule],
  template: `
    <div class="gng-virtual-table-container gng-glass-scroll rounded-xl border border-glass-border bg-glass overflow-hidden">
      <!-- Fixed Header Synchronization -->
      <div class="gng-virtual-table-header-wrapper" [style.padding-right.px]="scrollbarWidth">
        <ng-content select="[gngVirtualHeader]"></ng-content>
      </div>

      <cdk-virtual-scroll-viewport
        #viewport
        [itemSize]="itemSize"
        [style.height]="height"
        class="gng-virtual-viewport gng-glass-scroll"
        (scrolledIndexChange)="onScroll($event)"
      >
        <ng-content></ng-content>
      </cdk-virtual-scroll-viewport>

      <!-- Loading Overlay -->
      <div *ngIf="isLoading" class="gng-virtual-table-loading-overlay">
        <div class="gng-glass-spinner"></div>
      </div>
    </div>
  `,
  styleUrl: './data-table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngVirtualDataTable implements OnInit, OnDestroy {
  /** Height of each row in pixels. Essential for virtual scroll calculations. */
  @Input() itemSize = 64;

  /** Total height of the table viewport. */
  @Input() height = '400px';

  /** Whether more data is currently being fetched. */
  @Input() isLoading = false;

  /** Threshold (in items) before the end to trigger loadMore. */
  @Input() buffer = 10;

  /** Emitted when the user scrolls near the bottom of the current dataset. */
  @Output() loadMore = new EventEmitter<void>();

  @ViewChild('viewport', { static: true }) viewport!: CdkVirtualScrollViewport;

  protected scrollbarWidth = 0;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Detect scrollbar width to align header
    this.scrollbarWidth = this.getScrollbarWidth();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onScroll(index: number): void {
    const totalItems = this.viewport.getDataLength();
    if (totalItems > 0 && index + (this.viewport.getViewportSize() / this.itemSize) >= totalItems - this.buffer) {
      if (!this.isLoading) {
        this.loadMore.emit();
      }
    }
  }

  private getScrollbarWidth(): number {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const width = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);
    return width;
  }
}
