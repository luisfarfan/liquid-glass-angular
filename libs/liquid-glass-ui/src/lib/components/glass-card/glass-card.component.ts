import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lg-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .glass-card-container {
      /* Uso de tokens definidos en styles.css / theme.css */
      background: var(--lg-t-glass-bg);
      backdrop-filter: blur(var(--lg-t-glass-blur));
      -webkit-backdrop-filter: blur(var(--lg-t-glass-blur));
      border: 1px solid var(--lg-t-glass-border);
      border-radius: var(--lg-g-radius-card);
      padding: calc(var(--lg-g-unit) * 6); /* 24px */
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      transition: var(--lg-g-transition-base);
      color: var(--lg-t-text-main);
    }

    .glass-card-container:hover {
      border-color: var(--lg-t-primary);
      box-shadow: var(--lg-t-neon-shadow);
      transform: translateY(-2px);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GlassCardComponent {}
