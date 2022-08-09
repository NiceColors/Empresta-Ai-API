import { Employee } from "@prisma/client";

import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";

interface IEmployeeRepository {
    create(data: ICreateEmployeeDTO): Promise<void>;
    findByEmail(email: string): Promise<Employee>;
    findById(id: string): Promise<Employee>;
    list(): Promise<Employee[]>;
}

export { IEmployeeRepository };
