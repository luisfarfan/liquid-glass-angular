import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LgFilterItem } from '../lg-table-data-source';

@Component({
  selector: 'lg-filter-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-primary/20 border border-primary/30 text-[11px] text-white backdrop-blur-md animate-in zoom-in duration-200">
      <span class="opacity-60 font-medium lowercase tracking-wide">{{ columnLabel }}:</span>
      <span class="font-bold border-r border-white/20 pr-2 mr-1">{{ operatorLabel }}</span>
      <span class="font-mono">{{ item.value || '(Empty)' }}</span>
      <button (click)="remove.emit()" class="p-0.5 rounded-full hover:bg-white/20 transition-colors">
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgFilterBadgeComponent {
  @Input({ required: true }) item!: LgFilterItem<any>;
  @Input({ required: true }) columnLabel: string = '';
  @Input({ required: true }) operatorLabel: string = '';
  @Output() remove = new EventEmitter<void>();
}
