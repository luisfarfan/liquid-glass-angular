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
 * GngTimelineItem
 * Individual event in the timeline thread.
 */
@Component({
  selector: 'gng-timeline-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="gng-timeline-item" 
      [class]="'type-' + type()"
      role="listitem"
    >
      <div class="gng-timeline-marker">
         <div class="gng-timeline-node" aria-hidden="true">
            <i [class]="resolvedIcon()"></i>
         </div>
         <div class="gng-timeline-line"></div>
      </div>
      
      <div class="gng-timeline-content">
         <div class="gng-timeline-header">
            <span class="gng-timeline-title" [id]="titleId">{{ title() }}</span>
            <span class="gng-timeline-time">{{ timestamp() }}</span>
         </div>
         @if (description()) {
           <p class="gng-timeline-description" [id]="descriptionId">{{ description() }}</p>
         }
         <div class="gng-timeline-extra">
            <ng-content></ng-content>
         </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngTimelineItem {
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

  protected readonly titleId = `gng-tl-t-${Math.random().toString(36).substring(2, 9)}`;
  protected readonly descriptionId = `gng-tl-d-${Math.random().toString(36).substring(2, 9)}`;

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
 * GngTimeline
 * Container for activity events with premium glassmorphism thread effects.
 */
@Component({
  selector: 'gng-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gng-timeline-container" role="list">
       <ng-content></ng-content>
    </div>
  `,
  styleUrl: './timeline.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GngTimeline {}
