import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, model, inject, HostBinding, HostListener, signal, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusableOption } from '@angular/cdk/a11y';
import { RadioGroupComponent } from './radio-group.component';

@Component({
  selector: 'lg-radio-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-radio-container" [class.label-before]="labelPosition() === 'before'">
      <div class="lg-radio-outer" [attr.tabindex]="-1">
        <div class="lg-radio-inner" [style.background-color]="color()" [class.ignited]="checked()"></div>
      </div>
      <span class="lg-radio-label">
        {{ label() }}
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styleUrl: './radio.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.lg-radio-button]': 'true',
    '[class.is-checked]': 'checked()',
    '[class.is-disabled]': 'isDisabled() || group.disabled',
    '[attr.role]': '"radio"',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'isDisabled() || group.disabled',
    '[attr.tabindex]': 'tabIndex()',
    '(click)': 'select($event)'
  }
})
export class RadioButtonComponent implements FocusableOption {
  protected group = inject(RadioGroupComponent);
  private el = inject(ElementRef);

  /** Inputs */
  value = input.required<any>();
  label = input<string>('');
  labelPosition = input<'before' | 'after'>('after');
  color = input<string>('var(--lg-t-primary)');
  isDisabled = model<boolean>(false, { alias: 'disabled' });
  get disabled(): boolean { return this.isDisabled(); }

  /** Internal State */
  checked = signal(false);

  /** FocusableOption Implementation */
  focus() {
    this.el.nativeElement.focus();
  }

  tabIndex() {
    // Si el grupo tiene un valor, solo el seleccionado es 0. 
    // Si no tiene valor, el botón que sea el "primer tab" del grupo será 0.
    // Esto lo coordinará el Group, pero por ahora simplificamos:
    return (this.checked() && !this.isDisabled() && !this.group.disabled) ? 0 : -1;
  }

  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent) {
    if (this.isDisabled() || this.group.disabled) return;
    // La navegación por flechas la manejará el Group mediante el FocusKeyManager
  }

  select(event: Event) {
    if (this.isDisabled() || this.group.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.group.selectValue(this.value());
    this.focus();
  }

  /** Component API */
  updateSelection(currentValue: any) {
    this.checked.set(currentValue === this.value());
  }
}
