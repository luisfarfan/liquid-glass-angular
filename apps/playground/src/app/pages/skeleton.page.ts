import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngSkeleton } from 'glassng';

@Component({
  selector: 'pg-skeleton-page',
  standalone: true,
  imports: [CommonModule, GngSkeleton],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Skeleton</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Estados de carga.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <i class="ri-loader-4-line text-[var(--gng-t-primary)]"></i>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Loading States (Glass Skeleton)</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Single Atom Types</p>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <gng-skeleton type="circle" width="48px" height="48px"></gng-skeleton>
              <div class="flex-1 space-y-2">
                <gng-skeleton type="rect" width="60%" height="12px"></gng-skeleton>
                <gng-skeleton type="rect" width="40%" height="8px"></gng-skeleton>
              </div>
            </div>
            <gng-skeleton type="text" width="100%"></gng-skeleton>
            <gng-skeleton type="text" width="90%"></gng-skeleton>
            <gng-skeleton type="text" width="70%"></gng-skeleton>
          </div>
        </div>

        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Card Composition Example</p>
          <div class="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
            <gng-skeleton type="rect" width="100%" height="120px"></gng-skeleton>
            <div class="space-y-2">
              <gng-skeleton type="rect" width="80%" height="16px"></gng-skeleton>
              <gng-skeleton type="rect" width="40%" height="10px"></gng-skeleton>
            </div>
            <div class="flex justify-between items-center pt-2">
              <gng-skeleton type="rect" width="60px" height="24px"></gng-skeleton>
              <gng-skeleton type="circle" width="32px" height="32px"></gng-skeleton>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkeletonPage {}
