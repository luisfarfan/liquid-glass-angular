import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent, LgBadgeComponent, ButtonComponent, AvatarComponent } from '@liquid-glass-ui/angular';

@Component({
  selector: 'pg-badges-page',
  standalone: true,
  imports: [CommonModule, TagComponent, LgBadgeComponent, ButtonComponent, AvatarComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-[var(--lg-t-text-main)]">Tags & Badges</h1>
      <p class="text-[var(--lg-t-text-muted)] mt-2">Diferenciación entre etiquetas de estado (Tags) e indicadores de notificación (Badges).</p>
    </header>

    <div class="space-y-12 pb-20">
      
      <!-- 1. Real Badges (Indicators) -->
      <section class="space-y-6">
        <div class="flex items-center gap-2">
           <i class="ri-notification-3-line text-[var(--lg-t-primary)]"></i>
           <h2 class="text-xl font-bold">Numeric Badges</h2>
        </div>
        <p class="text-[var(--lg-t-text-muted)] max-w-2xl">
          Los **Badges** son indicadores que se superponen a otros elementos (iconos, avatares) para mostrar conteos o estados rápidos.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- icon badges -->
          <div class="p-8 rounded-xl bg-glass border border-glass-border flex flex-wrap gap-10 items-center justify-center">
            <lg-badge [value]="5" variant="error">
              <button lg-button variant="secondary" icon="ri-mail-line" class="text-xl px-3"></button>
            </lg-badge>

            <lg-badge [value]="'99+'" variant="primary">
              <button lg-button variant="ghost" icon="ri-notification-3-line" class="text-2xl px-2"></button>
            </lg-badge>

            <lg-badge [dot]="true" variant="success">
              <button lg-button variant="ghost" icon="ri-message-3-line" class="text-2xl px-2"></button>
            </lg-badge>
          </div>

          <!-- avatar badges -->
          <div class="p-8 rounded-xl bg-glass border border-glass-border flex flex-wrap gap-10 items-center justify-center">
             <lg-badge [dot]="true" variant="success" overlap="circle">
                <lg-avatar name="Alex Rivera" size="lg"></lg-avatar>
             </lg-badge>

             <lg-badge [value]="'NEW'" variant="info">
                <lg-avatar name="Liquid Glass" size="md"></lg-avatar>
             </lg-badge>

             <lg-badge [value]="3" variant="warning" overlap="circle">
                <lg-avatar name="System Admin" size="sm"></lg-avatar>
             </lg-badge>
          </div>
        </div>
      </section>

      <!-- 2. Tags (Status Labels) -->
      <section class="space-y-6">
        <div class="flex items-center gap-2">
           <i class="ri-price-tag-3-line text-[var(--lg-t-primary)]"></i>
           <h2 class="text-xl font-bold">Tags (Status Labels)</h2>
        </div>
        <p class="text-[var(--lg-t-text-muted)] max-w-2xl">
          Los **Tags** (antes llamados badges) son etiquetas independientes de texto para estados de flujos o metadatos.
        </p>

        <div class="p-8 rounded-xl bg-glass border border-glass-border space-y-8">
          <div class="space-y-4">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Glass Style</p>
            <div class="flex flex-wrap gap-3">
              <lg-tag variant="success" [isPulsating]="true">Online</lg-tag>
              <lg-tag variant="warning">Away</lg-tag>
              <lg-tag variant="error">Offline</lg-tag>
              <lg-tag variant="info">New Update</lg-tag>
              <lg-tag variant="primary">Pro</lg-tag>
              <lg-tag variant="neutral">Beta</lg-tag>
            </div>
          </div>

          <div class="space-y-4">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Solid Style</p>
            <div class="flex flex-wrap gap-3">
              <lg-tag style="solid" variant="success">Active</lg-tag>
              <lg-tag style="solid" variant="warning">Pending</lg-tag>
              <lg-tag style="solid" variant="error">Critical</lg-tag>
              <lg-tag style="solid" variant="primary">Featured</lg-tag>
              <lg-tag style="solid" variant="neutral">Draft</lg-tag>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class BadgesPage {}
