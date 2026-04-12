export interface user {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface post{
    id: string;
    title: string;
    description: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface comment{
    id: string;
    body: string;
    createdAt: Date;
    postId: post;
    authorId: string;
}