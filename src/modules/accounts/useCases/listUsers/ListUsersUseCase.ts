import { Employee } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "../../repositories/IEmployeersRepository";

type TEmployee = Omit<Employee, "password">;

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("EmployeersRepository")
        private usersRepository: IEmployeeRepository
    ) {} // Msm coisa que definir o atributo privado antes e dps instaciar e atribuir um valor (this...0)

    async execute(): Promise<TEmployee[]> {
        const categories = await this.usersRepository.list();

        return categories;
    }
}

export { ListUsersUseCase };
