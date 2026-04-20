import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngButton, GngDrawerRef } from 'glassng';

@Component({
  selector: 'app-playground-drawer-demo',
  standalone: true,
  imports: [CommonModule, GngButton],
  template: `
    <div class="flex flex-col h-full min-h-0 text-[var(--gng-t-text-main)]">
      <header
        class="shrink-0 p-6 border-b flex justify-between items-center gap-4"
        style="border-color: var(--gng-t-glass-border)"
      >
        <h2 class="text-lg font-semibold m-0">Glass Drawer</h2>
        <button gng-button variant="ghost" size="sm" type="button" (click)="ref.close()" aria-label="Cerrar">
          Cerrar
        </button>
      </header>
      <div class="flex-1 min-h-0 p-6 gng-glass-scroll text-sm" style="color: var(--gng-t-text-muted)">
        <p class="mt-0">
          Panel lateral de ejemplo (SDD 22). El scroll usa la clase
          <code class="text-[var(--gng-t-primary)]">gng-glass-scroll</code>.
        </p>
        @for (line of filler; track line) {
          <p class="my-1">Línea de contenido {{ line }} para probar scroll.</p>
        }
      </div>
      <footer
        class="shrink-0 p-6 border-t flex justify-end gap-2"
        style="border-color: var(--gng-t-glass-border); background: var(--gng-t-glass-bg)"
      >
        <button gng-button variant="secondary" size="sm" type="button" (click)="ref.close()">Hecho</button>
      </footer>
    </div>
  `,
})
export class PlaygroundDrawerDemoComponent {
  readonly ref = inject(GngDrawerRef);
  readonly filler = Array.from({ length: 36 }, (_, i) => i + 1);
}
