import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';

export type GngTableSortDirection = 'asc' | 'desc' | '';

export interface GngTableSortState<T> {
  active: keyof T & string | null;
  direction: GngTableSortDirection;
}

export type GngFilterOperator = 
  | 'contains' | 'notContains' | 'equals' | 'notEquals' | 'startsWith' | 'endsWith' | 'isEmpty' | 'isNotEmpty'
  | '>' | '>=' | '<' | '<=' | '=' | '!=' | 'is' | 'gt' | 'lt' | 'gte' | 'lte';

export interface GngFilterItem<T> {
  id: string;
  field: keyof T & string;
  operator: GngFilterOperator;
  value?: any;
}

export interface GngTableFilterModel<T> {
  items: GngFilterItem<T>[];
  logicOperator: 'and' | 'or';
}

/** Represents a summary row for a group in the table. */
export interface GngGroupRow<T> {
  isGroup: true;
  groupKey: keyof T & string;
  groupValue: any;
  items: T[];
  expanded: boolean;
  totalCount: number;
  aggregations: Record<string, number>;
}

/**
 * Client-side table data source similar in spirit to {@link MatTableDataSource}:
 * filter → sort → paginate, then expose the page slice through {@link DataSource.connect}.
 *
 * Wire `gng-pagination` with `[length]` from `filteredLength$` (e.g. `toSignal`) and
 * `setPage(event.pageIndex, event.pageSize)`.
 *
 * Supports: Standard Filtering, Multi-column Sorting, Virtual Scrolling, and Premium Row Grouping.
 */
export class GngTableDataSource<T> implements DataSource<T | GngGroupRow<T>> {
  private readonly _data = new BehaviorSubject<T[]>([]);
  private readonly _filter = new BehaviorSubject('');
  private readonly _filterModel = new BehaviorSubject<GngTableFilterModel<T>>({ items: [], logicOperator: 'and' });
  private readonly _sort = new BehaviorSubject<GngTableSortState<T>>({ active: null, direction: '' });
  private readonly _pageIndex = new BehaviorSubject(0);
  private readonly _pageSize = new BehaviorSubject(10);
  private readonly _totalOverride = new BehaviorSubject<number | null>(null);
  
  private readonly _groupBy = new BehaviorSubject<keyof T & string | null>(null);
  private readonly _expandedGroups = new BehaviorSubject<Set<string>>(new Set());

  /** Whether the data source is used for server-side pagination (skips local filtering/sorting/paging). */
  isServerSide = false;

  /** Whether to return the full filtered data instead of a page slice (for virtual scroll). */
  isVirtualized = false;

