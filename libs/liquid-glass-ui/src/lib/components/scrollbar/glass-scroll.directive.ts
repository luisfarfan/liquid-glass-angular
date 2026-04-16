import { Directive } from '@angular/core';

/**
 * Adds the `lg-glass-scroll` utility class (spec 21). Use on scrollable hosts;
 * combine with `class="max-h-…"` or inline `style` for height as needed.
 */
@Directive({
  selector: '[lgGlassScroll]',
  standalone: true,
  host: {
    class: 'lg-glass-scroll',
  },
})
export class LgGlassScrollDirective {}
