import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterApiPayload } from "../models/register-api-payload.model";
import { Observable } from "rxjs";
import { RegisterApiResponse } from "../models/register-api-response.model";
import { environment } from "../../environments/environment";
import { LoginApiPayload } from "../models/login-api-payload.model";
import { LoginApiResponse } from "../models/login-api-response.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private BASE_URL = `${environment.backendUrl}/auth`;

    constructor(private http: HttpClient) {} 

    register(payload: RegisterApiPayload): Observable<RegisterApiResponse> {
        return this.http.post<RegisterApiResponse>(`${this.BASE_URL}/register`, payload);
    }

    login(payload: LoginApiPayload): Observable<LoginApiResponse> {
        return this.http.post<LoginApiResponse>(`${this.BASE_URL}/login`, payload, {withCredentials: true});
    }
}