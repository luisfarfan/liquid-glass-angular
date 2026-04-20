import { 
  Component, 
  contentChildren, 
  input, 
  model, 
  viewChildren, 
  computed, 
  effect, 
  ElementRef, 
  inject, 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  QueryList,
  HostListener,
  signal,
  untracked,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GngTab } from './tab.component';
import { FocusKeyManager, FocusableOption } from '@angular/cdk/a11y';

/** 
 * Wrapper para que los botones de los tabs sean compatibles con FocusKeyManager 
 */
class TabFocusItem implements FocusableOption {
  constructor(public elementRef: ElementRef<HTMLButtonElement>, public id: string | number) {}
  focus() {
    this.elementRef.nativeElement.focus();
  }
}

/**
 * GngTabs
 * Premium tab container with fluid glass-morphic indicators and responsive layouts.
 */
@Component({
  selector: 'gng-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-tabs-container" [attr.data-variant]="variant()">
      <!-- Tab Header / Navigation -->
      <div role="tablist" 
           class="gng-tabs-header" 
           [class.gng-tabs-header-pill]="variant() === 'pill'"
           [class.is-stretched]="stretch()"
           [attr.data-align]="align()"
           (keydown)="onKeydown($event)">
        
        @for (tab of tabs(); track tab.id(); let i = $index) {
          <button #trigger
                  role="tab"
                  type="button"
                  class="gng-tab-trigger"
                  [class.is-active]="activeTabId() === tab.id()"
                  [class.is-disabled]="tab.disabled()"
                  [class.is-stretched]="stretch()"
                  [attr.aria-selected]="activeTabId() === tab.id()"
                  [attr.aria-controls]="'panel-' + tab.id()"
                  [id]="'tab-' + tab.id()"
                  [tabindex]="activeTabId() === tab.id() ? 0 : -1"
                  (click)="selectTab(tab.id())">
            
            @if (tab.icon()) {
              <i [class]="tab.icon()"></i>
            }
            
            @if (tab.headerTemplate) {
              <ng-container [ngTemplateOutlet]="tab.headerTemplate"></ng-container>
            } @else {
              <span>{{ tab.label() }}</span>
            }
          </button>
        }

        <!-- Gng Indicator -->
        <div [class]="variant() === 'pill' ? 'gng-tabs-indicator-pill' : 'gng-tabs-indicator'"
             [ngStyle]="indicatorStyle()"></div>
      </div>

      <!-- Tab Content Panels -->
      <div class="gng-tabs-body">
        @for (tab of tabs(); track tab.id()) {
          @if (!isLazy() || activeTabId() === tab.id()) {
            <div role="tabpanel"
                 class="gng-tab-panel"
                 [class.gng-tab-fade-enter]="activeTabId() === tab.id()"
                 [id]="'panel-' + tab.id()"
                 [attr.aria-labelledby]="'tab-' + tab.id()"
                 [hidden]="activeTabId() !== tab.id()">
              <ng-container [ngTemplateOutlet]="tab.contentTemplate()!"></ng-container>
            </div>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GngTabs implements AfterViewInit {
  private elementRef = inject(ElementRef);

  /** List of projected tabs */
  tabs = contentChildren(GngTab);

  /** List of rendered trigger buttons (Using QueryList for CDK compatibility) */
  @ViewChildren('trigger') triggers!: QueryList<ElementRef<HTMLButtonElement>>;

  /** Active Tab ID (Two-way Signal) */
  activeTabId = model<string | number | undefined>(undefined);

  /** Visual variant */
  variant = input<'underline' | 'pill'>('underline');

  /** Layout Alignment */
  align = input<'start' | 'center' | 'end'>('start');

  /** Stretch tabs to fill width */
  stretch = input<boolean>(false);

  /** Lazy rendering of content */
  isLazy = input<boolean>(true);

  /** Window resize signal to force re-calculation */
  private resizeToken = signal(0);

  @HostListener('window:resize')
  onResize() {
    this.resizeToken.update(v => v + 1);
  }

  /** Style for the sliding indicator */
  indicatorStyle = computed(() => {
    this.resizeToken();
    
    const tabs = this.tabs();
    const activeId = this.activeTabId();
    
    if (!tabs.length || !this.triggers || activeId === undefined) {
      return { width: '0px', transform: 'translateX(0px)', opacity: '0' };
    }

    const activeIndex = tabs.findIndex(t => t.id() === activeId);
    if (activeIndex === -1) return { width: '0px', transform: 'translateX(0px)', opacity: '0' };

    const activeTrigger = this.triggers.toArray()[activeIndex]?.nativeElement;
    if (!activeTrigger) return { width: '0px', transform: 'translateX(0px)', opacity: '0' };

    return {
      width: `${activeTrigger.offsetWidth}px`,
      transform: `translateX(${activeTrigger.offsetLeft}px)`,
      opacity: '1'
    };
  });

  private keyManager!: FocusKeyManager<TabFocusItem>;

  constructor() {
    // Sincronizar selección inicial
    effect(() => {
      const tabs = this.tabs();
      if (tabs.length > 0 && this.activeTabId() === undefined) {
        untracked(() => {
          const firstEnabled = tabs.find(t => !t.disabled());
          if (firstEnabled) this.activeTabId.set(firstEnabled.id());
        });
      }
    });
  }

  ngAfterViewInit() {
    // Inicializar KeyManager con los items actuales
    this.refreshKeyManager();

    // Reaccionar a cambios en los botones (si se añaden/quitan tabs)
    this.triggers.changes.subscribe(() => {
      this.refreshKeyManager();
    });
  }

  private refreshKeyManager() {
    const tabs = this.tabs();
    const items = this.triggers.toArray().map((ref, i) => new TabFocusItem(ref, tabs[i]?.id()));
    
    // setItems is often missing/breaking across CDK versions, recreate manager
    this.keyManager = new FocusKeyManager(items)
      .withHorizontalOrientation('ltr')
      .withWrap();

    // Sincronizar índice
    const activeIndex = tabs.findIndex(t => t.id() === this.activeTabId());
    if (activeIndex !== -1) {
      this.keyManager.updateActiveItem(activeIndex);
    }
  }

  selectTab(id: string | number) {
    const tabs = this.tabs();
    const index = tabs.findIndex(t => t.id() === id);
    if (index !== -1 && !tabs[index].disabled()) {
      this.activeTabId.set(id);
      if (this.keyManager) this.keyManager.updateActiveItem(index);
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (this.keyManager) {
      this.keyManager.onKeydown(event);
      
      if (event.key === 'Enter' || event.key === ' ') {
        const activeItem = this.keyManager.activeItem;
        if (activeItem) {
          this.selectTab(activeItem.id);
          event.preventDefault();
        }
      }
    }
  }
}
