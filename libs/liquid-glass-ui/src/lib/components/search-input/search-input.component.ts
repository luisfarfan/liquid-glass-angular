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
 * Glass Search Input — SDD 25.
 * Valor reactivo con `model`, emisión `search` tras debounce, limpieza e indicador de atajo opcional.
 */
@Component({
  selector: 'lg-search-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-search-input">
      <label [id]="labelId" [for]="inputId" class="lg-search-input__visually-hidden">{{ ariaLabel() }}</label>

      <span class="lg-search-input__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </span>

      <input
        #field
        type="text"
        class="lg-search-input__field"
        [id]="inputId"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput(field.value)"
        (focus)="isFocused.set(true)"
        (blur)="isFocused.set(false)"
        autocomplete="off"
        spellcheck="false"
      />

      <div class="lg-search-input__trail">
        @if (value().length > 0) {
          <button
            type="button"
            class="lg-search-input__clear"
            (click)="clear($event)"
            [attr.aria-label]="clearAriaLabel()"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        }
        @if (showKbd()) {
          <kbd class="lg-search-input__kbd">{{ shortcutLabel() }}</kbd>
        }
      </div>
    </div>
  `,
  styleUrl: './search-input.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly query$ = new Subject<string>();

  readonly placeholder = input<string>('Search...');
  readonly value = model<string>('');
  readonly debounceTime = input<number>(300);
  /** ~+20% ancho al enfocar (respecto al max-width del host). */
  readonly expandOnFocus = input(false);
  /** Muestra la pista de atajo cuando el campo no tiene foco. */
  readonly showShortcutBadge = input(true);
  /** Registra Ctrl+K / ⌘K para enfocar el campo. */
  readonly shortcutEnabled = input(false);
  readonly ariaLabel = input<string>('Buscar');
  readonly clearAriaLabel = input<string>('Limpiar búsqueda');
  /** Texto del badge (p. ej. `K` o `⌘K`). */
  readonly shortcutLabel = input<string>('K');

  readonly search = output<string>();

  protected readonly isFocused = signal(false);
  protected readonly inputId = `lg-search-${Math.random().toString(36).slice(2, 9)}`;
  protected readonly labelId = `lg-search-lbl-${Math.random().toString(36).slice(2, 9)}`;

  protected readonly showKbd = computed(() => this.showShortcutBadge() && !this.isFocused());

  @HostBinding('attr.role')
  readonly hostRole = 'search';

  @HostBinding('class.lg-search-input-host--expand')
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
    const el = this.host.nativeElement.querySelector('input.lg-search-input__field') as HTMLInputElement | null;
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
    (this.host.nativeElement.querySelector('input.lg-search-input__field') as HTMLInputElement | null)?.focus();
  }

  /** Enfoca el campo (p. ej. tras un atajo global manejado fuera). */
  focusField(): void {
    (this.host.nativeElement.querySelector('input.lg-search-input__field') as HTMLInputElement | null)?.focus();
  }
}
