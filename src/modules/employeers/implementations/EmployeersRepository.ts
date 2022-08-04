import { Employee } from "@prisma/client";

import { prisma } from "../../../database";
import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";

class EmployeersRepository {
    private repository = prisma.employee;

    async create({
        role,
        permissions,
        name,
        cpf,
        birthdate,
    }: ICreateEmployeeDTO): Promise<void> {
        await this.repository.create({
            data: {
                role,
                permissions,
                name,
                cpf,
                birthdate,
            },
        });
    }

    async list(): Promise<Employee[]> {
        const lens = await this.repository.findMany();

        return lens;
    }
}

export { EmployeersRepository };
