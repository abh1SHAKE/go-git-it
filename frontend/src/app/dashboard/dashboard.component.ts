import { Component, ElementRef, ViewChild } from '@angular/core';
import { SnippetCardComponent } from '../shared/snippet-card/snippet-card.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { SearchTagDialogComponent } from './search-tag-dialog/search-tag-dialog.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { SnippetFormComponent } from './snippet-form/snippet-form.component';
import { Snippet } from '../models/snippet-card.model';
import { SnippetFormDialogData } from '../models/snippet-form-dialog-data.model';

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
export class DashboardComponent {
  @ViewChild('codeContainer', { read: ElementRef }) codeContainer!: ElementRef;
  searchTerm: string = '';
  selectedSnippet!: Snippet;

  snippets = [
    {
      id: 11,
      user_id: 2,
      title: 'Hello world (TS)',
      code: "console.log('Hello world')",
      language: 'typescript',
      public: true,
      created_at: '2025-07-23T10:01:00Z',
      tags: [
        { id: 1, name: 'intro' },
        { id: 10, name: 'typescript' },
      ],
    },
    {
      id: 12,
      user_id: 2,
      title: 'Factorial (Python)',
      code: 'def factorial(n):\n    return 1 if n == 0 else n * factorial(n - 1)',
      language: 'python',
      public: true,
      created_at: '2025-07-23T10:02:00Z',
      tags: [
        { id: 2, name: 'recursion' },
        { id: 3, name: 'python' },
      ],
    },
    {
      id: 13,
      user_id: 2,
      title: 'FizzBuzz (Go)',
      code: 'for i := 1; i <= 100; i++ {\n    if i%15 == 0 {\n        fmt.Println("FizzBuzz")\n    } else if i%3 == 0 {\n        fmt.Println("Fizz")\n    } else if i%5 == 0 {\n        fmt.Println("Buzz")\n    } else {\n        fmt.Println(i)\n    }\n}',
      language: 'go',
      public: true,
      created_at: '2025-07-23T10:03:00Z',
      tags: [
        { id: 4, name: 'go' },
        { id: 5, name: 'loop' },
      ],
    },
    {
      id: 14,
      user_id: 2,
      title: 'Binary Search (Java)',
      code: 'int binarySearch(int[] arr, int x) {\n    int l = 0, r = arr.length - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}',
      language: 'java',
      public: true,
      created_at: '2025-07-23T10:04:00Z',
      tags: [
        { id: 6, name: 'search' },
        { id: 7, name: 'java' },
      ],
    },
    {
      id: 15,
      user_id: 2,
      title: 'Debounce Function (JS)',
      code: 'function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}',
      language: 'javascript',
      public: true,
      created_at: '2025-07-23T10:05:00Z',
      tags: [
        { id: 8, name: 'utility' },
        { id: 9, name: 'javascript' },
      ],
    },
    {
      id: 16,
      user_id: 2,
      title: 'Hello Server (Node.js)',
      code: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello, World!');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running at http://localhost:3000/');\n});",
      language: 'javascript',
      public: true,
      created_at: '2025-07-23T10:06:00Z',
      tags: null,
    },
    {
      id: 17,
      user_id: 2,
      title: 'Map Example (Rust)',
      code: 'let numbers = vec![1, 2, 3];\nlet squares: Vec<i32> = numbers.iter().map(|x| x * x).collect();\nprintln!("{:?}", squares);',
      language: 'rust',
      public: true,
      created_at: '2025-07-23T10:07:00Z',
      tags: null,
    },
  ];

  constructor(private dialog: MatDialog) {}

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

    this.dialog.open(SnippetFormComponent, config);
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
