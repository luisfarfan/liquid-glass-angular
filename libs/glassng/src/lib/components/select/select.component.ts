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
  untracked,
  ViewChild, 
  ElementRef, 
  HostListener,
  AfterContentInit,
  contentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { GngSelectOption } from './select-option.component';
import { 
  GngSelectTrigger, 
  GngSelectHeader, 
  GngSelectFooter 
} from './select-templates.directive';

/**
 * GngSelect 
 * Premium dropdown with glass-morphism, CDK Overlay and ARIA compliance.
 */
@Component({
  selector: 'gng-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule],
  template: `
    <div class="gng-select-group">
      <!-- Label -->
      @if (label()) {
        <label 
          [id]="labelId" 
          [class.is-focused]="isOpen()" 
          class="gng-select-label"
        >
          {{ label() }}
        </label>
      }

      <!-- Trigger -->
      <div 
        #trigger
        [id]="triggerId"
        class="gng-select-trigger" 
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
        [attr.aria-labelledby]="label() ? labelId : null"
      >
        <div class="gng-select-value-container">
          @if (customTrigger()) {
            <ng-container [ngTemplateOutlet]="customTrigger()!.template"></ng-container>
          } @else if (!hasValue()) {
            <span class="gng-select-placeholder">{{ placeholder() }}</span>
          } @else if (multiple()) {
            <div class="gng-select-crystals">
              @for (item of selectedData(); track item.value) {
                <span class="gng-crystal" (click)="$event.stopPropagation()">
                  {{ item.label }}
                  <span class="gng-crystal-remove" (click)="deselectValue(item.value, $event)">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                    </svg>
                  </span>
                </span>
              }
            </div>
          } @else {
            <span class="gng-select-selected-label">{{ selectedData()[0]?.label }}</span>
          }
        </div>

        <div class="gng-select-actions">
          @if (loading()) {
            <span class="gng-select-loading">
              <svg class="gng-spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
            </span>
          } @else {
            @if (clearable() && hasValue() && !multiple()) {
              <span class="gng-select-clear" (click)="clearSelection($event)" title="Limpiar">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                </svg>
              </span>
            }
            
            <span class="gng-select-arrow" [class.is-rotated]="isOpen()">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M7 10l5 5 5-5H7z" fill="currentColor"/>
              </svg>
            </span>
          }
        </div>
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
        class="gng-select-panel gng-glass-deep"
        role="listbox"
        [attr.aria-multiselectable]="multiple()"
        (keydown)="onKeyDown($event)"
        (click)="$event.stopPropagation()"
      >
        @if (searchable()) {
          <div class="gng-select-search">
            <input 
              #searchInput
              type="text" 
              [placeholder]="'Buscar...'" 
              [(ngModel)]="searchQuery"
              (input)="_onSearchInput()"
              class="gng-select-search-input"
            />
          </div>
        }
        
        <div class="gng-select-options-list">
          @if (headerTemplate()) {
            <div class="gng-select-header-content">
              <ng-container [ngTemplateOutlet]="headerTemplate()!.template"></ng-container>
            </div>
          }

          <ng-content></ng-content>
          
          @if (noResults()) {
            <div class="gng-select-empty-message" role="status">
              No se encontraron resultados para "{{ searchQuery() }}"
            </div>
          }

          @if (footerTemplate()) {
            <div class="gng-select-footer-content">
              <ng-container [ngTemplateOutlet]="footerTemplate()!.template"></ng-container>
            </div>
          }
        </div>

        <!-- A11y Announcements -->
        <span class="sr-only" aria-live="polite">
          {{ ariaLiveMessage() }}
        </span>
      </div>
    </ng-template>
  `,
  styleUrl: './select.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GngSelect),
      multi: true
    }
  ],
  host: {
    '[class.gng-select]': 'true'
  }
})
export class GngSelect implements ControlValueAccessor, AfterContentInit {
  /** Inputs */
  label = input<string>('');
  placeholder = input<string>('Seleccionar...');
  multiple = input<boolean>(false);
  searchable = input<boolean>(false);
  loading = input<boolean>(false);
  clearable = input<boolean>(false);
  disabled = model<boolean>(false);

  /** Outputs */
  opened = output<void>();
  closed = output<void>();
  selectionChange = output<any>();

  /** Signals & State */
  isOpen = signal(false);
  value = signal<any>(null);
  searchQuery = signal('');
  activeOptionId = signal<string | null>(null);
  noResults = signal(false);
  ariaLiveMessage = signal('');

  readonly uid = `gng-select-${Math.random().toString(36).substring(2, 9)}`;
  readonly labelId = `${this.uid}-label`;
  readonly triggerId = `${this.uid}-trigger`;

