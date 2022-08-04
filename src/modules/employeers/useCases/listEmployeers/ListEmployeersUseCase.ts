import { Employee } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IEmployeersRepository } from "../../repositories/IEmployeeRepository";

@injectable()
class ListEmployeersUseCase {
    constructor(
        @inject("EmployeersRepository")
        private employeersRepository: IEmployeersRepository
    ) {}

    async execute(): Promise<Employee[]> {
        const employeers = await this.employeersRepository.list();
        return employeers;
    }
}

export { ListEmployeersUseCase };
