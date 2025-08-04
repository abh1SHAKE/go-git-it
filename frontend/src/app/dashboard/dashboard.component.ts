import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SnippetCardComponent } from '../shared/snippet-card/snippet-card.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { SearchTagDialogComponent } from './search-tag-dialog/search-tag-dialog.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { SnippetFormComponent } from './snippet-form/snippet-form.component';
import { Snippet, Tag } from '../models/snippet.model';
import { SnippetFormDialogData } from '../models/snippet-form-dialog-data.model';
import { SnippetService } from '../services/snippet.service';
import { SnippetStateService } from '../services/snippet-state.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../services/snackbar.service';

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

  selectedTags: Tag[] = [];

  userName: string | null = null;

  viewMode: 'private' | 'public' = 'private';
  viewingPublic: boolean = false;

  currentFilter: string = '';

  constructor(
    private dialog: MatDialog,
    private snippetService: SnippetService,
    private snackbar: SnackbarService,
    private snippetStateService: SnippetStateService
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.getMySnippets();
  }

  get filteredSnippets(): Snippet[] {
    let filtered = this.snippets;

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(
        (s) => s.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(
        snippet => this.selectedTags.some(
          tag => snippet.tags?.some(snippetTag => snippetTag.id === tag.id)
        )
      );
    }

    if (this.currentFilter === "Show only public snippets") {
      filtered = filtered.filter(snippet => snippet.public);
    } else if (this.currentFilter === "Show only private snippets") {
      filtered = filtered.filter(snippet => !snippet.public);
    }

    return filtered;
  }

  onFilterApplied(filterOption: string) {
    this.currentFilter = filterOption;

    if (filterOption === "I don't even know what this does") {
      window.open('https://youtu.be/rprf7LEraU4?si=olZ-trN2Yc52SmcN&t=159', '_blank');
      this.currentFilter = '';
      return;
    } else if (filterOption === "Show all the snippets") {
      this.currentFilter = '';
      return;
    }
  }

  get filteredPublicSnippets(): Snippet[] {
    let filtered = this.publicSnippets;

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(
        (s) => s.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(
        snippet => this.selectedTags.some(
          tag => snippet.tags?.some(snippetTag => snippetTag.id === tag.id)
        )
      );
    }

    return filtered;
  }

  onTagsApplied(selectedTags: Tag[]) {
    this.selectedTags = selectedTags;
  }

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
  }

  searchPopupVisible = false;
  filterPopupVisible = false;

  setSelectedSnippet(snippet: any) {
    this.selectedSnippet = snippet;
  }

  openSnippetDialog(mode: 'create' | 'edit' = 'create', snippet?: Snippet) {
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.created && result.snippet) {
        this.snippets.unshift(result.snippet);
        this.snippetStateService.setMySnippets(this.snippets);
        this.selectedSnippet = { ...result.snippet };
      } else if (result?.updated && result.snippet) {
        this.snippets = this.snippets.map((s) =>
          s.id === result.snippet.id ? { ...result.snippet } : s
        );

        this.snippetStateService.setMySnippets(this.snippets);

        setTimeout(() => {
          this.selectedSnippet = { ...result.snippet };
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
      this.snippets = [...cached].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      this.getPublicSnippets();
    } else {
      this.snippetService.getMySnippets().subscribe({
        next: (snippets: Snippet[]) => {
          const sorted = [...snippets].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          this.snippets = sorted;
          this.snippetStateService.setMySnippets(sorted);
          this.getPublicSnippets();
        },
        error: (err) => {
          this.snackbar.error('Error fetching snippets: ', err);
        },
      });
    }
  }

  getPublicSnippets() {
    const cached = this.snippetStateService.getPublicSnippets();

    const userSnippetIds = new Set(this.snippets.map((s) => s.id));

    if (cached) {
      const filtered = cached.filter((s) => !userSnippetIds.has(s.id));
      this.publicSnippets = [...filtered].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      this.snippetService.getPublicSnippets().subscribe({
        next: (snippets: Snippet[]) => {
          const filtered = snippets.filter((s) => !userSnippetIds.has(s.id));
          const sorted = [...filtered].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          this.publicSnippets = sorted;
          this.snippetStateService.setPublicSnippets(sorted);
        },
        error: (err) => {
          this.snackbar.error('Error fetching snippets: ', err);
        },
      });
    }
  }

  toggleSnippets() {
    this.viewingPublic = !this.viewingPublic;

    if (this.viewingPublic) {
      if ((this.searchTerm.trim() ||
        this.selectedTags.length > 0 
      )) {
        if (this.filteredPublicSnippets.length > 0) {
          this.selectedSnippet = this.filteredPublicSnippets[0];
        } else {
          this.selectedSnippet = undefined!;
        }
      } else {
        if (this.publicSnippets.length > 0) {
          this.selectedSnippet = this.publicSnippets[0];
        } else {
          this.selectedSnippet = undefined!;
        }
      }
    } else {
      if ((this.searchTerm.trim() ||
        this.selectedTags.length > 0 ||
        this.currentFilter
      )) {
        if (this.filteredSnippets.length > 0) {
          this.selectedSnippet = this.filteredSnippets[0];
        } else {
          this.selectedSnippet = undefined!;
        }
      } else {
        if (this.snippets.length > 0) {
          this.selectedSnippet = this.snippets[0];
        } else {
          this.selectedSnippet = undefined!;
        }
      }
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
        this.snackbar.success('Code succesfully copied');
      })
      .catch((err) => {
        this.snackbar.error('Failed to copy: ', err);
      });
  }

  deleteSnippetDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-dialog-panel',
      data: {
        title: 'Delete Snippet',
        message: `Are you sure you want to delete snippet: "${this.selectedSnippet.title}" ?`
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteSnippet();
      }
    });
  }

  deleteSnippet() {
    if (!this.selectedSnippet || !this.selectedSnippet.id) {
      return;
    }

    this.snippetService.deleteSnippet(this.selectedSnippet.id).subscribe({
      next: () => {
        this.snippets = this.snippets.filter(s => s.id !== this.selectedSnippet.id);
        this.snippetStateService.setMySnippets(this.snippets);

        if (this.snippets.length > 0) {
          this.selectedSnippet = this.snippets[0];
        } else {
          this.selectedSnippet = undefined!;
        }

        this.snackbar.success("Snippet deleted successfully");
      },
      error: (err) => {
        this.snackbar.error('Failed to delete snippet', err);
      }
    });
  }
}
