import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lg-data-table-container',
  standalone: true,
  template: `
    <div class="lg-data-table-viewport overflow-auto max-w-full rounded-xl border border-glass-border bg-glass">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .lg-data-table-viewport {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    }
  `],
  styleUrl: './data-table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassDataTableContainerComponent {}
