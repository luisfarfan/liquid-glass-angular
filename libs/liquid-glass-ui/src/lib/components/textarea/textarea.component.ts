import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  model, 
  signal, 
  computed, 
  inject,
  forwardRef,
  ElementRef,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { TextFieldModule, CdkTextareaAutosize } from '@angular/cdk/text-field';

/**
 * Glass Textarea Component
 * Multi-line text input with etched glass aesthetics, auto-expand, and character counting.
 */
@Component({
  selector: 'lg-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, TextFieldModule],
  template: `
    <div class="lg-textarea-group">
      <div class="lg-textarea-label-container">
        @if (label()) {
          <label 
            [id]="uid + '-label'"
            [class.is-focused]="isFocused()" 
            class="lg-textarea-label"
          >
            {{ label() }}
          </label>
        }
        
        @if (maxChars()) {
          <span 
            class="lg-textarea-counter" 
            [class.is-warning]="isNearLimit()"
            [class.is-error]="isOverLimit()"
            aria-live="polite"
          >
            {{ charCount() }} / {{ maxChars() }}
          </span>
        }
      </div>

      <div 
        class="lg-textarea-wrapper" 
        [class.is-focused]="isFocused()"
        [class.is-error]="error()"
        [class.is-disabled]="isDisabled()"
      >
        <textarea
          #textareaControl
          class="lg-textarea-control"
          [placeholder]="placeholder()"
          [(ngModel)]="value"
          [disabled]="isDisabled()"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          [rows]="rows()"
          [attr.maxlength]="maxChars()"
          [attr.aria-labelledby]="uid + '-label'"
          [attr.aria-describedby]="error() ? uid + '-error' : null"
          [cdkTextareaAutosize]="autosize()"
          cdkAutosizeMinRows="1"
        ></textarea>
      </div>

      @if (error()) {
        <span [id]="uid + '-error'" class="lg-textarea-error-msg">
          {{ error() }}
        </span>
      }
    </div>
  `,
  styleUrl: './textarea.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ],
  host: {
    '[class.lg-textarea]': 'true'
  }
})
export class TextareaComponent implements ControlValueAccessor {
  /** Inputs */
  label = input<string | null>(null);
  placeholder = input<string>('');
  rows = input<number>(3);
  autosize = input<boolean>(true);
  maxChars = input<number | null>(null);
  error = input<string | null>(null);

  /** Internal State */
  value = model<string>('');
  isFocused = signal(false);
  isDisabled = signal(false);
  
  readonly uid = `lg-txt-${Math.random().toString(36).substring(2, 9)}`;

  /** Signals */
  charCount = computed(() => this.value().length);
  isNearLimit = computed(() => {
    const max = this.maxChars();
    if (!max) return false;
    return this.charCount() >= max * 0.9 && this.charCount() <= max;
  });
  isOverLimit = computed(() => {
    const max = this.maxChars();
    return max ? this.charCount() > max : false;
  });

  private el = inject(ElementRef);
  private textareaControl = viewChild<ElementRef<HTMLTextAreaElement>>('textareaControl');

  /** ControlValueAccessor Implementation */
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  onFocus() {
    this.isFocused.set(true);
  }

  onBlur() {
    this.isFocused.set(false);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
