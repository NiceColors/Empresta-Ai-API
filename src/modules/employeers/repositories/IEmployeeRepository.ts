import { Employee } from "@prisma/client";

import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";

interface IEmployeersRepository {
    create(data: ICreateEmployeeDTO): Promise<void>;
    list(): Promise<Employee[]>;
}

export { IEmployeersRepository };
