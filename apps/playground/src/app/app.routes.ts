import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.page').then((m) => m.DashboardPage),
    data: { title: 'Dashboard' },
  },
  {
    path: 'demos/buttons',
    loadComponent: () => import('./pages/buttons.page').then((m) => m.ButtonsPage),
    data: { title: 'Buttons' },
  },
  {
    path: 'demos/progress',
    loadComponent: () => import('./pages/progress.page').then((m) => m.ProgressPage),
    data: { title: 'Progress' },
  },
  {
    path: 'demos/selection',
    loadComponent: () => import('./pages/selection.page').then((m) => m.SelectionPage),
    data: { title: 'Toggle & Checkbox' },
  },
  {
    path: 'demos/forms',
    loadComponent: () => import('./pages/forms.page').then((m) => m.FormsPage),
    data: { title: 'Forms' },
  },
  {
    path: 'demos/a11y',
    loadComponent: () => import('./pages/a11y.page').then((m) => m.A11yPage),
    data: { title: 'A11y & states' },
  },
  {
    path: 'demos/badges',
    loadComponent: () => import('./pages/badges.page').then((m) => m.BadgesPage),
    data: { title: 'Badges' },
  },
  {
    path: 'demos/modals',
    loadComponent: () => import('./pages/modals.page').then((m) => m.ModalsPage),
    data: { title: 'Modals' },
  },
  {
    path: 'demos/alerts',
    loadComponent: () => import('./pages/alert.page').then((m) => m.AlertPage),
    data: { title: 'Alerts' },
  },
  {
    path: 'demos/toasts',
    loadComponent: () => import('./pages/toasts.page').then((m) => m.ToastsPage),
    data: { title: 'Toasts' },
  },
  {
    path: 'demos/skeleton',
    loadComponent: () => import('./pages/skeleton.page').then((m) => m.SkeletonPage),
    data: { title: 'Skeleton' },
  },
  {
    path: 'demos/tabs',
    loadComponent: () => import('./pages/tabs.page').then((m) => m.TabsPage),
    data: { title: 'Tabs' },
  },
  {
    path: 'demos/data-table',
    loadComponent: () => import('./pages/data-table.page').then((m) => m.DataTablePage),
    data: { title: 'Data table' },
  },
  {
    path: 'demos/pagination',
    loadComponent: () => import('./pages/pagination.page').then((m) => m.PaginationPage),
    data: { title: 'Pagination' },
  },
  {
    path: 'demos/scrollbar',
    loadComponent: () => import('./pages/scrollbar.page').then((m) => m.ScrollbarPage),
    data: { title: 'Scrollbar' },
  },
  {
    path: 'demos/breadcrumbs',
    loadComponent: () => import('./pages/breadcrumbs.page').then((m) => m.BreadcrumbsPage),
    data: { title: 'Breadcrumbs' },
  },
  {
    path: 'demos/avatar',
    loadComponent: () => import('./pages/avatar.page').then((m) => m.AvatarPage),
    data: { title: 'Avatar' },
  },
  {
    path: 'demos/search-input',
    loadComponent: () => import('./pages/search-input.page').then((m) => m.SearchInputPage),
    data: { title: 'Search input' },
  },
  {
    path: 'demos/dropdown-menu',
    loadComponent: () => import('./pages/dropdown-menu.page').then((m) => m.DropdownMenuPage),
    data: { title: 'Dropdown menu' },
  },
  {
    path: 'demos/radio',
    loadComponent: () => import('./pages/radio.page').then((m) => m.RadioPage),
    data: { title: 'Radio' },
  },
  {
    path: 'demos/select',
    loadComponent: () => import('./pages/select.page').then((m) => m.SelectPage),
    data: { title: 'Select & Tag Input' },
  },
  {
    path: 'demos/date-picker',
    loadComponent: () => import('./pages/date-picker.page').then((m) => m.DatePickerPage),
    data: { title: 'DatePicker' },
  },
  {
    path: 'demos/charts',
    loadComponent: () => import('./demos/charts-demo.component').then((m) => m.ChartsDemoComponent),
    data: { title: 'Charts & Metrics' },
  },
  { path: '**', redirectTo: 'dashboard' },

];
