import { Injectable } from "@angular/core";
import { Tag } from "../models/snippet.model";

@Injectable({
    providedIn: 'root'
})

export class TagsStateService {
    private tags: Tag[] | null = null;

    setTags(tags: Tag[]): void {
        this.tags = tags;
    }

    getTags(): Tag[] | null {
        return this.tags;
    }
}