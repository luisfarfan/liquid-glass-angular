import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassSkeletonComponent } from '../skeleton/glass-skeleton.component';

export type LgAvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type LgAvatarStatus = 'online' | 'offline' | 'busy';

function initialsFromName(name: string): string {
  const t = name.trim();
  if (!t) {
    return '?';
  }
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0].charAt(0);
    const b = parts[parts.length - 1].charAt(0);
    return (a + b).toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}

const SIZE_DIM: Record<LgAvatarSize, string> = {
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
  xl: '4rem',
};

/**
 * Glass Avatar — SDD 24.
 * Imagen, iniciales o skeleton; indicador de estado opcional.
 */
@Component({
  selector: 'lg-avatar',
  standalone: true,
  imports: [CommonModule, GlassSkeletonComponent],
  template: `
    <div
      class="lg-avatar"
      [class.lg-avatar--sm]="size() === 'sm'"
      [class.lg-avatar--md]="size() === 'md'"
      [class.lg-avatar--lg]="size() === 'lg'"
      [class.lg-avatar--xl]="size() === 'xl'"
      [attr.aria-busy]="isLoading() ? true : null"
      [attr.role]="hostRole()"
      [attr.aria-label]="hostAriaLabel()"
    >
      @if (isLoading()) {
        <lg-skeleton
          class="lg-avatar__skeleton"
          type="circle"
          [width]="skeletonDim()"
          [height]="skeletonDim()"
        />
      } @else if (showImage()) {
        <img
          class="lg-avatar__img"
          [src]="src()!"
          [alt]="fullLabel()"
          (error)="imageFailed.set(true)"
          loading="lazy"
          decoding="async"
        />
      } @else {
        <span class="lg-avatar__initials" aria-hidden="true">{{ initials() }}</span>
      }

      @if (status() && !isLoading()) {
        <span
          class="lg-avatar__status"
          aria-hidden="true"
          [class.lg-avatar__status--online]="status() === 'online'"
          [class.lg-avatar__status--offline]="status() === 'offline'"
          [class.lg-avatar__status--busy]="status() === 'busy'"
        ></span>
      }
    </div>
  `,
  styleUrl: './avatar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  readonly src = input<string | null>(null);
  readonly name = input<string>('');
  readonly size = input<LgAvatarSize>('md');
  readonly status = input<LgAvatarStatus | undefined>(undefined);
  readonly isLoading = input(false);

  /** Prioridad sobre `name` para etiquetas accesibles (iniciales / carga). */
  readonly accessibleLabel = input<string>('');

  protected readonly imageFailed = signal(false);

  protected readonly skeletonDim = computed(() => SIZE_DIM[this.size()]);

  protected readonly initials = computed(() => initialsFromName(this.name()));

  protected readonly showImage = computed(() => {
    const s = this.src();
    return !!s && !this.imageFailed() && !this.isLoading();
  });

  protected readonly baseLabel = computed(() => {
    const a = this.accessibleLabel().trim();
    if (a.length > 0) {
      return a;
    }
    const n = this.name().trim();
    return n.length > 0 ? n : 'Avatar';
  });

  protected readonly fullLabel = computed(() => {
    const base = this.baseLabel();
    const st = this.status();
    if (!st) {
      return base;
    }
    return `${base}${this.statusSuffix(st)}`;
  });

  protected readonly hostRole = computed(() => {
    if (this.isLoading()) {
      return 'img';
    }
    if (this.showImage()) {
      return null;
    }
    return 'img';
  });

  protected readonly hostAriaLabel = computed((): string | null => {
    if (this.isLoading()) {
      return `Cargando avatar de ${this.baseLabel()}`;
    }
    if (this.showImage()) {
      return null;
    }
    return this.fullLabel();
  });

  private statusSuffix(st: LgAvatarStatus): string {
    switch (st) {
      case 'online':
        return ', en línea';
      case 'offline':
        return ', desconectado';
      case 'busy':
        return ', ocupado';
      default:
        return '';
    }
  }
}
