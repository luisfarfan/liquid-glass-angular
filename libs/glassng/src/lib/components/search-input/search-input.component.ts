import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewEncapsulation,
  inject,
  input,
  model,
  output,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * GngSearchInput
 * High-performance search field with kinetic focus expansion, 
 * glass-morphism aesthetics and shortcut integration.
 */
@Component({
  selector: 'gng-search-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-search-input">
      <label [id]="labelId" [for]="inputId" class="gng-search-input__visually-hidden">{{ ariaLabel() }}</label>

      <span class="gng-search-input__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </span>

      <input
        #field
        type="text"
        class="gng-search-input__field"
        [id]="inputId"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput(field.value)"
        (focus)="isFocused.set(true)"
        (blur)="isFocused.set(false)"
        autocomplete="off"
        spellcheck="false"
      />

      <div class="gng-search-input__trail">
        @if (value().length > 0) {
          <button
            type="button"
            class="gng-search-input__clear"
            (click)="clear($event)"
            [attr.aria-label]="clearAriaLabel()"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        }
        @if (showKbd()) {
          <kbd class="gng-search-input__kbd">{{ shortcutLabel() }}</kbd>
        }
      </div>
    </div>
  `,
  styleUrl: './search-input.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngSearchInput {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly query$ = new Subject<string>();

  readonly placeholder = input<string>('Search...');
  readonly value = model<string>('');
  readonly debounceTime = input<number>(300);
  /** Kinetic expansion on focus. */
  readonly expandOnFocus = input(false);
  /** Shows shortcut hint when not focused. */
  readonly showShortcutBadge = input(true);
  /** Ctrl+K / ⌘K registration for instant focus. */
  readonly shortcutEnabled = input(false);
  readonly ariaLabel = input<string>('Buscar');
  readonly clearAriaLabel = input<string>('Limpiar búsqueda');
  /** Shortcut badge text (e.g. `K` or `⌘K`). */
  readonly shortcutLabel = input<string>('K');

  readonly search = output<string>();

  protected readonly isFocused = signal(false);
  protected readonly inputId = `gng-search-${Math.random().toString(36).slice(2, 9)}`;
  protected readonly labelId = `gng-search-lbl-${Math.random().toString(36).slice(2, 9)}`;

  protected readonly showKbd = computed(() => this.showShortcutBadge() && !this.isFocused());

  @HostBinding('attr.role')
  readonly hostRole = 'search';

  @HostBinding('class.gng-search-input-host--expand')
  get hostExpandClass(): boolean {
    return this.expandOnFocus();
  }

  @HostBinding('attr.aria-labelledby')
  get hostLabelledBy(): string {
    return this.labelId;
  }

  constructor() {
    this.query$
      .pipe(
        debounce(() => timer(this.debounceTime())),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((q) => this.search.emit(q));
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.shortcutEnabled()) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    const k = event.key?.toLowerCase();
    if (k !== 'k') {
      return;
    }
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) {
      return;
    }
    event.preventDefault();
    const el = this.host.nativeElement.querySelector('input.gng-search-input__field') as HTMLInputElement | null;
    el?.focus();
  }

  onInput(v: string): void {
    this.value.set(v);
    this.query$.next(v);
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value.set('');
    this.query$.next('');
    (this.host.nativeElement.querySelector('input.gng-search-input__field') as HTMLInputElement | null)?.focus();
  }

  /** Force focus on the search field. */
  focusField(): void {
    (this.host.nativeElement.querySelector('input.gng-search-input__field') as HTMLInputElement | null)?.focus();
  }
}
