import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Separador de menú — SDD 26.
 */
@Component({
  selector: 'lg-dropdown-menu-divider',
  standalone: true,
  template: `<div class="lg-dropdown-menu-divider" role="separator" aria-hidden="true"></div>`,
  styleUrl: './dropdown-menu.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgDropdownMenuDividerComponent {}
