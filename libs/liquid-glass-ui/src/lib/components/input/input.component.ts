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
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

/**
 * Glass Input Component
 * Premium text field with glass-morphism and CVA support.
 */
@Component({
  selector: 'lg-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="lg-input-group flex flex-col w-full" [class.has-error]="error()">
      <!-- Label -->
      @if (label()) {
        <label [for]="uid" class="lg-input-label">
          {{ label() }}
        </label>
      }

      <div class="lg-input-wrapper flex items-center gap-2 group" 
           [class.is-focused]="isFocused()"
           [class.has-error]="error()"
           [class.opacity-50]="disabled()">
        
        <!-- Prefix Icon Slot -->
        <div class="lg-icon-left flex items-center text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">
           <ng-content select="[lg-icon-left]"></ng-content>
        </div>

        <!-- Hidden Native Input for CVA -->
        <input
          #inputElement
          [id]="uid"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="value()"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          [attr.aria-invalid]="!!error()"
          [attr.aria-describedby]="error() ? errorId : null"
          class="lg-input-field flex-1 h-11 px-4 rounded-xl text-sm font-medium"
        />

        <!-- Suffix Icon Slot -->
        <div class="lg-icon-right flex items-center text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">
           <ng-content select="[lg-icon-right]"></ng-content>
        </div>
      </div>

      <!-- Error Message -->
      @if (error()) {
        <span [id]="errorId" class="lg-input-error-msg">
          {{ error() }}
        </span>
      }
    </div>
  `,
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements ControlValueAccessor {
  private readonly _renderer = inject(Renderer2);

  // Inputs via Signals
  label = input<string | null>(null);
  type = input<string>('text');
  placeholder = input<string>('');
  error = input<string | null>(null);
  disabled = model<boolean>(false);

  // Read-only state Signals
  isFocused = signal(false);
  value = signal<string>('');

  // Local state
  readonly uid = `lg-input-${Math.random().toString(36).substring(2, 9)}`;
  readonly errorId = `lg-error-${Math.random().toString(36).substring(2, 9)}`;

  // CVA boilerplate
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  /** Handle native input events */
  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  /** Focus management */
  onFocus() {
    this.isFocused.set(true);
  }

  onBlur() {
    this.isFocused.set(false);
    this.onTouched();
  }

  // --- ControlValueAccessor Implementation ---
  writeValue(value: any): void {
    this.value.set(value || '');
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
