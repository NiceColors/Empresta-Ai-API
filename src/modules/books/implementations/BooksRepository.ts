import { Book } from "@prisma/client";

import { prisma } from "../../../database";
import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { IBooksRepository } from "../repositories/IBooksRepository";
import { UpdateBook } from "../dtos/IUpdateBookDTO";
import { AppError } from "../../../errors/AppError";


class BooksRepository implements IBooksRepository {
    private repository = prisma.book;

    async create({
        ...bookData
    }: ICreateBookDTO): Promise<void> {

        await this.repository.create({
            data: bookData,
        });
    }


    async findByTitle(title: string): Promise<Book[]> {
        const books = await this.repository.findMany({
            where: { title },
        });

        if (!books) throw new AppError("Livro não encontrado", 404);

        return books;
    }


    async list({ page = 0, limit = 10, query = '' }): Promise<ListResponse> {


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

        const booksResponse = await Promise.all(books.map(async book => {
            const loan = await prisma.loan.findFirst({
                where: {
                    bookId: book.id,
                    status: true
                },
                select: {
                    id: true
                }
            })

            return { ...book, loanId: loan?.id ?? null }
        }))

        return {
            data: booksResponse,
            total: booksLength,
            page,
            nextPage: page + 1 < Math.ceil(booksLength / limit) ? page + 1 : null,
            limit
        };


    }

    //Isso aqui provavelmente tá errado
    async update(id: string, new_book: UpdateBook): Promise<Book> {


        const book = await this.repository.findUnique({
            where: { id },
        });

        // if (!book) throw new AppError("Livro não encontrado", 422);


        const updateresult = await this.repository.update({
            where: {
                id
            },
            data: {
                ...new_book,
            }
        });


        return updateresult;

    }

    async delete(id: string): Promise<Book> {


        const book = await this.repository.findUnique({
            where: { id },
        });

        // if (!book) throw new AppError("Livro não encontrado", 404);


        const loan = await prisma.loan.findFirst({
            where: {
                bookId: id,
                status: true
            },
            select: {
                id: true
            }
        })

        if (loan) throw new AppError("Livro emprestado", 400);

        const deleteresult = await this.repository.delete({
            where: {
                id
            }
        });
        return deleteresult;

    }

    async deleteAll(isbn: string): Promise<void> {

        const books = await this.repository.findMany({
            where: {
                isbn
            },
            select: {
                id: true
            }
        })

        if (books.length === 0) throw new AppError("Livro não encontrado", 404);

        await this.repository.deleteMany({
            where: {
                isbn
            }
        });
    }
}

export { BooksRepository };
