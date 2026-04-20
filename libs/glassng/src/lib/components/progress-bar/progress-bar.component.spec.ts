import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngProgressBar } from './progress-bar.component';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('GngProgressBar', () => {
  let component: GngProgressBar;
  let fixture: ComponentFixture<GngProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngProgressBar]
    }).compileComponents();

    fixture = TestBed.createComponent(GngProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.value()).toBe(0);
    expect(component.mode()).toBe('determinate');
  });

  it('should have role progressbar', () => {
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.getAttribute('role')).toBe('progressbar');
  });

  it('should set aria-valuenow', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should not set aria-valuenow in indeterminate mode', () => {
    fixture.componentRef.setInput('mode', 'indeterminate');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.getAttribute('aria-valuenow')).toBeNull();
  });

  it('should compute isComplete at 100', () => {
    expect(component.isComplete()).toBe(false);
    fixture.componentRef.setInput('value', 100);
    fixture.detectChanges();
    expect(component.isComplete()).toBe(true);
  });

  it('should emit complete when value reaches 100', () => {
    const spy = vi.fn();
    component.complete.subscribe(spy);
    fixture.componentRef.setInput('value', 100);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should apply is-complete class at 100', () => {
    fixture.componentRef.setInput('value', 100);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.classList).toContain('is-complete');
  });

  it('should set data-color attribute', () => {
    fixture.componentRef.setInput('color', 'accent');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.getAttribute('data-color')).toBe('accent');
  });

  it('should set data-mode attribute', () => {
    fixture.componentRef.setInput('mode', 'buffer');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.getAttribute('data-mode')).toBe('buffer');
  });

  it('should show buffer layer in buffer mode', () => {
    fixture.componentRef.setInput('mode', 'buffer');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-progress-buffer')).toBeTruthy();
  });

  it('should show indeterminate bar in indeterminate mode', () => {
    fixture.componentRef.setInput('mode', 'indeterminate');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-progress-indeterminate-bar')).toBeTruthy();
  });

  it('should apply custom thickness', () => {
    fixture.componentRef.setInput('thickness', '1rem');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.style.height).toBe('1rem');
  });

  it('should set aria-label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Upload progress');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.gng-progress-container');
    expect(el.getAttribute('aria-label')).toBe('Upload progress');
  });
});
