---
title: Glass Toast Specification
description: Especificación técnica avanzada del sistema de notificaciones globales, integrando Angular CDK Overlay, gestión de colas reactiva y efectos de cristal flotante con indicadores de tiempo.
version: 1.1.0
---

# 18. Glass Toast (Service & Molecule)

## 1. Overview
- **Purpose:** Proporcionar feedback informativo o de estado tras una acción, sin interrumpir el flujo de trabajo del usuario.
- **UX Intent:** Aparecer de forma elegante, informar rápidamente y desaparecer sin dejar rastro.
- **Visual Intent:** Placas de cristal altamente traslúcidas (Nivel 3) que flotan en el viewport, con bordes neón que indican el tipo de mensaje.

---

## 2. Guidelines
- **When to use:**
  - Confirmación de éxito (ej. "Perfil actualizado").
  - Alertas de error no bloqueantes (ej. "Error de red, reintentando").
  - Avisos informativos breves.
- **When NOT to use:**
  - Mensajes que requieran una decisión crítica del usuario (usar **07. Modal**).
  - Listado de logs históricos (usar un panel de notificaciones dedicado).

---

## 3. Structure & Anatomy
El sistema se compone de un servicio inyectable y un componente contenedor:

- **`LiquidToastService`**: Orquestador global que maneja la cola de mensajes y el `Overlay`.
- **`Toast Container`**: El componente `lib-glass-toast` que se renderiza dinámicamente:
  - **Glass Plate**: Base con `backdrop-blur-xl`.
  - **Status Icon**: Icono descriptivo con color semántico.
  - **Content Area**: Título y descripción corta.
  - **Life Progress Bar**: Línea de neón en la base que se consume según el tiempo restante.
  - **Close Button**: Botón ghost para descarte manual inmediato.

---

## 4. API Reference (Angular Services & Signals)

### LiquidToastService
| Method | Params | Description |
| :--- | :--- | :--- |
| `show()` | `config: ToastConfig` | Muestra un toast con configuración completa. |
| `success()` | `msg: string, title?: string` | Atajo para éxito (Verde). |
| `error()` | `msg: string, title?: string` | Atajo para error (Rojo). |
| `info()` | `msg: string` | Atajo para información (Azul). |

### ToastConfig (Interface)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `message` | `string` | `''` | Cuerpo del mensaje. |
| `title` | `string` | `''` | Título opcional. |
| `duration` | `number` | `3500` | Duración en ms antes de auto-cerrar. |
| `type` | `'success' | 'error' | 'info'` | Variante semántica. |
| `dismissible` | `boolean` | `true` | Muestra el botón de cierre. |

---

## 5. Visual Behavior & Motion

### A. Stacking Logic
- Los toasts nuevos aparecen en la parte superior (o inferior según config) de la pila.
- Al desaparecer uno, los demás se desplazan verticalmente con una animación de **600ms** suave para ocupar el espacio vacío.

### B. Entrance & Life Cycle
- **Entrada**: Deslizamiento desde el lateral (`translate-x`) con un rebote elástico.
- **Progreso**: Una línea de neón en la base del toast se contrae de `100%` a `0%` linealmente durante el tiempo de vida del toast.
- **Hover Pause**: Si el usuario mantiene el puntero sobre el toast, el temporizador de auto-cierre se pausa y la barra de progreso se detiene.

---

## 6. Technical Implementation (Angular v21)

### CDK Overlay Management
Utilizamos `Overlay` para asegurar que el toast se renderice fuera de la jerarquía del DOM del componente que lo dispara, evitando problemas de `z-index` y `overflow`.

```typescript
// Lógica de Servicio
const overlayRef = this.overlay.create({
  positionStrategy: this.overlay.position()
    .global()
    .top('24px')
    .right('24px')
});

const portal = new ComponentPortal(GlassToastComponent);
const componentRef = overlayRef.attach(portal);
```

---

## 7. Estilos (Tailwind v4)

*   **Glass Plate**: `min-w-[320px] max-w-[420px] p-5 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]`.
*   **Progress Bar**: `absolute bottom-0 left-0 h-[2px] bg-primary shadow-[0_0_8px_currentColor] transition-all linear`.
*   **Icon Area**: `w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 mr-4`.
*   **Success Theme**: `text-emerald-400 border-l-4 border-emerald-500/50`.
*   **Error Theme**: `text-rose-400 border-l-4 border-rose-500/50`.

---

## 8. Anti-patterns
- **Demasiado texto**: El toast debe leerse en menos de 2 segundos. Evitar párrafos largos.
- **No incluir descarte manual**: Siempre debe haber una forma de cerrar el toast si bloquea algo debajo.
- **Sonidos intrusivos**: El feedback visual es suficiente en este sistema.

---

## 9. Acceptance Criteria
- [ ] Soporta múltiples mensajes apilados sin solaparse visualmente.
- [ ] La barra de progreso es coherente con el tiempo de vida del toast.
- [ ] El `hover` detiene correctamente el temporizador de cierre.
- [ ] Accesibilidad: Soporta lectores de pantalla (Role `alert`) y descarte por teclado.
