import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  imports: [FormsModule],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent {
  searchTerm: string = '';
  selectedOption: string = '';

  close = output<void>();

  filterOptions = [
  { label: "Show only public snippets", selected: false },
  { label: "Show only private snippets", selected: false },
  { label: "I don't even know what this does", selected: false },
];

  constructor(
  ) {}

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }

  closePopup() {
    this.close.emit();
  }
}
