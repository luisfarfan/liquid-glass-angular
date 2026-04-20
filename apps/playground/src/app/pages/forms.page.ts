import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GngGlassCard,
  GngInput,
  GngFormField,
  GngFormLayout,
  GngTextarea,
  GngCheckbox,
  GngButton
} from 'glassng';

@Component({
  selector: 'pg-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    GngGlassCard,
    GngInput,
    GngFormField,
    GngFormLayout,
    GngTextarea,
    GngCheckbox,
    GngButton
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="mb-8">
      <h1 class="text-h1 font-display font-bold">Form System</h1>
      <p class="text-body-sm text-zinc-400 mt-1">Sistemas de composición y validación neón-glass.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Demo: Compositional Architecture -->
      <section class="lg:col-span-8 space-y-8">
        <gng-glass-card class="!p-8">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
               <i class="ri-ruler-2-line"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold">New Compositional Field</h3>
              <p class="text-xs opacity-50 uppercase tracking-tighter">Unified label & error handling</p>
            </div>
          </div>

          <gng-form-layout [cols]="2" gap="md">
            <gng-form-field label="First Name" hint="As it appears on ID" [required]="true">
              <gng-input placeholder="Enter first name"></gng-input>
            </gng-form-field>

            <gng-form-field label="Last Name">
              <gng-input placeholder="Enter last name"></gng-input>
            </gng-form-field>
          </gng-form-layout>

          <gng-form-layout [cols]="1" class="mt-4">
             <gng-form-field label="Support Message" error="Message cannot be empty">
              <gng-textarea placeholder="How can we help you?" [autosize]="true"></gng-textarea>
            </gng-form-field>
          </gng-form-layout>

          <gng-form-layout [cols]="2" class="mt-4">
            <gng-form-field label="Privacy Settings" hint="Visibility in discovery">
              <gng-checkbox label="Make profile public"></gng-checkbox>
            </gng-form-field>

            <gng-form-field label="Communications" [required]="true">
              <gng-checkbox label="Receive marketing emails"></gng-checkbox>
            </gng-form-field>
          </gng-form-layout>

          <div class="mt-8 pt-6 border-t border-white/5 flex justify-end gap-3">
             <button gng-button variant="outlined">Discard Changes</button>
             <button gng-button>Save Information</button>
          </div>
        </gng-glass-card>

        <!-- Demo: Legacy / Integrated Mode -->
        <gng-glass-card class="!p-8 opacity-80">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-zinc-500/20 flex items-center justify-center">
               <i class="ri-history-line"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold opacity-60">Legacy Integrated Mode</h3>
              <p class="text-[10px] opacity-40 uppercase tracking-tighter">Shortcut mode for simple forms</p>
            </div>
          </div>

          <div class="space-y-4">
            <gng-input label="Simplified Label" placeholder="Direct input usage"></gng-input>
            <gng-checkbox label="Direct Checkbox usage"></gng-checkbox>
          </div>
        </gng-glass-card>
      </section>

      <!-- Sidebar: Information -->
      <aside class="lg:col-span-4 space-y-6">
        <gng-glass-card class="!p-6 bg-primary/5 border-primary/20">
          <h4 class="text-sm font-bold text-primary mb-3">Form Architecture</h4>
          <ul class="space-y-4 text-xs">
            <li class="flex gap-2">
              <i class="ri-checkbox-circle-fill text-primary"></i>
              <span><strong>gng-form-layout</strong> manages grid positioning (1-4 columns).</span>
            </li>
            <li class="flex gap-2">
              <i class="ri-checkbox-circle-fill text-primary"></i>
              <span><strong>gng-form-field</strong> orchestrates labels, hints, and error states.</span>
            </li>
             <li class="flex gap-2">
              <i class="ri-checkbox-circle-fill text-primary"></i>
              <span>Works with <strong>Template Driven</strong> and <strong>Reactive Forms</strong>.</span>
            </li>
          </ul>
        </gng-glass-card>

        <section class="space-y-4 px-2">
          <h4 class="text-[10px] font-bold uppercase tracking-widest opacity-40">Layout Preview</h4>
          <div class="space-y-2">
            <div class="h-10 w-full rounded-lg bg-white/5 border border-white/10 flex items-center px-4 text-[10px] opacity-40">Field Row 1</div>
            <div class="h-10 w-full rounded-lg bg-white/5 border border-white/10 flex items-center px-4 text-[10px] opacity-40">Field Row 2</div>
          </div>
        </section>
      </aside>
    </div>
  `,
})
export class FormsPage {}
