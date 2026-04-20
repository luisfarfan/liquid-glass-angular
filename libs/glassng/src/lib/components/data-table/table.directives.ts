import { Directive, HostBinding, Input } from '@angular/core';

/**
 * GngTableDirective
 * Structural styling for standard HTML tables with premium glass-morphism borders.
 */
@Directive({
  selector: 'table[gng-table]',
  standalone: true,
})
export class GngTableDirective {
  @HostBinding('class.gng-table') protected readonly tableClass = true;
}

/**
 * GngHeaderCellDirective
 * Styling for table header cells with semantic typography and alignment.
 */
@Directive({
  selector: 'th[gng-header-cell]',
  standalone: true,
})
export class GngHeaderCellDirective {
  @HostBinding('class.gng-header-cell') protected readonly cellClass = true;
}

/**
 * GngCellDirective
 * Styling for table body cells with consistent padding and glass effects.
 */
@Directive({
  selector: 'td[gng-cell]',
  standalone: true,
})
export class GngCellDirective {
  @HostBinding('class.gng-cell') protected readonly cellClass = true;
}

/**
 * GngHeaderRowDirective
 * Styling for table header rows with glass-morphism backgrounds.
 */
@Directive({
  selector: 'tr[gng-header-row]',
  standalone: true,
})
export class GngHeaderRowDirective {
  @HostBinding('class.gng-header-row') protected readonly rowClass = true;
}

/**
 * GngRowDirective
 * Styling for table rows with interactive hover states and selection support.
 */
@Directive({
  selector: 'tr[gng-row]',
  standalone: true,
})
export class GngRowDirective {
  @HostBinding('class.gng-row') protected readonly rowClass = true;
  
  @Input() 
  @HostBinding('class.gng-row-selected') 
  isSelected = false;

  @Input()
  @HostBinding('class.gng-row-loading')
  isLoading = false;
}
