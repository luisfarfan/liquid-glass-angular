import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'table[lg-table]',
  standalone: true,
})
export class LgTableDirective {
  @HostBinding('class.lg-table') protected readonly tableClass = true;
}

@Directive({
  selector: 'th[lg-header-cell]',
  standalone: true,
})
export class LgHeaderCellDirective {
  @HostBinding('class.lg-header-cell') protected readonly cellClass = true;
}

@Directive({
  selector: 'td[lg-cell]',
  standalone: true,
})
export class LgCellDirective {
  @HostBinding('class.lg-cell') protected readonly cellClass = true;
}

@Directive({
  selector: 'tr[lg-header-row]',
  standalone: true,
})
export class LgHeaderRowDirective {
  @HostBinding('class.lg-header-row') protected readonly rowClass = true;
}

@Directive({
  selector: 'tr[lg-row]',
  standalone: true,
})
export class LgRowDirective {
  @HostBinding('class.lg-row') protected readonly rowClass = true;
  
  @Input() 
  @HostBinding('class.lg-row-selected') 
  isSelected = false;

  @Input()
  @HostBinding('class.lg-row-loading')
  isLoading = false;
}
