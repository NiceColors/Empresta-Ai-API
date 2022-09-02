import { Book } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { BooksRepository } from "../../implementations/BooksRepository";

type BooksResponse = {
    page: number;
    limit: number;
    total: number;
    books: Book[]
}
@injectable()
class ListBooksUseCase {
    constructor(
        @inject("BooksRepository")
        private booksRepository: BooksRepository
    ) { }

    async execute({ page, limit, query }): Promise<BooksResponse> {
        const books = await this.booksRepository.list({ page, limit, query });

        return books;
    }
}

export { ListBooksUseCase };
