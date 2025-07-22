import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-tag-dialog',
  imports: [FormsModule],
  templateUrl: './search-tag-dialog.component.html',
  styleUrl: './search-tag-dialog.component.scss'
})
export class SearchTagDialogComponent {
  searchTerm: string = '';

  arr = [1,2,3,4,5,6,7,8]

  constructor(
    private dialogRef: MatDialogRef<SearchTagDialogComponent>
  ) {}

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
