import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-badges-page',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Badges</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Estados e indicadores.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <i class="ri-notification-badge-line text-[var(--lg-t-primary)]"></i>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Status &amp; Indicators (Glass Badges)</h3>
      </div>

      <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-8">
        <div class="space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Glass Style (Subtle)</p>
          <div class="flex flex-wrap gap-3">
            <lg-badge variant="success" [isPulsating]="true">Online</lg-badge>
            <lg-badge variant="warning">Away</lg-badge>
            <lg-badge variant="error">Offline</lg-badge>
            <lg-badge variant="info">New Update</lg-badge>
            <lg-badge variant="neutral">Beta</lg-badge>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Solid Style (High Contrast)</p>
          <div class="flex flex-wrap gap-3">
            <lg-badge style="solid" variant="success">Active</lg-badge>
            <lg-badge style="solid" variant="warning">Pending</lg-badge>
            <lg-badge style="solid" variant="error">Critical</lg-badge>
            <lg-badge style="solid" variant="info">99+</lg-badge>
            <lg-badge style="solid" variant="neutral">Draft</lg-badge>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class BadgesPage {}
