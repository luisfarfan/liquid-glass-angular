import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  output, 
  signal, 
  computed, 
  OnInit,
  model,
  ElementRef,
  viewChildren,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GngCalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isFocused: boolean;
  tabIndex: number;
  ariaLabel: string;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
}

/**
 * GngCalendar
 * High-fidelity calendar grid optimized for date selection and range orchestration.
 */
@Component({
  selector: 'gng-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (showNavigation()) {
      <div class="gng-calendar-header">
        <div class="gng-calendar-view-title">
          {{ viewTitle() }}
        </div>
        <div class="gng-calendar-nav">
          <button type="button" class="gng-calendar-nav-btn" (click)="prevMonth()" aria-label="Previous month">
            <i class="ri-arrow-left-s-line"></i>
          </button>
          <button type="button" class="gng-calendar-nav-btn" (click)="nextMonth()" aria-label="Next month">
            <i class="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>
    } @else {
      <div class="gng-calendar-header-simple">
        <div class="gng-calendar-view-title text-center w-full">
          {{ viewTitle() }}
        </div>
      </div>
    }

    <div 
      #calendarGrid
      class="gng-calendar-grid" 
      role="grid" 
      tabindex="0"
      [attr.aria-label]="'Calendario de ' + viewTitle()"
      (mouseleave)="onMouseLeave()"
      (keydown)="onKeyDown($event)"
    >
      <!-- Weekdays -->
      <div role="row" class="gng-calendar-weekday-row">
        @for (day of weekDays(); track day) {
          <div role="columnheader" class="gng-calendar-weekday" [attr.aria-label]="day">
            {{ day }}
          </div>
        }
      </div>

      <!-- Days Grid partitioned into rows -->
      @for (row of dayRows(); track $index) {
        <div role="row" class="gng-calendar-row">
          @for (day of row; track day.date.getTime()) {
            <div 
              #dayElement
              role="gridcell"
              class="gng-calendar-day"
              [id]="uid + '-day-' + day.date.getTime()"
              [class.is-other-month]="!day.isCurrentMonth"
              [class.is-today]="day.isToday"
              [class.is-selected]="day.isSelected"
              [class.is-focused]="day.isFocused"
              [class.is-range-start]="day.isRangeStart"
              [class.is-range-end]="day.isRangeEnd"
              [class.is-in-range]="day.isInRange"
              [attr.tabindex]="day.tabIndex"
              [attr.aria-label]="day.ariaLabel"
              [attr.aria-selected]="day.isSelected"
              [attr.aria-current]="day.isToday ? 'date' : null"
              (click)="selectDay(day)"
              (mouseenter)="onMouseEnter(day)"
            >
              <span class="gng-calendar-day-content">{{ day.date.getDate() }}</span>
            </div>
          }
        </div>
      }
    </div>

    @if (showFooter()) {
      <div class="gng-calendar-footer">
        <span class="gng-calendar-today-link" (click)="goToToday()">
          {{ todayLabel() }}
        </span>
      </div>
    }
  `,
  styleUrl: './date-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GngCalendar implements OnInit {
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
  readonly uid = `gng-calendar-${Math.random().toString(36).substring(2, 9)}`;
  readonly viewDate = model(new Date());
  focusedDate = signal<Date | null>(null);
  private readonly _hoverDate = signal<Date | null>(null);

  // View Children for focus management
  dayElements = viewChildren<ElementRef>('dayElement');
  private elementRef = inject(ElementRef);
  
  // Computed
  readonly viewTitle = computed(() => {
    const date = this.viewDate();
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    if (this.useUTC()) options.timeZone = 'UTC';
    return new Intl.DateTimeFormat(this.locale(), options).format(date);
  });

  readonly weekDays = computed(() => {
    const days = [];
    const baseDate = new Date(Date.UTC(2024, 0, 1)); // A Monday
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
    const focused = this.focusedDate();
    
    const year = useUTC ? viewDate.getUTCFullYear() : viewDate.getFullYear();
    const month = useUTC ? viewDate.getUTCMonth() : viewDate.getMonth();
    
    const now = new Date();
    const todayNum = useUTC 
      ? Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      : new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const normalizedSelected = Array.isArray(selected)
      ? selected.map(s => s ? this.normalize(s, useUTC).getTime() : null)
      : (selected ? this.normalize(selected, useUTC).getTime() : null);
    
    const normalizedHover = hover ? this.normalize(hover, useUTC).getTime() : null;
    const normalizedFocused = focused ? this.normalize(focused, useUTC).getTime() : null;

    const firstDayOfMonth = useUTC ? new Date(Date.UTC(year, month, 1)) : new Date(year, month, 1);
    let startDayIdx = useUTC ? firstDayOfMonth.getUTCDay() : firstDayOfMonth.getDay(); 
    startDayIdx = startDayIdx === 0 ? 6 : startDayIdx - 1;

    const days: GngCalendarDay[] = [];
    const create = (d: Date, cur: boolean) => this.createDay(d, cur, normalizedSelected, todayNum, normalizedHover, normalizedFocused, mode);

    // Padding previous
    const prevMonthEnd = useUTC ? new Date(Date.UTC(year, month, 0)) : new Date(year, month, 0);
    const lastDayPrev = useUTC ? prevMonthEnd.getUTCDate() : prevMonthEnd.getDate();
    for (let i = startDayIdx; i > 0; i--) {
      days.push(create(useUTC ? new Date(Date.UTC(year, month - 1, lastDayPrev - i + 1)) : new Date(year, month - 1, lastDayPrev - i + 1), false));
    }

    // Current month
    const curMonthEnd = useUTC ? new Date(Date.UTC(year, month + 1, 0)) : new Date(year, month + 1, 0);
    const total = useUTC ? curMonthEnd.getUTCDate() : curMonthEnd.getDate();
    for (let i = 1; i <= total; i++) {
      days.push(create(useUTC ? new Date(Date.UTC(year, month, i)) : new Date(year, month, i), true));
    }

    // Padding next (42 cells total)
    const nextLimit = 42 - days.length;
    for (let i = 1; i <= nextLimit; i++) {
      days.push(create(useUTC ? new Date(Date.UTC(year, month + 1, i)) : new Date(year, month + 1, i), false));
    }

    return days;
  });

  readonly dayRows = computed(() => {
    const days = this.calendarDays();
    const rows: GngCalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows;
  });

  ngOnInit() {
    const selected = this.selectedDate();
    const dateToView = Array.isArray(selected) ? (selected[0] || new Date()) : (selected || new Date());
    const normalized = this.normalize(new Date(dateToView), this.useUTC());
    
    this.viewDate.set(normalized);
    this.focusedDate.set(normalized);
  }

  onKeyDown(event: KeyboardEvent) {
    const useUTC = this.useUTC();
    const focused = this.focusedDate() || this.normalize(new Date(), useUTC);
    let next: Date | null = null;

    const move = (days: number) => {
      const d = new Date(focused);
      if (useUTC) d.setUTCDate(d.getUTCDate() + days);
      else d.setDate(d.getDate() + days);
      return d;
    };

    const moveMonth = (months: number) => {
      const d = new Date(focused);
      if (useUTC) d.setUTCMonth(d.getUTCMonth() + months, 1);
      else d.setMonth(d.getMonth() + months, 1);
      return d;
    };

    const navKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
    if (navKeys.includes(event.key)) {
      event.preventDefault(); // Stop page scroll immediately
    }

    switch (event.key) {
      case 'ArrowLeft': next = move(-1); break;
      case 'ArrowRight': next = move(1); break;
      case 'ArrowUp': next = move(-7); break;
      case 'ArrowDown': next = move(7); break;
      case 'PageUp': next = moveMonth(-1); break;
      case 'PageDown': next = moveMonth(1); break;
      case 'Home': {
        const d = new Date(focused);
        const day = useUTC ? d.getUTCDay() : d.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        next = move(diff);
        break;
      }
      case 'End': {
        const d = new Date(focused);
        const day = useUTC ? d.getUTCDay() : d.getDay();
        const diff = day === 0 ? 0 : 7 - day;
        next = move(diff);
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectDay({ date: focused } as any);
        return;
      case 'Tab':
        return; // Standard tab
      default:
        return;
    }

    if (next) {
      this.setFocusedDate(next);
      if (navigator.vibrate) navigator.vibrate(5);
    }
  }

  setFocusedDate(date: Date) {
    const useUTC = this.useUTC();
    const normalized = this.normalize(date, useUTC);
    const current = this.viewDate();
    
    const sameMonth = useUTC 
      ? normalized.getUTCMonth() === current.getUTCMonth() && normalized.getUTCFullYear() === current.getUTCFullYear()
      : normalized.getMonth() === current.getMonth() && normalized.getFullYear() === current.getFullYear();

    if (!sameMonth) {
      this.viewDate.set(new Date(normalized));
    }
    this.focusedDate.set(normalized);

    // Focus DOM element after Signal update
    setTimeout(() => {
      const el = this.elementRef.nativeElement.querySelector(`#${this.uid}-day-${normalized.getTime()}`);
      if (el) {
        el.focus();
      } else {
        // Fallback to grid
        const grid = this.elementRef.nativeElement.querySelector('.gng-calendar-grid') as HTMLElement;
        grid?.focus();
      }
    });
  }

  prevMonth() {
    this.viewDate.update(d => {
      const n = new Date(d);
      if (this.useUTC()) n.setUTCMonth(n.getUTCMonth() - 1, 1);
      else n.setMonth(n.getMonth() - 1, 1);
      return this.normalize(n, this.useUTC());
    });
  }

  nextMonth() {
    this.viewDate.update(d => {
      const n = new Date(d);
      if (this.useUTC()) n.setUTCMonth(n.getUTCMonth() + 1, 1);
      else n.setMonth(n.getMonth() + 1, 1);
      return this.normalize(n, this.useUTC());
    });
  }

  goToToday() {
    const today = this.normalize(new Date(), this.useUTC());
    this.viewDate.set(today);
    this.setFocusedDate(today);
    this.dateSelected.emit(today);
  }

  selectDay(day: GngCalendarDay) {
    const normalized = this.normalize(day.date, this.useUTC());
    this.focusedDate.set(normalized);
    this.dateSelected.emit(normalized);
  }

  onMouseEnter(day: GngCalendarDay) {
    if (this.selectionMode() === 'range') {
      this._hoverDate.set(day.date);
    }
  }

  onMouseLeave() {
    this._hoverDate.set(null);
  }

  private createDay(
    date: Date, cur: boolean, sel: any, today: number, hover: number | null, foc: number | null, mode: string
  ): GngCalendarDay {
    const t = date.getTime();
    let isSelected = false, isRangeStart = false, isRangeEnd = false, isInRange = false;

    if (mode === 'single') {
      isSelected = typeof sel === 'number' && t === sel;
    } else if (Array.isArray(sel)) {
      const start = sel[0], end = sel[1];
      if (start && t === start) { isRangeStart = isSelected = true; }
      if (end && t === end) { isRangeEnd = isSelected = true; }
      if (start && end) { isInRange = t > start && t < end; }
      else if (start && hover) {
        const min = Math.min(start, hover), max = Math.max(start, hover);
        isInRange = t > min && t < max;
      }
    }

    const isFocused = t === foc;
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    if (this.useUTC()) options.timeZone = 'UTC';
    const ariaLabel = new Intl.DateTimeFormat(this.locale(), options).format(date);

    return {
      date,
      isCurrentMonth: cur,
      isToday: t === today,
      isSelected,
      isFocused,
      isRangeStart,
      isRangeEnd,
      isInRange,
      tabIndex: isFocused ? 0 : -1,
      ariaLabel
    };
  }

  private normalize(date: Date, useUTC: boolean): Date {
    const d = new Date(date);
    if (useUTC) d.setUTCHours(0, 0, 0, 0);
    else d.setHours(0, 0, 0, 0);
    return d;
  }
}
