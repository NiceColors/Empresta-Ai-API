import { Book } from "@prisma/client";

import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { UpdateBook } from "../dtos/IUpdateBookDTO";

interface IBooksRepository {
    create(data: ICreateBookDTO): Promise<void>;
    findByTitle(title: string): Promise<Book[]>;
    list(): Promise<Book[]>;
    update(isbn:string, new_book: UpdateBook): Promise<Book>;
    delete(isbn:string): Promise<Book>;
}

export { IBooksRepository };
