import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

/**
 * GngDropdownMenuItem
 * Premium interactive item for dropdown menus with haptic feedback support and glass-morphism hover states.
 */
@Component({
  selector: 'gng-dropdown-menu-item',
  standalone: true,
  imports: [CdkMenuModule],
  template: `
    <button
      type="button"
      cdkMenuItem
      class="gng-dropdown-menu-item"
      [class.gng-dropdown-menu-item--destructive]="destructive()"
      [cdkMenuItemDisabled]="disabled()"
      (cdkMenuItemTriggered)="triggered.emit()"
    >
      <span class="gng-dropdown-menu-item__icon">
        <ng-content select="[gngDropdownItemIcon]" />
      </span>
      <span class="gng-dropdown-menu-item__label">
        <ng-content />
      </span>
    </button>
  `,
  styleUrl: './dropdown-menu.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngDropdownMenuItem {
  readonly destructive = input(false);
  readonly disabled = input(false);
  readonly triggered = output<void>();
}
