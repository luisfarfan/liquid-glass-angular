import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  computed 
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TimelineItemType = 'info' | 'success' | 'warning' | 'error';

/**
 * LgTimelineItemComponent
 * Individual event in the timeline thread.
 */
@Component({
  selector: 'lg-timeline-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="lg-timeline-item" 
      [class]="'type-' + type()"
      role="listitem"
    >
      <div class="lg-timeline-marker">
         <div class="lg-timeline-node" aria-hidden="true">
            <i [class]="resolvedIcon()"></i>
         </div>
         <div class="lg-timeline-line"></div>
      </div>
      
      <div class="lg-timeline-content">
         <div class="lg-timeline-header">
            <span class="lg-timeline-title" [id]="titleId">{{ title() }}</span>
            <span class="lg-timeline-time">{{ timestamp() }}</span>
         </div>
         @if (description()) {
           <p class="lg-timeline-description" [id]="descriptionId">{{ description() }}</p>
         }
         <div class="lg-timeline-extra">
            <ng-content></ng-content>
         </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgTimelineItemComponent {
  /** Title of the event */
  title = input.required<string>();
  
  /** Secondary description */
  description = input<string | null>(null);
  
  /** Timestamp or date string */
  timestamp = input.required<string>();
  
  /** Semantic type (determines node color and default icon) */
  type = input<TimelineItemType>('info');
  
  /** Optional icon override */
  icon = input<string | null>(null);

  protected readonly titleId = `lg-tl-t-${Math.random().toString(36).substring(2, 9)}`;
  protected readonly descriptionId = `lg-tl-d-${Math.random().toString(36).substring(2, 9)}`;

  resolvedIcon = computed(() => {
    if (this.icon()) return this.icon()!;
    switch (this.type()) {
      case 'success': return 'ri-checkbox-circle-line';
      case 'warning': return 'ri-error-warning-line';
      case 'error': return 'ri-close-circle-line';
      default: return 'ri-information-line';
    }
  });
}

/**
 * LgTimelineComponent
 * Container for activity events.
 */
@Component({
  selector: 'lg-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-timeline-container" role="list">
       <ng-content></ng-content>
    </div>
  `,
  styleUrl: './timeline.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgTimelineComponent {}
