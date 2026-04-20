import { Component, ViewEncapsulation, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngGlassCard, GngSearchInput } from 'glassng';

@Component({
  selector: 'pg-search-input-page',
  standalone: true,
  imports: [CommonModule, GngGlassCard, GngSearchInput],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Search input</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Debounce, limpieza, expansión al foco y atajo Ctrl/⌘+K (spec 25).</p>
    </header>

    <section class="space-y-8 max-w-3xl">
      <gng-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Básico</p>
        <gng-search-input
          [(value)]="q1"
          [debounceTime]="400"
          ariaLabel="Buscar en el demo"
          (search)="lastSearch.set($event)"
        />
        <p class="text-xs text-zinc-500">
          Última emisión (debounced): <code class="text-primary">{{ lastSearch() || '—' }}</code>
        </p>
      </gng-glass-card>

      <gng-glass-card class="!p-6 border-none shadow-none space-y-4">
        <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Expansión al foco + atajo</p>
        <p class="text-body-sm text-zinc-500">Probá <kbd class="px-1 rounded bg-white/10">⌘</kbd>+<kbd class="px-1 rounded bg-white/10">K</kbd> o
          <kbd class="px-1 rounded bg-white/10">Ctrl</kbd>+<kbd class="px-1 rounded bg-white/10">K</kbd> para enfocar.</p>
        <gng-search-input
          [(value)]="q2"
          [expandOnFocus]="true"
          [shortcutEnabled]="true"
          [showShortcutBadge]="true"
          shortcutLabel="K"
          placeholder="Buscar…"
          ariaLabel="Búsqueda con atajo de teclado"
          (search)="shortcutLog.set($event)"
        />
        <p class="text-xs text-zinc-500">Emitido: <code class="text-primary">{{ shortcutLog() || '—' }}</code></p>
      </gng-glass-card>
    </section>
  `,
})
export class SearchInputPage {
  readonly q1 = model('');
  readonly q2 = model('');
  readonly lastSearch = signal('');
  readonly shortcutLog = signal('');
}
