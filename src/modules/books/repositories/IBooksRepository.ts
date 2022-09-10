import { Book } from "@prisma/client";

import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { UpdateBook } from "../dtos/IUpdateBookDTO";

type BooksResponse = {
    page: number;
    limit: number;
    total: number;
    books: Book[]
}

interface IBooksRepository {
    create(data: ICreateBookDTO): Promise<void>;
    findByTitle(title: string): Promise<Book[]>;
    list({ page, limit, query }: TList): Promise<BooksResponse>;
    update(isbn: string, new_book: UpdateBook): Promise<Book>;
    delete(id: string): Promise<Book>;
    deleteAll(isbn: string): Promise<void>;
}

export { IBooksRepository };
