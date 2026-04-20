import { Directive } from '@angular/core';

/**
 * GngScrollDirective
 * Premium glass-morphism scrollbar utility for sleek, high-fidelity administrative interfaces.
 */
@Directive({
  selector: '[gngScroll]',
  standalone: true,
  host: {
    class: 'gng-scroll',
  },
})
export class GngScrollDirective {}
