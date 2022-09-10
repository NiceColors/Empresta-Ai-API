import { Book } from "@prisma/client";

import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { UpdateBook } from "../dtos/IUpdateBookDTO";

interface IBooksRepository {
    create(data: ICreateBookDTO): Promise<void>;
    findByTitle(title: string): Promise<Book[]>;
    list({ page, limit, query }: TList): Promise<ListResponse>;
    update(isbn: string, new_book: UpdateBook): Promise<Book>;
    delete(id: string): Promise<Book>;
    deleteAll(isbn: string): Promise<void>;
}

export { IBooksRepository };
