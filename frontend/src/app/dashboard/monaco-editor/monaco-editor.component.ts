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

  constructor() {
    effect(() => {
      const inputCode = this.code();
      console.log(
        'Effect triggered with input code:',
        inputCode,
        'Type:',
        typeof inputCode
      );

      // Ensure we have a valid string
      const safeInputCode = this.getSafeCodeValue(inputCode);

      if (
        this.editor &&
        !this.isUpdatingFromInput &&
        !this.isDisposed &&
        this.currentCode() !== safeInputCode
      ) {
        console.log('Updating editor with safe code:', safeInputCode);
        this.currentCode.set(safeInputCode);
        // Use setTimeout to avoid potential race conditions
        setTimeout(() => {
          if (this.editor && !this.isDisposed) {
            try {
              this.editor.setValue(safeInputCode);
            } catch (error) {
              console.error(
                'Error setting editor value:',
                error,
                'Attempted value:',
                safeInputCode
              );
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
      console.warn(
        'Monaco editor received null/undefined code value, using empty string'
      );
      return '';
    }
    if (typeof value !== 'string') {
      console.warn(
        'Monaco editor received non-string code value:',
        value,
        'Type:',
        typeof value,
        'Converting to string'
      );
      return String(value);
    }
    return value;
  }

  onEditorInit(editor: any) {
    this.editor = editor;
    console.log('Monaco editor initialized');

    if (!this.isDisposed) {
      const initialCode = this.getSafeCodeValue(this.code());
      console.log('Setting initial code:', initialCode);

      try {
        this.editor.setValue(initialCode);
      } catch (error) {
        console.error(
          'Error setting initial editor value:',
          error,
          'Attempted value:',
          initialCode
        );
        // Fallback to empty string
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
        console.error('Error getting editor value:', error);
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
        console.warn('Monaco editor disposal warning:', error);
      }
      this.editor = null;
    }
  }
}
