import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ILoansRepository } from "../../../loans/repositories/ILoansRepository";

import { UpdateBook } from "../../dtos/IUpdateBookDTO";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class UpdateBookUseCase {
    constructor(
        @inject("BooksRepository")
        private booksRepository: IBooksRepository,
    ) { }

    async execute(isbn: string, book: UpdateBook): Promise<void> {
//         const booksHasLoan = await this.loanRepository.findById(book.id);
// 
//         if (booksHasLoan) {
//             throw new AppError("Book has loan", 422);
//         }

        await this.booksRepository.update(isbn, book);

    }
}

export { UpdateBookUseCase };
