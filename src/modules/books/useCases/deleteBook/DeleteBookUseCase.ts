import { inject, injectable} from "tsyringe";
import { IBooksRepository  } from "../../repositories/IBooksRepository";

@injectable()
class DeleteBookUseCase{
    constructor(
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ){}

    async execute(isbn: string): Promise<void>{
        await this.booksRepository.delete(isbn);
    }
}

export { DeleteBookUseCase };