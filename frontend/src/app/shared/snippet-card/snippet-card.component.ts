import { Component, input } from '@angular/core';
import { Tag } from '../../models/snippet-card.model';
import { OrdinalDatePipe } from '../ordinal-date-pipe';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-snippet-card',
  imports: [NgStyle, OrdinalDatePipe],
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss',
})
export class SnippetCardComponent {
  title = input<string>();
  tags = input<Tag[]>();
  createdAt = input<string>('');

  selected = input<boolean>(false);

  private readonly LANGUAGE_COLORS: Record<
    string,
    { color: string; textColor?: string }
  > = {
    html: { color: '#e34c26' },
    php: { color: '#777BB4' },
    javascript: { color: '#f7df1e', textColor: '#000000' },
    typescript: { color: '#3178c6' },
    python: { color: '#3776ab' },
    java: { color: '#007396' },
    c: { color: '#555555' },
    cpp: { color: '#00599c' },
    go: { color: '#00ADD8' },
    ruby: { color: '#cc342d' },
    swift: { color: '#F05138' },
    kotlin: { color: '#7F52FF' },
    rust: { color: '#000000', textColor: '#ffffff' },
    sql: { color: '#00758F' },
  };

  private readonly DEFAULT_TAG_COLOR = '#4c4c4c';
  private readonly DEFAULT_TEXT_COLOR = '#ffffffb0';

  getTagStyle(tagValue: string) {
    const normalizedValue = tagValue.toLowerCase();
    const languageConfig = this.LANGUAGE_COLORS[normalizedValue];

    return {
      color: languageConfig?.color || this.DEFAULT_TEXT_COLOR,
      'border-color': languageConfig?.color || this.DEFAULT_TAG_COLOR,
    };
  }
}
