import { Component, ChangeDetectionStrategy, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidToastComponent } from './toast.component';
import { LiquidToastConfig } from './toast.types';

export interface ToastInternalInstance {
  id: string;
  config: LiquidToastConfig;
}

@Component({
  selector: 'lg-toast-container',
  standalone: true,
  imports: [CommonModule, LiquidToastComponent],
  template: `
    <div class="lg-toast-container-wrapper">
      <lg-toast 
        *ngFor="let toast of toasts()" 
        [config]="toast.config"
        (closed)="_remove(toast.id)"
      ></lg-toast>
    </div>
  `,
  styleUrl: './toast.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidToastContainerComponent {
  /** Signal containing the list of active toasts */
  toasts = signal<ToastInternalInstance[]>([]);

  /**
   * Adds a new toast to the stack.
   */
  add(config: LiquidToastConfig): string {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts.update(all => [...all, { id, config }]);
    return id;
  }

  /**
   * Removes a toast from the stack by ID.
   */
  _remove(id: string) {
    this.toasts.update(all => all.filter(t => t.id !== id));
    
    // If no more toasts, the service can handle closing the entire overlay if desired.
  }
}
