/**
 * Inset horizontal del contenido principal cuando el sidebar está fijo en modo escritorio.
 * Debe coincidir con `--lg-sidebar-width-*` en [sidebar.css](../sidebar/sidebar.css).
 */
export const LG_SHELL_SIDEBAR_EXPANDED_INSET = '17.5rem';
export const LG_SHELL_SIDEBAR_COLLAPSED_INSET = '5rem';

/** Inset del área principal alineado con sidebar colapsado / móvil (patrón MatSidenav `side`). */
export function lgShellSidebarContentInset(options: {
  isMobileViewport: boolean;
  isSidebarCollapsed: boolean;
}): string {
  if (options.isMobileViewport) {
    return '0';
  }
  return options.isSidebarCollapsed
    ? LG_SHELL_SIDEBAR_COLLAPSED_INSET
    : LG_SHELL_SIDEBAR_EXPANDED_INSET;
}
