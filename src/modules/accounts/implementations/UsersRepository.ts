import { User } from "@prisma/client";

import { prisma } from "../../../database";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository = prisma.user;

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findUnique({
            where: { email },
        });

        return user;
    }

    async create({ email, password }: ICreateUserDTO): Promise<void> {
        await this.repository.create({
            data: {
                email,
                password,
            },
        });
    }

    async list(): Promise<User[]> {
        const users = await this.repository.findMany();

        return users;
    }
}

export { UsersRepository };
