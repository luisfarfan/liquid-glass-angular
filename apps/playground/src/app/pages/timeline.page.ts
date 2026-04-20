import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LgTimelineComponent, 
  LgTimelineItemComponent, 
  TagComponent, 
  LgBadgeComponent,
  ButtonComponent,
  AvatarComponent
} from 'glassng';

@Component({
  selector: 'pg-timeline-page',
  standalone: true,
  imports: [
    CommonModule, 
    LgTimelineComponent, 
    LgTimelineItemComponent, 
    TagComponent, 
    LgBadgeComponent,
    ButtonComponent,
    AvatarComponent
  ],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <div class="mb-12">
        <h1 class="text-4xl font-display font-bold text-[var(--lg-t-text-main)] mb-2">Order Timeline</h1>
        <p class="text-[var(--lg-t-text-muted)]">Track order lifecycle and administrative activity with cinematic glass threads.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Example 1: E-commerce Order Flow -->
        <section>
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-xl font-bold text-[var(--lg-t-text-main)]">Order Tracking #ORD-8829</h2>
            <lg-tag variant="success">Delivered</lg-tag>
          </div>

          <lg-timeline>
            <lg-timeline-item 
              title="Delivered to Customer" 
              timestamp="Today, 2:45 PM" 
              type="success"
              description="Package signed by John Doe at front desk."
            >
              <div class="mt-3 p-3 rounded-lg bg-[var(--lg-t-glass-bg)] border border-[var(--lg-t-glass-border)] text-xs">
                <div class="flex items-center gap-2 mb-2">
                   <i class="ri-map-pin-2-line text-primary"></i>
                   <span class="text-[var(--lg-t-text-main)]/80">Miami Distribution Center, FL</span>
                </div>
                <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad55?w=400&auto=format&fit=crop&q=60" 
                     alt="Package Proof" 
                     class="w-full h-24 object-cover rounded border border-[var(--lg-t-glass-border)]" />
              </div>
            </lg-timeline-item>

            <lg-timeline-item 
              title="Out for Delivery" 
              timestamp="Today, 8:15 AM" 
              type="info"
              description="The package is in the final delivery vehicle."
            />

            <lg-timeline-item 
              title="Arrival at Local Facility" 
              timestamp="Yesterday, 11:30 PM" 
              type="info"
            />

            <lg-timeline-item 
              title="Payment Processed" 
              timestamp="Oct 14, 09:12 AM" 
              type="success"
              description="Visa ending in *4421 approved."
            >
              <div class="flex gap-2">
                <lg-tag variant="neutral" size="sm">Auth: #88219</lg-tag>
                <lg-tag variant="neutral" size="sm">TxID: 2c-4v1s</lg-tag>
              </div>
            </lg-timeline-item>

            <lg-timeline-item 
              title="Order Received" 
              timestamp="Oct 14, 09:10 AM" 
              type="info"
              icon="ri-shopping-cart-2-line"
            />
          </lg-timeline>
        </section>

        <!-- Example 2: Administrative Audit -->
        <section>
          <h2 class="text-xl font-bold text-[var(--lg-t-text-main)] mb-6">Security & Audit Log</h2>

          <lg-timeline>
            <lg-timeline-item 
              title="Critical: Stock Alert" 
              timestamp="15m ago" 
              type="error"
              description="iPhone 15 Pro - Space Gray is below 5 units."
            >
              <button lg-button variant="outlined" size="sm" class="mt-2">Refill Stock</button>
            </lg-timeline-item>

            <lg-timeline-item 
              title="Permission Changed" 
              timestamp="2h ago" 
              type="warning"
              description="Sarah Smith promoted to Store Manager."
            >
              <div class="flex items-center gap-2 mt-2">
                <lg-avatar src="https://i.pravatar.cc/150?u=sarah" size="sm" />
                <span class="text-xs text-[var(--lg-t-text-muted)]">Updated by Admin</span>
              </div>
            </lg-timeline-item>

            <lg-timeline-item 
              title="Backup Completed" 
              timestamp="03:00 AM" 
              type="success"
              description="Daily cloud synchronization successful."
            />

            <lg-timeline-item 
              title="System Maintenance" 
              timestamp="Yesterday" 
              type="info"
              description="Cache cleared and database indices rebuilt."
            />
          </lg-timeline>
        </section>
      </div>
    </div>
  `
})
export class TimelinePage {}
