import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';

export type LgTableSortDirection = 'asc' | 'desc' | '';

export interface LgTableSortState<T> {
  active: keyof T & string | null;
  direction: LgTableSortDirection;
}

/**
 * Client-side table data source similar in spirit to {@link MatTableDataSource}:
 * filter → sort → paginate, then expose the page slice through {@link DataSource.connect}.
 *
 * Wire `lg-pagination` with `[length]` from `filteredLength$` (e.g. `toSignal`) and `(pageChange)` calling
 * `setPage(event.pageIndex, event.pageSize)`.
 */
export class LgTableDataSource<T> implements DataSource<T> {
  private readonly _data = new BehaviorSubject<T[]>([]);
  private readonly _filter = new BehaviorSubject('');
  private readonly _sort = new BehaviorSubject<LgTableSortState<T>>({ active: null, direction: '' });
  private readonly _pageIndex = new BehaviorSubject(0);
  private readonly _pageSize = new BehaviorSubject(10);

  private readonly _filteredSorted = combineLatest([this._data, this._filter, this._sort]).pipe(
    map(([rows, filter, sort]) => this.applyFilterAndSort(rows, filter, sort)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** Full filtered + sorted list (not paginated). */
  readonly filteredData$: Observable<T[]> = this._filteredSorted;

  /** Row count after filter/sort — bind to `lg-pagination` `[length]`. */
  readonly filteredLength$: Observable<number> = this._filteredSorted.pipe(map((r) => r.length));

  private readonly _pageData = combineLatest([this._filteredSorted, this._pageIndex, this._pageSize]).pipe(
    map(([rows, pageIndex, pageSize]) => {
      const ps = Math.max(1, pageSize);
      const maxIndex = Math.max(0, Math.ceil(rows.length / ps) - 1);
      const safeIndex = Math.min(pageIndex, maxIndex);
      const start = safeIndex * ps;
      return rows.slice(start, start + ps);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** Current page rows (same stream as {@link connect}). */
  readonly page$ = this._pageData;

  readonly pageIndex$ = this._pageIndex.asObservable();
  readonly pageSize$ = this._pageSize.asObservable();

  /**
   * Predicate for global text filter (default: JSON stringify includes).
   * Override for column-aware search like Material's `filterPredicate`.
   */
  filterPredicate: (data: T, filter: string) => boolean = (data, filter) => {
    const f = filter.trim().toLowerCase();
    if (!f) return true;
    return JSON.stringify(data).toLowerCase().includes(f);
  };

  /**
   * Value read for sorting (default: string/number coercion).
   * Override for nested paths like Material's `sortingDataAccessor`.
   */
  sortingDataAccessor: (data: T, property: keyof T & string) => string | number = (data, property) => {
    const v = data[property];
    if (v === null || v === undefined) return '';
    if (typeof v === 'number') return v;
    return String(v);
  };

  constructor(
    initialData: T[] = [],
    options?: { pageSize?: number },
  ) {
    this._data.next(initialData.slice());
    if (options?.pageSize != null && options.pageSize > 0) {
      this._pageSize.next(options.pageSize);
    }
  }

  get data(): T[] {
    return this._data.value.slice();
  }

  set data(rows: T[]) {
    this._data.next(rows.slice());
    this._pageIndex.next(0);
  }

  setFilter(value: string): void {
    this._filter.next(value);
    this._pageIndex.next(0);
  }

  setSort(active: keyof T & string | null, direction: LgTableSortDirection): void {
    const dir: LgTableSortDirection = active ? direction || 'asc' : '';
    this._sort.next({ active, direction: dir });
    this._pageIndex.next(0);
  }

  /** Sync page from `lg-pagination` `(pageChange)` or two-way models. */
  setPage(pageIndex: number, pageSize: number): void {
    this._pageIndex.next(pageIndex);
    this._pageSize.next(pageSize);
  }

  connect(_collectionViewer: CollectionViewer): Observable<readonly T[]> {
    return this._pageData;
  }

  disconnect(_collectionViewer: CollectionViewer): void {}

  private applyFilterAndSort(rows: T[], filter: string, sort: LgTableSortState<T>): T[] {
    let out = rows.filter((row) => this.filterPredicate(row, filter));
    const { active, direction } = sort;
    if (active && direction) {
      const dir = direction === 'asc' ? 1 : -1;
      const prop = active as keyof T & string;
      out = [...out].sort((a, b) => {
        const av = this.sortingDataAccessor(a, prop);
        const bv = this.sortingDataAccessor(b, prop);
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
        return 0;
      });
    }
    return out;
  }
}
