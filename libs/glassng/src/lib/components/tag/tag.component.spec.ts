import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngTag } from './tag.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GngTag', () => {
  let component: GngTag;
  let fixture: ComponentFixture<GngTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngTag]
    }).compileComponents();

    fixture = TestBed.createComponent(GngTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default info variant', () => {
    expect(component).toBeTruthy();
    const tag = fixture.nativeElement.querySelector('.gng-tag');
    expect(tag.classList).toContain('is-info');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tag').classList).toContain('is-success');
  });

  it('should apply all variants', () => {
    for (const v of ['success', 'warning', 'error', 'info', 'neutral', 'primary'] as const) {
      fixture.componentRef.setInput('variant', v);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.gng-tag').classList).toContain(`is-${v}`);
    }
  });

  it('should apply glass style by default', () => {
    expect(fixture.nativeElement.querySelector('.gng-tag').classList).toContain('gng-tag-glass');
  });

  it('should apply solid style', () => {
    fixture.componentRef.setInput('style', 'solid');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tag').classList).toContain('gng-tag-solid');
  });

  it('should show dot by default', () => {
    expect(fixture.nativeElement.querySelector('.gng-tag-dot')).toBeTruthy();
  });

  it('should hide dot when showDot is false', () => {
    fixture.componentRef.setInput('showDot', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tag-dot')).toBeFalsy();
  });

  it('should add pulsating class when isPulsating', () => {
    fixture.componentRef.setInput('isPulsating', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tag-dot').classList).toContain('is-pulsating');
  });

  it('should set aria-label when a11yLabel provided', () => {
    fixture.componentRef.setInput('a11yLabel', 'Active status');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tag').getAttribute('aria-label')).toBe('Active status');
  });

  it('should have role status on host', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
  });
});
