import { Component, ChangeDetectionStrategy, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GngSelectGroup 
 * Organizes options into categorized sections with a glass-morphic header.
 */
@Component({
  selector: 'gng-option-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="gng-option-group" 
      role="group" 
      [attr.aria-labelledby]="groupId"
      [class.is-disabled]="disabled()"
    >
      <div [id]="groupId" class="gng-option-group-label">{{ label() }}</div>
      <div class="gng-option-group-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './select.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngSelectGroup {
  /** The title of the group */
  label = input.required<string>();
  
  /** Whether the entire group is disabled */
  disabled = input<boolean>(false);

  /** A11y identifier for the group label */
  readonly groupId = `gng-opt-group-${Math.random().toString(36).substring(2, 9)}`;
}
