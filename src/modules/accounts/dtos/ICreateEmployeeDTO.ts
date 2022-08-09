import { Role } from "@prisma/client";

interface ICreateEmployeeDTO {
    email: string;
    password: string;
    name: string;
    cpf: string;
    birthdate: Date;
    role?: Role;
    permissions: string;
}

export { ICreateEmployeeDTO };
