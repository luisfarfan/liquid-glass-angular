import { Component, ViewEncapsulation, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import {
  GngThemeService,
  GngButton,
  GngInput,
  GngSidebar,
  GngSidebarItem,
  GngTooltipDirective,
  GngTopbar,
  GngDrawerService,
  GngShell,
  gngShellSidebarContentInset,
  GngToastService,
  GngBreadcrumbs,
  type GngTopbarUser,
} from 'glassng';
import { PlaygroundDrawerDemoComponent } from './components/playground-drawer-demo.component';
import { buildPlaygroundBreadcrumbs, readDeepestRouteData } from './playground-route-utils';

@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    GngButton,
    GngInput,
    GngSidebar,
    GngSidebarItem,
    GngTooltipDirective,
    GngTopbar,
    GngShell,
    GngBreadcrumbs,
  ],
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <gng-shell
      [contentInset]="shellContentInset()"
      [backdropVisible]="isMobileShell() && sidebar.isMobileOpen()"
      [backdropDismissLabel]="'Cerrar menú de navegación'"
      [mainRegionLabel]="'Contenido del playground'"
      (backdropDismiss)="sidebar.toggleMobile()"
    >
      <gng-sidebar #sidebar gngShellSidebar [(isCollapsed)]="isSidebarCollapsed">
        <div header class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <i class="ri-liquid-fill text-white text-xl"></i>
          </div>
          <span class="font-display font-bold text-lg tracking-tight" *ngIf="!isSidebarCollapsed()">Gng Glass</span>
        </div>

        <gng-sidebar-item link="/dashboard" label="Dashboard">
          <i icon class="ri-dashboard-line"></i> Dashboard
        </gng-sidebar-item>

        <!-- 1. Form Elements -->
        <gng-sidebar-item label="Form Elements" [subItems]="true">
          <i icon class="ri-edit-box-line"></i> Form Elements
          <gng-sidebar-item link="/demos/buttons" label="Buttons">
            <i icon class="ri-mouse-line"></i> Buttons
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/forms" label="Input Fields">
            <i icon class="ri-text-input"></i> Input Fields
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/selection" label="Toggle &amp; Checkbox">
            <i icon class="ri-toggle-line"></i> Toggle &amp; Checkbox
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/radio" label="Radio Buttons">
            <i icon class="ri-radio-button-line"></i> Radio Buttons
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/select" label="Select &amp; Tags">
            <i icon class="ri-list-check-2"></i> Select &amp; Tags
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/date-picker" label="DatePicker">
            <i icon class="ri-calendar-line"></i> DatePicker
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/search-input" label="Search Input">
            <i icon class="ri-search-line"></i> Search Input
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/file-upload" label="File Upload">
            <i icon class="ri-upload-2-line"></i> File Upload
          </gng-sidebar-item>
        </gng-sidebar-item>

        <!-- 2. Data & Charts -->
        <gng-sidebar-item label="Data &amp; Metrics" [subItems]="true" [badge]="4">
          <i icon class="ri-bar-chart-box-line"></i> Data &amp; Metrics
          <gng-sidebar-item link="/demos/charts" label="KPIs &amp; Analytics">
            <i icon class="ri-line-chart-line"></i> KPIs &amp; Analytics
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/timeline" label="Audit Timeline">
            <i icon class="ri-history-line"></i> Audit Timeline
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/data-table" label="Data Table">
            <i icon class="ri-table-line"></i> Data Table
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/pagination" label="Pagination">
            <i icon class="ri-pages-line"></i> Pagination
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/badges" label="Tags &amp; Badges">
            <i icon class="ri-notification-badge-line"></i> Tags &amp; Badges
          </gng-sidebar-item>
        </gng-sidebar-item>

        <!-- 3. Navigation & Layout -->
        <gng-sidebar-item label="Navigation" [subItems]="true">
          <i icon class="ri-navigation-line"></i> Navigation
          <gng-sidebar-item link="/demos/tabs" label="Tabs System">
            <i icon class="ri-menu-5-line"></i> Tabs System
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/breadcrumbs" label="Breadcrumbs">
            <i icon class="ri-git-branch-line"></i> Breadcrumbs
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/dropdown-menu" label="Dropdown Menu">
            <i icon class="ri-menu-4-line"></i> Dropdown Menu
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/avatar" label="User Avatar">
            <i icon class="ri-user-smile-line"></i> User Avatar
          </gng-sidebar-item>
        </gng-sidebar-item>

        <!-- 4. Feedback & Overlays -->
        <gng-sidebar-item label="Feedback &amp; Overlays" [subItems]="true">
          <i icon class="ri-feedback-line"></i> Overlays
          <gng-sidebar-item link="/demos/modals" label="Modals &amp; Dialogs">
            <i icon class="ri-window-line"></i> Modals &amp; Dialogs
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/alerts" label="Alerts &amp; Banners">
            <i icon class="ri-notification-3-line"></i> Alerts &amp; Banners
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/toasts" label="Notifications / Toasts">
            <i icon class="ri-chat-1-line"></i> Notifications
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/skeleton" label="Skeleton Loaders">
            <i icon class="ri-loader-2-line"></i> Skeleton Loaders
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/progress" label="Progress Indicators">
            <i icon class="ri-loader-4-line"></i> Progress Indicators
          </gng-sidebar-item>
        </gng-sidebar-item>

        <!-- 5. Core & A11y -->
        <gng-sidebar-item label="Core &amp; A11y" [subItems]="true">
          <i icon class="ri-settings-4-line"></i> Core &amp; A11y
          <gng-sidebar-item link="/demos/a11y" label="A11y &amp; States">
            <i icon class="ri-shield-user-line"></i> A11y &amp; States
          </gng-sidebar-item>
          <gng-sidebar-item link="/demos/scrollbar" label="Glass Scrollbar">
            <i icon class="ri-scroll-to-bottom-line"></i> Glass Scrollbar
          </gng-sidebar-item>
        </gng-sidebar-item>

        <div footer class="space-y-4">
          <button
            gng-button
            variant="ghost"
            size="sm"
            class="w-full"
            [gngTooltip]="'Toggle Sidebar Position'"
            (click)="isSidebarCollapsed.set(!isSidebarCollapsed())"
          >
            <i icon class="ri-side-bar-line"></i>
            <span *ngIf="!isSidebarCollapsed()">Collapse</span>
          </button>
        </div>
      </gng-sidebar>

      <div class="flex flex-1 flex-col min-w-0 min-h-0 h-screen overflow-hidden">
        <gng-topbar
          class="shrink-0"
          [title]="pageTitle()"
          [user]="topbarUser()"
          (sidebarToggle)="sidebar.toggleMobile()"
          (searchToggle)="onTopbarSearch()"
        >
          <span lgTopbarStart class="text-[10px] uppercase tracking-widest text-[var(--gng-t-text-muted)] hidden md:inline">Shell</span>
          <div lgTopbarSearch class="w-full min-w-0 flex items-center">
            <gng-input placeholder="Buscar en el demo…" class="w-full !min-w-0" />
          </div>
          <div lgTopbarActions class="flex items-center gap-2 shrink-0">
            <div class="hidden lg:flex flex-col items-end mr-2">
              <span class="text-[10px] uppercase tracking-tighter text-[var(--gng-t-text-muted)]">Tema Actual</span>
              <span class="text-xs font-bold text-primary">{{ themeService.currentThemeDefinition().displayName }}</span>
            </div>
            <button gng-button variant="ghost" size="sm" type="button" (click)="themeService.toggleTheme()" [title]="'Cambiar tema (Actual: ' + themeService.currentThemeDefinition().displayName + ')'">
              <i class="ri-palette-line"></i>
            </button>
            <button gng-button variant="secondary" size="sm" type="button" (click)="openPlaygroundDrawer()">Drawer</button>
          </div>
        </gng-topbar>

        <main class="flex-1 min-h-0 overflow-y-auto p-8 relative">
          <div class="max-w-6xl mx-auto space-y-6">
            <gng-breadcrumbs
              class="block min-w-0"
              [items]="breadcrumbItems()"
              ariaLabel="Ubicación en el playground"
            />
            <router-outlet />
          </div>
        </main>
      </div>
    </gng-shell>
  `,
  styleUrl: './app.css',
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly toastService = inject(GngToastService);
  private readonly drawerService = inject(GngDrawerService);

  readonly isSidebarCollapsed = signal(false);
  readonly isMobileShell = signal(false);

  readonly shellContentInset = computed(() =>
    gngShellSidebarContentInset({
      isMobileViewport: this.isMobileShell(),
      isSidebarCollapsed: this.isSidebarCollapsed(),
    }),
  );

  readonly themeService = inject(GngThemeService);

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

  private readonly routerUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly breadcrumbItems = computed(() =>
    buildPlaygroundBreadcrumbs(this.routerUrl(), this.pageTitle()),
  );

  readonly topbarUser = signal<GngTopbarUser>({
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
