import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, LiquidDrawerRef } from 'glassng';

@Component({
  selector: 'app-playground-drawer-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="flex flex-col h-full min-h-0 text-[var(--lg-t-text-main)]">
      <header
        class="shrink-0 p-6 border-b flex justify-between items-center gap-4"
        style="border-color: var(--lg-t-glass-border)"
      >
        <h2 class="text-lg font-semibold m-0">Glass Drawer</h2>
        <button lg-button variant="ghost" size="sm" type="button" (click)="ref.close()" aria-label="Cerrar">
          Cerrar
        </button>
      </header>
      <div class="flex-1 min-h-0 p-6 lg-glass-scroll text-sm" style="color: var(--lg-t-text-muted)">
        <p class="mt-0">
          Panel lateral de ejemplo (SDD 22). El scroll usa la clase
          <code class="text-[var(--lg-t-primary)]">lg-glass-scroll</code>.
        </p>
        @for (line of filler; track line) {
          <p class="my-1">Línea de contenido {{ line }} para probar scroll.</p>
        }
      </div>
      <footer
        class="shrink-0 p-6 border-t flex justify-end gap-2"
        style="border-color: var(--lg-t-glass-border); background: var(--lg-t-glass-bg)"
      >
        <button lg-button variant="secondary" size="sm" type="button" (click)="ref.close()">Hecho</button>
      </footer>
    </div>
  `,
})
export class PlaygroundDrawerDemoComponent {
  readonly ref = inject(LiquidDrawerRef);
  readonly filler = Array.from({ length: 36 }, (_, i) => i + 1);
}
