import { 
  Component, 
  input, 
  TemplateRef, 
  viewChild, 
  ContentChild,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GngTab 
 * Atomic content container for a tabbed interface.
 */
@Component({
  selector: 'gng-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GngTab {
  /** unique ID for the tab */
  id = input<string | number>(Math.random().toString(36).substring(2, 9));
  
  /** The visible label of the tab */
  label = input<string>('');

  /** Optional icon to show next to the label */
  icon = input<string | undefined>(undefined);

  /** Whether the tab is disabled */
  disabled = input<boolean>(false);

  /** Reference to the content template */
  contentTemplate = viewChild<TemplateRef<any>>('contentTemplate');

  /** Optional custom template for the header */
  @ContentChild('headerTemplate') headerTemplate?: TemplateRef<any>;

  // Implementation of FocusableOption for CDK ListKeyManager
  focus(): void {
    // This will be handled by the parent tabs component trigger buttons
  }
}
