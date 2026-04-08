import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, model, output, forwardRef, HostListener, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-checkbox-box" 
         [class.is-checked]="checked() && !indeterminate()"
         [class.is-indeterminate]="indeterminate()"
         (click)="toggle($event)">
      
      <!-- SVG Icon -->
      <svg class="lg-checkbox-icon" viewBox="0 0 24 24">
        @if (indeterminate()) {
          <path d="M5 12h14" stroke-width="4" />
        } @else if (checked()) {
          <path d="M20 6L9 17l-5-5" stroke-width="4" />
        }
      </svg>
    </div>
    
    <span class="lg-checkbox-label" (click)="toggle($event)">
      <ng-content></ng-content>
    </span>
  `,
  styleUrl: './checkbox.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  /** Inputs & Signals */
  checked = model<boolean>(false);
  indeterminate = model<boolean>(false);
  label = input<string>('');
  disabled = model<boolean>(false);
  enableHaptics = input<boolean>(true);

  /** Outputs */
  changed = output<boolean>();

  /** Host Bindings & ARIA */
  @HostBinding('class.is-checked') get checkedClass() { return this.checked() && !this.indeterminate(); }
  @HostBinding('class.is-indeterminate') get indeterminateClass() { return this.indeterminate(); }
  @HostBinding('class.is-disabled') get disabledClass() { return this.disabled(); }
  @HostBinding('class.has-label') get hasLabel() { return true; } 
  @HostBinding('class.lg-focus-ring') readonly focusRingClass = true;
  @HostBinding('attr.role') readonly role = 'checkbox';
  @HostBinding('attr.aria-checked') get ariaChecked() { 
    return this.indeterminate() ? 'mixed' : this.checked(); 
  }
  @HostBinding('attr.aria-disabled') get ariaDisabled() { return this.disabled(); }
  @HostBinding('attr.tabindex') get tabIndex() { return this.disabled() ? -1 : 0; }

  /** CVA Callbacks */
  private onChange = (val: boolean) => {};
  private onTouched = () => {};

  @HostListener('click', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  toggle(event?: Event) {
    if (this.disabled()) return;
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('Checkbox Toggled!', { current: this.checked() });

    if (this.indeterminate()) {
      this.indeterminate.set(false);
      this.checked.set(true);
    } else {
      this.checked.set(!this.checked());
    }

    const newVal = this.checked();
    this.onChange(newVal);
    this.changed.emit(newVal);
    this.onTouched();

    if (this.enableHaptics()) {
      this.triggerHaptic();
    }
  }

  private triggerHaptic() {
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(5);
      }
    } catch (e) {
      // Catch errors in non-supporting environments
    }
  }

  /** ControlValueAccessor Implementation */
  writeValue(val: boolean): void {
    this.checked.set(!!val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
