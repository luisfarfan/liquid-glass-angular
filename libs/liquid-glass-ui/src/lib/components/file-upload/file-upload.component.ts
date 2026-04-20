import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  input, 
  output, 
  signal, 
  ElementRef, 
  viewChild,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FileWithPreview {
  file: File;
  previewUrl?: string;
  name: string;
  size: number;
}

@Component({
  selector: 'lg-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="lg-file-upload-container"
      [class.is-dragging]="isDragging()"
      [class.is-disabled]="disabled()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      (click)="triggerSelect()"
      role="button"
      tabindex="0"
      [attr.aria-label]="label()"
      (keydown.space)="$event.preventDefault(); triggerSelect()"
      (keydown.enter)="triggerSelect()"
    >
      <input 
        #fileInput
        type="file" 
        class="lg-file-input-hidden" 
        [multiple]="multiple()" 
        [accept]="accept()" 
        (change)="onFileSelected($event)"
        aria-hidden="true"
      />

      <div class="lg-file-upload-content">
        <div class="lg-file-upload-icon-wrapper">
          <i class="ri-upload-cloud-2-line"></i>
        </div>
        <div class="lg-file-upload-text">
          <p class="lg-file-upload-label">{{ label() }}</p>
          <p class="lg-file-upload-hint">{{ hint() }}</p>
        </div>
      </div>

      <!-- Optional Glow Effect -->
      <div class="lg-file-upload-glow"></div>
    </div>

    @if (showPreview() && files().length > 0) {
      <div class="lg-file-preview-list">
        @for (item of files(); track item.file.name; let i = $index) {
          <div class="lg-file-preview-card animate-in fade-in zoom-in duration-300">
            <div class="lg-file-preview-thumb">
              @if (item.previewUrl) {
                <img [src]="item.previewUrl" [alt]="item.name" />
              } @else {
                <i class="ri-file-text-line"></i>
              }
            </div>
            <div class="lg-file-preview-info">
              <span class="lg-file-preview-name">{{ item.name }}</span>
              <span class="lg-file-preview-size">{{ formatSize(item.size) }}</span>
            </div>
            <button 
              type="button" 
              class="lg-file-preview-remove" 
              (click)="removeFile(i); $event.stopPropagation()"
              aria-label="Remove file"
            >
              <i class="ri-close-line"></i>
            </button>
          </div>
        }
      </div>
    }
  `,
  styleUrl: './file-upload.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgFileUploadComponent {
  /** Label for the dropzone */
  label = input<string>('Haz clic o arrastra archivos aquí');
  
  /** Hint text (e.g. max size, types) */
  hint = input<string>('Archivos hasta 10MB (PNG, JPG, PDF)');

  /** Accept attribute for input */
  accept = input<string>('*');

  /** Allow multiple files */
  multiple = input<boolean>(true);

  /** Disable the component */
  disabled = input<boolean>(false);

  /** Maximum file size in bytes */
  maxSize = input<number>(10 * 1024 * 1024); // 10MB

  /** Show file list previews */
  showPreview = input<boolean>(true);

  /** Emits the list of selected files */
  filesChanged = output<File[]>();

  protected readonly files = signal<FileWithPreview[]>([]);
  protected readonly isDragging = signal(false);
  protected readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  triggerSelect() {
    if (this.disabled()) return;
    this.fileInput().nativeElement.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled()) return;
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    if (this.disabled()) return;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  removeFile(index: number) {
    const updated = [...this.files()];
    // Revoke URL to prevent leaks
    if (updated[index].previewUrl) {
      URL.revokeObjectURL(updated[index].previewUrl!);
    }
    updated.splice(index, 1);
    this.files.set(updated);
    this.emitFiles();
  }

  private handleFiles(fileList: FileList) {
    const newFiles: FileWithPreview[] = [];
    const count = this.multiple() ? fileList.length : 1;

    for (let i = 0; i < count; i++) {
      const file = fileList[i];
      if (file.size > this.maxSize()) {
        console.warn(`File ${file.name} exceeds max size.`);
        continue;
      }

      const item: FileWithPreview = {
        file,
        name: file.name,
        size: file.size
      };

      if (file.type.startsWith('image/')) {
        item.previewUrl = URL.createObjectURL(file);
      }

      newFiles.push(item);
    }

    if (this.multiple()) {
      this.files.update(prev => [...prev, ...newFiles]);
    } else {
      // Clear previous previews
      this.files().forEach(f => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
      this.files.set(newFiles);
    }

    this.emitFiles();
  }

  private emitFiles() {
    this.filesChanged.emit(this.files().map(f => f.file));
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
