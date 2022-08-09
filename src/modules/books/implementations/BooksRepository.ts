import { Book } from "@prisma/client";

import { prisma } from "../../../database";
import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { IBooksRepository } from "../repositories/IBooksRepository";
import { UpdateBook } from "../dtos/IUpdateBookDTO";

class BooksRepository implements IBooksRepository {
    private repository = prisma.book;

    async findByTitle(title: string): Promise<Book[]> {
        const books = await this.repository.findMany({
            where: { title },
        });

        return books;
    }

    async create({
        title,
        author,
        releaseYear,
        isbn,
        bannerUrl,
        pages,
        synopsis,
        publisher,
        rent,
    }: ICreateBookDTO): Promise<void> {
        await this.repository.create({
            data: {
                title,
                author,
                releaseYear,
                isbn,
                bannerUrl,
                pages,
                synopsis,
                publisher,
                rent,
            },
        });
    }

    async list(): Promise<Book[]> {
        const books = await this.repository.findMany();
        return books;
    }

    //Isso aqui provavelmente tá errado
    async update(isbn:string, new_book:UpdateBook): Promise<Book>{
        const updateresult = await this.repository.update({
            where: {
                "isbn": isbn
            },
            data: {
                ...new_book
            }
        });
        return updateresult;
    }

    async delete(isbn:string): Promise<Book>{
        const deleteresult = await this.repository.delete({
            where: {
                isbn: isbn
            }
            });
        return deleteresult;
    }
}

export { BooksRepository };
