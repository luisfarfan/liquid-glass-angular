import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  output, 
  signal, 
  computed, 
  OnInit 
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

    <div class="lg-calendar-grid">
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
          (click)="selectDay(day)"
        >
          {{ day.date.getDate() }}
        </div>
      }
    </div>

    <div class="lg-calendar-footer">
      <span class="lg-calendar-today-link" (click)="goToToday()">
        {{ todayLabel() }}
      </span>
    </div>
  `,
  styleUrl: './date-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  // Inputs
  selectedDate = input<Date | null>(null);
  locale = input<string>('es-ES');
  useUTC = input<boolean>(false);
  todayLabel = input<string>('Hoy');

  // Outputs
  dateSelected = output<Date>();

  // State
  private readonly _viewDate = signal(new Date());
  
  // Computed
  readonly viewTitle = computed(() => {
    const date = this._viewDate();
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
    const viewDate = this._viewDate();
    const useUTC = this.useUTC();
    
    const year = useUTC ? viewDate.getUTCFullYear() : viewDate.getFullYear();
    const month = useUTC ? viewDate.getUTCMonth() : viewDate.getMonth();
    
    const selected = this.selectedDate();
    const now = new Date();
    const today = useUTC 
      ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
      : new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const firstDayOfMonth = useUTC 
      ? new Date(Date.UTC(year, month, 1))
      : new Date(year, month, 1);
    
    // Day of week (0=Sunday)
    let startDayIdx = useUTC ? firstDayOfMonth.getUTCDay() : firstDayOfMonth.getDay(); 
    // Adjust to Monday start (1)
    startDayIdx = startDayIdx === 0 ? 6 : startDayIdx - 1;

    const days: LGCalendarDay[] = [];
    
    // Previous month padding
    const prevMonthPaddingDate = useUTC ? new Date(Date.UTC(year, month, 0)) : new Date(year, month, 0);
    const prevMonthLastDayNum = useUTC ? prevMonthPaddingDate.getUTCDate() : prevMonthPaddingDate.getDate();
    
    for (let i = startDayIdx; i > 0; i--) {
      const d = useUTC 
        ? new Date(Date.UTC(year, month - 1, prevMonthLastDayNum - i + 1))
        : new Date(year, month - 1, prevMonthLastDayNum - i + 1);
      days.push(this.createDay(d, false, selected, today));
    }

    // Current month days
    const lastDayOfMonth = useUTC ? new Date(Date.UTC(year, month + 1, 0)) : new Date(year, month + 1, 0);
    const totalDays = useUTC ? lastDayOfMonth.getUTCDate() : lastDayOfMonth.getDate();
    for (let i = 1; i <= totalDays; i++) {
      const d = useUTC ? new Date(Date.UTC(year, month, i)) : new Date(year, month, i);
      days.push(this.createDay(d, true, selected, today));
    }

    // Next month padding to fill 42 cells
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const d = useUTC ? new Date(Date.UTC(year, month + 1, i)) : new Date(year, month + 1, i);
      days.push(this.createDay(d, false, selected, today));
    }

    return days;
  });

  ngOnInit() {
    if (this.selectedDate()) {
      this._viewDate.set(new Date(this.selectedDate()!));
    }
  }

  prevMonth() {
    this._viewDate.update(d => {
      return this.useUTC() 
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1))
        : new Date(d.getFullYear(), d.getMonth() - 1, 1);
    });
  }

  nextMonth() {
    this._viewDate.update(d => {
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
    
    this._viewDate.set(today);
    this.dateSelected.emit(today);
  }

  selectDay(day: LGCalendarDay) {
    this.dateSelected.emit(day.date);
  }

  private createDay(date: Date, isCurrentMonth: boolean, selected: Date | null, today: Date): LGCalendarDay {
    const useUTC = this.useUTC();
    if (useUTC) {
      date.setUTCHours(0, 0, 0, 0);
    } else {
      date.setHours(0, 0, 0, 0);
    }

    const isSel = !!selected && (
      useUTC 
        ? date.getTime() === new Date(selected).setUTCHours(0,0,0,0)
        : date.getTime() === new Date(selected).setHours(0,0,0,0)
    );

    return {
      date,
      isCurrentMonth,
      isToday: date.getTime() === today.getTime(),
      isSelected: isSel
    };
  }
}
