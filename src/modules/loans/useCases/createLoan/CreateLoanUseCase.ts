import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../../accounts/repositories/IEmployeersRepository";
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
        @inject("EmployeeRepository")
        private employeeRepository: IEmployeeRepository,
    ) { }

    async execute({ employeeId, ...loan }: ICreateLoanDTO): Promise<void> {
        const clientAlreadyHasLoan = await this.clientsRepository.findById(loan.clientId)

        if (clientAlreadyHasLoan) {
            throw new Error('User already has a loan.');
        }

        const user = await this.employeeRepository.findById(employeeId);

        if (!user) {
            throw new Error('User not found.');
        }

        await this.loansRepository.create({ employeeId, ...loan });
    }

}

export { CreateLoanUseCase };