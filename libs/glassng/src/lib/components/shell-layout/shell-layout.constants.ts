/**
 * Inset horizontal del contenido principal cuando el sidebar está fijo en modo escritorio.
 * Debe coincidir con `--gng-sidebar-width-*` en [sidebar.css](../sidebar/sidebar.css).
 */
export const GNG_SHELL_SIDEBAR_EXPANDED_INSET = '17.5rem';
export const GNG_SHELL_SIDEBAR_COLLAPSED_INSET = '5rem';

/** Inset del área principal alineado con sidebar colapsado / móvil */
export function gngShellSidebarContentInset(options: {
  isMobileViewport: boolean;
  isSidebarCollapsed: boolean;
}): string {
  if (options.isMobileViewport) {
    return '0';
  }
  return options.isSidebarCollapsed
    ? GNG_SHELL_SIDEBAR_COLLAPSED_INSET
    : GNG_SHELL_SIDEBAR_EXPANDED_INSET;
}
