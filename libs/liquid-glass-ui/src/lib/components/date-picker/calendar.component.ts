import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  output, 
  signal, 
  computed, 
  OnInit,
  model
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LGCalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
}

@Component({
  selector: 'lg-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (showNavigation()) {
      <div class="lg-calendar-header">
        <div class="lg-calendar-view-title">
          {{ viewTitle() }}
        </div>
        <div class="lg-calendar-nav">
          <button type="button" class="lg-calendar-nav-btn" (click)="prevMonth()" aria-label="Previous month">
            <i class="ri-arrow-left-s-line"></i>
          </button>
          <button type="button" class="lg-calendar-nav-btn" (click)="nextMonth()" aria-label="Next month">
            <i class="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>
    } @else {
      <!-- Empty header placeholder for consistent top alignment -->
      <div class="lg-calendar-header-simple">
        <div class="lg-calendar-view-title text-center w-full">
          {{ viewTitle() }}
        </div>
      </div>
    }

    <div class="lg-calendar-grid" (mouseleave)="onMouseLeave()">
      <!-- Weekdays -->
      @for (day of weekDays(); track day) {
        <div class="lg-calendar-weekday">{{ day }}</div>
      }

      <!-- Days -->
      @for (day of calendarDays(); track day.date.getTime()) {
        <div 
          class="lg-calendar-day"
          [class.is-other-month]="!day.isCurrentMonth"
          [class.is-today]="day.isToday"
          [class.is-selected]="day.isSelected"
          [class.is-range-start]="day.isRangeStart"
          [class.is-range-end]="day.isRangeEnd"
          [class.is-in-range]="day.isInRange"
          (click)="selectDay(day)"
          (mouseenter)="onMouseEnter(day)"
        >
          <span class="lg-calendar-day-content">{{ day.date.getDate() }}</span>
        </div>
      }
    </div>

    @if (showFooter()) {
      <div class="lg-calendar-footer">
        <span class="lg-calendar-today-link" (click)="goToToday()">
          {{ todayLabel() }}
        </span>
      </div>
    }
  `,
  styleUrl: './date-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  // Inputs
  selectedDate = input<Date | (Date | null)[] | null>(null);
  selectionMode = input<'single' | 'range'>('single');
  locale = input<string>('es-ES');
  useUTC = input<boolean>(false);
  todayLabel = input<string>('Hoy');
  showNavigation = input<boolean>(true);
  showFooter = input<boolean>(true);

  // Outputs
  dateSelected = output<Date>();

  // State
  readonly viewDate = model(new Date());
  private readonly _hoverDate = signal<Date | null>(null);
  
  // Computed
  readonly viewTitle = computed(() => {
    const date = this.viewDate();
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    if (this.useUTC()) {
      options.timeZone = 'UTC';
    }
    return new Intl.DateTimeFormat(this.locale(), options).format(date);
  });

  readonly weekDays = computed(() => {
    const days = [];
    const baseDate = new Date(Date.UTC(2024, 0, 1)); // A Monday UTC
    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setUTCDate(baseDate.getUTCDate() + i);
      const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
      if (this.useUTC()) options.timeZone = 'UTC';
      days.push(new Intl.DateTimeFormat(this.locale(), options).format(d).substring(0, 2));
    }
    return days;
  });

  readonly calendarDays = computed(() => {
    const viewDate = this.viewDate();
    const useUTC = this.useUTC();
    const mode = this.selectionMode();
    const selected = this.selectedDate();
    const hover = this._hoverDate();
    
    const year = useUTC ? viewDate.getUTCFullYear() : viewDate.getFullYear();
    const month = useUTC ? viewDate.getUTCMonth() : viewDate.getMonth();
    
    const now = new Date();
    const today = useUTC 
      ? Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      : new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Pre-calculate normalized times for faster comparison in loop
    const normalizedSelected = Array.isArray(selected)
      ? selected.map(s => s ? this.normalize(s, useUTC).getTime() : null)
      : (selected ? this.normalize(selected, useUTC).getTime() : null);
    
    const normalizedHover = hover ? this.normalize(hover, useUTC).getTime() : null;

    const firstDayOfMonth = useUTC 
      ? new Date(Date.UTC(year, month, 1))
      : new Date(year, month, 1);
    
    let startDayIdx = useUTC ? firstDayOfMonth.getUTCDay() : firstDayOfMonth.getDay(); 
    startDayIdx = startDayIdx === 0 ? 6 : startDayIdx - 1;

    const days: LGCalendarDay[] = [];
    
    // Previous month padding
    const prevMonthPaddingDate = useUTC ? new Date(Date.UTC(year, month, 0)) : new Date(year, month, 0);
    const prevMonthLastDayNum = useUTC ? prevMonthPaddingDate.getUTCDate() : prevMonthPaddingDate.getDate();
    
    for (let i = startDayIdx; i > 0; i--) {
      const d = useUTC 
        ? new Date(Date.UTC(year, month - 1, prevMonthLastDayNum - i + 1))
        : new Date(year, month - 1, prevMonthLastDayNum - i + 1);
      days.push(this.createDayOptimized(d, false, normalizedSelected, today, normalizedHover, mode));
    }

    // Current month days
    const lastDayOfMonth = useUTC ? new Date(Date.UTC(year, month + 1, 0)) : new Date(year, month + 1, 0);
    const totalDays = useUTC ? lastDayOfMonth.getUTCDate() : lastDayOfMonth.getDate();
    for (let i = 1; i <= totalDays; i++) {
      const d = useUTC ? new Date(Date.UTC(year, month, i)) : new Date(year, month, i);
      days.push(this.createDayOptimized(d, true, normalizedSelected, today, normalizedHover, mode));
    }

    // Next month padding to fill 42 cells
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const d = useUTC ? new Date(Date.UTC(year, month + 1, i)) : new Date(year, month + 1, i);
      days.push(this.createDayOptimized(d, false, normalizedSelected, today, normalizedHover, mode));
    }

    return days;
  });

  ngOnInit() {
    const selected = this.selectedDate();
    if (selected) {
      const dateToView = Array.isArray(selected) ? selected[0] : selected;
      if (dateToView) {
        this.viewDate.set(new Date(dateToView));
      }
    }
  }

  prevMonth() {
    this.viewDate.update(d => {
      return this.useUTC() 
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1))
        : new Date(d.getFullYear(), d.getMonth() - 1, 1);
    });
  }

  nextMonth() {
    this.viewDate.update(d => {
      return this.useUTC()
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))
        : new Date(d.getFullYear(), d.getMonth() + 1, 1);
    });
  }

  goToToday() {
    const now = new Date();
    const today = this.useUTC()
      ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
      : new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    this.viewDate.set(today);
    this.dateSelected.emit(today);
  }

  selectDay(day: LGCalendarDay) {
    this.dateSelected.emit(day.date);
  }

  onMouseEnter(day: LGCalendarDay) {
    if (this.selectionMode() === 'range') {
      this._hoverDate.set(day.date);
    }
  }

  onMouseLeave() {
    this._hoverDate.set(null);
  }

  private createDayOptimized(
    date: Date, 
    isCurrentMonth: boolean, 
    selectedTimes: number | (number | null)[] | null, 
    todayTime: number,
    hoverTime: number | null,
    mode: 'single' | 'range'
  ): LGCalendarDay {
    const t = date.getTime();
    let isSelected = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;

    if (mode === 'single') {
      isSelected = typeof selectedTimes === 'number' && t === selectedTimes;
    } else if (mode === 'range' && Array.isArray(selectedTimes)) {
      const start = selectedTimes[0];
      const end = selectedTimes[1];

      if (start && t === start) {
        isRangeStart = true;
        isSelected = true;
      }
      if (end && t === end) {
        isRangeEnd = true;
        isSelected = true;
      }
      
      if (start && end) {
        isInRange = t > start && t < end;
      } else if (start && hoverTime) {
        const min = Math.min(start, hoverTime);
        const max = Math.max(start, hoverTime);
        isInRange = t > min && t < max;
      }
    }

    return {
      date,
      isCurrentMonth,
      isToday: t === todayTime,
      isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange
    };
  }

  private normalize(date: Date, useUTC: boolean): Date {
    const d = new Date(date);
    if (useUTC) {
      d.setUTCHours(0, 0, 0, 0);
    } else {
      d.setHours(0, 0, 0, 0);
    }
    return d;
  }
}
