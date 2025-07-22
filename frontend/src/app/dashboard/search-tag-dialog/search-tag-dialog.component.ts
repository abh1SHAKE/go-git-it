import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  ) {}

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }

  closePopup() {
    console.log("CLOSE");
  }
}
