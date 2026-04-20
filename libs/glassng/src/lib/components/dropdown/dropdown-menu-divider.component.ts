import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * GngDropdownMenuDivider
 * Structural separator for dropdown menus.
 */
@Component({
  selector: 'gng-dropdown-menu-divider',
  standalone: true,
  template: `<div class="gng-dropdown-menu-divider" role="separator" aria-hidden="true"></div>`,
  styleUrl: './dropdown-menu.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngDropdownMenuDivider {}
