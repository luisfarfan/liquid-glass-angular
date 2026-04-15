import { Directive, ElementRef, HostListener, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[lgRipple]',
  standalone: true
})
export class RippleDirective {
  private readonly _el = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  /** Si el ripple está habilitado */
  enabled = input<boolean>(true);

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    if (!this.enabled()) return;

    const target = this._el.nativeElement;
    
    // Ignorar si está deshabilitado
    if (target.hasAttribute('disabled') || target.classList.contains('pointer-events-none')) {
      return;
    }

    const rect = target.getBoundingClientRect();

    // Crear el contenedor de ripple si no existe
    let container = target.querySelector('.lg-ripple-container');
    if (!container) {
      container = this._renderer.createElement('div');
      this._renderer.addClass(container, 'lg-ripple-container');
      this._renderer.appendChild(target, container);
    }

    const maxDim = Math.max(rect.width, rect.height);
    /** Icon-only, pagination numbers, dense sm: avoid large scale + clip reading as a broken ring */
    const isCompact = maxDim <= 52;

    const size = isCompact ? maxDim * 0.92 : maxDim;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = this._renderer.createElement('span');
    this._renderer.addClass(ripple, 'lg-glass-ripple');
    if (isCompact) {
      this._renderer.addClass(ripple, 'lg-glass-ripple--compact');
    }

    this._renderer.setStyle(ripple, 'width', `${size}px`);
    this._renderer.setStyle(ripple, 'height', `${size}px`);
    this._renderer.setStyle(ripple, 'left', `${x}px`);
    this._renderer.setStyle(ripple, 'top', `${y}px`);

    this._renderer.appendChild(container, ripple);

    // Limpiar el DOM después de la animación
    setTimeout(() => {
      this._renderer.removeChild(container, ripple);
    }, 600);
  }
}
