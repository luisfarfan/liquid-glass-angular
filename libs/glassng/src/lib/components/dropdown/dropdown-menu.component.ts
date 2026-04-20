import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

/**
 * GngDropdownMenu
 * Premium floating menu container with high-fidelity glass-morphism and smooth entry animations.
 */
@Component({
  selector: 'gng-dropdown-menu',
  standalone: true,
  imports: [CdkMenuModule],
  template: `<div cdkMenu class="gng-dropdown-menu"><ng-content /></div>`,
  styleUrl: './dropdown-menu.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngDropdownMenu {}
