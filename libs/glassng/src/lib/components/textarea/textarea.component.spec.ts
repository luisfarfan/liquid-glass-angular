import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngTextarea } from './textarea.component';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('GngTextarea', () => {
  let component: GngTextarea;
  let fixture: ComponentFixture<GngTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngTextarea]
    }).compileComponents();

    fixture = TestBed.createComponent(GngTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with empty value', () => {
    expect(component).toBeTruthy();
    expect(component.value()).toBe('');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.gng-textarea-label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Description');
  });

  it('should not render label when null', () => {
    fixture.componentRef.setInput('label', null);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-textarea-label')).toBeFalsy();
  });

  it('should apply focused class on focus event', () => {
    component.onFocus();
    fixture.detectChanges();
    expect(component.isFocused()).toBe(true);
    expect(fixture.nativeElement.querySelector('.gng-textarea-wrapper').classList).toContain('is-focused');
  });

  it('should remove focused class on blur', () => {
    component.onFocus();
    component.onBlur();
    fixture.detectChanges();
    expect(component.isFocused()).toBe(false);
  });

  it('should apply error class when error provided', () => {
    fixture.componentRef.setInput('error', 'Required field');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-textarea-wrapper').classList).toContain('is-error');
  });

  it('should render error message', () => {
    fixture.componentRef.setInput('error', 'Required field');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-textarea-error-msg').textContent).toContain('Required field');
  });

  it('should show character counter when maxChars set', () => {
    fixture.componentRef.setInput('maxChars', 100);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-textarea-counter')).toBeTruthy();
  });

  it('should not show counter by default', () => {
    expect(fixture.nativeElement.querySelector('.gng-textarea-counter')).toBeFalsy();
  });

  it('should compute charCount', () => {
    component.writeValue('hello');
    expect(component.charCount()).toBe(5);
  });

  it('should detect near limit at 90%', () => {
    fixture.componentRef.setInput('maxChars', 10);
    fixture.detectChanges();
    component.writeValue('123456789');
    expect(component.isNearLimit()).toBe(true);
  });

  it('should detect over limit', () => {
    fixture.componentRef.setInput('maxChars', 5);
    fixture.detectChanges();
    component.writeValue('123456');
    expect(component.isOverLimit()).toBe(true);
  });

  it('should support ControlValueAccessor writeValue', () => {
    component.writeValue('test text');
    expect(component.value()).toBe('test text');
  });

  it('should support setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.isDisabled()).toBe(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-textarea-wrapper').classList).toContain('is-disabled');
  });

  it('should call onChange on input', () => {
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    const event = { target: { value: 'typed' } } as unknown as Event;
    component.onInput(event);
    expect(onChange).toHaveBeenCalledWith('typed');
  });

  it('should call onTouched on blur', () => {
    const onTouched = vi.fn();
    component.registerOnTouched(onTouched);
    component.onBlur();
    expect(onTouched).toHaveBeenCalled();
  });

  it('should handle input event via DOM', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'hello from dom';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(component.value()).toBe('hello from dom');
  });

  it('should handle focus event via DOM', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.dispatchEvent(new Event('focus', { bubbles: true }));
    fixture.detectChanges();
    expect(component.isFocused()).toBe(true);
  });

  it('should handle blur event via DOM', () => {
    component.onFocus();
    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.dispatchEvent(new Event('blur', { bubbles: true }));
    fixture.detectChanges();
    expect(component.isFocused()).toBe(false);
  });
});
