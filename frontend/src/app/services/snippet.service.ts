import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DeleteSnippetResponse, Snippet } from "../models/snippet.model";
import { SnippetPayload } from "../models/snippet-payload.model";

@Injectable({
    providedIn: 'root'
})

export class SnippetService {
    private BASE_URL = `${environment.backendUrl}/snippets`;

    constructor(private http: HttpClient) {}

    getMySnippets(): Observable<Snippet[]> {
        return this.http.get<Snippet[]>(`${this.BASE_URL}/my-snippets`);
    }

    getPublicSnippets(): Observable<Snippet[]> {
        return this.http.get<Snippet[]>(`${this.BASE_URL}`);
    }

    createSnippet(payload: SnippetPayload): Observable<Snippet> {
        return this.http.post<Snippet>(`${this.BASE_URL}`, payload);
    }

    updateSnippet(id: number, payload: Partial<SnippetPayload>): Observable<Snippet> {
        return this.http.put<Snippet>(`${this.BASE_URL}/${id}`, payload);
    }

    deleteSnippet(id: number): Observable<DeleteSnippetResponse> {
        return this.http.delete<DeleteSnippetResponse>(`${this.BASE_URL}/${id}`);
    }
}