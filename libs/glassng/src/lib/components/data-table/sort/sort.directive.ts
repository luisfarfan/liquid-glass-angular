import { Directive, EventEmitter, Input, Output, signal } from '@angular/core';
import { GngTableSortDirection, GngTableSortState } from '../gng-table-data-source';

@Directive({
  selector: '[lgSort]',
  standalone: true,
  exportAs: 'lgSort'
})
export class GngSortDirective<T = any> {
  /** The id of the most recently sorted column. */
  active = signal<keyof T & string | null>(null);

  /** The sort direction of the currently active column. */
  direction = signal<GngTableSortDirection>('');

  /** Event emitted when the user changes the sort order. */
  @Output() readonly lgSortChange = new EventEmitter<GngTableSortState<T>>();

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
