import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, model, output, forwardRef, HostListener, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-toggle-track" [class.is-checked]="checked()">
      <div class="lg-toggle-thumb"></div>
    </div>
    @if (label()) {
      <span class="lg-toggle-label">
        <ng-content></ng-content>
      </span>
    }
  `,
  styleUrl: './toggle.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  /** Inputs & Signals */
  checked = model<boolean>(false);
  label = input<string>('');
  size = input<'sm' | 'md'>('md');
  enableHaptics = input<boolean>(true);
  disabled = model<boolean>(false);

  /** Outputs */
  changed = output<boolean>();

  /** Host Classes */
  @HostBinding('class.size-sm') get smClass() { return this.size() === 'sm'; }
  @HostBinding('class.is-disabled') get disabledClass() { return this.disabled(); }

  /** CVA Callbacks */
  private onChange = (val: boolean) => {};
  private onTouched = () => {};

  @HostListener('click')
  toggle() {
    if (this.disabled()) return;
    
    const newVal = !this.checked();
    this.checked.set(newVal);
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
      // Ignorar errores en entornos que no soportan haptics de esta forma
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
