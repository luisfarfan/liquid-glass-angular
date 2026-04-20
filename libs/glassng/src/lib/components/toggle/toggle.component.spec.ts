import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngToggle } from './toggle.component';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('GngToggle', () => {
  let component: GngToggle;
  let fixture: ComponentFixture<GngToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngToggle]
    }).compileComponents();

    fixture = TestBed.createComponent(GngToggle);
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

  it('should emit changed on toggle', () => {
    const spy = vi.fn();
    component.changed.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should have role switch', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('switch');
  });

  it('should update aria-checked', () => {
    expect(fixture.nativeElement.getAttribute('aria-checked')).toBe('false');
    component.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-checked')).toBe('true');
  });

  it('should have aria-disabled when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should set tabindex -1 when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should prevent toggle on space/enter when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { code: 'Space' });
    component.toggle(event);
    expect(component.checked()).toBe(false);
  });

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('size-sm');
  });

  it('should show label', () => {
    fixture.componentRef.setInput('label', 'Dark mode');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-toggle-label').textContent).toContain('Dark mode');
  });

  it('should support ControlValueAccessor writeValue', () => {
    component.writeValue(true);
    expect(component.checked()).toBe(true);
  });

  it('should support ControlValueAccessor setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.disabled()).toBe(true);
  });

  it('should call onChange on toggle', () => {
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    component.toggle();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should call onTouched on toggle', () => {
    const onTouched = vi.fn();
    component.registerOnTouched(onTouched);
    component.toggle();
    expect(onTouched).toHaveBeenCalled();
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

  it('should toggle via host keydown.space event', () => {
    fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }));
    expect(component.checked()).toBe(true);
  });
});
