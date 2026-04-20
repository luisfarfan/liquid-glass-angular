import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngCheckbox } from './checkbox.component';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('GngCheckbox', () => {
  let component: GngCheckbox;
  let fixture: ComponentFixture<GngCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngCheckbox]
    }).compileComponents();

    fixture = TestBed.createComponent(GngCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create unchecked by default', () => {
    expect(component).toBeTruthy();
    expect(component.checked()).toBe(false);
  });

  it('should toggle on click', () => {
    component.toggle();
    expect(component.checked()).toBe(true);
    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should emit changed event on toggle', () => {
    const spy = vi.fn();
    component.changed.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should have role checkbox', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('checkbox');
  });

  it('should update aria-checked', () => {
    expect(fixture.nativeElement.getAttribute('aria-checked')).toBe('false');
    component.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-checked')).toBe('true');
  });

  it('should handle indeterminate state', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-checked')).toBe('mixed');
  });

  it('should resolve indeterminate to checked on next toggle', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    component.toggle();
    expect(component.indeterminate()).toBe(false);
    expect(component.checked()).toBe(true);
  });

  it('should apply is-disabled class', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('is-disabled');
  });

  it('should set tabindex -1 when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should show label text', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-checkbox-label').textContent).toContain('Accept terms');
  });

  it('should support ControlValueAccessor writeValue', () => {
    component.writeValue(true);
    expect(component.checked()).toBe(true);
  });

  it('should support setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.disabled()).toBe(true);
  });

  it('should call onChange when toggled', () => {
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    component.toggle();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should call onTouched when toggled', () => {
    const onTouched = vi.fn();
    component.registerOnTouched(onTouched);
    component.toggle();
    expect(onTouched).toHaveBeenCalled();
  });

  it('should apply is-checked class when checked', () => {
    component.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('is-checked');
  });

  it('should call preventDefault and stopPropagation when toggled with event', () => {
    const event = new MouseEvent('click');
    const preventSpy = vi.spyOn(event, 'preventDefault');
    const stopSpy = vi.spyOn(event, 'stopPropagation');
    component.toggle(event);
    expect(preventSpy).toHaveBeenCalled();
    expect(stopSpy).toHaveBeenCalled();
  });

  it('should trigger haptics when vibrate is available', () => {
    const vibrateSpy = vi.fn();
    Object.defineProperty(navigator, 'vibrate', { value: vibrateSpy, configurable: true });
    component.toggle();
    expect(vibrateSpy).toHaveBeenCalledWith(5);
  });

  it('should toggle via host click event', () => {
    fixture.nativeElement.click();
    expect(component.checked()).toBe(true);
  });

  it('should toggle via div click in template', () => {
    const box = fixture.nativeElement.querySelector('.gng-checkbox-box');
    box.click();
    expect(component.checked()).toBe(true);
  });

  it('should toggle via label span click in template', () => {
    fixture.componentRef.setInput('label', 'Click me');
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.gng-checkbox-label');
    span.click();
    expect(component.checked()).toBe(true);
  });
});
