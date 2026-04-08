import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from '@liquid-glass-ui/angular';


@Component({
  imports: [RouterModule, Button],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex items-center justify-center min-h-screen bg-zinc-950 text-white">
      <div class="p-10 glass-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Liquid Glass Nx
        </h1>
        <p class="mt-4 text-zinc-400">Tailwind v4 + Angular 21 is LIVE.</p>
        <button class="mt-8 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
          Explorar Componentes
        </button>

        <div class="mt-8 flex flex-col gap-2">
          <p class="text-xs text-zinc-500 uppercase tracking-widest">Componente de Librería:</p>
          <lib-button>Lib Button Ready</lib-button>
        </div>

      </div>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  protected title = 'playground';
}
