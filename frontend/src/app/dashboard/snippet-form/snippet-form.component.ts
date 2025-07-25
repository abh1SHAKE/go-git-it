import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MonacoEditorComponent } from "../monaco-editor/monaco-editor.component";

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

    constructor(
      private dialogRef: MatDialogRef<SnippetFormComponent>
    ) {}

    onCodeChange(newCode: string) {
      this.code = newCode;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    onSubmit() {
        console.log("TITLE: ", this.title);
        console.log("CODE: ", this.code);
        console.log("PUBLIC: ", this.isPublic);
        console.log("TAGS: ", this.tagsInput);
    }
}
