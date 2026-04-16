import { CdkMenuModule } from '@angular/cdk/menu';
import { LgDropdownMenuComponent } from './dropdown-menu.component';
import { LgDropdownMenuDividerComponent } from './dropdown-menu-divider.component';
import { LgDropdownMenuItemComponent } from './dropdown-menu-item.component';

/**
 * Imports listos para plantillas con `cdkMenuTriggerFor` + `lg-dropdown-menu*`.
 */
export const LG_DROPDOWN_MENU = [
  CdkMenuModule,
  LgDropdownMenuComponent,
  LgDropdownMenuItemComponent,
  LgDropdownMenuDividerComponent,
] as const;
