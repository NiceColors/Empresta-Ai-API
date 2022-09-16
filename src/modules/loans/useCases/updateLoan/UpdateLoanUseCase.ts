import { Loan } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IBooksRepository } from "../../../books/repositories/IBooksRepository";
import { IUpdateLoanDTO } from "../../dtos/IUpdateLoanDTO";
import { ILoansRepository } from "../../repositories/ILoansRepository";

@injectable()
class UpdateLoanUseCase {

    constructor(
        @inject("LoansRepository")
        private loansRepository: ILoansRepository,
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ) { }



    async execute(data): Promise<void | Loan> {

        const loan = await this.loansRepository.findById(data);

        if (!loan)
            throw new AppError('Loan not found.');

        const res = { ...loan, ...data }
        const updatedLoan = await this.loansRepository.update(res);
        await this.booksRepository.update(loan.bookId, { status: true });

        return updatedLoan

    }



}

export { UpdateLoanUseCase };