import { Component, ViewEncapsulation, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import {
  ThemeService,
  ButtonComponent,
  InputComponent,
  LiquidSidebarComponent,
  LiquidSidebarItemComponent,
  LiquidTooltipDirective,
  TopbarComponent,
  LiquidDrawerService,
  ShellLayoutComponent,
  lgShellSidebarContentInset,
  LiquidToastService,
  type LgTopbarUser,
} from '@liquid-glass-ui/angular';
import { PlaygroundDrawerDemoComponent } from './components/playground-drawer-demo.component';
import { readDeepestRouteData } from './playground-route-utils';

@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    LiquidSidebarComponent,
    LiquidSidebarItemComponent,
    LiquidTooltipDirective,
    TopbarComponent,
    ShellLayoutComponent,
  ],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <lg-shell-layout
      [contentInset]="shellContentInset()"
      [backdropVisible]="isMobileShell() && sidebar.isMobileOpen()"
      [backdropDismissLabel]="'Cerrar menú de navegación'"
      [mainRegionLabel]="'Contenido del playground'"
      (backdropDismiss)="sidebar.toggleMobile()"
    >
      <lg-sidebar #sidebar lgShellSidebar [(isCollapsed)]="isSidebarCollapsed">
        <div header class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <i class="ri-liquid-fill text-white text-xl"></i>
          </div>
          <span class="font-display font-bold text-lg tracking-tight" *ngIf="!isSidebarCollapsed()">Liquid Glass</span>
        </div>

        <lg-sidebar-item link="/dashboard" label="Dashboard">
          <i icon class="ri-dashboard-line"></i> Dashboard
        </lg-sidebar-item>

        <lg-sidebar-item label="Components" [subItems]="true" [badge]="13">
          <i icon class="ri-stack-line"></i> Components

          <lg-sidebar-item link="/demos/buttons" label="Buttons">
            <i icon class="ri-mouse-line"></i> Buttons
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/progress" label="Progress">
            <i icon class="ri-loader-4-line"></i> Progress
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/selection" label="Toggle &amp; Checkbox">
            <i icon class="ri-toggle-line"></i> Toggle &amp; Checkbox
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/forms" label="Forms">
            <i icon class="ri-edit-box-line"></i> Forms
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/a11y" label="A11y &amp; states">
            <i icon class="ri-shield-user-line"></i> A11y &amp; states
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/badges" label="Badges">
            <i icon class="ri-notification-badge-line"></i> Badges
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/modals" label="Modals">
            <i icon class="ri-window-line"></i> Modals
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/toasts" label="Toasts">
            <i icon class="ri-notification-3-line"></i> Toasts
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/skeleton" label="Skeleton">
            <i icon class="ri-loader-2-line"></i> Skeleton
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/tabs" label="Tabs">
            <i icon class="ri-menu-5-line"></i> Tabs
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/data-table" label="Data table">
            <i icon class="ri-table-line"></i> Data table
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/pagination" label="Pagination">
            <i icon class="ri-pages-line"></i> Pagination
          </lg-sidebar-item>
          <lg-sidebar-item link="/demos/radio" label="Radio">
            <i icon class="ri-radio-button-line"></i> Radio
          </lg-sidebar-item>
        </lg-sidebar-item>

        <div footer class="space-y-4">
          <button
            lg-button
            variant="ghost"
            size="sm"
            class="w-full"
            [lgGlassTooltip]="'Toggle Sidebar Position'"
            (click)="isSidebarCollapsed.set(!isSidebarCollapsed())"
          >
            <i icon class="ri-side-bar-line"></i>
            <span *ngIf="!isSidebarCollapsed()">Collapse</span>
          </button>
        </div>
      </lg-sidebar>

      <div class="flex flex-1 flex-col min-w-0 min-h-0 h-screen overflow-hidden">
        <lg-topbar
          class="shrink-0"
          [title]="pageTitle()"
          [user]="topbarUser()"
          (sidebarToggle)="sidebar.toggleMobile()"
          (searchToggle)="onTopbarSearch()"
        >
          <span lgTopbarStart class="text-[10px] uppercase tracking-widest text-[var(--lg-t-text-muted)] hidden md:inline">Shell</span>
          <div lgTopbarSearch class="w-full min-w-0 flex items-center">
            <lg-input placeholder="Buscar en el demo…" class="w-full !min-w-0" />
          </div>
          <div lgTopbarActions class="flex items-center gap-2 shrink-0">
            <button lg-button variant="ghost" size="sm" type="button" (click)="themeService.toggleTheme()" title="Cambiar tema">
              <i class="ri-palette-line"></i>
            </button>
            <button lg-button variant="secondary" size="sm" type="button" (click)="openPlaygroundDrawer()">Drawer</button>
          </div>
        </lg-topbar>

        <main class="flex-1 min-h-0 overflow-y-auto p-8 relative">
          <div class="max-w-6xl mx-auto">
            <router-outlet />
          </div>
        </main>
      </div>
    </lg-shell-layout>
  `,
  styleUrl: './app.css',
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly toastService = inject(LiquidToastService);
  private readonly drawerService = inject(LiquidDrawerService);

  readonly isSidebarCollapsed = signal(false);
  readonly isMobileShell = signal(false);

  readonly shellContentInset = computed(() =>
    lgShellSidebarContentInset({
      isMobileViewport: this.isMobileShell(),
      isSidebarCollapsed: this.isSidebarCollapsed(),
    }),
  );

  readonly themeService = inject(ThemeService);

  readonly pageTitle = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null),
      map(() => {
        const data = readDeepestRouteData(this.router.routerState.snapshot.root);
        const t = data['title'];
        return typeof t === 'string' && t.length > 0 ? t : 'Playground';
      }),
    ),
    {
      initialValue: (() => {
        const data = readDeepestRouteData(this.router.routerState.snapshot.root);
        const t = data['title'];
        return typeof t === 'string' && t.length > 0 ? t : 'Playground';
      })(),
    },
  );

  readonly topbarUser = signal<LgTopbarUser>({
    name: 'Alex Rivera',
    avatarUrl: null,
  });

  constructor() {
    const mq = matchMedia('(max-width: 767px)');
    const syncShell = () => this.isMobileShell.set(mq.matches);
    syncShell();
    mq.addEventListener('change', syncShell);
    this.destroyRef.onDestroy(() => mq.removeEventListener('change', syncShell));
  }

  onTopbarSearch(): void {
    this.toastService.info('Conecta aquí tu overlay o modal de búsqueda global.', 'Búsqueda');
  }

  openPlaygroundDrawer(): void {
    this.drawerService.open(PlaygroundDrawerDemoComponent, {
      width: 'min(100vw, 440px)',
      position: 'right',
    });
  }
}
