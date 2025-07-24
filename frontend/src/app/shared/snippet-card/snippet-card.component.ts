import { Component, input } from '@angular/core';
import { Tag } from '../../models/snippet-card.model';

@Component({
  selector: 'app-snippet-card',
  imports: [],
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss',
})
export class SnippetCardComponent {
    title = input<string>();
    tags = input<Tag[]>();    
}
