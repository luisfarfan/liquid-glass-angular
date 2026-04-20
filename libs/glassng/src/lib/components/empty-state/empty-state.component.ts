import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const KNOWN_ICONS = ['search-x', 'search', 'inbox', 'folder-open', 'file-x'] as const;
export type GngEmptyStateIcon = (typeof KNOWN_ICONS)[number];

/**
 * GngEmptyState
 * Premium placeholder for empty views with ambient glow, staggered copy and cinematic icons.
 */
@Component({
  selector: 'gng-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="gng-empty-state"
      role="region"
      [attr.aria-labelledby]="titleElementId()"
    >
      @if (ambientGlow()) {
        <div class="gng-empty-state-orb" aria-hidden="true"></div>
      }

      <div class="gng-empty-state-inner">
        <div class="gng-empty-state-icon-wrap" aria-hidden="true">
          @switch (resolvedIcon()) {
            @case ('search') {
              <svg
                class="gng-empty-state-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
            @case ('inbox') {
              <svg
                class="gng-empty-state-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path
                  d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                />
              </svg>
            }
            @case ('folder-open') {
              <svg
                class="gng-empty-state-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
                />
              </svg>
            }
            @case ('file-x') {
              <svg
                class="gng-empty-state-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="m14.5 12.5-5 5" />
                <path d="m9.5 12.5 5 5" />
              </svg>
            }
            @default {
              <svg
                class="gng-empty-state-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="m13 13 4 4" />
                <path d="m17 13-4 4" />
              </svg>
            }
          }
        </div>

        <div class="gng-empty-state-stagger-copy">
          <h2 class="gng-empty-state-title" [id]="titleElementId()">
            {{ displayTitle() }}
          </h2>
          @if (hasDescription()) {
            <p class="gng-empty-state-desc">{{ description() }}</p>
          }
          <div class="gng-empty-state-actions">
            <ng-content select="[gngEmptyStateActions]"></ng-content>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './empty-state.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GngEmptyState {
  private static _idSeq = 0;
  private readonly _autoTitleId = `gng-empty-state-title-${++GngEmptyState._idSeq}`;

  /** Título cuando no hay búsqueda activa. */
  title = input<string>('Sin resultados');

  /** Texto secundario. */
  description = input<string>('');

  /** Si está definido y no vacío, el título adapta el micro-copy de búsqueda vacía. */
  searchTerm = input<string | null>(null);

  /** Orbe radial detrás del icono. */
  ambientGlow = input<boolean>(true);

  /**
   * Nombre lógico del icono (subset estilo Lucide embebido).
   * Valores desconocidos caen en `search-x`.
   */
  icon = input<string>('search-x');

  /** Sobrescribe el id del heading para `aria-labelledby` (p. ej. varias instancias). */
  headingDomId = input<string | undefined>(undefined);

  readonly titleElementId = computed(
    () => this.headingDomId() ?? this._autoTitleId,
  );

  readonly resolvedIcon = computed((): GngEmptyStateIcon => {
    const v = this.icon();
    return (KNOWN_ICONS as readonly string[]).includes(v)
      ? (v as GngEmptyStateIcon)
      : 'search-x';
  });

  readonly displayTitle = computed(() => {
    const term = this.searchTerm();
    if (term != null && String(term).trim().length > 0) {
      return `No encontramos resultados para "${term}"`;
    }
    return this.title();
  });

  readonly hasDescription = computed(() => this.description().trim().length > 0);
}
