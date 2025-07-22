import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  imports: [FormsModule],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent {
  searchTerm: string = '';
  selectedOption: string = '';

  filterOptions = [
  { label: "Show only public snippets", selected: false },
  { label: "Show only private snippets", selected: false },
  { label: "Show the most recent snippets", selected: false },
  { label: "I don't even know what this does", selected: false },
];

  constructor(
    private dialogRef: MatDialogRef<FilterDialogComponent>
  ) {}

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
