import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  GNG_MODAL_DATA, 
  GngModalRef, 
  GngModalService, 
  GngButton, 
  GngInput, 
  GngFormField,
  GngModalHeader,
  GngModalContent,
  GngModalFooter
} from 'glassng';

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [
    CommonModule, 
    GngButton, 
    GngInput, 
    GngFormField,
    GngModalHeader,
    GngModalContent,
    GngModalFooter
  ],
  template: `
    <gng-modal-header>
      {{ data?.title || 'Configuración Avanzada' }}
    </gng-modal-header>

    <gng-modal-content>
      <div class="space-y-6">
        <p class="text-body-sm">
          Este es un ejemplo de la nueva estructura declarativa. El contenido se adapta 
          automáticamente al área de scroll inmersivo.
        </p>

        <section class="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
          <p class="text-[10px] font-bold uppercase tracking-widest text-primary">Prueba Multi-Stack</p>
          <p class="text-[12px] opacity-70">Puedes abrir múltiples modales uno sobre otro. La jerarquía visual se mantiene mediante el oscurecimiento dinámico.</p>
          <button gng-button variant="ghost" size="sm" (click)="openNested()">
            Abrir Modal Anidado
          </button>
        </section>

        <gng-form-field label="Etiqueta de Workstation" hint="Nombre único para identificar este recurso.">
          <gng-input placeholder="Ej: Nebula-Node-01"></gng-input>
        </gng-form-field>
      </div>
    </gng-modal-content>

    <gng-modal-footer>
      <button gng-button variant="ghost" (click)="modalRef.close()">Descartar</button>
      <button gng-button variant="primary" (click)="modalRef.close(true)">Guardar Perfil</button>
    </gng-modal-footer>
  `
})
export class DemoModalComponent {
  public modalRef = inject(GngModalRef) as any;
  public data = inject(GNG_MODAL_DATA) as any;
  private modalService = inject(GngModalService);

  openNested() {
    this.modalService.open(DemoModalComponent, {
      elevation: 3,
      data: { title: 'Nivel Secundario' }
    });
  }
}
