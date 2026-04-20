import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GngTabs,
  GngTab,
  GngTag,
  GngBadge,
  GngFormField,
  GngToggle,
  GngButton,
} from 'glassng';

@Component({
  selector: 'pg-tabs-page',
  standalone: true,
  imports: [
    CommonModule,
    GngTabs,
    GngTab,
    GngTag,
    GngBadge,
    GngFormField,
    GngToggle,
    GngButton,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Tabs</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Navegación y layout.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <i class="ri-menu-5-line text-[var(--gng-t-primary)]"></i>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Navigation &amp; Layout (Glass Tabs)</h3>
      </div>

      <div class="grid grid-cols-1 gap-8">
        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Variant: Underline (Neon Blade)</p>
          <gng-tabs variant="underline">
            <gng-tab label="Overview" icon="ri-dashboard-line">
              <div class="py-4 space-y-4">
                <h4 class="text-lg font-bold">System Overview</h4>
                <p class="text-sm text-zinc-400">
                  Esta es la vista general del sistema. El indicador de neón se desplaza con inercia elástica.
                </p>
                <div class="grid grid-cols-3 gap-2">
                  <div class="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                  <div class="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                  <div class="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                </div>
              </div>
            </gng-tab>
            <gng-tab label="Security" icon="ri-shield-flash-line">
              <div class="py-4">
                <h4 class="text-lg font-bold">Security Protocols</h4>
                <p class="text-sm text-zinc-400">Configuración de cortafuegos y cifrado de hardware.</p>
                <button gng-button variant="primary" size="sm" class="mt-4">Reiniciar Firewall</button>
              </div>
            </gng-tab>
            <gng-tab label="Hardware" [disabled]="true" icon="ri-cpu-line">
              <div class="py-4 text-center">Hardware Stats (Locked)</div>
            </gng-tab>
            <gng-tab label="Advanced Settings">
              <div class="py-4">
                <gng-form-field label="Developer Mode">
                  <gng-toggle [checked]="true"></gng-toggle>
                </gng-form-field>
              </div>
            </gng-tab>
          </gng-tabs>
        </div>

        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Variant: Pill (Glass Capsules)</p>
          <div class="flex justify-center">
            <gng-tabs variant="pill">
              <gng-tab label="Monthly">
                <div class="text-center py-6">
                  <p class="text-3xl font-display font-bold">$12.99<span class="text-sm opacity-50">/mo</span></p>
                </div>
              </gng-tab>
              <gng-tab label="Yearly">
                <div class="text-center py-6">
                  <p class="text-3xl font-display font-bold">$119.99<span class="text-sm opacity-50">/yr</span></p>
                  <gng-tag variant="success" size="sm" class="mt-2">Save 25%</gng-tag>
                </div>
              </gng-tab>
              <gng-tab label="Lifetime">
                <div class="text-center py-6">
                  <p class="text-3xl font-display font-bold">$499<span class="text-sm opacity-50">/once</span></p>
                </div>
              </gng-tab>
            </gng-tabs>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-12 mt-8">
        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 1: Centered &amp; Custom Templates</p>
          <gng-tabs variant="underline" align="center">
            <gng-tab>
              <ng-template #headerTemplate>
                <gng-badge variant="error" [value]="3">
                  <span>Messages</span>
                </gng-badge>
              </ng-template>
              <div class="py-12 text-center opacity-40">Inbox is empty</div>
            </gng-tab>
            <gng-tab label="Analytics" icon="ri-bar-chart-fill"></gng-tab>
            <gng-tab label="Team">
              <ng-template #headerTemplate>
                <div class="flex -space-x-2">
                  <div class="w-6 h-6 rounded-full border border-black bg-primary"></div>
                  <div class="w-6 h-6 rounded-full border border-black bg-emerald-500"></div>
                </div>
                <span class="ml-2">Collaborators</span>
              </ng-template>
            </gng-tab>
          </gng-tabs>
        </div>

        <div class="p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 2: Full Width (Stretched)</p>
          <gng-tabs variant="underline" [stretch]="true">
            <gng-tab label="Profile" icon="ri-user-smile-line"></gng-tab>
            <gng-tab label="Settings" icon="ri-settings-4-line"></gng-tab>
            <gng-tab label="Billing" icon="ri-bank-card-line"></gng-tab>
          </gng-tabs>
          <div class="h-32 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-xs opacity-20">
            Full Width Content Area
          </div>
        </div>

        <div class="col-span-full p-6 rounded-[var(--gng-g-radius-card)] bg-glass border border-glass-border space-y-4">
          <div class="flex justify-between items-center mb-2">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 3: Right Aligned Controls</p>
            <gng-tabs variant="pill" align="end">
              <gng-tab label="View List" icon="ri-list-check"></gng-tab>
              <gng-tab label="View Grid" icon="ri-grid-fill"></gng-tab>
              <gng-tab label="View Timeline" icon="ri-history-line"></gng-tab>
            </gng-tabs>
          </div>
          <div class="grid grid-cols-4 gap-4">
            @for (i of [1, 2, 3, 4]; track i) {
              <div class="h-24 bg-white/5 rounded-lg border border-white/5"></div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TabsPage {}
