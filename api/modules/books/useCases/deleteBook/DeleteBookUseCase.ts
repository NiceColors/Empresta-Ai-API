import { inject, injectable } from "tsyringe";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class DeleteBookUseCase {
    constructor(
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ) { }

    async execute({ id, isbn }): Promise<void> {
        if (isbn) {
            await this.booksRepository.deleteAll(isbn);
        }
        await this.booksRepository.delete(id)
    }
}

export { DeleteBookUseCase };