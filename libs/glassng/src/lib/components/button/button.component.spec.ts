import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngButton } from './button.component';
import { By } from '@angular/platform-browser';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('GngButton', () => {
  let component: GngButton;
  let fixture: ComponentFixture<GngButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngButton]
    }).compileComponents();

    fixture = TestBed.createComponent(GngButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and have default classes', () => {
    expect(component).toBeTruthy();
    const buttonEl = fixture.nativeElement;
    expect(buttonEl.classList).toContain('gng-btn-secondary');
    expect(buttonEl.classList).toContain('gng-btn-md');
  });

  it('should apply variant classes correctly', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('gng-btn-primary');
  });

  it('should apply size classes correctly', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('gng-btn-lg');
  });

  it('should handle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    const buttonEl = fixture.nativeElement;
    expect(buttonEl.getAttribute('disabled')).toBe('true');
    expect(buttonEl.classList).toContain('opacity-50');
    expect(buttonEl.classList).toContain('pointer-events-none');
  });

  it('should handle loading state', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    
    const buttonEl = fixture.nativeElement;
    expect(buttonEl.getAttribute('aria-busy')).toBe('true');
    expect(buttonEl.querySelector('.gng-loading-spinner')).toBeTruthy();
    
    // Content should be hidden (opacity-0) when loading
    const content = buttonEl.querySelector('.relative.z-10');
    expect(content.classList).toContain('opacity-0');
  });

  it('should prevent click events when disabled', () => {
    const clickSpy = vi.fn();
    fixture.nativeElement.addEventListener('click', clickSpy);
    
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    fixture.nativeElement.click();
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should handle iconOnly mode', () => {
    fixture.componentRef.setInput('iconOnly', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('gng-btn-icon');
  });

  it('should handle fullWidth mode', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('gng-btn-full');
  });

  it('should apply custom aria-label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Submit Form');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Submit Form');
  });
});
