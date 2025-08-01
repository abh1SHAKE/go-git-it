export interface Tag {
    id: number;
    name: string;
}

export interface Snippet {
    id: number;
    userId: number;
    title: string;
    code: string;
    language: string;
    public: boolean;
    created_at: string;
    tags: Tag[];
}