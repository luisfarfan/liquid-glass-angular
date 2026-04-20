import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, model, output, forwardRef, HostListener, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gng-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-toggle-track" [class.is-checked]="checked()">
      <div class="gng-toggle-thumb"></div>
    </div>
    <span class="gng-toggle-label">
      {{ label() }}
      <ng-content></ng-content>
    </span>
  `,
  styleUrl: './toggle.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GngToggle),
      multi: true
    }
  ]
})
export class GngToggle implements ControlValueAccessor {
  /** Inputs & Signals */
  checked = model<boolean>(false);
  label = input<string>('');
  labelPosition = input<'before' | 'after'>('after');
  size = input<'sm' | 'md'>('md');
  enableHaptics = input<boolean>(true);
  disabled = model<boolean>(false);

  /** Outputs */
  changed = output<boolean>();

  /** Host Classes & ARIA */
  @HostBinding('class.size-sm') get smClass() { return this.size() === 'sm'; }
  @HostBinding('class.is-disabled') get disabledClass() { return this.disabled(); }
  @HostBinding('class.gng-focus-ring') readonly focusRingClass = true;
  @HostBinding('attr.role') readonly role = 'switch';
  @HostBinding('attr.aria-checked') get ariaChecked() { return this.checked(); }
  @HostBinding('attr.aria-disabled') get ariaDisabled() { return this.disabled(); }
  @HostBinding('attr.tabindex') get tabIndex() { return this.disabled() ? -1 : 0; }
  @HostBinding('class.label-before') get isLabelBefore() { return this.labelPosition() === 'before'; }
  @HostBinding('class.label-after') get isLabelAfter() { return this.labelPosition() === 'after'; }

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