  private readonly _filteredSorted = combineLatest([this._data, this._filter, this._filterModel, this._sort]).pipe(
    map(([rows, filter, filterModel, sort]) => {
      if (this.isServerSide) return rows;
      
      // 1. Global Filter (simple string)
      let out = rows.filter((row) => this.filterPredicate(row, filter));
      
      // 2. Advanced Filters (multi-column)
      if (filterModel.items.length > 0) {
        out = this.applyAdvancedFilters(out, filterModel);
      }

      // 3. Sorting
      return this.applySort(out, sort);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private readonly _grouped = combineLatest([this._filteredSorted, this._groupBy, this._expandedGroups]).pipe(
    map(([rows, groupBy, expanded]) => {
      if (!groupBy || this.isServerSide) return rows as (T | GngGroupRow<T>)[];
      return this.applyGrouping(rows, groupBy, expanded);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** Full filtered + sorted list (not paginated). */
  readonly filteredData$: Observable<T[]> = this._filteredSorted;

  /** Row count after filter/sort — bind to `gng-pagination` `[length]`. */
  readonly filteredLength$: Observable<number> = combineLatest([this._grouped, this._totalOverride]).pipe(
    map(([rows, override]) => override ?? rows.length)
  );

  private readonly _pageData = combineLatest([this._grouped, this._pageIndex, this._pageSize]).pipe(
    map(([rows, pageIndex, pageSize]) => {
      if (this.isVirtualized || this.isServerSide) return rows;
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
    options?: { pageSize?: number; isVirtualized?: boolean },
  ) {
    this._data.next(initialData.slice());
    if (options?.pageSize != null && options.pageSize > 0) {
      this._pageSize.next(options.pageSize);
    }
    if (options?.isVirtualized) {
      this.isVirtualized = true;
    }
  }

  get data(): T[] {
    return this._data.value.slice();
  }

  set data(rows: T[]) {
    this._data.next(rows.slice());
    this._pageIndex.next(0);
  }

  /** Append rows to existing data (useful for infinite scroll). */
  appendData(rows: T[]): void {
    const current = this._data.value;
    this._data.next([...current, ...rows]);
  }

  setFilter(value: string): void {
    this._filter.next(value);
    this._pageIndex.next(0);
  }

  get filterModel(): GngTableFilterModel<T> {
    return this._filterModel.value;
  }

  set filterModel(value: GngTableFilterModel<T>) {
    this._filterModel.next(value);
    this._pageIndex.next(0);
  }

  readonly filterModel$ = this._filterModel.asObservable();

  setFilterModel(model: GngTableFilterModel<T>): void {
    this.filterModel = model;
  }

  setSort(active: keyof T & string | null, direction: GngTableSortDirection): void {
    const dir: GngTableSortDirection = active ? direction || 'asc' : '';
    this._sort.next({ active, direction: dir });
    if (!this.isServerSide) {
      this._pageIndex.next(0);
    }
  }

  /** Set the total record count when using server-side pagination. */
  setTotal(total: number | null): void {
    this._totalOverride.next(total);
  }

  /** Sync page from `gng-pagination` `(pageChange)` or two-way models. */
  setPage(pageIndex: number, pageSize: number): void {
    this._pageIndex.next(pageIndex);
    this._pageSize.next(pageSize);
  }

  setGroupBy(key: keyof T & string | null): void {
    this._groupBy.next(key);
    this._pageIndex.next(0);
  }

  toggleGroup(value: any): void {
    const current = new Set(this._expandedGroups.value);
    const id = String(value);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this._expandedGroups.next(current);
  }

  isGroup(row: T | GngGroupRow<T>): row is GngGroupRow<T> {
    return (row as GngGroupRow<T>).isGroup === true;
  }

  connect(_collectionViewer: CollectionViewer): Observable<readonly (T | GngGroupRow<T>)[]> {
    return this._pageData as Observable<readonly (T | GngGroupRow<T>)[]>;
  }

  disconnect(_collectionViewer: CollectionViewer): void {}

  private applyAdvancedFilters(rows: T[], model: GngTableFilterModel<T>): T[] {
    const { items, logicOperator } = model;
    
    return rows.filter((row) => {
      const results = items.map((item) => {
        // Skip filter if value is empty/null/undefined unless checking for emptiness
        if (item.value === null || item.value === undefined || item.value === '') {
          if (item.operator !== 'isEmpty' && item.operator !== 'isNotEmpty') {
            return true;
          }
        }

        const val = this.sortingDataAccessor(row, item.field);
        const filterVal = item.value;

        // Type conversion for numeric comparisons
        const numericVal = typeof val === 'string' && !isNaN(Number(val)) ? Number(val) : val;
        const numericFilterVal = typeof filterVal === 'string' && !isNaN(Number(filterVal)) ? Number(filterVal) : filterVal;
        const isNumeric = typeof numericVal === 'number' && typeof numericFilterVal === 'number';

        switch (item.operator) {
          case 'contains':
            return String(val).toLowerCase().includes(String(filterVal).toLowerCase());
          case 'notContains':
            return !String(val).toLowerCase().includes(String(filterVal).toLowerCase());
          case 'equals':
            if (typeof val === 'string' && typeof filterVal === 'string') {
              return val.toLowerCase() === filterVal.toLowerCase();
            }
            return val === filterVal;
          case 'notEquals':
            return val !== filterVal;
          case 'startsWith':
            return String(val).toLowerCase().startsWith(String(filterVal).toLowerCase());
          case 'endsWith':
            return String(val).toLowerCase().endsWith(String(filterVal).toLowerCase());
          case 'gt':
            return isNumeric ? (numericVal as number) > (numericFilterVal as number) : val > filterVal;
          case 'lt':
            return isNumeric ? (numericVal as number) < (numericFilterVal as number) : val < filterVal;
          case 'gte':
            return isNumeric ? (numericVal as number) >= (numericFilterVal as number) : val >= filterVal;
          case 'lte':
            return isNumeric ? (numericVal as number) <= (numericFilterVal as number) : val <= filterVal;
          case 'isEmpty':
            return val === null || val === undefined || val === '';
          case 'isNotEmpty':
            return val !== null && val !== undefined && val !== '';
          default:
            return true;
        }
      });

      if (logicOperator === 'and') {
        return results.every(r => r);
      } else {
        return results.some(r => r);
      }
    });
  }

  private applySort(rows: T[], sort: GngTableSortState<T>): T[] {
    const { active, direction } = sort;
    if (!active || !direction) return rows;

    const dir = direction === 'asc' ? 1 : -1;
    const prop = active as keyof T & string;
    
    return [...rows].sort((a, b) => {
      const av = this.sortingDataAccessor(a, prop);
      const bv = this.sortingDataAccessor(b, prop);
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }

  private applyGrouping(rows: T[], groupBy: keyof T & string, expanded: Set<string>): (T | GngGroupRow<T>)[] {
    const groups = new Map<any, T[]>();
    
    // Sort items by group first to ensure they appear together if not already sorted
    const sorted = [...rows].sort((a, b) => {
      const av = String(a[groupBy]);
      const bv = String(b[groupBy]);
      return av.localeCompare(bv);
    });

    sorted.forEach(row => {
      const val = row[groupBy];
      if (!groups.has(val)) groups.set(val, []);
      groups.get(val)!.push(row);
    });

    const out: (T | GngGroupRow<T>)[] = [];
    groups.forEach((items, value) => {
      const id = String(value);
      const isExpanded = expanded.has(id);
      
      out.push({
        isGroup: true,
        groupKey: groupBy,
        groupValue: value,
        items,
        expanded: isExpanded,
        totalCount: items.length,
        aggregations: {} // Future expansion
      });

      if (isExpanded) {
        out.push(...items);
      }
    });

    return out;
  }
}
