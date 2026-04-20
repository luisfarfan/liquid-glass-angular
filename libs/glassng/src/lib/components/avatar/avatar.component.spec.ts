import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GngAvatar } from './avatar.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GngAvatar', () => {
  let component: GngAvatar;
  let fixture: ComponentFixture<GngAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GngAvatar]
    }).compileComponents();

    fixture = TestBed.createComponent(GngAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default md size', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.gng-avatar--md')).toBeTruthy();
  });

  it('should apply size classes', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector(`.gng-avatar--${size}`)).toBeTruthy();
    }
  });

  it('should show initials from full name', () => {
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.detectChanges();
    const initials = fixture.nativeElement.querySelector('.gng-avatar__initials');
    expect(initials.textContent.trim()).toBe('JD');
  });

  it('should show single word initials (first 2 chars)', () => {
    fixture.componentRef.setInput('name', 'Lucho');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-avatar__initials').textContent.trim()).toBe('LU');
  });

  it('should show ? for empty name', () => {
    fixture.componentRef.setInput('name', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-avatar__initials').textContent.trim()).toBe('?');
  });

  it('should show skeleton when loading', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('gng-skeleton')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.gng-avatar__initials')).toBeFalsy();
  });

  it('should show image when src provided', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('.gng-avatar__img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('should fall back to initials on image error', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.componentRef.setInput('name', 'Jane Doe');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('.gng-avatar__img');
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-avatar__initials')).toBeTruthy();
  });

  it('should show status indicator', () => {
    fixture.componentRef.setInput('status', 'online');
    fixture.detectChanges();
    const status = fixture.nativeElement.querySelector('.gng-avatar__status');
    expect(status).toBeTruthy();
    expect(status.classList).toContain('gng-avatar__status--online');
  });

  it('should apply offline status class', () => {
    fixture.componentRef.setInput('status', 'offline');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-avatar__status--offline')).toBeTruthy();
  });

  it('should apply busy status class', () => {
    fixture.componentRef.setInput('status', 'busy');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-avatar__status--busy')).toBeTruthy();
  });

  it('should not show status when loading', () => {
    fixture.componentRef.setInput('status', 'online');
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-avatar__status')).toBeFalsy();
  });

  it('should set aria-busy when loading', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gng-avatar').getAttribute('aria-busy')).toBe('true');
  });
});
