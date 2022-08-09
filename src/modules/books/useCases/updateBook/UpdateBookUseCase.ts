import { inject, injectable } from "tsyringe";

import { UpdateBook } from "../../dtos/IUpdateBookDTO";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class UpdateBookUseCase {
    constructor(
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ) {}

    async execute(isbn:string, book: UpdateBook): Promise<void> {
        await this.booksRepository.update(isbn, book);
        // Não permitir criação de um livro já existente
    }
}

export { UpdateBookUseCase };
