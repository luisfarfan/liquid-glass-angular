import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  model, 
  signal, 
  computed, 
  forwardRef, 
  inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { CalendarComponent } from './calendar.component';
import { TimePickerComponent } from './time-picker.component';

/**
 * Glass DatePicker Component
 * Premium selection of dates with glass-morphism and Signals.
 * Supports Range mode and Time Selection.
 */
@Component({
  selector: 'lg-date-picker',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule, ReactiveFormsModule, CalendarComponent, TimePickerComponent],
  template: `
    <div class="lg-input-group flex flex-col w-full" [class.has-error]="error()">
      <!-- Label -->
      @if (label()) {
        <label [for]="uid" class="lg-input-label" [class.is-focused]="isOpen()">
          {{ label() }}
        </label>
      }

      <div 
        #trigger
        class="lg-date-picker-trigger group" 
        [class.is-focused]="isOpen()"
        [class.is-disabled]="disabled()"
        [class.has-error]="error()"
        (click)="toggle()"
      >
        <div class="lg-date-picker-icon">
           <i class="ri-calendar-line"></i>
        </div>

        <input
          #inputElement
          [id]="uid"
          readonly
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="displayValue()"
          [attr.aria-invalid]="!!error()"
          class="lg-date-picker-input"
        />
      </div>

      @if (error()) {
        <span class="lg-input-error-msg">
          {{ error() }}
        </span>
      }
    </div>

    <!-- Calendar Overlay -->
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      (backdropClick)="close()"
      (detach)="close()"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
    >
      <div class="lg-calendar-overlay lg-glass-deep" [class.is-range-layout]="selectionMode() === 'range'">
        <div class="flex flex-col">
          
          <!-- Unified Header (Range Mode Only) -->
          @if (selectionMode() === 'range') {
            <div class="lg-calendar-header unified">
              <button type="button" class="lg-calendar-nav-btn" (click)="prevMonth()" aria-label="Previous month">
                <i class="ri-arrow-left-s-line"></i>
              </button>
              <div class="lg-calendar-view-title flex-1 text-center">
                {{ viewTitleRange() }}
              </div>
              <button type="button" class="lg-calendar-nav-btn" (click)="nextMonth()" aria-label="Next month">
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </div>
          }

          <div class="lg-calendar-content-scroll">
            <div class="flex gap-4 p-4 flex-wrap md:flex-nowrap">
              <!-- Calendar 1 -->
              <lg-calendar 
                class="flex-1"
                [selectedDate]="value()" 
                [selectionMode]="selectionMode()"
                [useUTC]="useUTC()"
                [locale]="locale()"
                [todayLabel]="todayLabel()"
                [showNavigation]="selectionMode() !== 'range'"
                [showFooter]="false"
                [(viewDate)]="viewDate1"
                (dateSelected)="onDateSelected($event)"
              ></lg-calendar>

              <!-- Calendar 2 (Only for Range) -->
              @if (selectionMode() === 'range') {
                 <lg-calendar 
                  class="flex-1"
                  [selectedDate]="value()" 
                  [selectionMode]="selectionMode()"
                  [useUTC]="useUTC()"
                  [locale]="locale()"
                  [todayLabel]="todayLabel()"
                  [showNavigation]="false"
                  [showFooter]="false"
                  [(viewDate)]="viewDate2"
                  (dateSelected)="onDateSelected($event)"
                ></lg-calendar>
              }
            </div>

            <!-- Time Picker Section -->
            @if (showTime()) {
              <div class="p-4 pt-0">
                 <lg-time-picker 
                  [initialTime]="firstValueAsDate()" 
                  (timeChanged)="onTimeChanged($event)"
                ></lg-time-picker>
              </div>
            }
          </div>

          <!-- Unified Footer -->
          <div class="lg-calendar-overlay-footer lg-glass-light">
             <span class="lg-calendar-today-link" (click)="goToToday()">
                {{ todayLabel() }}
             </span>
             <div class="flex-1"></div>
             @if (selectionMode() === 'range' || showTime()) {
               <button class="lg-calendar-confirm-btn" (click)="close()">
                  Aceptar
               </button>
             }
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styleUrl: './date-picker.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent implements ControlValueAccessor {
  // Inputs
  label = input<string | null>(null);
  placeholder = input<string>('Seleccionar fecha...');
  error = input<string | null>(null);
  disabled = model<boolean>(false);
  selectionMode = input<'single' | 'range'>('single');
  showTime = input<boolean>(false);
  
  useUTC = input<boolean>(false);
  locale = input<string>('es-ES');
  todayLabel = input<string>('Hoy');
  format = input<string>('P');

  // State
  isOpen = signal(false);
  value = signal<Date | (Date | null)[] | null>(null);
  
  // Internal sync for double calendar
  viewDate1 = signal(new Date());
  viewDate2 = signal(this.getRelativeMonth(new Date(), 1));

  viewTitleRange = computed(() => {
    const d1 = this.viewDate1();
    const d2 = this.viewDate2();
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    if (this.useUTC()) options.timeZone = 'UTC';
    const fmt = new Intl.DateTimeFormat(this.locale(), options);
    return `${fmt.format(d1)} - ${fmt.format(d2)}`;
  });

  // Computed
  displayValue = computed(() => {
    const val = this.value();
    if (!val) return '';
    
    const locale = this.locale();
    const utc = this.useUTC();
    const showTime = this.showTime();
    
    const options: Intl.DateTimeFormatOptions = { 
       day: '2-digit', 
       month: '2-digit', 
       year: 'numeric',
       ...(showTime ? { hour: '2-digit', minute: '2-digit' } : {})
    };
    if (utc) options.timeZone = 'UTC';

    const fmt = (d: Date) => new Intl.DateTimeFormat(locale, options).format(d);

    if (Array.isArray(val)) {
      const [start, end] = val;
      if (!start) return '';
      return end ? `${fmt(start)} - ${fmt(end)}` : `${fmt(start)} - ...`;
    }
    
    return fmt(val);
  });

  firstValueAsDate = computed(() => {
    const val = this.value();
    if (Array.isArray(val)) return val[0];
    return val;
  });

  // Local state
  readonly uid = `lg-datepicker-${Math.random().toString(36).substring(2, 9)}`;
  
  // CDK Overlay Positions
  positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 }
  ];

  // CVA boilerplate
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  toggle() {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
       this.syncViewDates();
    }
  }

  close() {
    this.isOpen.set(false);
    this.onTouched();
  }

  nextMonth() {
    const next = this.getRelativeMonth(this.viewDate1(), 1);
    this.viewDate1.set(next);
    this.viewDate2.set(this.getRelativeMonth(next, 1));
  }

  prevMonth() {
    const prev = this.getRelativeMonth(this.viewDate1(), -1);
    this.viewDate1.set(prev);
    this.viewDate2.set(this.getRelativeMonth(prev, 1));
  }

  goToToday() {
    const now = new Date();
    const today = this.useUTC()
      ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
      : new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    this.viewDate1.set(today);
    this.viewDate2.set(this.getRelativeMonth(today, 1));
    this.onDateSelected(today);
  }

  onDateSelected(date: Date) {
    const mode = this.selectionMode();
    if (mode === 'single') {
      this.value.set(date);
      this.onChange(date);
      if (!this.showTime()) this.close();
    } else {
      let currentRange = this.value() as (Date | null)[] || [];
      if (!Array.isArray(currentRange)) currentRange = [];

      if (currentRange.length === 0 || currentRange.length === 2 || !currentRange[0]) {
        const nextRange = [date, null as any];
        this.value.set(nextRange);
        this.onChange(nextRange);
      } else {
        const start = currentRange[0];
        if (date > start) {
          const nextRange = [start, date];
          this.value.set(nextRange);
          this.onChange(nextRange);
          if (!this.showTime()) this.close();
        } else {
          const nextRange = [date, null as any];
          this.value.set(nextRange);
          this.onChange(nextRange);
        }
      }
    }
  }

  onTimeChanged(time: {hour: number, minute: number}) {
    const val = this.value();
    const updateDate = (d: Date) => {
       const next = new Date(d);
       next.setHours(time.hour, time.minute);
       return next;
    };

    if (Array.isArray(val)) {
       const nextRange = val.map((d, i) => (i === 0 && d) ? updateDate(d) : d);
       this.value.set(nextRange as Date[]);
       this.onChange(nextRange);
    } else if (val) {
       const next = updateDate(val);
       this.value.set(next);
       this.onChange(next);
    }
  }

  // --- ControlValueAccessor Implementation ---
  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.value.set(value.map(v => v ? new Date(v) : null));
    } else if (value) {
      this.value.set(new Date(value));
    } else {
      this.value.set(null);
    }
    this.syncViewDates();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private getRelativeMonth(date: Date, diff: number): Date {
    const next = new Date(date);
    next.setMonth(next.getMonth() + diff);
    return next;
  }

  private syncViewDates() {
    const val = this.value();
    const base = Array.isArray(val) ? (val[0] || new Date()) : (val || new Date());
    this.viewDate1.set(new Date(base));
    this.viewDate2.set(this.getRelativeMonth(base, 1));
  }
}
