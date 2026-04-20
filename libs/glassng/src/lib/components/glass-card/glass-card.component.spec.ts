import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngGlassCard } from './glass-card.component';
import { GNG_GLASS_CARD_DEFAULT_OPTIONS } from '../../core/component-options';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GngGlassCard', () => {
  let component: GngGlassCard;
  let fixture: ComponentFixture<GngGlassCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngGlassCard]
    }).compileComponents();

    fixture = TestBed.createComponent(GngGlassCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have base glass classes', () => {
    const el = fixture.nativeElement;
    expect(el.classList).toContain('bg-glass');
    expect(el.classList).toContain('rounded-[var(--gng-g-radius-card)]');
  });

  it('should have data-gng-id attribute', () => {
    expect(fixture.nativeElement.getAttribute('data-gng-id')).toBe('gng-glass-card');
  });

  it('should be focusable (tabindex 0)', () => {
    expect(fixture.nativeElement.getAttribute('tabindex')).toBe('0');
  });

  it('should include hover class', () => {
    expect(fixture.nativeElement.classList).toContain('gng-glass-card-hover');
  });
});

describe('GngGlassCard with default options', () => {
  let fixture: ComponentFixture<GngGlassCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngGlassCard],
      providers: [
        { provide: GNG_GLASS_CARD_DEFAULT_OPTIONS, useValue: { customClass: 'custom-test-class' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GngGlassCard);
    fixture.detectChanges();
  });

  it('should apply customClass from default options', () => {
    expect(fixture.nativeElement.classList).toContain('custom-test-class');
  });
});
