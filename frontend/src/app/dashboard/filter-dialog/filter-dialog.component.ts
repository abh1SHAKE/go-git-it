import { Component, input, output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  imports: [FormsModule],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent implements OnInit {
  searchTerm: string = '';
  selectedOption: string = '';

  close = output<void>();
  apply = output<string>();

  currentFilter = input<string>('');

  filterOptions = [
  { label: "Show all the snippets", selected: false},
  { label: "Show only public snippets", selected: false },
  { label: "Show only private snippets", selected: false },
  { label: "I don't even know what this does", selected: false },
];

  constructor(
  ) {}

  ngOnInit(): void {
    if (this.currentFilter()) {
      this.selectedOption = this.currentFilter();
    } else {
      this.selectedOption = this.filterOptions[0].label;
    }
  }

  closePopup() {
    this.close.emit();
  }

  applyFilter() {
    this.apply.emit(this.selectedOption);
    this.closePopup();
  }
}
