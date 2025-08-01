import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tag } from "../models/snippet-card.model";

@Injectable({
    providedIn: 'root'
})

export class TagsService {
    private BASE_URL = `${environment.backendUrl}/tags`;

    constructor(private http: HttpClient) {}

    getTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${this.BASE_URL}`, { withCredentials: true });
    }
}