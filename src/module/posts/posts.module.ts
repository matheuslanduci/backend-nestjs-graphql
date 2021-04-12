import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AuthorsService } from "../authors/authors.service";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  providers: [PostsService, PostsResolver, AuthorsService, PrismaService]
})
export class PostsModule {}
