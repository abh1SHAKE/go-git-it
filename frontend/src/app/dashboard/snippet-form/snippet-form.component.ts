import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MonacoEditorComponent } from '../monaco-editor/monaco-editor.component';
import { SnippetFormDialogData } from '../../models/snippet-form-dialog-data.model';
import {
  SUPPORTED_LANGUAGES,
  LanguageOption,
} from '../../constants/supported-languages';
import { CustomDropdownComponent } from '../../shared/custom-dropdown/custom-dropdown.component';
import { SnippetService } from '../../services/snippet.service';
import { SnippetPayload } from '../../models/snippet-payload.model';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-snippet-form',
  imports: [FormsModule, MonacoEditorComponent, CustomDropdownComponent],
  templateUrl: './snippet-form.component.html',
  styleUrl: './snippet-form.component.scss',
})
export class SnippetFormComponent {
  title: string = '';
  code: string = '';
  isPublic: boolean = false;
  tagsInput: string = '';
  language: string = '';

  supportedLanguages: LanguageOption[] = SUPPORTED_LANGUAGES;

  mode: 'create' | 'edit' = 'create';

  onLanguageChange(selectedLanguage: string) {
    this.language = selectedLanguage;
  }

  constructor(
    private dialogRef: MatDialogRef<SnippetFormComponent>,
    private snippetService: SnippetService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: SnippetFormDialogData
  ) {
    this.mode = data.mode;

    if (data.mode === 'edit' && data.snippet) {
      this.title = data.snippet.title;
      this.code = data.snippet.code;
      this.language = data.snippet.language;
      this.isPublic = data.snippet.public;
      this.tagsInput = data.snippet.tags?.map((tag) => tag.name).join(', ');
    }
  }

  onCodeChange(newCode: string) {
    this.code = newCode;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const tags = this.tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const payload: SnippetPayload = {
      title: this.title,
      code: this.code,
      language: this.language,
      public: this.isPublic,
      tags: tags,
    };

    if (this.mode === 'create') {
      this.createSnippet(payload);
    } else if (this.mode === 'edit' && this.data.snippet) {
      this.updateSnippet(this.data.snippet.id, payload);
    }
  }

  createSnippet(payload: SnippetPayload) {
    this.snippetService.createSnippet(payload).subscribe({
      next: (res) => {
        this.snackbar.success('Snippet created successfully');
        this.dialogRef.close({ created: true, snippet: res });
      },
      error: (err) => {
        this.snackbar.error(`Error creating snippet: `, err);
      },
    });
  }

  updateSnippet(id: number, payload: SnippetPayload) {
    this.snippetService.updateSnippet(id, payload).subscribe({
      next: (res) => {
        const updatedSnippet = {
          ...this.data.snippet!,
          title: this.title,
          code: this.code,
          language: this.language,
          public: this.isPublic,
          tags: this.tagsInput
            .split(',')
            .map((tag) => ({
              name: tag.trim(),
            }))
            .filter((tag) => tag.name),
        };

        this.dialogRef.close({
          updated: true,
          snippet: updatedSnippet,
        });
      },
      error: (err) => {
        this.snackbar.error('Error updating snippet: ', err);
      },
    });
  }
}
