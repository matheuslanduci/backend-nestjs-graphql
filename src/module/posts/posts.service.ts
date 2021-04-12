import { Post, Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { NewPostInput, UpdatePostInput } from "src/graphql";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findPosts(where: Prisma.PostWhereInput): Promise<Post[]> {
    return this.prisma.post.findMany({
      where
    });
  }

  async findPostById(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new Error("There's no post with this ID.");
    }

    return post;
  }

  async createPost(data: NewPostInput): Promise<Post> {
    return this.prisma.post.create({
      data
    });
  }

  async updatePost(data: UpdatePostInput): Promise<Post> {
    const { id, title, description, content } = data;

    const post = await this.prisma.post.findUnique({
      where: {
        id
      }
    });

    if (!post) {
      throw new Error("There's no post with this ID.");
    }

    return this.prisma.post.update({
      data: {
        title,
        description,
        content
      },
      where: {
        id
      }
    });
  }

  async deletePost(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id
      }
    });

    if (!post) {
      throw new Error("There's no post with this ID.");
    }

    return this.prisma.post.delete({
      where: {
        id
      }
    });
  }
}
