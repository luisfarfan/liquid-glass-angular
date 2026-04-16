import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lg-data-table-container',
  standalone: true,
  template: `
    <div class="lg-data-table-viewport lg-glass-scroll max-w-full rounded-xl border border-glass-border bg-glass">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './data-table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassDataTableContainerComponent {}
