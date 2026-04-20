import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  computed 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngGlassCard } from '../glass-card/glass-card.component';
import { GngSparkline } from '../charts/sparkline.component';
import { GngProgressBar } from '../progress-bar/progress-bar.component';

export type KpiCardVariant = 'trend' | 'progress' | 'minimal' | 'status';

/**
 * GngKpiCard 
 * Premium metric display with glass-morphism and multiple presentation variants.
 * Fully accessible with ARIA roles and descriptive labels.
 */
@Component({
  selector: 'gng-kpi-card',
  standalone: true,
  imports: [CommonModule, GngGlassCard, GngSparkline, GngProgressBar],
  template: `
    <gng-glass-card 
      [class]="'gng-kpi-card-inner variant-' + variant()"
      [class.has-glow]="variant() === 'status'"
      [style.--gng-kpi-glow-color]="trendColor()"
      [attr.aria-label]="accessibilityLabel()"
      role="group"
    >
      @switch (variant()) {
        @case ('minimal') {
          <div class="gng-kpi-minimal-layout">
            @if (icon()) {
              <div class="gng-kpi-icon-container" aria-hidden="true">
                <i [class]="icon()"></i>
              </div>
            }
            <div class="gng-kpi-minimal-info">
               <span class="gng-kpi-label">{{ label() }}</span>
               <div class="flex items-center gap-2">
                  <span class="gng-kpi-value text-xl">{{ prefix() }}{{ value() }}{{ suffix() }}</span>
                  @if (trendValue() !== null) {
                    <div class="gng-kpi-trend-mini" [style.color]="trendColor()">
                      <i [class]="trendIcon()" aria-hidden="true"></i>
                      <span>
                        <span class="gng-sr-only">{{ trendLabel() }}</span>
                        {{ Math.abs(trendValue()!) }}%
                      </span>
                    </div>
                  }
               </div>
            </div>
          </div>
        }

        @default {
          <div class="gng-kpi-content">
            <!-- Header -->
            <div class="gng-kpi-header">
               <div class="flex items-center gap-2">
                  @if (icon()) {
                    <div class="gng-kpi-icon-container" aria-hidden="true">
                      <i [class]="icon()"></i>
                    </div>
                  }
                  <span class="gng-kpi-label">{{ label() }}</span>
               </div>
               
               @if (trendValue() !== null) {
                  <div 
                    class="gng-kpi-trend" 
                    [style.color]="trendColor()"
                    [class.is-positive]="isPositive()"
                    [class.is-negative]="!isPositive() && trendValue() !== 0"
                  >
                    <i [class]="trendIcon()" aria-hidden="true"></i>
                    <span>
                      <span class="gng-sr-only">{{ trendLabel() }}</span>
                      {{ Math.abs(trendValue()!) }}%
                    </span>
                  </div>
               }
            </div>

            <!-- Value -->
            <div class="gng-kpi-value-container">
               <span class="gng-kpi-prefix" aria-hidden="true">{{ prefix() }}</span>
               <span class="gng-kpi-value">{{ value() }}</span>
               <span class="gng-kpi-suffix" aria-hidden="true">{{ suffix() }}</span>
            </div>

            <!-- Progress Variant -->
            @if (variant() === 'progress') {
              <div class="mt-4">
                <gng-progress-bar 
                  [value]="progressValue()" 
                  [thickness]="'6px'"
                   color="primary"
                   [ariaLabel]="label() + ' progress'"
                ></gng-progress-bar>
                <div class="flex justify-between mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gng-t-text-muted)]" aria-hidden="true">
                   <span>{{ currentValue() }}</span>
                   <span>{{ targetValue() }}</span>
                </div>
              </div>
            }
          </div>

          <!-- Sparkline / Chart (Bottom integrated) -->
          @if (variant() === 'trend' || variant() === 'status') {
            @if (chartData() && chartData()!.length > 0) {
              <div class="gng-kpi-chart-wrapper" aria-hidden="true">
                <gng-sparkline 
                  [data]="chartData()!" 
                  [height]="50" 
                  [width]="300"
                  [color]="trendColor()"
                ></gng-sparkline>
              </div>
            }
          }
        }
      }
    </gng-glass-card>
  `,
  styleUrl: './kpi-card.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngKpiCard {
  /** Presentation variant */
  variant = input<KpiCardVariant>('trend');

  /** Title of the metric */
  label = input.required<string>();
  
  /** Primary numeric value */
  value = input.required<string | number>();
  
  /** Monetary or unit prefix (e.g. $) */
  prefix = input<string>('');
  
  /** Monetary or unit suffix (e.g. %) */
  suffix = input<string>('');
  
  /** Percentage change value (e.g. 12.5) */
  trendValue = input<number | null>(null);
  
  /** Historical data for the sparkline */
  chartData = input<number[] | null>(null);
  
  /** RemixIcon class (e.g. 'ri-user-line') */
  icon = input<string | null>(null);

  /** Progress specific: Target amount to reach */
  targetValue = input<number>(100);

  /** Progress specific: Current amount reached */
  currentValue = input<number>(0);

  protected readonly Math = Math;

  isPositive = computed(() => (this.trendValue() || 0) >= 0);

  progressValue = computed(() => {
    const target = this.targetValue();
    if (target === 0) return 0;
    return Math.min(100, (this.currentValue() / target) * 100);
  });

  trendColor = computed(() => {
    const val = this.trendValue();
    if (val === null || val === 0) return 'var(--gng-t-text-muted)';
    return val > 0 ? 'var(--gng-t-success)' : 'var(--gng-t-destructive)';
  });

  trendIcon = computed(() => {
    const val = this.trendValue();
    if (val === null || val === 0) return 'ri-subtract-line';
    return val > 0 ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line';
  });

  trendLabel = computed(() => {
    const val = this.trendValue();
    if (val === null || val === 0) return 'Stable';
    return val > 0 ? 'Increased by' : 'Decreased by';
  });

  accessibilityLabel = computed(() => {
    const trendText = this.trendValue() !== null ? `, ${this.trendLabel()} ${Math.abs(this.trendValue()!)}%` : '';
    return `${this.label()}: ${this.prefix()}${this.value()}${this.suffix()}${trendText}`;
  });
}
