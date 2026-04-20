import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngSkeleton } from './glass-skeleton.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GngSkeleton', () => {
  let component: GngSkeleton;
  let fixture: ComponentFixture<GngSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngSkeleton]
    }).compileComponents();

    fixture = TestBed.createComponent(GngSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with rect type by default', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.classList).toContain('gng-skeleton-rect');
  });

  it('should apply animated class by default', () => {
    expect(fixture.nativeElement.classList).toContain('gng-skeleton-animated');
  });

  it('should not apply animated class when disabled', () => {
    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).not.toContain('gng-skeleton-animated');
  });

  it('should apply circle type', () => {
    fixture.componentRef.setInput('type', 'circle');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('gng-skeleton-circle');
  });

  it('should apply text type', () => {
    fixture.componentRef.setInput('type', 'text');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('gng-skeleton-text');
  });

  it('should set width CSS variable', () => {
    fixture.componentRef.setInput('width', '200px');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--gng-skeleton-width')).toBe('200px');
  });

  it('should set height CSS variable', () => {
    fixture.componentRef.setInput('height', '3rem');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--gng-skeleton-height')).toBe('3rem');
  });

  it('should have aria-hidden true', () => {
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should always have gng-skeleton base class', () => {
    expect(fixture.nativeElement.classList).toContain('gng-skeleton');
  });
});
