import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-snippet-form',
  imports: [FormsModule],
  templateUrl: './snippet-form.component.html',
  styleUrl: './snippet-form.component.scss',
})
export class SnippetFormComponent {
    title: string = '';
    code: string = '';
    isPublic: boolean = false;
    tagsInput: string = '';

    onSubmit() {
        console.log("TITLE: ", this.title);
        console.log("CODE: ", this.code);
        console.log("PUBLIC: ", this.isPublic);
        console.log("TAGS: ", this.tagsInput);
    }
}
