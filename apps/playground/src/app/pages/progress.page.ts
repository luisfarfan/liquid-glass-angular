import { Component, ViewEncapsulation, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngProgressBar } from 'glassng';

@Component({
  selector: 'pg-progress-page',
  standalone: true,
  imports: [CommonModule, GngProgressBar],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Progress</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Determinado, indeterminado, buffer y query.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <span class="p-1 rounded bg-primary/20 text-primary">
          <i class="ri-loader-4-line animate-spin-slow"></i>
        </span>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Status Feedback: Gng Progress</h3>
      </div>

      <div
        class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border-2 border-primary/30 shadow-[0_0_20px_rgba(var(--gng-t-primary-rgb),0.2)] space-y-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-2">
            <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
              <span>1. Determinate (Standard)</span>
              <span>{{ demoProgress() | number: '1.0-0' }}%</span>
            </div>
            <gng-progress-bar [value]="demoProgress()" color="primary" thickness="0.5rem"></gng-progress-bar>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
              <span>2. Indeterminate (Viscous Flow)</span>
            </div>
            <gng-progress-bar mode="indeterminate" color="accent" thickness="0.5rem"></gng-progress-bar>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
              <span>3. Buffer (Cloud Sync)</span>
              <span>{{ demoProgress() | number: '1.0-0' }}% / {{ demoBuffer() | number: '1.0-0' }}%</span>
            </div>
            <gng-progress-bar
              mode="buffer"
              [value]="demoProgress()"
              [buffer]="demoBuffer()"
              color="primary"
              thickness="6px"
            ></gng-progress-bar>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40">
              <span>4. Query (Pre-loading Inverted)</span>
              <span class="text-primary animate-pulse">{{ demoQueryMode() === 'query' ? 'SCANNING...' : 'READY' }}</span>
            </div>
            <gng-progress-bar [mode]="demoQueryMode()" [value]="demoProgress()" color="warn" thickness="8px"></gng-progress-bar>
            <p class="text-[9px] opacity-30">Transitioning to determinate automatically...</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProgressPage {
  private readonly destroyRef = inject(DestroyRef);

  readonly demoProgress = signal(0);
  readonly demoBuffer = signal(0);
  readonly demoQueryMode = signal<'query' | 'determinate'>('query');

  constructor() {
    const progressTimer = window.setInterval(() => {
      this.demoProgress.update((v) => (v < 100 ? v + 0.3 : 0));
      this.demoBuffer.update((v) => (v < 100 ? v + 0.5 : 0));
    }, 50);
    let queryTimeout = 0;
    const queryTimer = window.setInterval(() => {
      this.demoQueryMode.set('query');
      queryTimeout = window.setTimeout(() => this.demoQueryMode.set('determinate'), 3000);
    }, 8000);
    this.destroyRef.onDestroy(() => {
      clearInterval(progressTimer);
      clearInterval(queryTimer);
      clearTimeout(queryTimeout);
    });
  }
}
