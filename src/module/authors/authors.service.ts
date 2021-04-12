import { Author } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { NewAuthorInput, UpdateAuthorInput } from "src/graphql";
import { PrismaService } from "src/prisma.service";
import { validateDate } from "src/utils/validateDate";

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async findAuthorById(id: number): Promise<Author> {
    const author = await this.prisma.author.findUnique({
      where: {
        id
      }
    });

    if (!author) {
      throw new Error("There's no author with this ID.");
    }

    return author;
  }

  async createAuthor(data: NewAuthorInput): Promise<Author> {
    const { name, birthDate } = data;

    if (!validateDate(birthDate)) {
      throw new Error("Invalid date. Please, try again with a valid date.");
    }

    const newBirthDate = new Date(birthDate);

    return this.prisma.author.create({
      data: {
        name,
        birthDate: newBirthDate
      }
    });
  }

  async updateAuthor(data: UpdateAuthorInput): Promise<Author> {
    const { id, birthDate } = data;

    const author = this.prisma.author.findUnique({
      where: {
        id
      }
    });

    if (!author) {
      throw new Error("There's no author with this ID.");
    }

    return this.prisma.author.update({
      data: {
        birthDate
      },
      where: {
        id
      }
    });
  }

  async deleteAuthor(id: number): Promise<Author> {
    const author = this.prisma.author.findUnique({
      where: {
        id
      }
    });

    if (!author) {
      throw new Error("There's no author with this ID.");
    }

    return this.prisma.author.delete({
      where: {
        id
      }
    });
  }
}
