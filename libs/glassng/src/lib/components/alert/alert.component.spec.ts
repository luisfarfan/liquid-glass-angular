import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngAlert } from './alert.component';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('GngAlert', () => {
  let component: GngAlert;
  let fixture: ComponentFixture<GngAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngAlert]
    }).compileComponents();

    fixture = TestBed.createComponent(GngAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default info variant', () => {
    expect(component).toBeTruthy();
    const alertEl = fixture.nativeElement.querySelector('.gng-alert');
    expect(alertEl.classList).toContain('is-info');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-alert').classList).toContain('is-success');
  });

  it('should apply all variants', () => {
    for (const variant of ['info', 'success', 'warning', 'error'] as const) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.gng-alert').classList).toContain(`is-${variant}`);
    }
  });

  it('should render title when provided', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
    const titleEl = fixture.nativeElement.querySelector('.gng-alert-title');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent).toContain('Test Title');
  });

  it('should not render title when null', () => {
    fixture.componentRef.setInput('title', null);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-alert-title')).toBeFalsy();
  });

  it('should show close button when closable', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-alert-close')).toBeTruthy();
  });

  it('should not show close button by default', () => {
    expect(fixture.nativeElement.querySelector('.gng-alert-close')).toBeFalsy();
  });

  it('should emit close event on close button click', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    const closeSpy = vi.fn();
    component.close.subscribe(closeSpy);
    fixture.nativeElement.querySelector('.gng-alert-close').click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should use custom icon when provided', () => {
    fixture.componentRef.setInput('icon', 'ri-custom-icon');
    fixture.detectChanges();
    expect(component.resolvedIcon()).toBe('ri-custom-icon');
  });

  it('should resolve default icons per variant', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(component.resolvedIcon()).toBe('ri-checkbox-circle-fill');

    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    expect(component.resolvedIcon()).toBe('ri-error-warning-fill');

    fixture.componentRef.setInput('variant', 'error');
    fixture.detectChanges();
    expect(component.resolvedIcon()).toBe('ri-close-circle-fill');

    fixture.componentRef.setInput('variant', 'info');
    fixture.detectChanges();
    expect(component.resolvedIcon()).toBe('ri-information-fill');
  });

  it('should have role alert on inner div', () => {
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
  });
});
