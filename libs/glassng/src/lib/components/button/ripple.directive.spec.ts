import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GngRipple } from './ripple.directive';
import { describe, it, expect, beforeEach, vi } from 'vitest';

@Component({
  standalone: true,
  imports: [GngRipple],
  template: `
    <div 
      #target
      gngRipple 
      [enabled]="enabled" 
      [color]="color"
      style="width: 100px; height: 100px; position: relative;"
    >
      Content
    </div>
  `
})
class TestHostComponent {
  @ViewChild('target') target!: ElementRef<HTMLElement>;
  enabled = true;
  color: string | null = null;
}

describe('GngRipple', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, GngRipple]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    // No detectamos cambios aquí para permitir configurar el estado inicial en cada test
  });

  it('should create a ripple element on pointerdown', () => {
    fixture.detectChanges();
    const targetEl = component.target.nativeElement;
    
    // Simulate pointerdown
    const event = new PointerEvent('pointerdown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    targetEl.dispatchEvent(event);
    fixture.detectChanges();

    const container = targetEl.querySelector('.gng-ripple-container');
    expect(container).toBeTruthy();

    const ripple = container?.querySelector('.gng-glass-ripple');
    expect(ripple).toBeTruthy();
  });

  it('should respect the enabled input', () => {
    component.enabled = false;
    fixture.detectChanges();

    const targetEl = component.target.nativeElement;
    const event = new PointerEvent('pointerdown', { clientX: 50, clientY: 50 });
    targetEl.dispatchEvent(event);
    fixture.detectChanges();

    const container = targetEl.querySelector('.gng-ripple-container');
    expect(container).toBeFalsy();
  });

  it('should apply custom color if provided', () => {
    component.color = 'red';
    fixture.detectChanges();

    const targetEl = component.target.nativeElement;
    const event = new PointerEvent('pointerdown', { clientX: 50, clientY: 50 });
    targetEl.dispatchEvent(event);
    fixture.detectChanges();

    const ripple = targetEl.querySelector('.gng-glass-ripple') as HTMLElement;
    expect(ripple.style.background).toBe('red');
  });

  it('should remove the ripple after timeout', async () => {
    fixture.detectChanges();
    vi.useFakeTimers();
    const targetEl = component.target.nativeElement;
    const event = new PointerEvent('pointerdown', { clientX: 50, clientY: 50 });
    targetEl.dispatchEvent(event);
    fixture.detectChanges();

    let ripple = targetEl.querySelector('.gng-glass-ripple');
    expect(ripple).toBeTruthy();

    vi.advanceTimersByTime(600);
    fixture.detectChanges();

    ripple = targetEl.querySelector('.gng-glass-ripple');
    expect(ripple).toBeFalsy();
    vi.useRealTimers();
  });

  it('should not create ripple if host is disabled via attribute', () => {
    fixture.detectChanges();
    const targetEl = component.target.nativeElement;
    targetEl.setAttribute('disabled', 'true');
    
    const event = new PointerEvent('pointerdown', { clientX: 50, clientY: 50 });
    targetEl.dispatchEvent(event);
    fixture.detectChanges();

    const container = targetEl.querySelector('.gng-ripple-container');
    expect(container).toBeFalsy();
  });
});
