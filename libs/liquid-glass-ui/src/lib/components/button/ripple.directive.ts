import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[lgRipple]',
  standalone: true
})
export class RippleDirective {
  private readonly _el = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
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

    // Calcular dimensiones
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Crear el ripple
    const ripple = this._renderer.createElement('span');
    this._renderer.addClass(ripple, 'lg-glass-ripple');
    
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
