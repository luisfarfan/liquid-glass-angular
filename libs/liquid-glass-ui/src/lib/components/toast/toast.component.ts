import { Component, Input, OnInit, OnDestroy, signal, computed, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidToastConfig, LiquidToastType } from './toast.types';

@Component({
  selector: 'lg-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="lg-toast-item" 
      [class]="'lg-toast-' + config.type"
      (mouseenter)="_onMouseEnter()"
      (mouseleave)="_onMouseLeave()"
    >
      <div class="lg-toast-item-content">
        <!-- Semantic Icon Area -->
        <div class="lg-toast-icon-area">
          <ng-container [ngSwitch]="config.type">
            <svg *ngSwitchCase="'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <svg *ngSwitchCase="'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <svg *ngSwitchDefault width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </ng-container>
        </div>

        <!-- Content Area -->
        <div class="lg-toast-text-area">
          <div *ngIf="config.title" class="lg-toast-title">{{ config.title }}</div>
          <div class="lg-toast-message">{{ config.message }}</div>
        </div>

        <!-- Close Button -->
        <button *ngIf="config.dismissible !== false" class="lg-toast-close" (click)="_onDismiss()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Life Progress Bar -->
      <div 
        class="lg-toast-progress"
        [style.transform]="'scaleX(' + _remainingPercentage() + ')'"
      ></div>
    </div>
  `,
  styleUrl: './toast.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidToastComponent implements OnInit, OnDestroy {
  @Input({ required: true }) config!: LiquidToastConfig;
  @Output() closed = new EventEmitter<void>();

  /** Remaining time in ms */
  private _remainingTime = signal<number>(0);
  private _totalTime = 3500;
  private _timerInterval: any;
  private _isPaused = false;
  private _lastTickTime: number = 0;

  /** Calculated percentage for the progress bar transform */
  protected _remainingPercentage = computed(() => {
    return Math.max(0, this._remainingTime() / this._totalTime);
  });

  ngOnInit() {
    this._totalTime = this.config.duration || 3500;
    this._remainingTime.set(this._totalTime);
    this._startTimer();
    this._triggerHaptics();
  }

  private _triggerHaptics() {
    if (!navigator.vibrate) return;

    switch (this.config.type) {
      case 'success':
        navigator.vibrate(5);
        break;
      case 'error':
        navigator.vibrate([10, 50, 10]);
        break;
      case 'info':
        navigator.vibrate(2);
        break;
    }
  }

  ngOnDestroy() {
    this._stopTimer();
  }

  protected _onMouseEnter() {
    this._isPaused = true;
    this._stopTimer();
  }

  protected _onMouseLeave() {
    this._isPaused = false;
    this._startTimer();
  }

  protected _onDismiss() {
    this.closed.emit();
  }

  private _startTimer() {
    if (this._totalTime === 0) return; // Infinity
    
    this._lastTickTime = Date.now();
    this._timerInterval = setInterval(() => {
      const now = Date.now();
      const delta = now - this._lastTickTime;
      this._lastTickTime = now;
      
      this._remainingTime.update(val => {
        const next = val - delta;
        if (next <= 0) {
          this._stopTimer();
          this.closed.emit();
          return 0;
        }
        return next;
      });
    }, 16); // ~60fps for smooth progress bar
  }

  private _stopTimer() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
    }
  }
}
