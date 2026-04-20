import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngSelect } from './select.component';
import { GngSelectOption } from './select-option.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock GngSelect enough to satisfy the injection
class MockSelect {
  uid = 'test-select';
  selectOption = vi.fn();
}

describe('GngSelectOption', () => {
  let fixture: ComponentFixture<GngSelectOption>;
  let component: GngSelectOption;
  let mockSelect: MockSelect;

  beforeEach(async () => {
    mockSelect = new MockSelect();

    await TestBed.configureTestingModule({
      imports: [GngSelectOption],
      providers: [
        { provide: GngSelect, useValue: mockSelect }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GngSelectOption);
    component = fixture.componentInstance;
    // Set mandatory input
    fixture.componentRef.setInput('value', 'test-value');
  });

  it('should create and display label', () => {
    fixture.componentRef.setInput('label', 'Test Option');
    fixture.detectChanges();
    
    const labelEl = fixture.nativeElement.querySelector('.gng-option-label');
    expect(labelEl.textContent).toContain('Test Option');
  });

  it('should apply active/inactive styles for highlighting', () => {
    component.setActiveStyles();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-option-container').classList.contains('is-highlighted')).toBe(true);

    component.setInactiveStyles();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-option-container').classList.contains('is-highlighted')).toBe(false);
  });

  it('should call select.selectOption on click if not disabled', () => {
    fixture.detectChanges();
    fixture.nativeElement.click();
    
    expect(mockSelect.selectOption).toHaveBeenCalledWith(component);
  });

  it('should NOT call select.selectOption on click if disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    fixture.nativeElement.click();
    expect(mockSelect.selectOption).not.toHaveBeenCalled();
    expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
  });

  it('should show checkmark when selected', () => {
    component.selected.set(true);
    fixture.detectChanges();
    
    expect(fixture.nativeElement.querySelector('.gng-option-check')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.is-selected')).toBeTruthy();
  });

  it('should hide when isVisible is false', () => {
    component.isVisible.set(false);
    fixture.detectChanges();
    
    expect(fixture.nativeElement.classList.contains('is-hidden')).toBe(true);
  });

  it('should show icon if provided', () => {
    fixture.componentRef.setInput('icon', '🔥');
    fixture.detectChanges();
    
    const iconEl = fixture.nativeElement.querySelector('.gng-option-icon');
    expect(iconEl.textContent).toBe('🔥');
  });
});
