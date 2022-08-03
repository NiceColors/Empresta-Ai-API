import { Book } from "@prisma/client";

import { ICreateBookDTO } from "../dtos/ICreateBookDTO";

interface IBooksRepository {
    create(data: ICreateBookDTO): Promise<void>;
    findByTitle(title: string): Promise<Book[]>;
    list(): Promise<Book[]>;
}

export { IBooksRepository };
