import {
  Component,
  ElementRef,
  inject,
  Injector,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  AfterViewInit,
  AfterContentInit,
  OnDestroy,
  afterNextRender,
  viewChild,
  contentChildren,
  input,
  effect,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, UrlTree } from '@angular/router';
import { ILiquidSidebarItem, LiquidSidebarService } from './sidebar.service';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lg-sidebar-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <!-- MAIN ITEM BUTTON -->
    <a
      class="lg-sidebar-item"
      [class.is-nested]="isNested()"
      [routerLink]="subItems() ? null : link()"
      routerLinkActive="is-active"
      #rla="routerLinkActive"
      (click)="handleToggle($event)"
      [attr.aria-current]="rla.isActive ? 'page' : null"
      [attr.role]="subItems() ? 'button' : null"
      [attr.tabindex]="0"
    >
      <div class="lg-sidebar-item-icon">
        <ng-content select="[icon]"></ng-content>
      </div>
      
      <span class="lg-sidebar-item-label">
        <ng-content></ng-content>
      </span>

      @if (subItems()) {
        <!-- Expand Icon for Parents -->
        <i class="ri-arrow-right-s-line lg-sidebar-expand-icon" [class.is-expanded]="isExpanded()"></i>
      }

      @if (badge() && !service.isCollapsed()) {
        <!-- Optional Badge -->
        <div class="lg-sidebar-badge px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[0.625rem] font-bold">
          {{ badge() }}
        </div>
      }
    </a>

    @if (subItems()) {
      <!-- NESTED ITEMS CONTAINER (Pure CSS Animation) -->
      <div
        class="lg-sidebar-nested-container"
        [class.is-expanded]="isExpanded()"
        (transitionend)="onTransitionEnd($event)"
      >
        <div class="lg-sidebar-nested-wrapper">
          <ng-content select="lg-sidebar-item"></ng-content>
        </div>
      </div>
    }
  `,
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidSidebarItemComponent implements AfterViewInit, AfterContentInit, OnDestroy, ILiquidSidebarItem {
  public readonly elementRef = inject(ElementRef);
  public readonly service = inject(LiquidSidebarService);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly destroy$ = new Subject<void>();

  // Use Signal-based queries
  private readonly rla = viewChild('rla', { read: RouterLinkActive });
  private readonly nestedItems = contentChildren(LiquidSidebarItemComponent, { descendants: true });

  // Use Signal-based inputs
  public readonly link = input<string | any[]>('/');
  public readonly badge = input<string | number | undefined>();
  public readonly subItems = input(false);
  public readonly label = input('');

  public readonly isNested = signal(false);
  public readonly isExpanded = signal(false);

  constructor() {
    // Sync activity state whenever rla signal settles or changes
    effect(() => {
      const active = this.isActive;
      if (active) {
        this.service.setActiveItem(this);
      }
    });

    // Handle auto-expansion logic via signals
    effect(() => {
      if (this.subItems()) {
        this.syncExpandFromRouter();
      }
    });
  }

  ngAfterContentInit(): void {
    const host = this.elementRef.nativeElement;
    this.isNested.set(host.parentElement?.classList.contains('lg-sidebar-nested-container') || 
                   host.parentElement?.classList.contains('lg-sidebar-nested-wrapper'));
  }

  ngAfterViewInit() {
    if (this.subItems()) {
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
        )
        .subscribe(() => this.syncExpandFromRouter());
    }

    // Initial registration check
    afterNextRender(() => {
      if (this.isActive) {
        this.service.setActiveItem(this);
      }
    }, { injector: this.injector });
  }

  ngOnDestroy() {
    if (this.service.activeItem() === this) {
      this.service.setActiveItem(null);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleToggle(event: Event) {
    if (this.subItems()) {
      event.preventDefault();
      
      if (this.service.isCollapsed()) {
        this.service.toggle();
        this.isExpanded.set(true);
      } else {
        this.isExpanded.update((v) => !v);
      }
      
      // Notify layout tick immediately to start following the transition
      this.service.notifyIndicatorLayout();
    }
  }

  onTransitionEnd(event: TransitionEvent): void {
    // Only trigger layout update when the height/grid animation finishes
    if (event.propertyName === 'grid-template-rows' || event.propertyName === 'height') {
      this.service.notifyIndicatorLayout();
    }
  }

  get isActive(): boolean {
    return this.rla()?.isActive ?? false;
  }

  /**
   * Logic to determine if this item is hidden due to ANY ancestry being collapsed.
   */
  public isEffectivelyCollapsed(): boolean {
    let current = this.elementRef.nativeElement.parentElement as HTMLElement | null;
    
    while (current && !current.classList.contains('lg-sidebar-content')) {
      if (current.classList.contains('lg-sidebar-nested-container')) {
        // In the new CSS system, we check if it doesn't have the is-expanded class
        if (!current.classList.contains('is-expanded')) return true;
        
        const style = getComputedStyle(current);
        if (style.display === 'none' || style.visibility === 'hidden') return true;
      }
      current = current.parentElement;
    }
    return false;
  }

  private syncExpandFromRouter(): void {
    if (!this.subItems()) return;
    
    const list = this.nestedItems();
    if (!list.length) return;
    
    for (const item of list) {
      if (item.subItems()) continue;
      
      if (this.linkMatchesRouter(item.link())) {
        this.isExpanded.set(true);
        this.service.notifyIndicatorLayout();
        return;
      }
    }
  }

  private linkMatchesRouter(link: string | any[]): boolean {
    try {
      const tree: UrlTree = Array.isArray(link)
        ? this.router.createUrlTree(link)
        : this.router.parseUrl(typeof link === 'string' ? link : String(link));
      
      return this.router.isActive(tree, {
        paths: 'exact',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored',
      });
    } catch {
      return false;
    }
  }

  /**
   * Returns the DOM element that should represent the indicator anchor.
   * Climbs up to find the nearest visible parent if this item is hidden.
   */
  public getIndicatorAnchor(): HTMLElement | null {
    const host = this.elementRef.nativeElement;
    const selfAnchor = host.querySelector(':scope > a.lg-sidebar-item') as HTMLElement | null;
    
    if (this.service.isCollapsed() || this.isEffectivelyCollapsed()) {
      let parent = host.parentElement as HTMLElement | null;
      while (parent && !parent.classList.contains('lg-sidebar-content')) {
        if (parent.tagName.toLowerCase() === 'lg-sidebar-item') {
          return parent.querySelector(':scope > a.lg-sidebar-item') as HTMLElement | null;
        }
        parent = parent.parentElement;
      }
    }
    
    return selfAnchor;
  }
}
