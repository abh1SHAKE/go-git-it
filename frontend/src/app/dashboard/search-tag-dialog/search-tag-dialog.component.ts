import { Component, output, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagsService } from '../../services/tags.service';
import { Tag } from '../../models/snippet.model';
import { TagsStateService } from '../../services/tags-state.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-search-tag-dialog',
  imports: [FormsModule],
  templateUrl: './search-tag-dialog.component.html',
  styleUrl: './search-tag-dialog.component.scss',
})
export class SearchTagDialogComponent implements OnInit {
  searchTerm: string = '';
  close = output<void>();
  apply = output<Tag[]>();

  initialSelectedTags = input<Tag[]>([]);

  tags: Tag[] = [];
  selectedTags: Tag[] = [];

  constructor(
    private tagsService: TagsService,
    private snackbar: SnackbarService,
    private tagsStateService: TagsStateService
  ) {}

  ngOnInit(): void {
    this.selectedTags = [...this.initialSelectedTags()];
    this.getTags();
  }

  get filteredTags(): Tag[] {
    const filtered = this.searchTerm.trim()
      ? this.tags.filter((tag) =>
          tag.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : [...this.tags];

    const selected = filtered.filter((tag) => this.isTagSelected(tag));
    const unselected = filtered.filter((tag) => !this.isTagSelected(tag));

    return [...selected, ...unselected];
  }

  getTags() {
    const cached = this.tagsStateService.getTags();

    if (cached) {
      this.tags = cached;
    } else {
      this.tagsService.getTags().subscribe({
        next: (tags: Tag[]) => {
          this.tags = tags;
          this.tagsStateService.setTags(tags);
        },
        error: (err) => {
          this.snackbar.error('Error fetching tags: ', err);
        },
      });
    }
  }

  toggleTagSelection(tag: Tag) {
    const index = this.selectedTags.findIndex((t) => t.id === tag.id);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
  }

  isTagSelected(tag: Tag): boolean {
    return this.selectedTags.some((t) => t.id === tag.id);
  }

  onApply() {
    this.apply.emit(this.selectedTags);
    this.closePopup();
  }

  onClearAll() {
    this.selectedTags = [];
    this.apply.emit([]);
    this.closePopup();
  }

  closePopup() {
    this.close.emit();
  }
}
