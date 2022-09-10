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

    async execute({limit, page, query}): Promise<TEmployee[]> {
        const users = await this.usersRepository.list({limit, page, query});

        return users;
    }
}

export { ListUsersUseCase };
