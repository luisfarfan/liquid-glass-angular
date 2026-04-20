import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngSelectGroup } from './select-group.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GngSelectGroup', () => {
  let component: GngSelectGroup;
  let fixture: ComponentFixture<GngSelectGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngSelectGroup]
    }).compileComponents();

    fixture = TestBed.createComponent(GngSelectGroup);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Group');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render group label', () => {
    const label = fixture.nativeElement.querySelector('.gng-option-group-label');
    expect(label.textContent).toContain('Test Group');
  });

  it('should have role group', () => {
    expect(fixture.nativeElement.querySelector('[role="group"]')).toBeTruthy();
  });

  it('should not be disabled by default', () => {
    const group = fixture.nativeElement.querySelector('.gng-option-group');
    expect(group.classList).not.toContain('is-disabled');
  });

  it('should apply is-disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-option-group').classList).toContain('is-disabled');
  });

  it('should set aria-labelledby on group', () => {
    const group = fixture.nativeElement.querySelector('[role="group"]');
    const labelEl = fixture.nativeElement.querySelector('.gng-option-group-label');
    expect(group.getAttribute('aria-labelledby')).toBe(component.groupId);
    expect(labelEl.getAttribute('id')).toBe(component.groupId);
  });
});
