import { inject, injectable } from "tsyringe";
import { IBooksRepository } from "../../../books/repositories/IBooksRepository";
import { ILoansRepository } from "../../repositories/ILoansRepository";

@injectable()
class DeleteLoanUseCase {


    constructor(
        @inject("LoansRepository")
        private loansRepository: ILoansRepository,
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ) { }

    async execute({ id }) {

        const loan = await this.loansRepository.findById(id);
        if (!loan) {
            throw new Error('Loan not found.');
        }
        
        await this.booksRepository.update(loan.bookId, { status: true });

        await this.loansRepository.delete(id);
    }

}

export { DeleteLoanUseCase };