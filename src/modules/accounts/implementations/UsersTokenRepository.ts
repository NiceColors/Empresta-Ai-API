import { UserToken } from "@prisma/client";

import { prisma } from "../../../database";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

class UsersTokenRepository implements IUsersTokenRepository {
    private repository = prisma.userToken;

    async findByUserIdAndRefreshToken(employeeId: string): Promise<UserToken> {
        const usersTokens = await this.repository.findFirst({
            where: {
                employeeId,
            },
        });

        return usersTokens;
    }

    async create({
        expires,
        refreshToken,
        employeeId,
    }: ICreateUserTokenDTO): Promise<ICreateUserTokenDTO | null> {
        const userToken = await this.repository.create({
            data: {
                expires,
                refreshToken,
                employeeId,
            },
        });

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete({
            where: {
                id,
            },
        });
    }
}

export { UsersTokenRepository };
