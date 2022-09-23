import { UserToken } from "@prisma/client";

import { prisma } from "../../../database";
import { AppError } from "../../../errors/AppError";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

class UsersTokenRepository implements IUsersTokenRepository {
    private repository = prisma.userToken;

    async findByUserIdAndRefreshToken(employeeId: string): Promise<UserToken> {
        try {
            const usersTokens = await this.repository.findFirst({
                where: {
                    employeeId,
                },
            });

            if (!usersTokens) throw new AppError("Usuário não encontrado", 404);

            return usersTokens;
        } catch (error) {
            throw new AppError("Ocorreu um erro no servidor", 501);
        }
    }

    async create({
        expires,
        refreshToken,
        employeeId,
    }: ICreateUserTokenDTO): Promise<ICreateUserTokenDTO | null> {
        try {
            const userToken = await this.repository.create({
                data: {
                    expires,
                    refreshToken,
                    employeeId,
                },
            });

            return userToken;
        } catch (error) {
            throw new AppError("Ocorreu um erro no servidor", 501);
        }
    }

    async deleteById(id: string): Promise<void> {

        try {
            await this.repository.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new AppError("Ocorreu um erro no servidor", 501);
        }

    }
}

export { UsersTokenRepository };
