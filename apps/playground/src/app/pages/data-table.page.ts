import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import {
  ButtonComponent,
  InputComponent,
  CheckboxComponent,
  BadgeComponent,
  GlassSkeletonComponent,
  GlassDataTableContainerComponent,
  LgTableDirective,
  LgHeaderCellDirective,
  LgCellDirective,
  LgHeaderRowDirective,
  LgRowDirective,
  PaginationComponent,
  LgTableDataSource,
  LgSortDirective,
  LgSortHeaderComponent,
  LgTableEmptyStateComponent,
  LgVirtualDataTableComponent,
  type LgPageEvent,
} from '@liquid-glass-ui/angular';

interface UserData {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  email: string;
  lastActive: string;
}

function buildDemoUsers(): UserData[] {
  const rows: UserData[] = [
    { id: 'USR-001', name: 'Alexander Wright', role: 'System Architect', status: 'online', email: 'alex.w@liquid.io', lastActive: '2 mins ago' },
    { id: 'USR-002', name: 'Elena Rodriguez', role: 'UI/UX Lead', status: 'away', email: 'elena.r@liquid.io', lastActive: '15 mins ago' },
    { id: 'USR-003', name: 'Marcus Chen', role: 'Backend Developer', status: 'offline', email: 'm.chen@liquid.io', lastActive: '3 hours ago' },
    { id: 'USR-004', name: 'Sarah Jenkins', role: 'Product Manager', status: 'online', email: 's.jenkins@liquid.io', lastActive: 'Just now' },
    { id: 'USR-005', name: 'David Miller', role: 'DevOps Engineer', status: 'online', email: 'd.miller@liquid.io', lastActive: '5 mins ago' },
  ];
  const roles = ['System Architect', 'UI/UX Lead', 'Backend Developer', 'Product Manager', 'DevOps Engineer', 'QA Engineer', 'Data Analyst'];
  const statuses: UserData['status'][] = ['online', 'away', 'offline'];
  for (let i = 6; i <= 28; i++) {
    rows.push({
      id: `USR-${String(i).padStart(3, '0')}`,
      name: `Team Member ${i}`,
      role: roles[i % roles.length],
      status: statuses[i % 3],
      email: `member${i}@liquid.io`,
      lastActive: `${(i * 7) % 59} mins ago`,
    });
  }
  return rows;
}

function buildMassiveUsers(count: number): UserData[] {
  const roles = ['System Architect', 'UI/UX Lead', 'Backend Developer', 'Product Manager', 'DevOps Engineer', 'QA Engineer', 'Data Analyst'];
  const statuses: UserData['status'][] = ['online', 'away', 'offline'];
  return Array.from({ length: count }, (_, i) => ({
    id: `MASS-${String(i).padStart(6, '0')}`,
    name: `User ${i}`,
    role: roles[i % roles.length],
    status: statuses[i % 3],
    email: `user${i}@bigdata.io`,
    lastActive: 'Now',
  }));
}

