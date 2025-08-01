import { Component, output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagsService } from '../../services/tags.service';
import { Tag } from '../../models/snippet-card.model';
import { TagsStateService } from '../../services/tags-state.service';

@Component({
  selector: 'app-search-tag-dialog',
  imports: [FormsModule],
  templateUrl: './search-tag-dialog.component.html',
  styleUrl: './search-tag-dialog.component.scss',
})
export class SearchTagDialogComponent implements OnInit {
  searchTerm: string = '';
  close = output<void>();

  tags: Tag[] = [];

  constructor(
    private tagsService: TagsService,
    private tagsStateService: TagsStateService
  ) {}

  ngOnInit(): void {
	this.getTags();
  }

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }

  getTags() {
    const cached = this.tagsStateService.getTags();

    if (cached) {
      this.tags = cached;
      console.log('Using cached tags:', cached);
    } else {
      this.tagsService.getTags().subscribe({
        next: (tags: Tag[]) => {
          this.tags = tags;
		  this.tagsStateService.setTags(tags);
          console.log('Tags fetched successfully:', tags);
        },
        error: (err) => {
          console.error('Error fetching tags:', err);
        },
      });
    }
  }

  closePopup() {
    this.close.emit();
  }
}
