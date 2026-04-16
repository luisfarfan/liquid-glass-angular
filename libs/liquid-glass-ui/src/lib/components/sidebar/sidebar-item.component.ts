import {
  Component,
  Input,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LiquidSidebarService } from './sidebar.service';
import { Subject, takeUntil, interval } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'lg-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- MAIN ITEM BUTTON -->
    <a 
      class="lg-sidebar-item"
      [class.is-nested]="_isNested"
      [routerLink]="subItems ? null : link"
      routerLinkActive="is-active"
      #rla="routerLinkActive"
      (click)="handleToggle($event)"
      [attr.aria-current]="rla.isActive ? 'page' : null"
      [attr.role]="subItems ? 'button' : null"
      [attr.tabindex]="0"
    >
      <div class="lg-sidebar-item-icon">
        <ng-content select="[icon]"></ng-content>
      </div>
      
      <span class="lg-sidebar-item-label" #labelRef>
        <ng-content></ng-content>
      </span>

      <!-- Expand Icon for Parents -->
      <i *ngIf="subItems" class="ri-arrow-right-s-line lg-sidebar-expand-icon" [class.is-expanded]="isExpanded()"></i>

      <!-- Optional Badge -->
      <div *ngIf="badge && !service.isCollapsed()" class="lg-sidebar-badge px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[0.625rem] font-bold">
        {{ badge }}
      </div>
    </a>

    <!-- NESTED ITEMS CONTAINER -->
    <div 
      *ngIf="subItems" 
      class="lg-sidebar-nested-container"
      [@expandCollapse]="isExpanded() ? 'expanded' : 'collapsed'"
    >
      <ng-content select="lg-sidebar-item"></ng-content>
    </div>
  `,
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        visibility: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)')
      ])
    ])
  ],
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidSidebarItemComponent implements AfterViewInit, OnDestroy {
  public elementRef = inject(ElementRef);
  public service = inject(LiquidSidebarService);
  private destroy$ = new Subject<void>();
  private scrollContentEl: HTMLElement | null = null;
  private readonly onSidebarContentScroll = () => {
    if (this.isActive) {
      this.service.updateIndicator(this.indicatorYRelativeToContent(), true);
    }
  };

  @Input() link: string | any[] = '/';
  @Input() badge?: string | number;
  @Input() subItems = false;
  /** Label for tooltip in collapsed mode */
  @Input() label = '';

  isExpanded = signal(false);
  _isNested = false;

  constructor() {
    // Check if we are inside another sidebar item
    const parent = this.elementRef.nativeElement.parentElement;
    if (parent?.classList.contains('lg-sidebar-nested-container')) {
      this._isNested = true;
    }
  }

  ngAfterViewInit() {
    // Polling: RouterLinkActive + layout anidado no siempre actualizan en el mismo frame.
    interval(100)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isActive) {
          this.service.updateIndicator(this.indicatorYRelativeToContent(), true);
        }
      });

    const anchor = this.elementRef.nativeElement.querySelector('.lg-sidebar-item') as HTMLElement | null;
    const content = anchor?.closest('.lg-sidebar-content') as HTMLElement | null;
    if (content) {
      this.scrollContentEl = content;
      content.addEventListener('scroll', this.onSidebarContentScroll, { passive: true });
    }
  }

  ngOnDestroy() {
    if (this.scrollContentEl) {
      this.scrollContentEl.removeEventListener('scroll', this.onSidebarContentScroll);
      this.scrollContentEl = null;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleToggle(event: Event) {
    if (this.subItems) {
      event.preventDefault();
      this.isExpanded.update(v => !v);
    }
  }

  get isActive(): boolean {
    const btn = this.elementRef.nativeElement.querySelector('.lg-sidebar-item');
    return btn?.classList.contains('is-active') ?? false;
  }

  /**
   * Ancla cuya geometría define la cápsula: en rail colapsado con ruta en un hijo,
   * usamos el `<a>` del grupo padre para alinear con el icono visible.
   */
  private indicatorAnchorForLayout(): HTMLElement | null {
    const selfAnchor = this.elementRef.nativeElement.querySelector(
      ':scope > a.lg-sidebar-item',
    ) as HTMLElement | null;
    if (!selfAnchor) {
      return null;
    }
    if (this.service.isCollapsed() && this._isNested && this.isActive) {
      const nestedContainer = this.elementRef.nativeElement.parentElement;
      if (nestedContainer?.classList.contains('lg-sidebar-nested-container')) {
        const parentHost = nestedContainer.parentElement;
        if (parentHost?.tagName.toLowerCase() === 'lg-sidebar-item') {
          const parentAnchor = parentHost.querySelector(
            ':scope > a.lg-sidebar-item',
          ) as HTMLElement | null;
          if (parentAnchor) {
            return parentAnchor;
          }
        }
      }
    }
    return selfAnchor;
  }

  /**
   * Distancia desde el borde superior del área scrollable `.lg-sidebar-content`
   * hasta el ítem activo (incluye jerarquía anidada). `offsetTop` solo respecto al
   * `offsetParent` rompía la cápsula al estar dentro de `.lg-sidebar-nested-container`.
   */
  private indicatorYRelativeToContent(): number {
    const anchor = this.indicatorAnchorForLayout();
    if (!anchor) {
      return 0;
    }
    const content = anchor.closest('.lg-sidebar-content') as HTMLElement | null;
    if (!content) {
      return anchor.offsetTop;
    }
    const c = content.getBoundingClientRect();
    const a = anchor.getBoundingClientRect();
    return a.top - c.top + content.scrollTop;
  }
}
