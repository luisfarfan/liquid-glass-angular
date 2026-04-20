import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed, signal, HostBinding, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlightable } from '@angular/cdk/a11y';
import { GngSelect } from './select.component';

/**
 * GngSelectOption 
 * Atom within the Select system. Supports highlighting and accessible keyboard navigation.
 */
@Component({
  selector: 'gng-option',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-option-container" [class.is-selected]="selected()" [class.is-highlighted]="highlighted()">
      @if (icon()) {
        <span class="gng-option-icon">{{ icon() }}</span>
      }
      <span class="gng-option-label">
        <ng-content></ng-content>
        {{ label() }}
      </span>
      
      @if (selected()) {
        <span class="gng-option-check">✓</span>
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
    '[class.gng-option]': 'true',
    '[class.is-disabled]': 'isDisabled()',
    '[attr.hidden]': '!isVisible() ? "" : null',
    '[class.is-hidden]': '!isVisible()'
  }
})
export class GngSelectOption implements Highlightable {
  /** Inputs */
  value = input<any>();
  label = input<string>('');
  icon = input<string | null>(null);
  isDisabled = input<boolean>(false, { alias: 'disabled' });
  
  public el = inject(ElementRef);
  private select = inject(GngSelect);

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

  getLabel(): string {
    if (this.label()) return this.label();
    return this.el.nativeElement.textContent?.trim() || '';
  }
}
