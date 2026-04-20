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
import { A11yModule } from '@angular/cdk/a11y';
import { GngCalendar } from './calendar.component';
import { GngTimePicker } from './time-picker.component';

/**
 * GngDatePicker
 * Premium date selection component with glass-morphism, signals-based state,
 * and high-fidelity transitions. Supports Single, Range and Time modes.
 */
@Component({
  selector: 'gng-date-picker',
  standalone: true,
  imports: [CommonModule, OverlayModule, A11yModule, FormsModule, ReactiveFormsModule, GngCalendar, GngTimePicker],
  template: `
    <div class="gng-input-group flex flex-col w-full" [class.has-error]="error()">
      <!-- Label -->
      @if (label()) {
        <label [for]="uid" class="gng-input-label" [class.is-focused]="isOpen()">
          {{ label() }}
        </label>
      }

      <div 
        #trigger
        [id]="uid + '-trigger'"
        class="gng-date-picker-trigger group" 
        [class.is-focused]="isOpen()"
        [class.is-disabled]="disabled()"
        [class.has-error]="error()"
        (click)="toggle()"
        (keydown)="onKeyDown($event)"
        tabindex="0"
        role="combobox"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'dialog'"
        [attr.aria-controls]="isOpen() ? uid + '-panel' : null"
        [attr.aria-labelledby]="label() ? uid + '-label' : null"
      >
        <div class="gng-date-picker-icon">
           <i class="ri-calendar-line"></i>
        </div>

        <input
          #inputElement
          [id]="uid"
          readonly
          tabindex="-1"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="displayValue()"
          [attr.aria-invalid]="!!error()"
          class="gng-date-picker-input"
        />
      </div>

      @if (error()) {
        <span class="gng-input-error-msg">
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
      (detach)="onDetachOverlay()"
      (attach)="onAttach()"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
    >
      <div 
        [id]="uid + '-panel'"
        class="gng-calendar-overlay gng-glass-deep" 
        [class.is-range-layout]="selectionMode() === 'range'"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
      >
        <div class="flex flex-col">
          
          <!-- Unified Header (Range Mode Only) -->
          @if (selectionMode() === 'range') {
            <div class="gng-calendar-header unified">
              <button type="button" class="gng-calendar-nav-btn" (click)="prevMonth()" aria-label="Previous month">
                <i class="ri-arrow-left-s-line"></i>
              </button>
              <div class="gng-calendar-view-title flex-1 text-center">
                {{ viewTitleRange() }}
              </div>
              <button type="button" class="gng-calendar-nav-btn" (click)="nextMonth()" aria-label="Next month">
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </div>
          }

          <div class="gng-calendar-content-scroll">
            <div class="flex gap-4 p-4 flex-wrap md:flex-nowrap">
              <!-- Calendar 1 -->
              <gng-calendar 
                #cal1
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
              ></gng-calendar>

              <!-- Calendar 2 (Only for Range) -->
              @if (selectionMode() === 'range') {
                 <gng-calendar 
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
                ></gng-calendar>
              }
            </div>

            <!-- Time Picker Section -->
            @if (showTime()) {
              <div class="p-4 pt-0">
                 <gng-time-picker 
                  [initialTime]="firstValueAsDate()" 
                  (timeChanged)="onTimeChanged($event)"
                ></gng-time-picker>
              </div>
            }
          </div>

          <!-- Unified Footer -->
          <div class="gng-calendar-overlay-footer gng-glass-light">
             <span class="gng-calendar-today-link" (click)="goToToday()">
                {{ todayLabel() }}
             </span>
             <div class="flex-1"></div>
             @if (selectionMode() === 'range' || showTime()) {
               <button class="gng-calendar-confirm-btn" (click)="close()">
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
      useExisting: forwardRef(() => GngDatePicker),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GngDatePicker implements ControlValueAccessor {
  @ViewChild('cal1') cal1!: GngCalendar;
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
  readonly uid = `gng-datepicker-${Math.random().toString(36).substring(2, 9)}`;
  
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
    
    // Haptic interaction (premium confirmed: 10ms)
    if (navigator.vibrate) navigator.vibrate(10);
    
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
       this.syncViewDates();
    }
  }

  onAttach() {
    // Small delay to ensure overlay DOM is ready
    setTimeout(() => {
      if (this.cal1) {
        // Hand off focus to the calendar
        this.cal1.setFocusedDate(this.cal1.selectedDate() ? (Array.isArray(this.cal1.selectedDate()) ? (this.cal1.selectedDate() as any)[0] : this.cal1.selectedDate() as any) : new Date());
      }
    }, 100);
  }

  onDetachOverlay() {
    this.close();
    // Return focus to trigger
    setTimeout(() => {
      const triggerEl = document.getElementById(`${this.uid}-trigger`);
      triggerEl?.focus();
    }, 0);
  }

  close() {
    this.isOpen.set(false);
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      this.toggle();
      event.preventDefault();
    } else if (event.key === 'ArrowDown' && !this.isOpen()) {
      this.toggle();
      event.preventDefault();
    } else if (event.key === 'Escape' && this.isOpen()) {
      this.close();
      event.preventDefault();
    }
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
    // Haptic feedback on selection (15ms confirmation)
    if (navigator.vibrate) navigator.vibrate(15);
    
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
