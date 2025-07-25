import { Component, effect, input, output, signal, computed, OnDestroy } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-monaco-editor',
  imports: [MonacoEditorModule],
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.scss',
})
export class MonacoEditorComponent implements OnDestroy {
    code = input<string>('');
    language = input<string>('');
    readonly = input<boolean>(true);

    codeChange = output<string>();
    currentCode = signal('');

    private editor: any;
    private isUpdatingFromInput = false;
    private isDisposed = false;

    constructor() {
      effect(() => {
        const inputCode = this.code();
        if (this.editor && !this.isUpdatingFromInput && !this.isDisposed && this.currentCode() !== inputCode) {
          this.currentCode.set(inputCode);
          // Use setTimeout to avoid potential race conditions
          setTimeout(() => {
            if (this.editor && !this.isDisposed) {
              this.editor.setValue(inputCode);
            }
          }, 0);
        } else if (!this.editor) {
          this.currentCode.set(inputCode);
        }
      });
    }

    onEditorInit(editor: any) {
      this.editor = editor;
      console.log('Monaco editor initialized');

      if (!this.isDisposed) {
        this.editor.setValue(this.code());

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
        const newCode = this.editor.getValue();
        this.currentCode.set(newCode);
        this.codeChange.emit(newCode);
        this.isUpdatingFromInput = false;
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