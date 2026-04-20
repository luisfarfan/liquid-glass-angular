import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TabsComponent,
  TabComponent,
  TagComponent,
  LgBadgeComponent,
  FormFieldComponent,
  ToggleComponent,
  ButtonComponent,
} from 'glassng';

@Component({
  selector: 'pg-tabs-page',
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    TabComponent,
    TagComponent,
    LgBadgeComponent,
    FormFieldComponent,
    ToggleComponent,
    ButtonComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Tabs</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Navegación y layout.</p>
    </header>

    <section class="space-y-6">
      <div class="flex items-center gap-2 px-2 mb-4">
        <i class="ri-menu-5-line text-[var(--lg-t-primary)]"></i>
        <h3 class="text-xs font-bold tracking-widest uppercase opacity-60">Navigation &amp; Layout (Glass Tabs)</h3>
      </div>

      <div class="grid grid-cols-1 gap-8">
        <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Variant: Underline (Neon Blade)</p>
          <lg-tabs variant="underline">
            <lg-tab label="Overview" icon="ri-dashboard-line">
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
            </lg-tab>
            <lg-tab label="Security" icon="ri-shield-flash-line">
              <div class="py-4">
                <h4 class="text-lg font-bold">Security Protocols</h4>
                <p class="text-sm text-zinc-400">Configuración de cortafuegos y cifrado de hardware.</p>
                <button lg-button variant="primary" size="sm" class="mt-4">Reiniciar Firewall</button>
              </div>
            </lg-tab>
            <lg-tab label="Hardware" [disabled]="true" icon="ri-cpu-line">
              <div class="py-4 text-center">Hardware Stats (Locked)</div>
            </lg-tab>
            <lg-tab label="Advanced Settings">
              <div class="py-4">
                <lg-form-field label="Developer Mode">
                  <lg-toggle [checked]="true"></lg-toggle>
                </lg-form-field>
              </div>
            </lg-tab>
          </lg-tabs>
        </div>

        <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Variant: Pill (Glass Capsules)</p>
          <div class="flex justify-center">
            <lg-tabs variant="pill">
              <lg-tab label="Monthly">
                <div class="text-center py-6">
                  <p class="text-3xl font-display font-bold">$12.99<span class="text-sm opacity-50">/mo</span></p>
                </div>
              </lg-tab>
              <lg-tab label="Yearly">
                <div class="text-center py-6">
                  <p class="text-3xl font-display font-bold">$119.99<span class="text-sm opacity-50">/yr</span></p>
                  <lg-tag variant="success" size="sm" class="mt-2">Save 25%</lg-tag>
                </div>
              </lg-tab>
              <lg-tab label="Lifetime">
                <div class="text-center py-6">
                  <p class="text-3xl font-display font-bold">$499<span class="text-sm opacity-50">/once</span></p>
                </div>
              </lg-tab>
            </lg-tabs>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-12 mt-8">
        <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 1: Centered &amp; Custom Templates</p>
          <lg-tabs variant="underline" align="center">
            <lg-tab>
              <ng-template #headerTemplate>
                <lg-badge variant="error" [value]="3">
                  <span>Messages</span>
                </lg-badge>
              </ng-template>
              <div class="py-12 text-center opacity-40">Inbox is empty</div>
            </lg-tab>
            <lg-tab label="Analytics" icon="ri-bar-chart-fill"></lg-tab>
            <lg-tab label="Team">
              <ng-template #headerTemplate>
                <div class="flex -space-x-2">
                  <div class="w-6 h-6 rounded-full border border-black bg-primary"></div>
                  <div class="w-6 h-6 rounded-full border border-black bg-emerald-500"></div>
                </div>
                <span class="ml-2">Collaborators</span>
              </ng-template>
            </lg-tab>
          </lg-tabs>
        </div>

        <div class="p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-6">
          <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 2: Full Width (Stretched)</p>
          <lg-tabs variant="underline" [stretch]="true">
            <lg-tab label="Profile" icon="ri-user-smile-line"></lg-tab>
            <lg-tab label="Settings" icon="ri-settings-4-line"></lg-tab>
            <lg-tab label="Billing" icon="ri-bank-card-line"></lg-tab>
          </lg-tabs>
          <div class="h-32 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-xs opacity-20">
            Full Width Content Area
          </div>
        </div>

        <div class="col-span-full p-6 rounded-[var(--lg-g-radius-card)] bg-glass border border-glass-border space-y-4">
          <div class="flex justify-between items-center mb-2">
            <p class="text-[10px] font-bold opacity-30 uppercase tracking-widest">Case 3: Right Aligned Controls</p>
            <lg-tabs variant="pill" align="end">
              <lg-tab label="View List" icon="ri-list-check"></lg-tab>
              <lg-tab label="View Grid" icon="ri-grid-fill"></lg-tab>
              <lg-tab label="View Timeline" icon="ri-history-line"></lg-tab>
            </lg-tabs>
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
