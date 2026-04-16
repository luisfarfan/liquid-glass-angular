import {
  Component,
  Input,
  ElementRef,
  inject,
  Injector,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  AfterViewInit,
  AfterContentInit,
  OnDestroy,
  effect,
  untracked,
  ContentChildren,
  QueryList,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LiquidSidebarService } from './sidebar.service';
import { Subject, takeUntil, interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate, type AnimationEvent } from '@angular/animations';

@Component({
  selector: 'lg-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- MAIN ITEM BUTTON -->
    <a
      class="lg-sidebar-item"
      [class.is-nested]="isNestedItem()"
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
      [class.lg-sidebar-nested-collapsed]="!isExpanded()"
      [@expandCollapse]="isExpanded() ? 'expanded' : 'collapsed'"
      (@expandCollapse.done)="onNestedPanelAnimDone($event)"
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
export class LiquidSidebarItemComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  public elementRef = inject(ElementRef);
  public service = inject(LiquidSidebarService);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private destroy$ = new Subject<void>();

  /** Ítems proyectados bajo este grupo (solo aplica si `subItems`). */
  @ContentChildren(LiquidSidebarItemComponent, { descendants: true })
  private readonly nestedItemQuery!: QueryList<LiquidSidebarItemComponent>;
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

  constructor() {
    effect(() => {
      this.service.layoutTick();
      untracked(() => {
        if (!this.isActive) {
          return;
        }
        afterNextRender(
          () => {
            if (this.isActive) {
              this.service.updateIndicator(this.indicatorYRelativeToContent(), true);
            }
          },
          { injector: this.injector },
        );
      });
    });
  }

  ngAfterContentInit(): void {
    if (!this.subItems) {
      return;
    }
    const run = () => this.syncExpandFromRouter();
    queueMicrotask(run);
    this.nestedItemQuery.changes.pipe(takeUntil(this.destroy$)).subscribe(run);
  }

  ngAfterViewInit() {
    if (this.subItems) {
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
        )
        .subscribe(() => this.syncExpandFromRouter());
    }

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
      this.isExpanded.update((v) => !v);
      // queueMicrotask corre antes del CD que pinta `lg-sidebar-nested-collapsed` y la cápsula no usa la fila del padre.
      afterNextRender(() => this.service.notifyIndicatorLayout(), { injector: this.injector });
    }
  }

  /** Tras animar altura/visibilidad del panel, vuelve a medir la Y del indicador. */
  onNestedPanelAnimDone(_event: AnimationEvent): void {
    if (this.subItems) {
      this.service.notifyIndicatorLayout();
    }
  }

  /** No cachear en el constructor: el host a veces aún no está bajo `.lg-sidebar-nested-container`. */
  isNestedItem(): boolean {
    return (
      this.elementRef.nativeElement.parentElement?.classList.contains('lg-sidebar-nested-container') ?? false
    );
  }

  get isActive(): boolean {
    const btn = this.elementRef.nativeElement.querySelector('.lg-sidebar-item');
    return btn?.classList.contains('is-active') ?? false;
  }

  /**
   * Submenú del padre cerrado: el hijo sigue `is-active` pero su rect no es usable.
   * `lg-sidebar-nested-collapsed` refleja `!isExpanded()` al instante (la animación tarda
   * ~400ms en llevar height/visibility al estado final; sin esto la cápsula se queda en la Y del hijo).
   */
  private isNestedSectionCollapsed(): boolean {
    const host = this.elementRef.nativeElement;
    const container = host.parentElement;
    if (!container?.classList.contains('lg-sidebar-nested-container')) {
      return false;
    }
    if (container.classList.contains('lg-sidebar-nested-collapsed')) {
      return true;
    }
    if (container.getBoundingClientRect().height < 2) {
      return true;
    }
    const s = getComputedStyle(container);
    return s.visibility === 'hidden' || s.display === 'none';
  }

  /**
   * Abre el grupo si la URL actual coincide con el `link` de algún hijo proyectado.
   * No depende de `is-active` ni de capturar el primer `NavigationEnd` (suele emitirse
   * antes de `ngAfterViewInit`).
   */
  private syncExpandFromRouter(): void {
    if (!this.subItems) {
      return;
    }
    const list = this.nestedItemQuery;
    if (!list?.length) {
      return;
    }
    for (const item of list) {
      if (item.subItems) {
        continue;
      }
      if (this.linkMatchesRouter(item.link)) {
        this.isExpanded.set(true);
        afterNextRender(() => this.service.notifyIndicatorLayout(), { injector: this.injector });
        return;
      }
    }
  }

  private linkMatchesRouter(link: string | any[]): boolean {
    const tree = Array.isArray(link)
      ? this.router.createUrlTree(link)
      : this.router.parseUrl(typeof link === 'string' ? link : String(link));
    return this.router.isActive(tree, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  /**
   * Ancla cuya geometría define la cápsula: en rail colapsado con ruta en un hijo,
   * o hijo activo con submenú colapsado, usamos el `<a>` del grupo padre.
   */
  private indicatorAnchorForLayout(): HTMLElement | null {
    const selfAnchor = this.elementRef.nativeElement.querySelector(
      ':scope > a.lg-sidebar-item',
    ) as HTMLElement | null;
    if (!selfAnchor) {
      return null;
    }
    const useParentRow =
      this.isNestedItem() &&
      this.isActive &&
      (this.service.isCollapsed() || this.isNestedSectionCollapsed());
    if (useParentRow) {
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
