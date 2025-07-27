export interface RegisterSuccessResponse {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    };
}

export interface RegisterErrorResponse {
    error: string;
}

export type RegisterApiResponse = RegisterSuccessResponse | RegisterErrorResponse;