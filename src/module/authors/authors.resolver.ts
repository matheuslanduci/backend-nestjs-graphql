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
import { NewAuthorInput, UpdateAuthorInput } from "src/graphql";
import { PostsService } from "../posts/posts.service";
import { AuthorsService } from "./authors.service";

@Resolver("Author")
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService
  ) {}

  @Query()
  async findAuthorById(@Args("authorId") id: number): Promise<Author> {
    try {
      return this.authorsService.findAuthorById(id);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  @Mutation()
  async createAuthor(@Args("author") author: NewAuthorInput): Promise<Author> {
    try {
      return this.authorsService.createAuthor(author);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  @Mutation()
  async updateAuthor(
    @Args("author") author: UpdateAuthorInput
  ): Promise<Author> {
    try {
      return this.authorsService.updateAuthor(author);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  @Mutation()
  async deleteAuthor(@Args("authorId") id: number): Promise<Author> {
    try {
      return this.authorsService.deleteAuthor(id);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  @ResolveField()
  async posts(@Parent() author: Author): Promise<Post[]> {
    const { id } = author;

    return this.postsService.findPosts({ authorId: id });
  }
}
