import { inject, injectable } from "tsyringe";

import { ICreateBookDTO } from "../../dtos/ICreateBookDTO";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class CreateBookUseCase {
    constructor(
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ) {}

    async execute(book: ICreateBookDTO): Promise<void> {
        await this.booksRepository.create(book);
        // Não permitir criação de um livro já existente
    }
}

export { CreateBookUseCase };
