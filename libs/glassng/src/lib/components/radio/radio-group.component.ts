import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, model, output, forwardRef, contentChildren, HostBinding, HostListener, effect, signal, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { GngRadioButton } from './radio-button.component';

@Component({
  selector: 'gng-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './radio.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GngRadioGroup),
      multi: true
    }
  ]
})
export class GngRadioGroup implements ControlValueAccessor, AfterContentInit {
  /** Inputs */
  name = input<string>(`gng-radio-group-${Math.random().toString(36).substring(2, 9)}`);
  
  isDisabled = model<boolean>(false, { alias: 'disabled' });
  get disabled(): boolean { return this.isDisabled(); }
  
  value = model<any>(null);

  /** Outputs */
  changed = output<any>();

  /** Query Children */
  items = contentChildren(GngRadioButton, { descendants: true });

  /** CDK Focus Management */
  private _keyManager!: FocusKeyManager<GngRadioButton>;

  /** ARIA */
  @HostBinding('attr.role') readonly role = 'radiogroup';
  @HostBinding('class.gng-radio-group') readonly hostClass = true;

  constructor() {
    // Sincronizar estado de selección cuando cambia el valor del grupo
    effect(() => {
      const currentVal = this.value();
      this.items().forEach(item => {
        item.updateSelection(currentVal);
      });
    });

    // Si hay un valor seleccionado, movemos el foco inicial del manager allí
    effect(() => {
      const items = this.items();
      const selectedIndex = items.findIndex(item => item.value() === this.value());
      if (this._keyManager && selectedIndex !== -1) {
        this._keyManager.updateActiveItem(selectedIndex);
      }
    });
  }

  ngAfterContentInit() {
    this._keyManager = new FocusKeyManager(this.items())
      .withWrap()
      .withHorizontalOrientation('ltr')
      .withVerticalOrientation();
  }

  /** Update from Child */
  selectValue(newValue: any) {
    if (this.isDisabled()) return;
    this.value.set(newValue);
    this.onChange(newValue);
    this.changed.emit(newValue);
    this.onTouched();
  }

  /** Keyboard Navigation (Arrow keys / Home / End) */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isDisabled()) return;

    if (event.key === 'Home') {
      this._keyManager.setFirstItemActive();
      this._selectActiveItem();
      event.preventDefault();
    } else if (event.key === 'End') {
      this._keyManager.setLastItemActive();
      this._selectActiveItem();
      event.preventDefault();
    } else {
      const prevActiveIndex = this._keyManager.activeItemIndex;
      this._keyManager.onKeydown(event);
      
      // Si el foco cambió, seleccionamos automáticamente el nuevo item (comportamiento estándar de radio)
      if (this._keyManager.activeItemIndex !== prevActiveIndex) {
        this._selectActiveItem();
      }
    }
  }

  private _selectActiveItem() {
    if (this._keyManager.activeItem) {
      this.selectValue(this._keyManager.activeItem.value());
    }
  }

  /** ControlValueAccessor Implementation */
  private onChange = (val: any) => {};
  private onTouched = () => {};

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isGroupDisabled: boolean): void {
    this.isDisabled.set(isGroupDisabled);
  }
}
