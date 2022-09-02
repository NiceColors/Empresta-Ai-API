import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../../accounts/repositories/IEmployeersRepository";
import { IBooksRepository } from "../../../books/repositories/IBooksRepository";
import { IClientsRepository } from "../../../clients/repositories/IClientRepository";
import { ICreateLoanDTO } from "../../dtos/ICreateLoanDTO";
import { ILoansRepository } from "../../repositories/ILoansRepository";


@injectable()
class CreateLoanUseCase {

    constructor(
        @inject("LoansRepository")
        private loansRepository: ILoansRepository,
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("EmployeersRepository")
        private employeeRepository: IEmployeeRepository,
        @inject("BooksRepository")
        private booksRepository: IBooksRepository
    ) { }


    async execute({ employeeId, clientId, ...loan }: ICreateLoanDTO): Promise<void> {
        const clientAlreadyHasLoan = await this.loansRepository.findByClientId(clientId)

        if (clientAlreadyHasLoan?.length > 0) {
            throw new Error('Client already has a loan.');
        }

        const user = await this.employeeRepository.findById(employeeId);

        if (!user) {
            throw new Error('User not found.');
        }

        await this.booksRepository.update(loan.bookId, { status: false });

        await this.loansRepository.create({ employeeId, clientId, ...loan });
    }

}

export { CreateLoanUseCase };