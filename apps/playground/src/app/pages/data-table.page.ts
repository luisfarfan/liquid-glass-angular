import { Component, ViewEncapsulation, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from '@liquid-glass-ui/angular';

interface UserData {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  email: string;
  lastActive: string;
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
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Data table</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Tabla con cristal, orden y selección.</p>
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
              <lg-input placeholder="Filter by name or role..." (input)="searchQuery.set($any($event.target).value)">
                <i lg-icon-left class="ri-search-line"></i>
              </lg-input>
            </div>
            <div class="flex gap-2">
              <lg-badge variant="info" size="sm">Results: {{ filteredUsers().length }}</lg-badge>
              <lg-badge variant="neutral" size="sm">Selected: {{ selection.selected.length }}</lg-badge>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">
            Example 1: Refined Glass Headers &amp; Reactive Sorting
          </p>
          <lg-data-table-container>
            <table lg-table cdk-table [dataSource]="filteredUsers()">
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
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef class="is-sortable" (click)="toggleSort('name')">
                  Member
                  <i
                    class="ml-1 opacity-40"
                    [class.ri-arrow-up-s-line]="sortColumn() === 'name' && sortDirection() === 'asc'"
                    [class.ri-arrow-down-s-line]="sortColumn() === 'name' && sortDirection() === 'desc'"
                    [class.ri-sort-asc-desc]="sortColumn() !== 'name'"
                  ></i>
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
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef class="is-sortable" (click)="toggleSort('role')">
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
        </div>

        <div class="space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">
            Example 2: High Density &amp; Side-Pinning (Liquid Pinned)
          </p>
          <lg-data-table-container>
            <table lg-table cdk-table [dataSource]="users()" class="min-w-[1200px]">
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
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest px-2">Example 3: Skeleton UI (Loading State Integration)</p>
          <lg-data-table-container>
            <table lg-table cdk-table [dataSource]="[1, 2, 3]">
              <ng-container cdkColumnDef="id">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Identifier</th>
                <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="rect" width="60px"></lg-skeleton></td>
              </ng-container>
              <ng-container cdkColumnDef="name">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Member</th>
                <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="rect" width="140px"></lg-skeleton></td>
              </ng-container>
              <ng-container cdkColumnDef="status">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Status</th>
                <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="circle" width="24px" height="24px"></lg-skeleton></td>
              </ng-container>
              <ng-container cdkColumnDef="email">
                <th lg-header-cell cdk-header-cell *cdkHeaderCellDef>Contact Info</th>
                <td lg-cell cdk-cell *cdkCellDef="let row"><lg-skeleton type="text" width="180px"></lg-skeleton></td>
              </ng-container>

              <tr lg-header-row cdk-header-row *cdkHeaderRowDef="['id', 'name', 'status', 'email']"></tr>
              <tr
                lg-row
                cdk-row
                *cdkRowDef="let row; columns: ['id', 'name', 'status', 'email']"
                [isLoading]="true"
              ></tr>
            </table>
          </lg-data-table-container>
        </div>
      </div>
    </section>
  `,
})
export class DataTablePage {
  readonly users = signal<UserData[]>([
    { id: 'USR-001', name: 'Alexander Wright', role: 'System Architect', status: 'online', email: 'alex.w@liquid.io', lastActive: '2 mins ago' },
    { id: 'USR-002', name: 'Elena Rodriguez', role: 'UI/UX Lead', status: 'away', email: 'elena.r@liquid.io', lastActive: '15 mins ago' },
    { id: 'USR-003', name: 'Marcus Chen', role: 'Backend Developer', status: 'offline', email: 'm.chen@liquid.io', lastActive: '3 hours ago' },
    { id: 'USR-004', name: 'Sarah Jenkins', role: 'Product Manager', status: 'online', email: 's.jenkins@liquid.io', lastActive: 'Just now' },
    { id: 'USR-005', name: 'David Miller', role: 'DevOps Engineer', status: 'online', email: 'd.miller@liquid.io', lastActive: '5 mins ago' },
  ]);

  readonly searchQuery = signal('');
  readonly sortColumn = signal<keyof UserData | null>(null);
  readonly sortDirection = signal<'asc' | 'desc'>('asc');

  readonly filteredUsers = computed(() => {
    let result = this.users().filter(
      (u) =>
        u.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        u.role.toLowerCase().includes(this.searchQuery().toLowerCase()),
    );

    const col = this.sortColumn();
    if (col) {
      result = [...result].sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        const dir = this.sortDirection() === 'asc' ? 1 : -1;
        return valA > valB ? dir : -dir;
      });
    }
    return result;
  });

  readonly selection = new SelectionModel<UserData>(true, []);
  readonly displayedColumns = ['select', 'id', 'name', 'role', 'status', 'email', 'actions'];
  readonly denseColumns = ['id', 'name', 'role', 'status', 'email', 'lastActive', 'col1', 'col2', 'col3', 'col4', 'col5', 'actions'];

  toggleSort(col: keyof UserData): void {
    if (this.sortColumn() === col) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col);
      this.sortDirection.set('asc');
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredUsers().length;
    return numSelected === numRows && numRows > 0;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.filteredUsers().forEach((row) => this.selection.select(row));
    }
  }
}
