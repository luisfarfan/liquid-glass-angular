import { Component, ChangeDetectionStrategy, ViewEncapsulation, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lg-sparkline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.viewBox]="'0 0 ' + width() + ' ' + height()" 
      [attr.width]="width()" 
      [attr.height]="height()"
      preserveAspectRatio="none"
      class="lg-sparkline"
    >
      <!-- Gradient Definition -->
      <defs>
        <linearGradient [id]="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" [attr.stop-color]="trendColor()" stop-opacity="0.3" />
          <stop offset="100%" [attr.stop-color]="trendColor()" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Connection Area -->
      <path 
        [attr.d]="areaPath()" 
        [attr.fill]="'url(#' + gradientId + ')'"
        class="lg-sparkline-area"
      />

      <!-- Main Trend Line -->
      <path 
        [attr.d]="linePath()" 
        fill="none" 
        [attr.stroke]="trendColor()" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="lg-sparkline-path"
      />
    </svg>
  `,
  styles: [`
    .lg-sparkline {
      display: block;
      overflow: visible;
      filter: drop-shadow(0 0 4px rgba(var(--lg-p-primary-rgb), 0.2));
    }
    .lg-sparkline-path {
      filter: drop-shadow(0 0 6px var(--trend-color, currentColor));
    }
    .lg-sparkline-area {
      pointer-events: none;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgSparklineComponent {
  /** Array of values to plot. */
  data = input.required<number[]>();
  
  /** Visual width of the SVG. */
  width = input(120);
  
  /** Visual height of the SVG. */
  height = input(40);
  
  /** Override color or let it be calculated by trend. */
  color = input<string | null>(null);

  protected gradientId = `lg-sparkline-grad-${Math.random().toString(36).substring(2, 9)}`;

  /** Calculate trend based on first vs last value if not provided. */
  trendColor = computed(() => {
    if (this.color()) return this.color()!;
    
    const vals = this.data();
    if (vals.length < 2) return 'var(--lg-t-primary)';
    
    const start = vals[0];
    const end = vals[vals.length - 1];
    
    if (end > start) return '#10b981'; // Success Green
    if (end < start) return '#ef4444'; // Error Red
    return 'var(--lg-t-text-muted)';
  });

  linePath = computed(() => {
    const vals = this.data();
    if (vals.length < 2) return '';

    const w = this.width();
    const h = this.height();
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;

    const points = vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  });

  areaPath = computed(() => {
    const lp = this.linePath();
    if (!lp) return '';
    const w = this.width();
    const h = this.height();
    return `${lp} L ${w},${h} L 0,${h} Z`;
  });
}
