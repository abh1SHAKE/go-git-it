export interface LoginSuccessResponse {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    },
    token: string;
    message: string;

}

export interface LoginErrorResponse {
    error: string;
}

export type LoginApiResponse = LoginSuccessResponse | LoginErrorResponse;