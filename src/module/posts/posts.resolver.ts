import { Author, Post } from ".prisma/client";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { NewPostInput, UpdatePostInput } from "src/graphql";
import { AuthorsService } from "../authors/authors.service";
import { PostsService } from "./posts.service";

@Resolver("Post")
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private authorsService: AuthorsService
  ) {}

  @Query()
  async findPostsByAuthorId(@Args("authorId") id: number): Promise<Post[]> {
    return this.postsService.findPosts({ id });
  }

  @Query()
  async findPostById(@Args("postId") id: number): Promise<Post> {
    try {
      return this.postsService.findPostById(id);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  @Query()
  async findAllPosts(): Promise<Post[]> {
    return this.postsService.findAllPosts();
  }

  @Mutation()
  async createPost(@Args("post") post: NewPostInput): Promise<Post> {
    return this.postsService.createPost(post);
  }

  @Mutation()
  async updatePost(@Args("post") post: UpdatePostInput): Promise<Post> {
    try {
      return this.postsService.updatePost(post);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  @Mutation()
  async deletePost(@Args("postId") id: number): Promise<Post> {
    try {
      return this.postsService.deletePost(id);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  @ResolveField()
  async author(@Parent() post: Post): Promise<Author> {
    const { authorId } = post;

    return this.authorsService.findAuthorById(authorId);
  }
}
