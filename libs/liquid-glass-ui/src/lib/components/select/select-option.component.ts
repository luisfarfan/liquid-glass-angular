import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed, signal, HostBinding, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlightable } from '@angular/cdk/a11y';
import { SelectComponent } from './select.component';

/**
 * Select Option Component
 * Atom within the Select system. Supports highlighting and accessible keyboard navigation.
 */
@Component({
  selector: 'lg-option',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-option-container" [class.is-selected]="selected()" [class.is-highlighted]="highlighted()">
      @if (icon()) {
        <span class="lg-option-icon">{{ icon() }}</span>
      }
      <span class="lg-option-label">
        <ng-content></ng-content>
        {{ label() }}
      </span>
      
      @if (selected()) {
        <span class="lg-option-check">✓</span>
      }
    </div>
  `,
  styleUrl: './select.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'option',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[id]': 'optionId()',
    '[class.lg-option]': 'true',
    '[class.is-disabled]': 'isDisabled()',
    '[attr.hidden]': '!isVisible() ? "" : null',
    '[class.is-hidden]': '!isVisible()'
  }
})
export class SelectOptionComponent implements Highlightable {
  /** Inputs */
  value = input<any>();
  label = input<string>('');
  icon = input<string | null>(null);
  isDisabled = input<boolean>(false, { alias: 'disabled' });
  
  public el = inject(ElementRef);
  private select = inject(SelectComponent);

  /** Generated ID for ARIA */
  optionId = computed(() => {
    const val = this.value();
    return `${this.select.uid}-opt-${val !== undefined ? val : Math.random().toString(36).substring(7)}`;
  });

  get disabled(): boolean {
    return this.isDisabled();
  }

  /** Internal State */
  selected = signal(false);
  highlighted = signal(false);
  isVisible = signal(true);

  /** Highlightable Implementation */
  setActiveStyles(): void {
    this.highlighted.set(true);
  }

  setInactiveStyles(): void {
    this.highlighted.set(false);
  }

  /** Component API */
  @HostListener('click', ['$event'])
  _onClick(event: MouseEvent) {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.select.selectOption(this);
  }

  getLabel?(): string {
    return this.label() || '';
  }
}
