import { Snippet } from "./snippet-card.model";

export interface SnippetFormDialogData {
    mode: 'create' | 'edit';
    snippet?: Snippet;
}