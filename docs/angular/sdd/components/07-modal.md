---
title: Glass Modal Component Specs
description: Especificación técnica completa (Arquitectura + Visual) del contenedor de diálogo para Liquid Glass UI.
version: 1.3.0
---

# 07. Glass Modal (Container)

El Modal no es solo una ventana; es un evento espacial. Fusionamos la robustez del Angular CDK con físicas tridimensionales para una experiencia cinematográfica.

---

## 1. Arquitectura Técnica & CDK

El Modal se gestiona mediante un **Servicio Inyectable** para garantizar la limpieza del DOM:

### `LiquidModalService`
*   **Aparato Crítico**: Utiliza `@angular/cdk/dialog` para la gestión de overlays.
*   **Focus Management**: Emplea `CdkTrapFocus` para secuestrar el tabulado del teclado dentro del contenedor.
*   **Scroll Lock**: Bloquea automáticamente el scroll del `<body>`.
*   **Inyección de Datos**: Provee `DialogRef` y `DI_MODAL_DATA` para la comunicación entre el componente llamado y el llamador.

---

## 2. Advanced Motion Features

### A. Morphing View Transitions
- **Integración**: Utiliza la **View Transitions API** de los navegadores modernos.
- **Efecto**: Si un elemento tiene un `view-transition-name` idéntico al contenedor del modal, el cristal se expandirá orgánicamente desde el punto de origen.

### B. 3D Parallax Effect
- **Profundidad**: La ventana reacciona levemente al movimiento del puntero (`rotateX/Y` de máximo `1deg`).
- **Ilusión Óptica**: Refuerza la separación física del modal sobre el `backdrop-blur`.

---

## 3. Visual Intent (Level 3 Glass)

### A. The "Deep Void" Backdrop
- **Fondo**: `bg-black/60`.
- **Blur**: `backdrop-blur-xl` (mínimo `3rem`).
- **Progreso**: El desenfoque aparece mediante un barrido radial desde el centro.

### B. Modal Panel
- **Elevation**: Máxima sombra proyectada con difusión neón al 10%.
- **Radius**: `2rem` (32px).
- **Structure**: Reutiliza `header`, `content` y `footer` del sistema de Cards.

---

## 4. Responsive & A11y

*   **Mobile Bottom-Sheet**: En pantallas menores a `768px`, el modal se ancla a la base con un "drag handle" para cierre gestual.
*   **Keyboard**: Soporte obligatorio de `ESC` (vía CDK).
*   **Roles**: `dialog` o `alertdialog` asignados dinámicamente.

---

## 5. Ejemplo de Llamada desde Componente

```typescript
this.modalService.open(ConfigProfileComponent, {
  elevation: 3,
  enableParallax: true,
  viewTransitionName: 'user-profile-morph'
});
```

---

> **Regla de Oro:** "Maintain context." Aunque el modal detiene la interacción, el usuario debe ver (a través del desenfoque) que sigue en la misma aplicación. El cristal es el puente entre el foco actual y el contexto general.
