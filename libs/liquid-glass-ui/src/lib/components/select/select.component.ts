import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  model, 
  output, 
  forwardRef, 
  contentChildren, 
  signal, 
  computed, 
  effect, 
  ViewChild, 
  ElementRef, 
  inject,
  HostListener,
  AfterContentInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectOptionComponent } from './select-option.component';

/**
 * Glass Select Component
 * Premium dropdown with glass-morphism, CDK Overlay and ARIA compliance.
 */
@Component({
  selector: 'lg-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule],
  template: `
    <div class="lg-select-group">
      <!-- Label -->
      @if (label()) {
        <label [class.is-focused]="isOpen()" class="lg-select-label">{{ label() }}</label>
      }

      <!-- Trigger -->
      <div 
        #trigger
        class="lg-select-trigger" 
        [class.is-open]="isOpen()"
        [class.is-disabled]="disabled()"
        [class.has-value]="hasValue()"
        (click)="toggle()"
        (keydown)="onKeyDown($event)"
        tabindex="0"
        role="combobox"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-controls]="isOpen() ? uid + '-panel' : null"
        [attr.aria-activedescendant]="activeOptionId()"
      >
        <div class="lg-select-value-container">
          @if (!hasValue()) {
            <span class="lg-select-placeholder">{{ placeholder() }}</span>
          } @else if (multiple()) {
            <div class="lg-select-crystals">
              @for (val of selectedLabels(); track val) {
                <span class="lg-crystal">{{ val }}</span>
              }
            </div>
          } @else {
            <span class="lg-select-selected-label">{{ selectedLabels()[0] }}</span>
          }
        </div>

        <span class="lg-select-arrow" [class.is-rotated]="isOpen()">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M7 10l5 5 5-5H7z" fill="currentColor"/>
          </svg>
        </span>
      </div>
    </div>

    <!-- Overlay Panel -->
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      (backdropClick)="close()"
      (detach)="close()"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      [cdkConnectedOverlayMinWidth]="trigger.offsetWidth"
    >
      <div 
        [id]="uid + '-panel'"
        class="lg-select-panel lg-glass-deep"
        role="listbox"
        [attr.aria-multiselectable]="multiple()"
        (keydown)="onKeyDown($event)"
        (click)="$event.stopPropagation()"
      >
        @if (searchable()) {
          <div class="lg-select-search">
            <input 
              #searchInput
              type="text" 
              [placeholder]="'Buscar...'" 
              [(ngModel)]="searchQuery"
              (input)="_onSearchInput()"
              class="lg-select-search-input"
            />
          </div>
        }
        
        <div class="lg-select-options-list">
          <ng-content></ng-content>
          
          @if (noResults()) {
            <div class="lg-select-empty-message">
              No se encontraron resultados para "{{ searchQuery() }}"
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
  styleUrl: './select.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  host: {
    '[class.lg-select]': 'true'
  }
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit {
  /** Inputs */
  label = input<string>('');
  placeholder = input<string>('Seleccionar...');
  multiple = input<boolean>(false);
  searchable = input<boolean>(false);
  disabled = model<boolean>(false);

  /** Signals & State */
  isOpen = signal(false);
  value = signal<any>(null);
  searchQuery = signal('');
  activeOptionId = signal<string | null>(null);
  noResults = signal(false);
  
  /** Queries */
  options = contentChildren(SelectOptionComponent, { descendants: true });
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  /** Key Manager for A11y */
  private _keyManager?: ActiveDescendantKeyManager<SelectOptionComponent>;

  readonly uid = `lg-select-${Math.random().toString(36).substring(2, 9)}`;

  /** CDK Overlay Positions */
  positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 }
  ];

  constructor() {
    // Sincronizar selección de los hijos cuando cambia el valor
    effect(() => {
      const currentVal = this.value();
      const opts = this.options();
      opts.forEach(opt => {
        const optVal = opt.value();
        if (optVal === undefined) return;
        
        if (this.multiple() && Array.isArray(currentVal)) {
          opt.selected.set(currentVal.includes(optVal));
        } else {
          opt.selected.set(currentVal === optVal);
        }
      });
    });

    // Mantener el KeyManager actualizado cuando cambien las opciones
    effect(() => {
      const opts = this.options();
      if (opts.length > 0) {
        this._keyManager = new ActiveDescendantKeyManager<SelectOptionComponent>(opts as any)
          .withWrap()
          .withTypeAhead();
        
        this._keyManager.change.subscribe(() => {
          this.activeOptionId.set(this._keyManager?.activeItem?.optionId() || null);
        });
      }
    });
  }

  ngAfterContentInit() {
    // Inicialización base si no se hizo en el effect
    if (!this._keyManager && this.options().length > 0) {
      this._keyManager = new ActiveDescendantKeyManager<SelectOptionComponent>(this.options() as any)
        .withWrap()
        .withTypeAhead();

      this._keyManager.change.subscribe(() => {
        this.activeOptionId.set(this._keyManager?.activeItem?.optionId() || null);
      });
    }
  }

  /** Component API */
  toggle() {
    if (this.disabled()) return;
    
    // Haptic interaction
    if (navigator.vibrate) navigator.vibrate(5);
    
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
       setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
    }
  }

  close() {
    this.isOpen.set(false);
  }

  hasValue = computed(() => {
    const val = this.value();
    if (this.multiple()) return Array.isArray(val) && val.length > 0;
    return val !== null && val !== undefined && val !== '';
  });

  selectedLabels = computed(() => {
    const val = this.value();
    const opts = this.options();
    if (this.multiple() && Array.isArray(val)) {
      return opts
        .filter(o => o.value() !== undefined && val.includes(o.value()))
        .map(o => o.label() || o.getLabel?.() || '');
    }
    const found = opts.find(o => o.value() !== undefined && o.value() === val);
    return found ? [found.label() || found.getLabel?.() || ''] : [];
  });

  _onPanelClick(event: MouseEvent) {
    // Redundant now that SelectOption handles its own click
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // Redundant now that SelectOption handles its own click
  }

  selectOption(opt: SelectOptionComponent) {
    if (opt.isDisabled()) return;

    // Haptic feedback on selection
    if (navigator.vibrate) navigator.vibrate(2);

    if (this.multiple()) {
      let current = this.value() || [];
      if (!Array.isArray(current)) current = [current];
      
      const val = opt.value();
      const index = current.indexOf(val);
      if (index > -1) {
        current = current.filter((v: any) => v !== val);
      } else {
        current = [...current, val];
      }
      this.value.set(current);
    } else {
      this.value.set(opt.value());
      this.close();
    }

    this.onChange(this.value());
    this.onTouched();
  }

  /** Keyboard Navigation */
  onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      if (!this.isOpen()) {
        this.toggle();
      } else if (this._keyManager?.activeItem) {
        this.selectOption(this._keyManager.activeItem);
      }
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.close();
      event.preventDefault();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!this.isOpen()) {
        this.toggle();
      } else if (this._keyManager) {
        this._keyManager.onKeydown(event);
      }
      event.preventDefault();
    }
  }

  _onSearchInput() {
    const query = this.searchQuery().toLowerCase().trim();
    const opts = this.options();
    
    opts.forEach(opt => {
      const label = (opt.label() || opt.getLabel?.() || '').toLowerCase();
      opt.isVisible.set(label.includes(query));
    });

    const anyVisible = opts.some(opt => opt.isVisible());
    this.noResults.set(!anyVisible);

    // Ajustar KeyManager: Si el item activo se ocultó, mover al primero visible
    if (this._keyManager && this._keyManager.activeItem && !this._keyManager.activeItem.isVisible()) {
      this._keyManager.setFirstItemActive();
    }
  }

  /** ControlValueAccessor Implementation */
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
