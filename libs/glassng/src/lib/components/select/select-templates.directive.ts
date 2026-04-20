import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Select Trigger Directive
 * Customizes the display of the selected value in the input trigger.
 */
@Directive({
  selector: '[gngSelectTrigger]',
  standalone: true
})
export class GngSelectTrigger {
  public template = inject(TemplateRef);
}

/**
 * Select Header Directive
 * Adds custom content (actions, search, titles) at the top of the overlay panel.
 */
@Directive({
  selector: '[gngSelectHeader]',
  standalone: true
})
export class GngSelectHeader {
  public template = inject(TemplateRef);
}

/**
 * Select Footer Directive
 * Adds custom content (confirm buttons, counters, actions) at the bottom of the overlay panel.
 */
@Directive({
  selector: '[gngSelectFooter]',
  standalone: true
})
export class GngSelectFooter {
  public template = inject(TemplateRef);
}
