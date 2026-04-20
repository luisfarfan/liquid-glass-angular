import { Directive, ElementRef, HostListener, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[gngRipple]',
  standalone: true
})
export class GngRipple {
  private readonly _el = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  /** Si el ripple está habilitado */
  enabled = input<boolean>(true);

  /** Color opcional para el ripple. Si no se provee, usa currentColor. */
  color = input<string | null>(null);

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
    let container = target.querySelector('.gng-ripple-container');
    if (!container) {
      container = this._renderer.createElement('div');
      this._renderer.addClass(container, 'gng-ripple-container');
      this._renderer.appendChild(target, container);
    }

    // Coordenadas relativas al elemento
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Calcular la distancia a la esquina más lejana para asegurar cobertura total
    const cornerDistances = [
      { x: 0, y: 0 },
      { x: rect.width, y: 0 },
      { x: 0, y: rect.height },
      { x: rect.width, y: rect.height }
    ].map(corner => Math.sqrt(Math.pow(clickX - corner.x, 2) + Math.pow(clickY - corner.y, 2)));

    const radius = Math.max(...cornerDistances);
    const diameter = radius * 2;

    const ripple = this._renderer.createElement('span');
    this._renderer.addClass(ripple, 'gng-glass-ripple');
    
    // Aplicar color si se provee
    const customColor = this.color();
    if (customColor) {
      this._renderer.setStyle(ripple, 'background', customColor);
    }

    this._renderer.setStyle(ripple, 'width', `${diameter}px`);
    this._renderer.setStyle(ripple, 'height', `${diameter}px`);
    this._renderer.setStyle(ripple, 'left', `${clickX - radius}px`);
    this._renderer.setStyle(ripple, 'top', `${clickY - radius}px`);

    this._renderer.appendChild(container, ripple);

    // Limpiar el DOM después de la animación
    setTimeout(() => {
      this._renderer.removeChild(container, ripple);
    }, 600);
  }
}
