/**
 * Glass Breadcrumbs — SDD 23.
 */
export interface LgBreadcrumbItem {
  label: string;
  /** Ruta interna (`RouterLink`). Si falta en un segmento que no es el último, se muestra texto sin enlace. */
  link?: string | readonly unknown[];
  /** Clases de icono (p. ej. Remix `ri-home-line`); decorativo, con `aria-hidden` en plantilla. */
  icon?: string;
}
