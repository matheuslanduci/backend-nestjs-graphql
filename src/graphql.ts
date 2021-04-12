
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface NewPostInput {
    title: string;
    description: string;
    authorId: number;
    content: string;
}

export interface UpdatePostInput {
    id: number;
    title?: string;
    description?: string;
    content?: string;
}

export interface NewAuthorInput {
    name: string;
    birthDate: string;
}

export interface UpdateAuthorInput {
    id: number;
    birthDate: string;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    author: Author;
    authorId: number;
    content: string;
}

export interface Author {
    id: number;
    name: string;
    birthDate: string;
    posts: Post[];
}

export interface IQuery {
    findPostsByAuthorId(authorId: number): Post[] | Promise<Post[]>;
    findPostById(postId: number): Post | Promise<Post>;
    findAllPosts(): Post[] | Promise<Post[]>;
    findAuthorById(authorId: number): Author | Promise<Author>;
}

export interface IMutation {
    createAuthor(author: NewAuthorInput): Author | Promise<Author>;
    updateAuthor(author: UpdateAuthorInput): Author | Promise<Author>;
    deleteAuthor(authorId: number): Author | Promise<Author>;
    createPost(post: NewPostInput): Post | Promise<Post>;
    updatePost(post: UpdatePostInput): Post | Promise<Post>;
    deletePost(postId: number): Post | Promise<Post>;
}
