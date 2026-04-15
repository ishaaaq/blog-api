export interface user {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: number;
}

export interface post{
    id: string;
    title: string;
    description: string;
    authorId: string;
    createdAt: number;
    updatedAt: number;
}

export interface comment{
    id: string;
    body: string;
    createdAt: number;
    postId: string;
    authorId: string;
}