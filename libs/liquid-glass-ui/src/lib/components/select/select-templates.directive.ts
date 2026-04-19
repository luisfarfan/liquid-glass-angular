import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Select Trigger Directive
 * Customizes the display of the selected value in the input trigger.
 */
@Directive({
  selector: '[lgSelectTrigger]',
  standalone: true
})
export class SelectTriggerDirective {
  public template = inject(TemplateRef);
}

/**
 * Select Header Directive
 * Adds custom content (actions, search, titles) at the top of the overlay panel.
 */
@Directive({
  selector: '[lgSelectHeader]',
  standalone: true
})
export class SelectHeaderDirective {
  public template = inject(TemplateRef);
}

/**
 * Select Footer Directive
 * Adds custom content (confirm buttons, counters, actions) at the bottom of the overlay panel.
 */
@Directive({
  selector: '[lgSelectFooter]',
  standalone: true
})
export class SelectFooterDirective {
  public template = inject(TemplateRef);
}
