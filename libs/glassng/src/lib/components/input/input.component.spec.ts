import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { GngInput } from './input.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

@Component({
  standalone: true,
  imports: [GngInput, ReactiveFormsModule, FormsModule],
  template: `
    <gng-input 
      [label]="label" 
      [placeholder]="placeholder" 
      [type]="type"
      [error]="error"
      [disabled]="disabled"
      [formControl]="control">
    </gng-input>
  `
})
class TestHostComponent {
  label = 'Username';
  placeholder = 'Enter username';
  type = 'text';
  error: string | null = null;
  disabled = false;
  control = new FormControl('');
}

describe('GngInput', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let inputDebugElement: HTMLElement;
  let nativeInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, GngInput, ReactiveFormsModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    
    inputDebugElement = fixture.nativeElement.querySelector('gng-input');
    nativeInput = fixture.nativeElement.querySelector('input');
  });

  it('should create and render initial state', () => {
    fixture.detectChanges();
    expect(inputDebugElement).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.gng-input-label').textContent).toContain('Username');
    expect(nativeInput.placeholder).toBe('Enter username');
    expect(nativeInput.type).toBe('text');
  });

  it('should apply focus class on focus and remove on blur', () => {
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.gng-input-wrapper');
    
    nativeInput.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(wrapper.classList.contains('is-focused')).toBe(true);

    nativeInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(wrapper.classList.contains('is-focused')).toBe(false);
  });

  it('should update value and trigger onChange', () => {
    fixture.detectChanges();
    nativeInput.value = 'hello';
    nativeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control.value).toBe('hello');
  });

  it('should reflect model changes in input value', () => {
    fixture.detectChanges();
    component.control.setValue('new value');
    fixture.detectChanges();
    expect(nativeInput.value).toBe('new value');
  });

  it('should show error state and message', () => {
    component.error = 'Invalid input';
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.gng-input-wrapper');
    const errorMsg = fixture.nativeElement.querySelector('.gng-input-error-msg');

    expect(wrapper.classList.contains('has-error')).toBe(true);
    expect(errorMsg.textContent).toContain('Invalid input');
    expect(nativeInput.getAttribute('aria-invalid')).toBe('true');
  });

  it('should handle disabled state', () => {
    fixture.detectChanges();
    component.control.disable();
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.gng-input-wrapper');
    expect(wrapper.classList.contains('opacity-50')).toBe(true);
    expect(nativeInput.disabled).toBe(true);
  });

  it('should change input type dynamically', () => {
    component.type = 'password';
    fixture.detectChanges();
    expect(nativeInput.type).toBe('password');
  });

  it('should call onTouched on blur', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(component.control, 'markAsTouched');
    nativeInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    // In Angular, the form control is marked as touched on blur if using CVA
    expect(component.control.touched).toBe(true);
  });
});
