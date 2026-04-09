import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LIQUID_MODAL_DATA, 
  LiquidModalRef, 
  LiquidModalService, 
  ButtonComponent, 
  InputComponent, 
  FormFieldComponent,
  LgModalHeader,
  LgModalContent,
  LgModalFooter
} from '@liquid-glass-ui/angular';

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonComponent, 
    InputComponent, 
    FormFieldComponent,
    LgModalHeader,
    LgModalContent,
    LgModalFooter
  ],
  template: `
    <lg-modal-header>
      {{ data?.title || 'Configuración Avanzada' }}
    </lg-modal-header>

    <lg-modal-content>
      <div class="space-y-6">
        <p class="text-body-sm">
          Este es un ejemplo de la nueva estructura declarativa. El contenido se adapta 
          automáticamente al área de scroll inmersivo.
        </p>

        <section class="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
          <p class="text-[10px] font-bold uppercase tracking-widest text-primary">Prueba Multi-Stack</p>
          <p class="text-[12px] opacity-70">Puedes abrir múltiples modales uno sobre otro. La jerarquía visual se mantiene mediante el oscurecimiento dinámico.</p>
          <button lg-button variant="ghost" size="sm" (click)="openNested()">
            Abrir Modal Anidado
          </button>
        </section>

        <lg-form-field label="Etiqueta de Workstation" hint="Nombre único para identificar este recurso.">
          <lg-input placeholder="Ej: Nebula-Node-01"></lg-input>
        </lg-form-field>
      </div>
    </lg-modal-content>

    <lg-modal-footer>
      <button lg-button variant="ghost" (click)="modalRef.close()">Descartar</button>
      <button lg-button variant="primary" (click)="modalRef.close(true)">Guardar Perfil</button>
    </lg-modal-footer>
  `
})
export class DemoModalComponent {
  public modalRef = inject(LiquidModalRef) as any;
  public data = inject(LIQUID_MODAL_DATA);
  private modalService = inject(LiquidModalService);

  openNested() {
    this.modalService.open(DemoModalComponent, {
      elevation: 3,
      data: { title: 'Nivel Secundario' }
    });
  }
}
