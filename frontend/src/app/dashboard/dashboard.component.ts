import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SnippetCardComponent } from '../shared/snippet-card/snippet-card.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { SearchTagDialogComponent } from './search-tag-dialog/search-tag-dialog.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { SnippetFormComponent } from './snippet-form/snippet-form.component';
import { Snippet } from '../models/snippet-card.model';
import { SnippetFormDialogData } from '../models/snippet-form-dialog-data.model';
import { SnippetService } from '../services/snippet.service';
import { SnippetStateService } from '../services/snippet-state.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    SnippetCardComponent,
    FilterDialogComponent,
    SearchTagDialogComponent,
    MonacoEditorComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('codeContainer', { read: ElementRef }) codeContainer!: ElementRef;
  searchTerm: string = '';
  selectedSnippet!: Snippet;

  snippets: Snippet[] = [];
  publicSnippets: Snippet[] = [];

  userName: string | null = null;

  viewMode: 'private' | 'public' = 'private';
  viewingPublic: boolean = false;

  constructor(
    private dialog: MatDialog,
    private snippetService: SnippetService,
    private snippetStateService: SnippetStateService
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.getMySnippets();
    this.getPublicSnippets();
  }

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }

  searchPopupVisible = false;
  filterPopupVisible = false;

  setSelectedSnippet(snippet: any) {
    this.selectedSnippet = snippet;
  }

  openSnippetDialog(mode: 'create' | 'edit' = 'create', snippet?: Snippet) {
    console.log('Open Create Snippet Dialog');

    const dialogWidth = '60%';

    const config = {
      width: dialogWidth,
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-dialog-panel',
      disableClose: true,
      data: {
        mode,
        snippet,
      } satisfies SnippetFormDialogData,
    };

    const dialogRef = this.dialog.open(SnippetFormComponent, config);

    // TESTING
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);

      if (result?.created && result.snippet) {
        console.log('Creating new snippet:', result.snippet);
        this.snippets.unshift(result.snippet);
        this.snippetStateService.setMySnippets(this.snippets);
        this.selectedSnippet = { ...result.snippet };
        console.log('Selected snippet after create:', this.selectedSnippet);
      } else if (result?.updated && result.snippet) {
        console.log('Updating snippet:', result.snippet);
        console.log(
          'Current selectedSnippet before update:',
          this.selectedSnippet
        );

        // Update the snippets array
        this.snippets = this.snippets.map((s) =>
          s.id === result.snippet.id ? { ...result.snippet } : s
        );

        console.log('Updated snippets array:', this.snippets);
        this.snippetStateService.setMySnippets(this.snippets);

        // Add a small delay to ensure the view updates properly
        setTimeout(() => {
          // Set selected snippet directly from the result
          this.selectedSnippet = { ...result.snippet };
          console.log('Selected snippet after update:', this.selectedSnippet);
          console.log('Selected snippet code:', this.selectedSnippet?.code);
          console.log(
            'Selected snippet code type:',
            typeof this.selectedSnippet?.code
          );
        }, 10);
      }
    });
  }

  openPopup(type: string) {
    if (type === 'search-tag') {
      this.searchPopupVisible = true;
      this.filterPopupVisible = false;
    } else if (type === 'filter-dialog') {
      this.filterPopupVisible = true;
      this.searchPopupVisible = false;
    }
  }

  closePopup(type: string) {
    if (type === 'search-tag') {
      this.searchPopupVisible = false;
    } else if (type === 'filter-dialog') {
      this.filterPopupVisible = false;
    }
  }

  getMySnippets() {
    const cached = this.snippetStateService.getMySnippets();

    if (cached) {
      this.snippets = cached;
      console.log('Using cached my snippets:', cached);
    } else {
      this.snippetService.getMySnippets().subscribe({
        next: (snippets: Snippet[]) => {
          console.log('Fetched my snippets:', snippets);
          this.snippets = snippets;
          this.snippetStateService.setMySnippets(snippets);
        },
        error: (err) => {
          console.error('Error fetching my snippets:', err);
        },
      });
    }
  }

  getPublicSnippets() {
    const cached = this.snippetStateService.getPublicSnippets();

    if (cached) {
      this.publicSnippets = cached;
      console.log('Using cached public snippets:', cached);
    } else {
      this.snippetService.getPublicSnippets().subscribe({
        next: (snippets: Snippet[]) => {
          this.publicSnippets = snippets;
          console.log('Fetched public snippets:', snippets);
          this.snippetStateService.setPublicSnippets(snippets);
        },
        error: (err) => {
          console.error('Error fetching public snippets:', err);
        },
      });
    }
  }

  toggleSnippets() {
    this.viewingPublic = !this.viewingPublic;

    if (this.viewingPublic && this.publicSnippets.length > 0) {
      this.selectedSnippet = this.publicSnippets[0];
    } else if (!this.viewingPublic && this.snippets.length > 0) {
      this.selectedSnippet = this.snippets[0];
    }
  }

  selectSnippet() {
    if (this.viewingPublic) {
      this.selectedSnippet = this.publicSnippets[0];
    } else {
      this.selectedSnippet = this.snippets[0];
    }
  }

  copyCode() {
    navigator.clipboard
      .writeText(this.selectedSnippet.code)
      .then(() => {
        console.log('Copied');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }
}
