import { ActivatedRouteSnapshot } from '@angular/router';
import type { LgBreadcrumbItem } from '@liquid-glass-ui/angular';

export function readDeepestRouteData(snapshot: ActivatedRouteSnapshot): Record<string, unknown> {
  let r = snapshot;
  while (r.firstChild) {
    r = r.firstChild;
  }
  return r.data as Record<string, unknown>;
}

/** Migas globales del shell: Inicio → (Componentes) → título de ruta. */
export function buildPlaygroundBreadcrumbs(url: string, pageTitle: string): LgBreadcrumbItem[] {
  const path = url.split('?')[0];
  const title = pageTitle.trim().length > 0 ? pageTitle : 'Playground';

  if (path === '' || path === '/' || path === '/dashboard') {
    return [{ label: title }];
  }

  if (path.startsWith('/demos/')) {
    return [
      { label: 'Inicio', link: '/dashboard', icon: 'ri-home-4-line' },
      { label: 'Componentes' },
      { label: title },
    ];
  }

  return [
    { label: 'Inicio', link: '/dashboard', icon: 'ri-home-4-line' },
    { label: title },
  ];
}