@Component({
  selector: 'pg-data-table-page',
  standalone: true,
  imports: [
    CommonModule,
    CdkTableModule,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    BadgeComponent,
    GlassSkeletonComponent,
    GlassDataTableContainerComponent,
    LgTableDirective,
    LgHeaderCellDirective,
    LgCellDirective,
    LgHeaderRowDirective,
    LgRowDirective,
    PaginationComponent,
    LgSortDirective,
    LgSortHeaderComponent,
    LgTableEmptyStateComponent,
    LgVirtualDataTableComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Data table</h1>
      <p class="text-body-sm text-zinc-400 mt-1">
        Tabla con cristal, orden, selección y paginación vía <code class="text-xs opacity-80">LgTableDataSource</code> (estilo
        MatTableDataSource).
      </p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <i class="ri-table-line text-[var(--lg-t-primary)]"></i>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Data Visuals (Glass Data Table)</h3>
      </div>

      <div class="space-y-12 mb-12">
        <div class="p-4 rounded-xl bg-glass border border-glass-border">
          <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div class="w-full sm:w-72">
              <lg-input placeholder="Filter by name or role..." (input)="userData.setFilter($any($event.target).value)">
                <i lg-icon-left class="ri-search-line"></i>
              </lg-input>
            </div>
            <div class="flex gap-2">
              <lg-badge variant="info" size="sm">Results: {{ filteredCount() }}</lg-badge>
              <lg-badge variant="neutral" size="sm">Selected: {{ selection.selected.length }}</lg-badge>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">
            Example 1: Refined Glass Headers, Sorting &amp; Pagination (<code class="text-[9px]">LgTableDataSource</code>)
          </p>
          <lg-data-table-container>
            <table lg-table cdk-table [dataSource]="userData" lgSort (lgSortChange)="userData.setSort($any($event.active), $event.direction)" [trackBy]="trackById">
              <ng-container cdkColumnDef="select">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef class="w-12">
                  <lg-checkbox
                    (changed)="masterToggle()"
                    [checked]="selection.hasValue() && isAllSelected()"
                    [indeterminate]="selection.hasValue() && !isAllSelected()"
                  ></lg-checkbox>
                </th>
                <td lg-cell cdk-cell *cdkCellDef="let row">
                  <lg-checkbox
                    (click)="$event.stopPropagation()"
                    (changed)="selection.toggle(row)"
                    [checked]="selection.isSelected(row)"
                  ></lg-checkbox>
                </td>
              </ng-container>

              <ng-container cdkColumnDef="id">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>ID</th>
                <td lg-cell cdk-cell *cdkCellDef="let row" class="font-mono text-[10px] opacity-50">{{ row.id }}</td>
              </ng-container>

              <ng-container cdkColumnDef="name">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef lg-sort-header="name">
                  Member
                </th>
                <td lg-cell cdk-cell *cdkCellDef="let row">
                  <div class="lg-cell-avatar">
                    <div class="lg-avatar-circle">{{ row.name.charAt(0) }}</div>
                    <div>
                      <span class="lg-cell-primary">{{ row.name }}</span>
                      <span class="lg-cell-secondary">{{ row.email }}</span>
                    </div>
                  </div>
                </td>
              </ng-container>

              <ng-container cdkColumnDef="role">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef lg-sort-header="role">
                  Role
                </th>
                <td lg-cell cdk-cell *cdkCellDef="let row" class="opacity-70">{{ row.role }}</td>
              </ng-container>

              <ng-container cdkColumnDef="status">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Status</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">
                  <lg-badge
                    [variant]="row.status === 'online' ? 'success' : row.status === 'away' ? 'warning' : 'error'"
                    size="sm"
                  >
                    {{ row.status }}
                  </lg-badge>
                </td>
              </ng-container>

              <ng-container cdkColumnDef="email">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Email</th>
                <td lg-cell cdk-cell *cdkCellDef="let row" class="text-xs opacity-40">{{ row.email }}</td>
              </ng-container>

              <ng-container cdkColumnDef="actions">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef></th>
                <td lg-cell cdk-cell *cdkCellDef="let row" class="text-right">
                  <button lg-button variant="ghost" size="sm" [iconOnly]="true"><i class="ri-more-2-line"></i></button>
                </td>
              </ng-container>

              <tr lg-header-row cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
              <tr
                lg-row
                cdk-row
                *cdkRowDef="let row; columns: displayedColumns"
                [isSelected]="selection.isSelected(row)"
                (click)="selection.toggle(row)"
              ></tr>
            </table>
          </lg-data-table-container>
          <lg-pagination
            [length]="filteredCount()"
            [pageIndex]="dsPageIndex()"
            [pageSize]="dsPageSize()"
            (pageChange)="onUserPage($event)"
            [pageSizeOptions]="[3, 5, 10, 25]"
            [showFirstLast]="true"
            ariaLabel="Paginación de la tabla de miembros"
          />
        </div>

        <div class="space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">
            Example 2: High Density &amp; Side-Pinning (Liquid Pinned)
          </p>
          <lg-data-table-container>
            <table lg-table cdk-table [dataSource]="users()" class="min-w-[1200px]" [trackBy]="trackById">
              <ng-container cdkColumnDef="id" sticky="true">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>ID</th>
                <td lg-cell cdk-cell *cdkCellDef="let row" class="font-bold text-primary">{{ row.id }}</td>
              </ng-container>

              <ng-container cdkColumnDef="name">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Full Name</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">{{ row.name }}</td>
              </ng-container>

              <ng-container cdkColumnDef="role">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Role</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">{{ row.role }}</td>
              </ng-container>
              <ng-container cdkColumnDef="status">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Status</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">{{ row.status }}</td>
              </ng-container>
              <ng-container cdkColumnDef="email">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Email</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">{{ row.email }}</td>
              </ng-container>
              <ng-container cdkColumnDef="lastActive">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Last Active</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">{{ row.lastActive }}</td>
              </ng-container>

              <ng-container cdkColumnDef="col1">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric A</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">1,240</td>
              </ng-container>
              <ng-container cdkColumnDef="col2">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric B</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">84%</td>
              </ng-container>
              <ng-container cdkColumnDef="col3">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric C</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">Active</td>
              </ng-container>
              <ng-container cdkColumnDef="col4">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric D</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">Global</td>
              </ng-container>
              <ng-container cdkColumnDef="col5">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Metric E</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">Premium</td>
              </ng-container>

              <ng-container cdkColumnDef="actions" stickyEnd="true">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Operations</th>
                <td lg-cell cdk-cell *cdkCellDef="let row" class="text-right">
                  <button lg-button variant="primary" size="sm">Manage</button>
                </td>
              </ng-container>

              <tr lg-header-row cdk-header-row *cdkHeaderRowDef="denseColumns"></tr>
              <tr lg-row cdk-row *cdkRowDef="let row; columns: denseColumns"></tr>
            </table>
          </lg-data-table-container>
        </div>

        <div class="space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">Example 4: Empty State &amp; Filter Results</p>
          <lg-data-table-container>
            <table lg-table cdk-table [dataSource]="emptyData" [trackBy]="trackById">
              <ng-container cdkColumnDef="id">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>ID</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">{{ row.id }}</td>
              </ng-container>
              <ng-container cdkColumnDef="name">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Name</th>
                <td lg-cell cdk-cell *cdkCellDef="let row">{{ row.name }}</td>
              </ng-container>

              <tr lg-header-row cdk-header-row *cdkHeaderRowDef="['id', 'name']"></tr>
              <tr lg-row cdk-row *cdkRowDef="let row; columns: ['id', 'name']"></tr>
            </table>

            <lg-table-empty-state
              *ngIf="emptyData.data.length === 0"
              title="No members found"
              description="We couldn't find any team members matching your search criteria."
            >
              <button actions lg-button variant="primary" size="sm" (click)="emptyData.setFilter('')">
                Clear Filters
              </button>
            </lg-table-empty-state>
          </lg-data-table-container>
        </div>

        <!-- Example 5: Virtual Scroll (10,000+ Rows) -->
        <div class="space-y-4">
          <div class="flex items-center justify-between px-2">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">
              Example 5: Virtual Scroll &amp; Infinite Load (10,000+ Records)
            </p>
            <lg-badge variant="info" [isPulsating]="true">{{ massiveData.data.length }} Records</lg-badge>
          </div>
          
          <lg-virtual-data-table 
            height="500px" 
            [itemSize]="64" 
            [isLoading]="isMassiveLoading"
            (loadMore)="loadMoreMassive()"
          >
            <!-- Header must be provided separately to stay fixed -->
            <div lgVirtualHeader class="lg-table-flex lg-table">
              <div class="lg-row lg-header-row">
                <div class="lg-header-cell">ID</div>
                <div class="lg-header-cell">User</div>
                <div class="lg-header-cell">Role</div>
                <div class="lg-header-cell">Status</div>
              </div>
            </div>

            <table cdk-table [dataSource]="massiveData" class="lg-table-flex lg-table">
              <ng-container cdkColumnDef="id">
                <td cdk-cell *cdkCellDef="let row" class="lg-cell font-mono text-[11px] opacity-50">{{ row.id }}</td>
              </ng-container>
              <ng-container cdkColumnDef="name">
                <td cdk-cell *cdkCellDef="let row" class="lg-cell font-bold">{{ row.name }}</td>
              </ng-container>
              <ng-container cdkColumnDef="role">
                <td cdk-cell *cdkCellDef="let row" class="lg-cell">{{ row.role }}</td>
              </ng-container>
              <ng-container cdkColumnDef="status">
                <td cdk-cell *cdkCellDef="let row" class="lg-cell">
                   <lg-badge [variant]="row.status === 'online' ? 'success' : (row.status === 'away' ? 'warning' : 'neutral')">
                    {{ row.status }}
                   </lg-badge>
                </td>
              </ng-container>

              <tr cdk-row *cdkRowDef="let row; columns: ['id', 'name', 'role', 'status']" class="lg-row"></tr>
            </table>
          </lg-virtual-data-table>
        </div>

        <!-- Example 6: Remote API (Server-side Pagination) -->
        <div class="space-y-4">
          <div class="flex items-center justify-between px-2">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">
              Example 6: Remote API Mock (Server-side Pagination)
            </p>
            <div class="flex items-center gap-2">
               <lg-badge *ngIf="isRemoteLoading" variant="info" [isPulsating]="true">Fetching API...</lg-badge>
               <lg-badge variant="neutral">{{ remoteTotal }} Total</lg-badge>
            </div>
          </div>

          <lg-data-table-container [isLoading]="isRemoteLoading">
            <div lgTableHeader class="p-4 border-b border-white/5 flex items-center gap-4">
              <div class="relative flex-1">
                <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 opacity-30"></i>
                <input 
                  lg-input 
                  placeholder="Search API (Remote)..." 
                  class="pl-10"
                  (input)="onRemoteSearch($event)"
                >
              </div>
            </div>

            <table cdk-table [dataSource]="remoteData" class="lg-table">
              <ng-container cdkColumnDef="id">
                <th cdk-header-cell *cdkHeaderCellDef class="lg-header-cell">ID</th>
                <td cdk-cell *cdkCellDef="let row" class="lg-cell font-mono text-[11px] opacity-50">{{ row.id }}</td>
              </ng-container>
              <ng-container cdkColumnDef="name">
                <th cdk-header-cell *cdkHeaderCellDef class="lg-header-cell">User</th>
                <td cdk-cell *cdkCellDef="let row" class="lg-cell font-bold text-[var(--lg-t-primary)]">{{ row.name }}</td>
              </ng-container>
              <ng-container cdkColumnDef="role">
                <th cdk-header-cell *cdkHeaderCellDef class="lg-header-cell">Role</th>
                <td cdk-cell *cdkCellDef="let row" class="lg-cell opacity-80">{{ row.role }}</td>
              </ng-container>

              <tr cdk-header-row *cdkHeaderRowDef="['id', 'name', 'role']" class="lg-header-row"></tr>
              <tr cdk-row *cdkRowDef="let row; columns: ['id', 'name', 'role']" class="lg-row"></tr>
            </table>

            <lg-pagination 
              lgTablePagination 
              [length]="remoteTotal"
              [pageSize]="remotePageSize" 
              [pageIndex]="remotePageIndex"
              (pageChange)="onRemotePage($event)"
            ></lg-pagination>
          </lg-data-table-container>
        </div>
      </div>
    </section>
  `,
})
export class DataTablePage {
  readonly users = signal<UserData[]>(buildDemoUsers());

  readonly userData = new LgTableDataSource<UserData>(buildDemoUsers(), { pageSize: 5 });
  readonly emptyData = new LgTableDataSource<UserData>([]);

  // Virtual Scroll Demo (Stress Test)
  readonly massiveData = new LgTableDataSource<UserData>(buildMassiveUsers(10000), { isVirtualized: true });
  isMassiveLoading = false;

  // Remote API Demo
  readonly remoteData = new LgTableDataSource<UserData>([]);
  isRemoteLoading = false;
  remoteTotal = 0;
  remotePageIndex = 0;
  remotePageSize = 5;
  private remoteSearch = '';

  readonly filteredCount = toSignal(this.userData.filteredLength$, { initialValue: buildDemoUsers().length });
  readonly dsPageIndex = toSignal(this.userData.pageIndex$, { initialValue: 0 });
  readonly dsPageSize = toSignal(this.userData.pageSize$, { initialValue: 5 });
  readonly userPage = toSignal(this.userData.page$, { initialValue: [] as UserData[] });

  constructor() {
    this.userData.filterPredicate = (u, filter) => {
      const q = filter.trim().toLowerCase();
      if (!q) return true;
      return u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    };

    // Initial fetch for remote
    this.remoteData.isServerSide = true;
    this.fetchRemoteData();
  }

  readonly selection = new SelectionModel<UserData>(true, []);
  readonly displayedColumns = ['select', 'id', 'name', 'role', 'status', 'email', 'actions'];
  readonly denseColumns = ['id', 'name', 'role', 'status', 'email', 'lastActive', 'col1', 'col2', 'col3', 'col4', 'col5', 'actions'];

  onUserPage(ev: LgPageEvent): void {
    this.userData.setPage(ev.pageIndex, ev.pageSize);
  }

  isAllSelected(): boolean {
    const page = this.userPage();
    if (page.length === 0) return false;
    return page.every((row) => this.selection.isSelected(row));
  }

  masterToggle(): void {
    const page = this.userPage();
    if (page.length === 0) return;
    if (this.isAllSelected()) {
      page.forEach((row) => this.selection.deselect(row));
    } else {
      page.forEach((row) => this.selection.select(row));
    }
  }

  trackById(index: number, item: UserData): string {
    return item.id;
  }

  loadMoreMassive(): void {
    if (this.isMassiveLoading || this.massiveData.data.length >= 100000) return;
    
    this.isMassiveLoading = true;
    // Simulate API delay
    setTimeout(() => {
      const nextBatch = buildMassiveUsers(200).map(u => ({
        ...u,
        id: `MASS-${String(this.massiveData.data.length + 1).padStart(6, '0')}`,
        name: `User ${this.massiveData.data.length}`
      }));
      this.massiveData.appendData(nextBatch);
      this.isMassiveLoading = false;
    }, 800);
  }

  onRemotePage(ev: LgPageEvent): void {
    this.remotePageIndex = ev.pageIndex;
    this.remotePageSize = ev.pageSize;
    this.fetchRemoteData();
  }

  onRemoteSearch(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.remoteSearch = input.value;
    this.remotePageIndex = 0; // Reset to first page
    this.fetchRemoteData();
  }

  private fetchRemoteData(): void {
    this.isRemoteLoading = true;
    
    // Simulate remote API call
    setTimeout(() => {
      const allMockData = buildDemoUsers();
      const filtered = allMockData.filter(u => 
        u.name.toLowerCase().includes(this.remoteSearch.toLowerCase()) ||
        u.role.toLowerCase().includes(this.remoteSearch.toLowerCase())
      );
      
      this.remoteTotal = filtered.length;
      const start = this.remotePageIndex * this.remotePageSize;
      const pageData = filtered.slice(start, start + this.remotePageSize);
      
      this.remoteData.data = pageData;
      this.remoteData.setTotal(this.remoteTotal);
      this.isRemoteLoading = false;
    }, 1000);
  }
}
