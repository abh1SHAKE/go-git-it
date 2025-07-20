import { Component } from '@angular/core';
import { SnippetCardComponent } from '../shared/snippet-card/snippet-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, SnippetCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchTerm: string = '';

  snippets = [
    {
      title: "title1",
    },
    {
      title: "title1",
    },
    {
      title: "title1",
    },
    {
      title: "title1",
    },
    {
      title: "title1",
    },
    {
      title: "title1",
    },
    {
      title: "title1",
    },
  ];

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }
}
