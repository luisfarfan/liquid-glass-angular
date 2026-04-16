import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

/**
 * Contenedor de menú flotante — SDD 26.
 * Colocar dentro de `ng-template` referenciado por `[cdkMenuTriggerFor]` en el disparador.
 */
@Component({
  selector: 'lg-dropdown-menu',
  standalone: true,
  imports: [CdkMenuModule],
  template: `<div cdkMenu class="lg-dropdown-menu"><ng-content /></div>`,
  styleUrl: './dropdown-menu.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgDropdownMenuComponent {}
