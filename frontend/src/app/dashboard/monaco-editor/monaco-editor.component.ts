import { Component, effect, input, output, signal, computed } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-monaco-editor',
  imports: [MonacoEditorModule],
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.scss',
})
export class MonacoEditorComponent {
    code = input<string>('');
    language = input<string>('');
    readonly = input<boolean>(true);

    codeChange = output<string>();
    currentCode = signal('');

    private editor: any;

    constructor() {
      effect(() => {
        this.currentCode.set(this.code());
      });
    }

    onEditorInit(editor: any) {
      this.editor = editor;
      console.log('Monaco editor initialized');
    }

    onEditorChange(event: Event) {
      if (this.editor) {
        const newCode = this.editor.getValue();
        this.currentCode.set(newCode);
        this.codeChange.emit(newCode);
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
}
