import { CdkMenuModule } from '@angular/cdk/menu';
import { GngDropdownMenu } from './dropdown-menu.component';
import { GngDropdownMenuDivider } from './dropdown-menu-divider.component';
import { GngDropdownMenuItem } from './dropdown-menu-item.component';

/**
 * Imports listos para plantillas con `cdkMenuTriggerFor` + `gng-dropdown-menu*`.
 */
export const GNG_DROPDOWN_MENU = [
  CdkMenuModule,
  GngDropdownMenu,
  GngDropdownMenuItem,
  GngDropdownMenuDivider,
] as const;
