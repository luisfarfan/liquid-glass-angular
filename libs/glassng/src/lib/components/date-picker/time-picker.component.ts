import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  signal, 
  output, 
  effect,
  input,
  ElementRef,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GngTimePicker
 * Premium time selection column picker with glass-morphism aesthetics
 * and smooth kinetic scrolling.
 */
@Component({
  selector: 'gng-time-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-time-picker">
      <!-- Hours -->
      <div class="gng-time-column" #hourCol (scroll)="onScroll('hour')">
        @for (h of hours; track h) {
          <div class="gng-time-item" [class.is-active]="selectedHour() === h" (click)="scrollTo(h, 'hour')">
            {{ h | number:'2.0' }}
          </div>
        }
      </div>

      <div class="gng-time-separator">:</div>

      <!-- Minutes -->
      <div class="gng-time-column" #minCol (scroll)="onScroll('minute')">
        @for (m of minutes; track m) {
          <div class="gng-time-item" [class.is-active]="selectedMinute() === m" (click)="scrollTo(m, 'minute')">
            {{ m | number:'2.0' }}
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './date-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GngTimePicker {
  initialTime = input<Date | null>(null);
  timeChanged = output<{hour: number, minute: number}>();

  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);

  selectedHour = signal(0);
  selectedMinute = signal(0);

  hourCol = viewChild<ElementRef<HTMLDivElement>>('hourCol');
  minCol = viewChild<ElementRef<HTMLDivElement>>('minCol');

  constructor() {
    effect(() => {
      const time = this.initialTime();
      if (time) {
        this.selectedHour.set(time.getHours());
        this.selectedMinute.set(time.getMinutes());
        // Delay scroll to ensure view is ready
        setTimeout(() => this.syncScroll(), 100);
      }
    });
  }

  onScroll(type: 'hour' | 'minute') {
    const el = type === 'hour' ? this.hourCol()?.nativeElement : this.minCol()?.nativeElement;
    if (!el) return;

    const index = Math.round(el.scrollTop / 40);
    const value = type === 'hour' ? this.hours[index] : this.minutes[index];

    if (value !== undefined) {
      if (type === 'hour' && this.selectedHour() !== value) {
        this.selectedHour.set(value);
        this.emitChange();
      } else if (type === 'minute' && this.selectedMinute() !== value) {
        this.selectedMinute.set(value);
        this.emitChange();
      }
    }
  }

  scrollTo(value: number, type: 'hour' | 'minute') {
    const el = type === 'hour' ? this.hourCol()?.nativeElement : this.minCol()?.nativeElement;
    if (el) {
      el.scrollTo({ top: value * 40, behavior: 'smooth' });
    }
  }

  private syncScroll() {
    this.scrollTo(this.selectedHour(), 'hour');
    this.scrollTo(this.selectedMinute(), 'minute');
  }

  private emitChange() {
    this.timeChanged.emit({
      hour: this.selectedHour(),
      minute: this.selectedMinute()
    });
  }
}
