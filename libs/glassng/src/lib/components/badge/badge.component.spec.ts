import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngBadge } from './badge.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GngBadge', () => {
  let component: GngBadge;
  let fixture: ComponentFixture<GngBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngBadge]
    }).compileComponents();

    fixture = TestBed.createComponent(GngBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show badge when value is null by default', () => {
    expect(component.showBadge()).toBe(false);
    expect(fixture.nativeElement.querySelector('.gng-badge-indicator')).toBeFalsy();
  });

  it('should show badge with numeric value', () => {
    fixture.componentRef.setInput('value', 5);
    fixture.detectChanges();
    expect(component.showBadge()).toBe(true);
    expect(fixture.nativeElement.querySelector('.gng-badge-indicator')).toBeTruthy();
  });

  it('should show badge with string value', () => {
    fixture.componentRef.setInput('value', '99+');
    fixture.detectChanges();
    expect(component.showBadge()).toBe(true);
  });

  it('should not show badge for empty string', () => {
    fixture.componentRef.setInput('value', '');
    fixture.detectChanges();
    expect(component.showBadge()).toBe(false);
  });

  it('should show dot badge', () => {
    fixture.componentRef.setInput('dot', true);
    fixture.detectChanges();
    expect(component.showBadge()).toBe(true);
    const wrapper = fixture.nativeElement.querySelector('.gng-badge-wrapper');
    expect(wrapper.classList).toContain('is-dot');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('value', 3);
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const indicator = fixture.nativeElement.querySelector('.gng-badge-indicator');
    expect(indicator.classList).toContain('is-success');
  });

  it('should apply overlap class', () => {
    fixture.componentRef.setInput('value', 1);
    fixture.componentRef.setInput('overlap', 'circle');
    fixture.detectChanges();
    const indicator = fixture.nativeElement.querySelector('.gng-badge-indicator');
    expect(indicator.classList).toContain('overlap-circle');
  });

  it('should have has-value class when not dot', () => {
    fixture.componentRef.setInput('value', 7);
    fixture.detectChanges();
    const indicator = fixture.nativeElement.querySelector('.gng-badge-indicator');
    expect(indicator.classList).toContain('has-value');
  });
});
