import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  GngFileUpload, 
  GngButton, 
  GngTag,
  GngGlassCard 
} from 'glassng';

@Component({
  selector: 'pg-file-upload-page',
  standalone: true,
  imports: [
    CommonModule, 
    GngFileUpload, 
    GngButton, 
    GngTag,
    GngGlassCard
  ],
  template: `
    <div class="p-8 max-w-5xl mx-auto">
      <div class="mb-12">
        <h1 class="text-4xl font-display font-bold text-[var(--gng-t-text-main)] mb-2">File Upload</h1>
        <p class="text-[var(--gng-t-text-muted)]">Premium drag-and-drop assets management with real-time glass previews.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Section: Gallery Upload -->
        <div class="lg:col-span-2 space-y-8">
          <gng-glass-card>
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-xl font-bold text-[var(--gng-t-text-main)]">Product Gallery</h2>
                <p class="text-sm text-[var(--gng-t-text-muted)]">Upload multiple high-resolution images for your catalog.</p>
              </div>
              <gng-tag variant="info">{{ galleryFiles().length }} Files</gng-tag>
            </div>

            <gng-file-upload 
              label="Soltar imágenes aquí"
              hint="Formatos soportados: JPG, PNG, WEBP. Máx 5MB por archivo."
              accept="image/*"
              [multiple]="true"
              (filesChanged)="onGalleryChange($event)"
            />

            <div class="mt-8 flex justify-end gap-3">
              <button gng-button variant="ghost">Cancelar</button>
              <button gng-button variant="primary" [disabled]="galleryFiles().length === 0">
                Subir a la Nube
              </button>
            </div>
          </gng-glass-card>

          <!-- Audit Log / Info -->
          <div class="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <i class="ri-information-line text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-[var(--gng-t-text-main)] mb-1">Upload Performance</h3>
                <p class="text-sm text-[var(--gng-t-text-muted)] leading-relaxed">
                  Gng Glass uploads are optimized with sequential chunking and client-side compression hints. 
                  Images are automatically previewed using local Blob URLs for instant feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Section: Compact Uploads -->
        <div class="space-y-8">
          <section>
            <h3 class="text-sm font-bold text-[var(--gng-t-text-muted)] uppercase tracking-widest mb-4">Single File</h3>
            <gng-glass-card>
              <h4 class="font-bold text-[var(--gng-t-text-main)] mb-2">Order Invoice</h4>
              <p class="text-xs text-[var(--gng-t-text-muted)] mb-4">Attach the official PDF invoice for this shipment.</p>
              
              <gng-file-upload 
                label="Seleccionar PDF"
                hint="Solo archivos .pdf"
                accept=".pdf"
                [multiple]="false"
                [showPreview]="true"
              />
            </gng-glass-card>
          </section>

          <section>
             <h3 class="text-sm font-bold text-[var(--gng-t-text-muted)] uppercase tracking-widest mb-4">Disabled State</h3>
             <gng-file-upload 
                [disabled]="true"
                label="Upload locked"
                hint="Verify your identity to upload"
             />
          </section>

          <section class="p-6 rounded-2xl border border-[var(--gng-t-glass-border)] bg-[var(--gng-t-glass-bg)]">
            <h4 class="font-bold text-[var(--gng-t-text-main)] mb-4">Upload Status</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[var(--gng-t-text-muted)]">Storage used</span>
                <span class="text-[var(--gng-t-text-main)]">84%</span>
              </div>
              <div class="h-1.5 w-full bg-[var(--gng-t-glass-border)] rounded-full overflow-hidden">
                <div class="h-full bg-primary w-[84%] rounded-full shadow-[0_0_10px_rgba(var(--gng-t-primary-rgb),0.5)]"></div>
              </div>
              <p class="text-[10px] text-[var(--gng-t-text-muted)]">You are reaching your 2GB limit on the Basic Plan.</p>
              <button gng-button variant="outlined" size="sm" class="w-full">Upgrade Storage</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `
})
export class FileUploadPage {
  galleryFiles = signal<File[]>([]);

  onGalleryChange(files: File[]) {
    this.galleryFiles.set(files);
    console.log('Selected files:', files);
  }
}
