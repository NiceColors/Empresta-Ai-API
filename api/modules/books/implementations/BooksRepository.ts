import { Book } from "@prisma/client";

import { prisma } from "../../../database";
import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { IBooksRepository } from "../repositories/IBooksRepository";
import { UpdateBook } from "../dtos/IUpdateBookDTO";

type ListBooksResponse = {
    page: number;
    limit: number;
    total: number;
    books: Book[]
    nextPage: number;
}
class BooksRepository implements IBooksRepository {
    private repository = prisma.book;

    async create({
        title,
        author,
        releaseYear,
        isbn,
        bannerUrl,
        loanRate,
        pages,
        synopsis,
        publisher,

    }: ICreateBookDTO): Promise<void> {
        await this.repository.create({
            data: {
                title,
                author,
                releaseYear,
                loanRate,
                isbn,
                bannerUrl,
                pages,
                synopsis,
                publisher,
            },
        });
    }


    async findByTitle(title: string): Promise<Book[]> {
        const books = await this.repository.findMany({
            where: { title },
        });

        return books;
    }


    async list({ page = 0, limit = 10, query = '' }): Promise<ListBooksResponse> {

        const booksLength = await this.repository.count();

        const books = await this.repository.findMany({
            skip: page * limit,
            take: limit,
            where: {
                title: {
                    contains: query
                }
            }
        });

        return {
            books,
            total: booksLength,
            page,
            nextPage: page + 1 < Math.ceil(booksLength / limit) ? page + 1 : null,
            limit
        };
    }

    //Isso aqui provavelmente tá errado
    async update(id: string, new_book: UpdateBook): Promise<Book> {
        const updateresult = await this.repository.update({
            where: {
                id
            },
            data: {
                ...new_book
            }
        });
        return updateresult;
    }

    async delete(id: string): Promise<Book> {
        const deleteresult = await this.repository.delete({
            where: {
                id
            }
        });
        return deleteresult;
    }

    async deleteAll(isbn: string): Promise<void> {
        await this.repository.deleteMany({
            where: {
                isbn
            }
        });
    }
}

export { BooksRepository };
