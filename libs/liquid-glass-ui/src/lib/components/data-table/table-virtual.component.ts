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
import { GlassDataTableContainerComponent } from './data-table.component';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';

/**
 * High-performance Data Table with Virtual Scrolling and Infinite Scroll capabilities.
 * Enforces a fixed item size for 60fps performance on massive datasets.
 */
@Component({
  selector: 'lg-virtual-data-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule, CdkTableModule],
  template: `
    <div class="lg-virtual-table-container lg-glass-scroll rounded-xl border border-glass-border bg-glass overflow-hidden">
      <!-- Fixed Header Synchronization -->
      <div class="lg-virtual-table-header-wrapper" [style.padding-right.px]="scrollbarWidth">
        <ng-content select="[lgVirtualHeader]"></ng-content>
      </div>

      <cdk-virtual-scroll-viewport
        #viewport
        [itemSize]="itemSize"
        [style.height]="height"
        class="lg-virtual-viewport lg-glass-scroll"
        (scrolledIndexChange)="onScroll($event)"
      >
        <ng-content></ng-content>
      </cdk-virtual-scroll-viewport>

      <!-- Loading Overlay -->
      <div *ngIf="isLoading" class="lg-virtual-table-loading-overlay">
        <div class="lg-glass-spinner"></div>
      </div>
    </div>
  `,
  styleUrl: './data-table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgVirtualDataTableComponent implements OnInit, OnDestroy {
  /** Height of each row in pixels. Essential for virtual scroll calculations. */
  @Input() itemSize = 48;

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
