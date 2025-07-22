import { Component, ElementRef, ViewChild } from '@angular/core';
import { SnippetCardComponent } from '../shared/snippet-card/snippet-card.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { SearchTagDialogComponent } from './search-tag-dialog/search-tag-dialog.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, SnippetCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('codeContainer', { read: ElementRef }) codeContainer!: ElementRef;
  searchTerm: string = '';

  tagDialogOpen: boolean = true;
  filterDialogOpen: boolean = false;

  snippets = [
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
  ];

  constructor(private dialog: MatDialog) {}

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }

  openDialog(type: string) {
    const rect = this.codeContainer.nativeElement.getBoundingClientRect();

    const dialogWidth = 450;
    const dialogHeight = 350;

    const top = rect.top + (rect.height - dialogHeight) / 2;
    const left = rect.left + (rect.width - dialogWidth) / 2;

    const config = {
      width: `${dialogWidth}px`,
      height: `${dialogHeight}px`,
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      panelClass: 'custom-mat-dialog',
      position: { top: `${top}px`, left: `${left}px` },
      disableClose: true
    };

    if (type === 'search-tag') {
      this.dialog.open(SearchTagDialogComponent, {
        ...config,
      });
    } else {
      this.dialog.open(FilterDialogComponent, {
        ...config,
      });
    }
  }
}
