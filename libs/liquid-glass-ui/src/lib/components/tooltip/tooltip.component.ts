import { Component, Input, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lg-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-tooltip-bubble" [class]="'lg-tooltip-' + variant">
      <ng-container *ngIf="isTemplate; else textContent">
        <ng-container *ngTemplateOutlet="asTemplate"></ng-container>
      </ng-container>
      <ng-template #textContent>{{ asString }}</ng-template>
    </div>
  `,
  styleUrl: './tooltip.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidTooltipComponent {
  @Input() content: string | TemplateRef<any> = '';
  @Input() variant: 'default' | 'primary' | 'accent' = 'default';

  get isTemplate(): boolean {
    return this.content instanceof TemplateRef;
  }

  get asTemplate(): TemplateRef<any> {
    return this.content as TemplateRef<any>;
  }

  get asString(): string {
    return this.content as string;
  }
}
