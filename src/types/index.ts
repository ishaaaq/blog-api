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
    upnumberdAt: number;
}

export interface comment{
    id: string;
    body: string;
    createdAt: number;
    postId: post;
    authorId: string;
}