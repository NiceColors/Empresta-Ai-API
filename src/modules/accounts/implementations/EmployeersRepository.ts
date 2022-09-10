import { Employee, Prisma } from "@prisma/client";

import { prisma } from "../../../database";
import { AppError } from "../../../errors/AppError";
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

        const employee = await this.repository.findUnique({
            where: {
                email,
            },
        });
        return employee;

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

    async list({ page = 0, limit = 8, query = '' }): Promise<any> {
        const usersLength = await this.repository.count();

        console.log(limit)

        const users = await this.repository.findMany({
            skip: page * limit,
            take: limit,
            where: {
                name: {
                    contains: query
                }
            },
            orderBy: {
                createdAt: 'asc'

            }
        });

        return {
            users,
            total: usersLength,
            page,
            nextPage: page + 1 < Math.ceil(usersLength / limit) ? page + 1 : null,
            limit
        };
    }


    async update(id: string, data: any): Promise<void> {

        console.log(id, data)

        const employee = await this.repository.findUnique({
            where: {
                id,
            },
        });
        if (!employee) 
            throw new AppError('User not found', 402);
        
        const updateEmployee = await this.repository.update({
            where: {
                id,
            },
            data: {
                email: data.email,
            }
        });

        if (!updateEmployee) 
            throw new AppError('Error', 401);
        
    }


    async deleteOne(id: string): Promise<void> {

        console.log(id)

        const employee = await this.repository.findUnique({
            where: {
                id,
            },
        });
        if (!employee) {
            throw new AppError('User not found', 404);
        }
        await this.repository.delete({
            where: {
                id,
            },
        });
    }

    async deleteMany(id: string[]): Promise<void> {
        await this.repository.deleteMany({
            where: {
                id: {
                    in: id
                }
            }
        });
    }

}

export { EmployeersRepository };
