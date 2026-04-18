import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'lg-table-empty-state',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
    <div class="lg-table-empty-state-wrapper">
      <lg-empty-state
        [icon]="icon"
        [title]="title"
        [description]="description"
      >
        <div lgEmptyStateActions>
          <ng-content select="[actions]"></ng-content>
        </div>
      </lg-empty-state>
    </div>
  `,
  styles: [`
    .lg-table-empty-state-wrapper {
      padding: 4rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--lg-t-glass-bg);
      backdrop-filter: blur(12px);
      border-bottom-left-radius: var(--lg-border-radius-xl);
      border-bottom-right-radius: var(--lg-border-radius-xl);
      border: 1px solid var(--lg-t-glass-border);
      border-top: none;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgTableEmptyStateComponent {
  @Input() icon = 'search-x'; // Matching EmptyStateComponent default
  @Input() title = 'No data found';
  @Input() description = 'Try adjusting your filters or search terms.';
}
