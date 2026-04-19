import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlassCardComponent } from '../../glass-card/glass-card.component';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { ButtonComponent } from '../../button/button.component';

export interface LgColumnDef {
  key: string;
  label: string;
  visible: boolean;
  fixed?: boolean; // If true, cannot be hidden
}

@Component({
  selector: 'lg-column-selector',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    GlassCardComponent, 
    CheckboxComponent,
    ButtonComponent
  ],
  template: `
    <lg-glass-card class="bg-glass-card/95 backdrop-blur-3xl border border-glass-border shadow-2xl p-4 w-[250px]">
      <div class="mb-4 pb-2 border-b border-glass-border">
        <h3 class="text-sm font-bold uppercase tracking-wider text-glass-text-muted">Columns</h3>
      </div>

      <div class="space-y-1 mb-4 max-h-[300px] overflow-y-auto lg-scroll-thin pr-1">
        <div *ngFor="let col of columns(); trackBy: trackByKey" 
             class="flex items-center justify-between p-2 rounded-md hover:bg-glass-surface/30 transition-colors group"
             [class.opacity-50]="col.fixed">
          <label class="flex items-center gap-3 cursor-pointer flex-1">
            <lg-checkbox [(ngModel)]="col.visible" 
                        [disabled]="!!col.fixed"
                        (ngModelChange)="onToggle()"></lg-checkbox>
            <span class="text-sm text-glass-text group-hover:text-white transition-colors">{{ col.label }}</span>
          </label>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-glass-border">
        <button lg-button variant="text" size="sm" (click)="reset()">Reset All</button>
        <button lg-button variant="text" size="sm" (click)="hideAll()">Hide All</button>
      </div>
    </lg-glass-card>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgColumnSelectorComponent {
  /** Initial column definitions. */
  @Input({ required: true }) initialColumns: LgColumnDef[] = [];
  
  /** Persistence key for localStorage. If null, no persistence. */
  @Input() persistenceKey: string | null = null;

  @Output() visibilityChange = new EventEmitter<string[]>();

  protected columns = signal<LgColumnDef[]>([]);

  ngOnInit() {
    let saved: string[] | null = null;
    if (this.persistenceKey) {
      const data = localStorage.getItem(`lg-table-cols-${this.persistenceKey}`);
      if (data) {
        try { saved = JSON.parse(data); } catch {}
      }
    }

    const cols = this.initialColumns.map(c => ({
      ...c,
      visible: saved ? saved.includes(c.key) || !!c.fixed : c.visible
    }));

    this.columns.set(cols);
    this.emitVisibility();
  }

  onToggle() {
    this.save();
    this.emitVisibility();
  }

  reset() {
    this.columns.update(cols => cols.map(c => ({ ...c, visible: true })));
    this.onToggle();
  }

  hideAll() {
    this.columns.update(cols => cols.map(c => ({ ...c, visible: !!c.fixed })));
    this.onToggle();
  }

  private save() {
    if (!this.persistenceKey) return;
    const visibleKeys = this.columns()
      .filter(c => c.visible)
      .map(c => c.key);
    localStorage.setItem(`lg-table-cols-${this.persistenceKey}`, JSON.stringify(visibleKeys));
  }

  private emitVisibility() {
    const visibleKeys = this.columns()
      .filter(c => c.visible)
      .map(c => c.key);
    this.visibilityChange.emit(visibleKeys);
  }

  trackByKey(index: number, item: LgColumnDef) {
    return item.key;
  }
}
