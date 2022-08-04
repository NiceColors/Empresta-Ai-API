import { Book } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { BooksRepository } from "../../implementations/BooksRepository";

@injectable()
class ListBooksUseCase {
    constructor(
        @inject("BooksRepository")
        private booksRepository: BooksRepository
    ) {}

    async execute(): Promise<Book[]> {
        const books = await this.booksRepository.list();

        return books;
    }
}

export { ListBooksUseCase };
