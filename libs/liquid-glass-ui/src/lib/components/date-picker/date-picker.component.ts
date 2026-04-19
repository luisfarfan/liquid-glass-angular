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
  ViewChild
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

/**
 * Glass DatePicker Component
 * Premium selection of dates with glass-morphism and Signals.
 */
@Component({
  selector: 'lg-date-picker',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule, ReactiveFormsModule, CalendarComponent],
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
        <!-- Calendar Icon (Integrated) -->
        <div class="lg-date-picker-icon">
           <i class="ri-calendar-line"></i>
        </div>

        <!-- Hidden Native Input for CVA -->
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

      <!-- Error Message -->
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
      <div class="lg-calendar-overlay lg-glass-deep">
        <lg-calendar 
          [selectedDate]="value()" 
          [useUTC]="useUTC()"
          [locale]="locale()"
          [todayLabel]="todayLabel()"
          (dateSelected)="onDateSelected($event)"
        ></lg-calendar>
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
  useUTC = input<boolean>(false);
  locale = input<string>('es-ES');
  todayLabel = input<string>('Hoy');
  format = input<string>('P'); // Placeholder for date-fns like format, using Intl for now

  // State
  isOpen = signal(false);
  value = signal<Date | null>(null);

  // Computed
  displayValue = computed(() => {
    const date = this.value();
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    if (this.useUTC()) {
      options.timeZone = 'UTC';
    }
    return new Intl.DateTimeFormat(this.locale(), options).format(date);
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
  }

  close() {
    this.isOpen.set(false);
    this.onTouched();
  }

  onDateSelected(date: Date) {
    this.value.set(date);
    this.onChange(date);
    this.close();
  }

  // --- ControlValueAccessor Implementation ---
  writeValue(value: any): void {
    if (value instanceof Date) {
      this.value.set(value);
    } else if (typeof value === 'string' || typeof value === 'number') {
      this.value.set(new Date(value));
    } else {
      this.value.set(null);
    }
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
}
