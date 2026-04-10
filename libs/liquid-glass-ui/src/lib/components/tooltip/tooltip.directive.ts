import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  TemplateRef,
  inject,
  ViewContainerRef,
  signal,
  effect,
} from '@angular/core';
import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LiquidTooltipComponent } from './tooltip.component';

export type TooltipPosition = 'above' | 'below' | 'left' | 'right';

@Directive({
  selector: '[lgGlassTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
    '(touchstart)': 'onTouchStart()',
  },
})
export class LiquidTooltipDirective implements OnDestroy {
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollStrategy = inject(ScrollStrategyOptions);

  @Input('lgGlassTooltip') content: string | TemplateRef<any> = '';
  @Input('lgTooltipVariant') variant: 'default' | 'primary' | 'accent' = 'default';
  @Input('lgTooltipPosition') position: TooltipPosition = 'above';
  @Input('lgTooltipShowDelay') showDelay = 200;

  private overlayRef: OverlayRef | null = null;
  private timer: any;

  ngOnDestroy() {
    this.hide();
  }

  protected onTouchStart() {
    // Mobile Haptic Support (SDD-12 2.C)
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
    this.show();
  }

  protected show() {
    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.createOverlay();
    }, this.showDelay);
  }

  protected hide() {
    if (this.timer) clearTimeout(this.timer);
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private createOverlay() {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions())
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.scrollStrategy.reposition(),
      panelClass: 'lg-tooltip-container',
    });

    const portal = new ComponentPortal(LiquidTooltipComponent, this.viewContainerRef);
    const componentRef = this.overlayRef.attach(portal);

    componentRef.instance.content = this.content;
    componentRef.instance.variant = this.variant;
  }

  private getPositions() {
    const offsets = {
      above: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
      below: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
      left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
      right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
    } as const;

    const main = offsets[this.position];
    
    // Fallbacks
    return [
      main,
      offsets.above,
      offsets.below,
      offsets.right,
      offsets.left,
    ];
  }
}
