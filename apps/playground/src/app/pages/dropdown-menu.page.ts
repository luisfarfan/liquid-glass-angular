import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GlassCardComponent,
  ButtonComponent,
  LgDropdownMenuComponent,
  LgDropdownMenuItemComponent,
  LgDropdownMenuDividerComponent,
  CdkMenuModule,
} from 'glassng';

@Component({
  selector: 'pg-dropdown-menu-page',
  standalone: true,
  imports: [
    CommonModule,
    GlassCardComponent,
    ButtonComponent,
    CdkMenuModule,
    LgDropdownMenuComponent,
    LgDropdownMenuItemComponent,
    LgDropdownMenuDividerComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Dropdown menu</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Menú contextual con CDK Menu y estilos glass (spec 26).</p>
    </header>

    <section class="space-y-8 max-w-3xl">
      <lg-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Cuenta</p>
        <div class="flex flex-wrap items-center gap-4">
          <button
            lg-button
            type="button"
            variant="secondary"
            [cdkMenuTriggerFor]="accountMenu"
            cdkMenuTriggerTransformOriginOn="self"
          >
            <i lg-icon-left class="ri-user-settings-line"></i>
            Opciones
          </button>
          <span class="text-xs text-zinc-500">Última acción: {{ lastAction() || '—' }}</span>
        </div>

        <ng-template #accountMenu>
          <lg-dropdown-menu>
            <lg-dropdown-menu-item (triggered)="lastAction.set('Mi perfil')">
              <i lgDropdownItemIcon class="ri-user-line"></i>
              Mi perfil
            </lg-dropdown-menu-item>
            <lg-dropdown-menu-item (triggered)="lastAction.set('Ajustes')">
              <i lgDropdownItemIcon class="ri-settings-3-line"></i>
              Ajustes
            </lg-dropdown-menu-item>
            <lg-dropdown-menu-divider />
            <lg-dropdown-menu-item [destructive]="true" (triggered)="lastAction.set('Salir')">
              <i lgDropdownItemIcon class="ri-logout-box-r-line"></i>
              Salir
            </lg-dropdown-menu-item>
          </lg-dropdown-menu>
        </ng-template>
      </lg-glass-card>

      <lg-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Item deshabilitado</p>
        <button lg-button type="button" variant="ghost" [cdkMenuTriggerFor]="disabledDemo" cdkMenuTriggerTransformOriginOn="self">
          Más acciones
        </button>
        <ng-template #disabledDemo>
          <lg-dropdown-menu>
            <lg-dropdown-menu-item (triggered)="lastAction.set('Disponible')">
              <i lgDropdownItemIcon class="ri-check-line"></i>
              Disponible
            </lg-dropdown-menu-item>
            <lg-dropdown-menu-item [disabled]="true">
              <i lgDropdownItemIcon class="ri-forbid-line"></i>
              No disponible
            </lg-dropdown-menu-item>
          </lg-dropdown-menu>
        </ng-template>
      </lg-glass-card>
    </section>
  `,
})
export class DropdownMenuPage {
  readonly lastAction = signal<string>('');
}
