import { Component, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GlassCardComponent,
  BreadcrumbsComponent,
  type LgBreadcrumbItem,
} from 'glassng';

@Component({
  selector: 'pg-breadcrumbs-page',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, BreadcrumbsComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Breadcrumbs</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Migas de navegación con separador configurable (spec 23).</p>
    </header>

    <section class="space-y-8 max-w-3xl">
      <lg-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Rutas del playground</p>
        <lg-breadcrumbs [items]="demoItems()" ariaLabel="Migas de demostración" />
      </lg-glass-card>

      <lg-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Separador › y texto largo</p>
        <lg-breadcrumbs [items]="longItems()" separator="›" ariaLabel="Ejemplo con separador chevron" />
        <button
          type="button"
          class="mt-3 text-xs text-primary underline-offset-2 hover:underline"
          (click)="toggleLong()"
        >
          Alternar etiqueta larga
        </button>
      </lg-glass-card>
    </section>
  `,
})
export class BreadcrumbsPage {
  readonly demoItems = signal<LgBreadcrumbItem[]>([
    { label: 'Inicio', link: '/dashboard', icon: 'ri-home-4-line' },
    { label: 'Componentes', link: '/demos/buttons' },
    { label: 'Breadcrumbs' },
  ]);

  readonly longItems = signal<LgBreadcrumbItem[]>([
    { label: 'Catálogo', link: '/dashboard' },
    {
      label:
        'Producto con nombre extremadamente largo que debería truncarse con puntos suspensivos sin romper el separador',
      link: '/demos/forms',
    },
    { label: 'Detalle' },
  ]);

  toggleLong(): void {
    const cur = this.longItems();
    const mid = { ...cur[1] };
    mid.label =
      mid.label.length > 80
        ? 'Producto corto'
        : 'Producto con nombre extremadamente largo que debería truncarse con puntos suspensivos sin romper el separador';
    this.longItems.set([cur[0], mid, cur[2]]);
  }
}
