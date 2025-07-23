import { Component, input, signal } from '@angular/core';
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

    editorOptions = signal({
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {enabled: false},
        fontSize: 14,
        fontFamily: 'JetBrains Mono',
        readOnly: this.readonly()
    })
}
