import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, signal, viewChild } from '@angular/core';
import { GngTooltip } from './tooltip.component';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
  standalone: true,
  imports: [GngTooltip],
  template: `
    <gng-tooltip [content]="content()" [variant]="variant()"></gng-tooltip>
    <ng-template #tpl>template content</ng-template>
  `
})
class TestHostComponent {
  content = signal<string | TemplateRef<any>>('');
  variant = signal<'default' | 'primary' | 'accent'>('default');
  tpl = viewChild<TemplateRef<any>>('tpl');
}

describe('GngTooltip', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('gng-tooltip')).toBeTruthy();
  });

  it('should render string content', () => {
    host.content.set('Hello tooltip');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tooltip-bubble').textContent).toContain('Hello tooltip');
  });

  it('should apply default variant class', () => {
    expect(fixture.nativeElement.querySelector('.gng-tooltip-bubble').classList).toContain('gng-tooltip-default');
  });

  it('should apply primary variant class', () => {
    host.variant.set('primary');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tooltip-bubble').classList).toContain('gng-tooltip-primary');
  });

  it('should apply accent variant class', () => {
    host.variant.set('accent');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-tooltip-bubble').classList).toContain('gng-tooltip-accent');
  });

  it('asString should return string content', () => {
    host.content.set('my tooltip');
    fixture.detectChanges();
    const tooltipEl = fixture.debugElement.query(sel => sel.componentInstance instanceof GngTooltip)?.componentInstance as GngTooltip;
    expect(tooltipEl?.asString).toBe('my tooltip');
  });

  it('isTemplate should return false for string', () => {
    host.content.set('text');
    fixture.detectChanges();
    const tooltipEl = fixture.debugElement.query(sel => sel.componentInstance instanceof GngTooltip)?.componentInstance as GngTooltip;
    expect(tooltipEl?.isTemplate).toBe(false);
  });

  it('isTemplate should return true for TemplateRef', () => {
    fixture.detectChanges();
    const tpl = host.tpl();
    if (tpl) {
      host.content.set(tpl);
      fixture.detectChanges();
      const tooltipEl = fixture.debugElement.query(sel => sel.componentInstance instanceof GngTooltip)?.componentInstance as GngTooltip;
      expect(tooltipEl?.isTemplate).toBe(true);
    }
  });
});
