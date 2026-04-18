import { Component, ChangeDetectionStrategy, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lg-data-table-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-data-table-viewport lg-glass-scroll max-w-full rounded-xl border border-glass-border bg-glass relative">
      <ng-content></ng-content>

      <!-- Loading Overlay -->
      <div *ngIf="isLoading()" class="lg-virtual-table-loading-overlay rounded-xl">
        <div class="lg-glass-spinner"></div>
      </div>
    </div>
  `,
  styleUrl: './data-table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassDataTableContainerComponent {
  /** Whether the table is currently fetching data. */
  isLoading = input<boolean>(false);
}
