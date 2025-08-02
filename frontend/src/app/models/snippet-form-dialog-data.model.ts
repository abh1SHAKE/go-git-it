import { Snippet } from "./snippet.model";

export interface SnippetFormDialogData {
    mode: 'create' | 'edit';
    snippet?: Snippet;
}