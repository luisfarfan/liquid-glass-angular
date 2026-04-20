import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GngFormField 
 * A premium wrapper for individual form controls (input, checkbox, select).
 * Manages label positioning, hint text, and validation error messages.
 */
@Component({
  selector: 'gng-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-form-field" [class.has-error]="error()" [class]="customClass()">
      <!-- Header: Label & Optional Extra Info -->
      <div class="gng-form-field-header" *ngIf="label()">
        <label class="gng-form-field-label">
          {{ label() }}
          <span *ngIf="required()" class="text-destructive ml-0.5">*</span>
        </label>
        
        <ng-content select="[gng-label-suffix]"></ng-content>
      </div>

      <!-- Control Container -->
      <div class="gng-form-field-control">
        <ng-content></ng-content>
      </div>

      <!-- Footer: Errors & Hints -->
      <div class="gng-form-field-footer">
        @if (error()) {
          <span class="gng-form-field-error" aria-live="polite">
            <i class="ri-error-warning-line mr-1"></i>
            {{ error() }}
          </span>
        } @else if (hint()) {
          <span class="gng-form-field-hint">
            {{ hint() }}
          </span>
        }
      </div>
    </div>
  `,
  styleUrl: './form-field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GngFormField {
  /** Label descriptivo del campo */
  label = input<string | null>(null);
  
  /** Ayuda visual o instrucción corta */
  hint = input<string | null>(null);

  /** Mensaje de error (si hay) */
  error = input<string | null>(null);

  /** Indica si el campo es obligatorio (añade asterisco) */
  required = input<boolean>(false);

  /** Clase CSS adicional para personalización */
  customClass = input<string>('');
}
