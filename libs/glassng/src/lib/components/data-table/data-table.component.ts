import { Component, ChangeDetectionStrategy, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GngDataTableContainer
 * A glass-morphic wrapper for data tables that provides scrolling, borders, and loading states.
 */
@Component({
  selector: 'gng-data-table-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-data-table-viewport gng-glass-scroll max-w-full rounded-xl border border-glass-border bg-glass relative">
      <ng-content></ng-content>

      <!-- Loading Overlay -->
      <div *ngIf="isLoading()" class="gng-virtual-table-loading-overlay rounded-xl">
        <div class="gng-glass-spinner"></div>
      </div>
    </div>
  `,
  styleUrl: './data-table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngDataTableContainer {
  /** Whether the table is currently fetching data. */
  isLoading = input<boolean>(false);
}
