import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

/**
 * Acción de menú — SDD 26. Usar dentro de `lg-dropdown-menu`.
 */
@Component({
  selector: 'lg-dropdown-menu-item',
  standalone: true,
  imports: [CdkMenuModule],
  template: `
    <button
      type="button"
      cdkMenuItem
      class="lg-dropdown-menu-item"
      [class.lg-dropdown-menu-item--destructive]="destructive()"
      [cdkMenuItemDisabled]="disabled()"
      (cdkMenuItemTriggered)="triggered.emit()"
    >
      <span class="lg-dropdown-menu-item__icon">
        <ng-content select="[lgDropdownItemIcon]" />
      </span>
      <span class="lg-dropdown-menu-item__label">
        <ng-content />
      </span>
    </button>
  `,
  styleUrl: './dropdown-menu.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgDropdownMenuItemComponent {
  readonly destructive = input(false);
  readonly disabled = input(false);
  readonly triggered = output<void>();
}
