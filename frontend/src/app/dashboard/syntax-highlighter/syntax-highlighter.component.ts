import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Prism from 'prismjs';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markdown';

@Component({
  selector: 'app-syntax-highlighter',
  templateUrl: './syntax-highlighter.component.html',
  styleUrls: ['./syntax-highlighter.component.scss']
})
export class SyntaxHighlighterComponent implements AfterViewInit {
  @Input() code: string = '';
  @Input() language: string = 'javascript';
  @ViewChild('codeElement') codeElement!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (this.codeElement) {
      Prism.highlightElement(this.codeElement.nativeElement);
    }
  }
}
