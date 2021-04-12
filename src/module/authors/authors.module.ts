import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PostsService } from "../posts/posts.service";
import { AuthorsResolver } from "./authors.resolver";
import { AuthorsService } from "./authors.service";

@Module({
  providers: [AuthorsService, AuthorsResolver, PostsService, PrismaService]
})
export class AuthorsModule {}
