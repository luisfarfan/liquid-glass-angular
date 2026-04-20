import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngTag, GngBadge, GngButton, GngAvatar } from 'glassng';

@Component({
  selector: 'pg-badges-page',
  standalone: true,
  imports: [CommonModule, GngTag, GngBadge, GngButton, GngAvatar],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-[var(--gng-t-text-main)]">Tags & Badges</h1>
      <p class="text-[var(--gng-t-text-muted)] mt-2">Diferenciación entre etiquetas de estado (Tags) e indicadores de notificación (Badges).</p>
    </header>

    <div class="space-y-12 pb-20">
      
      <!-- 1. Real Badges (Indicators) -->
      <section class="space-y-6">
        <div class="flex items-center gap-2">
           <i class="ri-notification-3-line text-[var(--gng-t-primary)]"></i>
           <h2 class="text-xl font-bold">Numeric Badges</h2>
        </div>
        <p class="text-[var(--gng-t-text-muted)] max-w-2xl">
          Los **Badges** son indicadores que se superponen a otros elementos (iconos, avatares) para mostrar conteos o estados rápidos.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- icon badges -->
          <div class="p-8 rounded-xl bg-glass border border-glass-border flex flex-wrap gap-10 items-center justify-center">
            <gng-badge [value]="5" variant="error">
              <button gng-button variant="secondary" icon="ri-mail-line" class="text-xl px-3"></button>
            </gng-badge>

            <gng-badge [value]="'99+'" variant="primary">
              <button gng-button variant="ghost" icon="ri-notification-3-line" class="text-2xl px-2"></button>
            </gng-badge>

            <gng-badge [dot]="true" variant="success">
              <button gng-button variant="ghost" icon="ri-message-3-line" class="text-2xl px-2"></button>
            </gng-badge>
          </div>

          <!-- avatar badges -->
          <div class="p-8 rounded-xl bg-glass border border-glass-border flex flex-wrap gap-10 items-center justify-center">
             <gng-badge [dot]="true" variant="success" overlap="circle">
                <gng-avatar name="Alex Rivera" size="lg"></gng-avatar>
             </gng-badge>

             <gng-badge [value]="'NEW'" variant="info">
                <gng-avatar name="Gng Glass" size="md"></gng-avatar>
             </gng-badge>

             <gng-badge [value]="3" variant="warning" overlap="circle">
                <gng-avatar name="System Admin" size="sm"></gng-avatar>
             </gng-badge>
          </div>
        </div>
      </section>

      <!-- 2. Tags (Status Labels) -->
      <section class="space-y-6">
        <div class="flex items-center gap-2">
           <i class="ri-price-tag-3-line text-[var(--gng-t-primary)]"></i>
           <h2 class="text-xl font-bold">Tags (Status Labels)</h2>
        </div>
        <p class="text-[var(--gng-t-text-muted)] max-w-2xl">
          Los **Tags** (antes llamados badges) son etiquetas independientes de texto para estados de flujos o metadatos.
        </p>

        <div class="p-8 rounded-xl bg-glass border border-glass-border space-y-8">
          <div class="space-y-4">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Glass Style</p>
            <div class="flex flex-wrap gap-3">
              <gng-tag variant="success" [isPulsating]="true">Online</gng-tag>
              <gng-tag variant="warning">Away</gng-tag>
              <gng-tag variant="error">Offline</gng-tag>
              <gng-tag variant="info">New Update</gng-tag>
              <gng-tag variant="primary">Pro</gng-tag>
              <gng-tag variant="neutral">Beta</gng-tag>
            </div>
          </div>

          <div class="space-y-4">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Solid Style</p>
            <div class="flex flex-wrap gap-3">
              <gng-tag style="solid" variant="success">Active</gng-tag>
              <gng-tag style="solid" variant="warning">Pending</gng-tag>
              <gng-tag style="solid" variant="error">Critical</gng-tag>
              <gng-tag style="solid" variant="primary">Featured</gng-tag>
              <gng-tag style="solid" variant="neutral">Draft</gng-tag>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class BadgesPage {}
