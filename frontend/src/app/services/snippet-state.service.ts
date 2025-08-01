import { Injectable } from "@angular/core";
import { Snippet } from "../models/snippet-card.model";

@Injectable({
    providedIn: 'root'
})

export class SnippetStateService {
    private mySnippets: Snippet[] | null = null;
    private publicSnippets: Snippet[] | null = null;
    
    setMySnippets(snippets: Snippet[]): void {
        this.mySnippets = snippets;
    }

    getMySnippets(): Snippet[] | null {
        return this.mySnippets;
    }

    setPublicSnippets(snippets: Snippet[]): void {
        this.publicSnippets = snippets;
    }

    getPublicSnippets(): Snippet[] | null {
        return this.publicSnippets;
    }

    clear(): void {
        this.mySnippets = null;
        this.publicSnippets = null;
    }
}