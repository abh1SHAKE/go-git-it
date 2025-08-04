import {
  Component,
  effect,
  input,
  output,
  signal,
  computed,
  OnDestroy,
} from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-monaco-editor',
  imports: [MonacoEditorModule],
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.scss',
})
export class MonacoEditorComponent implements OnDestroy {
  code = input<string>('');
  language = input<string>('javascript');
  readonly = input<boolean>(true);

  codeChange = output<string>();
  currentCode = signal('');

  private editor: any;
  private isUpdatingFromInput = false;
  private isDisposed = false;

  constructor(
    private snackbar: SnackbarService,
  ) {
    effect(() => {
      const inputCode = this.code();
      const safeInputCode = this.getSafeCodeValue(inputCode);

      if (
        this.editor &&
        !this.isUpdatingFromInput &&
        !this.isDisposed &&
        this.currentCode() !== safeInputCode
      ) {
        this.currentCode.set(safeInputCode);
        setTimeout(() => {
          if (this.editor && !this.isDisposed) {
            try {
              this.editor.setValue(safeInputCode);
            } catch (error) {
              snackbar.error(`Error setting editor value: ${error}`);
            }
          }
        }, 0);
      } else if (!this.editor) {
        this.currentCode.set(safeInputCode);
      }
    });
  }

  private getSafeCodeValue(value: any): string {
    if (value === null || value === undefined) {
      this.snackbar.warn(`Monaco editor received null/undefined code value`);
      return '';
    }
    if (typeof value !== 'string') {
      this.snackbar.warn(`Monaco edtior received non-string code value`);
      return String(value);
    }
    return value;
  }

  onEditorInit(editor: any) {
    this.editor = editor;

    if (!this.isDisposed) {
      const initialCode = this.getSafeCodeValue(this.code());
      try {
        this.editor.setValue(initialCode);
      } catch (error) {
        this.snackbar.error(`Error setting initial editor value`);
        this.editor.setValue('');
      }

      this.editor.onDidChangeModelContent(() => {
        if (!this.isDisposed) {
          this.onEditorChange();
        }
      });
    }
  }

  onEditorChange() {
    if (this.editor && !this.isUpdatingFromInput && !this.isDisposed) {
      this.isUpdatingFromInput = true;
      try {
        const newCode = this.editor.getValue();
        this.currentCode.set(newCode);
        this.codeChange.emit(newCode);
      } catch (error) {
        this.snackbar.error(`Error getting editor value`);
      } finally {
        this.isUpdatingFromInput = false;
      }
    }
  }

  editorOptions = computed(() => ({
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: 'JetBrains Mono',
    readOnly: this.readonly(),
  }));

  ngOnDestroy() {
    this.isDisposed = true;
    if (this.editor) {
      try {
        this.editor.dispose();
      } catch (error) {
        this.snackbar.warn(`Monaco editor disposal warning`);
      }
      this.editor = null;
    }
  }
}
