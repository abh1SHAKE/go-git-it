import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MonacoEditorComponent } from "../monaco-editor/monaco-editor.component";
import { SnippetFormDialogData } from '../../models/snippet-form-dialog-data.model';

@Component({
  selector: 'app-snippet-form',
  imports: [FormsModule, MonacoEditorComponent],
  templateUrl: './snippet-form.component.html',
  styleUrl: './snippet-form.component.scss',
})
export class SnippetFormComponent {
    title: string = '';
    code: string = '';
    isPublic: boolean = false;
    tagsInput: string = '';
    language: string = '';

    mode: 'create' | 'edit' = 'create';

    constructor(
      private dialogRef: MatDialogRef<SnippetFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: SnippetFormDialogData
    ) {
      console.log("SnippetFormComponent initialized with data:", data);

      this.mode = data.mode;

      if (data.mode === 'edit' && data.snippet) {
        this.title = data.snippet.title;
        this.code = data.snippet.code;
        this.language = data.snippet.language;
        this.isPublic = data.snippet.public;
        this.tagsInput = data.snippet.tags?.map(tag => tag.name).join(', ');
      }
    }

    onCodeChange(newCode: string) {
      this.code = newCode;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.mode === 'create') {
            console.log("Creating new snippet...");
        } else if (this.mode === 'edit') {
            console.log("Editing existing snippet..."); 
        }
        console.log("TITLE: ", this.title);
        console.log("CODE: ", this.code);
        console.log("PUBLIC: ", this.isPublic);
        console.log("TAGS: ", this.tagsInput);
    }
}
