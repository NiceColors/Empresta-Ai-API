import { Employee } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "../../repositories/IEmployeersRepository";

type TEmployee = Omit<Employee, "password" | "id">;

@injectable()
class ActualUserUseCase {
    constructor(
        @inject("EmployeersRepository")
        private usersRepository: IEmployeeRepository
    ) { } // Msm coisa que definir o atributo privado antes e dps instaciar e atribuir um valor (this...0)

    async execute({ id }): Promise<TEmployee> {
        const { email, role, permissions, name, cpf, birthdate } = await this.usersRepository.findById(id);
        return {
            email, role, permissions, name, cpf, birthdate
        };
    }
}

export { ActualUserUseCase };
