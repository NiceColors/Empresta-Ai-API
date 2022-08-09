import { Employee } from "@prisma/client";

import { prisma } from "../../../database";
import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";
import { IEmployeeRepository } from "../repositories/IEmployeersRepository";

class EmployeersRepository implements IEmployeeRepository {
    private repository = prisma.employee;

    async findById(id: string): Promise<Employee> {
        const employee = await this.repository.findUnique({
            where: {
                id,
            },
        });

        return employee;
    }

    async findByEmail(email: string): Promise<Employee> {
        try {
            console.log(email);

            const employee = await this.repository.findUnique({
                where: {
                    email,
                },
            });
            return employee;

        } catch (error) {
            console.log(error);
        }

    }

    async create({
        email,
        password,
        birthdate,
        cpf,
        name,
        role,
        permissions,
    }: ICreateEmployeeDTO): Promise<void> {
        await this.repository.create({
            data: {
                email,
                password,
                birthdate,
                cpf,
                name,
                role,
                permissions,
            },
        });
    }

    async list(): Promise<Employee[]> {
        const users = await this.repository.findMany();

        return users;
    }
}

export { EmployeersRepository };
