import { inject, injectable } from "tsyringe";

import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEmployeersRepository } from "../../repositories/IEmployeeRepository";

@injectable()
class CreateEmployeeUseCase {
    constructor(
        @inject("EmployeersRepository")
        private employeersRepository: IEmployeersRepository
    ) {}

    async execute(employee: ICreateEmployeeDTO): Promise<void> {
        await this.employeersRepository.create(employee);
        // Não permitir criar um funcionário que já existe
    }
}

export { CreateEmployeeUseCase };
