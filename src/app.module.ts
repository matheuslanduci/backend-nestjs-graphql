import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { AuthorsModule } from "./module/authors/authors.module";
import { PostsModule } from "./module/posts/posts.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: [join(process.cwd(), "src/gql/*.gql")],
      debug: false,
      definitions: {
        outputAs: "interface",
        path: join(process.cwd(), "src/graphql.ts")
      }
    }),
    AuthorsModule,
    PostsModule
  ]
})
export class AppModule {}
