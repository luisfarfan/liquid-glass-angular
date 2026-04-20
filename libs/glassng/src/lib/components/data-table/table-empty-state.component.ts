import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngEmptyState } from '../empty-state/empty-state.component';

/**
 * GngTableEmptyState
 * Specialized empty state for data tables with premium glass containers.
 */
@Component({
  selector: 'gng-table-empty-state',
  standalone: true,
  imports: [CommonModule, GngEmptyState],
  template: `
    <div class="gng-table-empty-state-wrapper">
      <gng-empty-state
        [icon]="icon"
        [title]="title"
        [description]="description"
      >
        <div gngEmptyStateActions>
          <ng-content select="[actions]"></ng-content>
        </div>
      </gng-empty-state>
    </div>
  `,
  styles: [`
    .gng-table-empty-state-wrapper {
      padding: 4rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--gng-t-glass-bg);
      backdrop-filter: blur(12px);
      border-bottom-left-radius: var(--gng-border-radius-xl);
      border-bottom-right-radius: var(--gng-border-radius-xl);
      border: 1px solid var(--gng-t-glass-border);
      border-top: none;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngTableEmptyState {
  @Input() icon = 'search-x'; 
  @Input() title = 'No data found';
  @Input() description = 'Try adjusting your filters or search terms.';
}
