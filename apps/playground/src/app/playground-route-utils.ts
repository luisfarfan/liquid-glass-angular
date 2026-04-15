import { ActivatedRouteSnapshot } from '@angular/router';

export function readDeepestRouteData(snapshot: ActivatedRouteSnapshot): Record<string, unknown> {
  let r = snapshot;
  while (r.firstChild) {
    r = r.firstChild;
  }
  return r.data as Record<string, unknown>;
}
