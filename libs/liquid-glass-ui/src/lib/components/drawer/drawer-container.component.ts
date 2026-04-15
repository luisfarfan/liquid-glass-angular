import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDialogContainer, DialogModule } from '@angular/cdk/dialog';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

/**
 * Contenedor CDK del Drawer: hoja a altura completa con portal del contenido.
 */
@Component({
  selector: 'lg-drawer-container',
  standalone: true,
  imports: [CommonModule, DialogModule, PortalModule, A11yModule],
  host: {
    class: 'lg-drawer-host',
  },
  template: `
    <div
      class="lg-drawer-sheet"
      cdkTrapFocus
      cdkTrapFocusAutoCapture
      (click)="$event.stopPropagation()"
    >
      <ng-template cdkPortalOutlet></ng-template>
    </div>
  `,
  styleUrl: './drawer.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidDrawerContainerComponent extends CdkDialogContainer {}
