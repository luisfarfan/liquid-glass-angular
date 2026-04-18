import { Directive, EventEmitter, Input, Output, signal } from '@angular/core';
import { LgTableSortDirection, LgTableSortState } from '../lg-table-data-source';

@Directive({
  selector: '[lgSort]',
  standalone: true,
  exportAs: 'lgSort'
})
export class LgSortDirective<T = any> {
  /** The id of the most recently sorted column. */
  active = signal<keyof T & string | null>(null);

  /** The sort direction of the currently active column. */
  direction = signal<LgTableSortDirection>('');

  /** Event emitted when the user changes the sort order. */
  @Output() readonly lgSortChange = new EventEmitter<LgTableSortState<T>>();

  /** Sets the current sort state and emits changes. */
  sort(id: keyof T & string): void {
    if (this.active() === id) {
      this.direction.set(this.direction() === 'asc' ? 'desc' : 'asc');
    } else {
      this.active.set(id);
      this.direction.set('asc');
    }

    this.lgSortChange.emit({
      active: this.active(),
      direction: this.direction()
    });
  }
}
