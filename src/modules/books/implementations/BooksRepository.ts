import { Book } from "@prisma/client";

import { prisma } from "../../../database";
import { IBooksRepository } from "../repositories/IBooksRepository";

class BooksRepository implements IBooksRepository {
    private repository = prisma.book;

    async findByTitle(title: string): Promise<Book[]> {
        const books = await this.repository.findMany({
            where: { title },
        });

        return books;
    }

    async create({ title, author, releaseYear }: Book): Promise<void> {
        await this.repository.create({
            data: {
                title,
                author,
                releaseYear,
            },
        });
    }

    async list(): Promise<Book[]> {
        const books = await this.repository.findMany();
        return books;
    }
}

export { BooksRepository };
