import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, signal, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LgTableDataSource, LgFilterOperator, LgTableFilterModel, LgFilterItem } from '../lg-table-data-source';
import { ButtonComponent } from '../../button/button.component';
import { InputComponent } from '../../input/input.component';
import { SelectComponent } from '../../select/select.component';
import { SelectOptionComponent } from '../../select/select-option.component';
import { GlassCardComponent } from '../../glass-card/glass-card.component';

@Component({
  selector: 'lg-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    SelectOptionComponent,
    GlassCardComponent
  ],
  template: `
    <lg-glass-card class="lg-filter-panel-card bg-glass-card/90 backdrop-blur-2xl border border-glass-border shadow-2xl p-4 w-[22rem] overflow-visible rounded-2xl">
      <!-- Minimal Header -->
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-glass-border/30">
        <span class="text-[0.7rem] uppercase font-bold tracking-widest opacity-60">Filtros</span>
        
        <div class="flex items-center bg-glass-surface/50 rounded-lg p-0.5 border border-glass-border/20">
          <button (click)="localLogic = 'and'; apply()" 
                  [class.bg-primary]="localLogic === 'and'"
                  [class.text-black]="localLogic === 'and'"
                  class="px-2 py-0.5 text-[0.65rem] font-bold rounded-md transition-all duration-200">AND</button>
          <button (click)="localLogic = 'or'; apply()" 
                  [class.bg-primary]="localLogic === 'or'"
                  [class.text-black]="localLogic === 'or'"
                  class="px-2 py-0.5 text-[0.65rem] font-bold rounded-md transition-all duration-200">OR</button>
        </div>
      </div>

      <!-- Rules List -->
      <div class="space-y-4 max-h-[25rem] overflow-y-auto lg-glass-scroll pr-1 mb-4">
        <div *ngFor="let item of localItems(); let i = index; trackBy: trackById" 
             class="relative group animate-in fade-in slide-in-from-top-1">
          
          <div class="flex flex-col gap-2 p-3 rounded-xl bg-glass-surface/20 border border-glass-border/10 hover:border-glass-border/40 transition-all duration-300">
            <div class="flex gap-2">
              <lg-select [(ngModel)]="item.field" (ngModelChange)="apply()" class="flex-1" [placeholder]="'Columna'">
                <lg-option *ngFor="let col of availableColumns" [value]="col.key">{{ col.label }}</lg-option>
              </lg-select>
              
              <lg-select [(ngModel)]="item.operator" (ngModelChange)="apply()" class="w-[9rem]" [placeholder]="'Operador'">
                <lg-option *ngFor="let op of operators" [value]="op.value">{{ op.label }}</lg-option>
              </lg-select>
            </div>

            <div class="flex items-center gap-2" *ngIf="item.operator !== 'isEmpty' && item.operator !== 'isNotEmpty'">
              <lg-input [(ngModel)]="item.value" (ngModelChange)="apply()" class="flex-1" [placeholder]="'Valor...'"></lg-input>
              
              <button (click)="removeItem(i)" 
                      class="shrink-0 p-2 rounded-lg hover:bg-error/20 text-glass-text-muted hover:text-error transition-all duration-200">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>

            <div *ngIf="item.operator === 'isEmpty' || item.operator === 'isNotEmpty'" class="flex justify-end">
               <button (click)="removeItem(i)" class="p-1 px-2 text-[0.6rem] uppercase tracking-tighter opacity-40 hover:opacity-100 hover:text-error">Eliminar</button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="localItems().length === 0" class="py-10 text-center">
           <p class="text-[0.7rem] text-glass-text-muted opacity-40 uppercase tracking-widest font-medium">Sin filtros activos</p>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-glass-border/30">
        <button lg-button variant="text" size="sm" color="error" class="text-[0.7rem] px-2" [disabled]="localItems().length === 0" (click)="clearAll()">
          Limpiar
        </button>
        <button lg-button variant="primary" size="sm" class="h-8 !rounded-lg text-[0.7rem] px-3 font-bold" (click)="addItem()">
          + Añadir Regla
        </button>
      </div>
    </lg-glass-card>
  `,
  styles: [`
    .lg-filter-panel-card {
      z-index: 1000;
    }
    .lg-glass-scroll::-webkit-scrollbar {
      width: 0.25rem;
    }
    .lg-glass-scroll::-webkit-scrollbar-thumb {
      background: rgba(var(--glass-text-rgb), 0.1);
      border-radius: 0.625rem;
    }
    .lg-glass-scroll::-webkit-scrollbar-thumb:hover {
      background: rgba(var(--primary-rgb), 0.3);
    }
    
    /* Denser components for this panel specifically */
    .lg-filter-panel-card lg-select .lg-select-trigger,
    .lg-filter-panel-card lg-input .lg-input-field {
      min-height: 2.25rem !important;
      height: 2.25rem !important;
      padding: 0 0.75rem !important;
      border-radius: 0.625rem !important;
      font-size: 0.75rem !important;
    }
    .lg-filter-panel-card lg-select .lg-select-arrow svg {
      width: 1rem;
      height: 1rem;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgFilterPanelComponent implements OnInit {
  @Input({ required: true }) dataSource!: LgTableDataSource<any>;
  @Input({ required: true }) availableColumns: { key: string; label: string }[] = [];

  protected localItems = signal<LgFilterItem<any>[]>([]);
  protected localLogic: 'and' | 'or' = 'and';

  protected operators: { label: string; value: LgFilterOperator }[] = [
    { label: 'Contiene', value: 'contains' },
    { label: 'No contiene', value: 'notContains' },
    { label: 'Igual a', value: 'equals' },
    { label: 'No igual a', value: 'notEquals' },
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Mayor que', value: 'gt' },
    { label: 'Menor que', value: 'lt' },
    { label: 'Mayor o igual', value: 'gte' },
    { label: 'Menor o igual', value: 'lte' },
    { label: 'Está vacío', value: 'isEmpty' },
    { label: 'No está vacío', value: 'isNotEmpty' },
  ];

  ngOnInit() {
    // Sync with data source initial state
    const current = this.dataSource.filterModel;
    this.localItems.set([...current.items.map(i => ({ ...i }))]);
    this.localLogic = current.logicOperator;
  }

  addItem() {
    if (this.availableColumns.length === 0) return;
    
    const newItem: LgFilterItem<any> = {
      id: Math.random().toString(36).substring(2, 9),
      field: this.availableColumns[0].key,
      operator: 'contains',
      value: ''
    };
    
    this.localItems.update(items => [...items, newItem]);
    this.apply();
  }

  removeItem(index: number) {
    this.localItems.update(items => {
      const copy = [...items];
      copy.splice(index, 1);
      return copy;
    });
    this.apply();
  }

  clearAll() {
    this.localItems.set([]);
    this.apply();
  }

  apply() {
    this.dataSource.setFilterModel({
      items: this.localItems(),
      logicOperator: this.localLogic
    });
  }

  trackById(index: number, item: LgFilterItem<any>) {
    return item.id;
  }

  @HostListener('click', ['$event'])
  onPanelClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
