import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDialogContainer, DialogModule } from '@angular/cdk/dialog';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

/**
 * GngDrawerContainer
 * Internal CDK container for side-sheet panels with glass-morphism and portal support.
 */
@Component({
  selector: 'gng-drawer-container',
  standalone: true,
  imports: [CommonModule, DialogModule, PortalModule, A11yModule],
  host: {
    class: 'gng-drawer-host',
  },
  template: `
    <div
      class="gng-drawer-sheet"
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
export class GngDrawerContainer extends CdkDialogContainer {}
