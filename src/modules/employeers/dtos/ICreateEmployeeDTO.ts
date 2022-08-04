import { Role } from "@prisma/client";

interface ICreateEmployeeDTO {
    role: Role;
    permissions: string;
    name: string;
    cpf: string;
    birthdate: Date;
}

export { ICreateEmployeeDTO };