  /** Computed selection data for Tags */
  selectedData = computed(() => {
    const val = this.value();
    const opts = this.options();
    if (this.multiple() && Array.isArray(val)) {
      return (opts as Array<GngSelectOption>)
        .filter((o: GngSelectOption) => o.value() !== undefined && val.includes(o.value()))
        .map((o: GngSelectOption) => ({
          label: o.label() || o.getLabel?.() || '',
          value: o.value()
        }));
    }
    const found = (opts as Array<GngSelectOption>).find((o: GngSelectOption) => o.value() !== undefined && o.value() === val);
    return found ? [{
      label: found.label() || found.getLabel?.() || '',
      value: found.value()
    }] : [];
  });
  
  /** Queries */
  options = contentChildren(GngSelectOption, { descendants: true });
  customTrigger = contentChild(GngSelectTrigger);
  headerTemplate = contentChild(GngSelectHeader);
  footerTemplate = contentChild(GngSelectFooter);
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  /** Key Manager for A11y */
  private _keyManager?: ActiveDescendantKeyManager<GngSelectOption>;

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
      opts.forEach((opt: GngSelectOption) => {
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
        this._keyManager = new ActiveDescendantKeyManager<GngSelectOption>(opts as any)
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
      this._keyManager = new ActiveDescendantKeyManager<GngSelectOption>(this.options() as any)
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
    
    // Haptic interaction (refined for mobile)
    if (navigator.vibrate) navigator.vibrate(10);
    
    this.isOpen.update((v: boolean) => !v);
    if (this.isOpen()) {
       setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
       this.opened.emit();
    } else {
       this.closed.emit();
    }
  }

  close() {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.closed.emit();
    }
  }

  hasValue = computed(() => {
    const val = this.value();
    if (this.multiple()) return Array.isArray(val) && val.length > 0;
    return val !== null && val !== undefined && val !== '';
  });

  selectedLabels = computed(() => this.selectedData().map((d: any) => d.label));

  _onPanelClick(event: MouseEvent) {
    // Redundant now that SelectOption handles its own click
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // Redundant now that SelectOption handles its own click
  }

  selectOption(opt: GngSelectOption) {
    if (opt.isDisabled()) return;
    this.toggleValue(opt.value());
  }

  toggleValue(val: any) {
    if (this.disabled()) return;

    // Haptic feedback on selection (refined for mobile)
    if (navigator.vibrate) navigator.vibrate(15);

    if (this.multiple()) {
      let current = this.value() || [];
      if (!Array.isArray(current)) current = [current];
      
      const index = current.indexOf(val);
      if (index > -1) {
        current = current.filter((v: any) => v !== val);
      } else {
        current = [...current, val];
      }
      this.value.set(current);
    } else {
      this.value.set(val);
      this.close();
    }

    this.selectionChange.emit(this.value());
    this.onChange(this.value());
    this.onTouched();
  }

  deselectValue(val: any, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    if (this.disabled()) return;

    if (this.multiple()) {
      let current = this.value() || [];
      if (Array.isArray(current)) {
        this.value.set(current.filter((v: any) => v !== val));
        this.onChange(this.value());
        this.onTouched();
      }
    }
  }

  clearSelection(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.value.set(this.multiple() ? [] : null);
    this.onChange(this.value());
    this.onTouched();
    this.close();
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
    } else if (event.key === 'Backspace') {
      // Remove last tag if not open and has values
      if (!this.isOpen() && this.multiple() && this.hasValue()) {
        const current = this.value();
        if (Array.isArray(current) && current.length > 0) {
          this.deselectValue(current[current.length - 1]);
        }
      }
    }
  }

  _onSearchInput() {
    untracked(() => {
      const query = this.searchQuery().toLowerCase().trim();
      const opts = this.options();
      
      opts.forEach((opt: GngSelectOption) => {
        const label = (opt.label() || opt.getLabel?.() || '').toLowerCase();
        opt.isVisible.set(label.includes(query));
      });

      const visibleCount = opts.filter((opt: GngSelectOption) => opt.isVisible()).length;
      this.noResults.set(visibleCount === 0);
      
      this.ariaLiveMessage.set(
        visibleCount > 0 
          ? `${visibleCount} resultados encontrados` 
          : 'No se encontraron resultados'
      );

      // Ajustar KeyManager: Si el item activo se ocultó, mover al primero visible
      if (this._keyManager && this._keyManager.activeItem && !this._keyManager.activeItem.isVisible()) {
        this._keyManager.setFirstItemActive();
      }
    });
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
