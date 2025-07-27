export interface LoginSuccessResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    }
}

export interface LoginErrorResponse {
    error: string;
}

export type LoginApiResponse = LoginSuccessResponse | LoginErrorResponse;