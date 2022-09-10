import { Employee, Prisma } from "@prisma/client";

import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";

interface IEmployeeRepository {
    create(data: ICreateEmployeeDTO): Promise<void>;
    findByEmail(email: string): Promise<Employee>;
    findById(id: string): Promise<Employee>;
    list({ page, limit, query }: TList): Promise<Employee[]>;
    update(id: string, data: Prisma.EmployeeUpdateManyArgs): Promise<Employee | void>;
    deleteOne(id: string): Promise<Employee | void>;
    deleteMany(ids: string[]): Promise<void>;
}

export { IEmployeeRepository };
