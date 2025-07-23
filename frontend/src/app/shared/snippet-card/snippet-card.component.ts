import { Component, input } from '@angular/core';

@Component({
  selector: 'app-snippet-card',
  imports: [],
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss',
})
export class SnippetCardComponent {
    title = input<string>();
    tags = input<{ id: number; name: string }[]>();    
}
