import { UserToken } from "@prisma/client";

import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

type TUserToken = Omit<UserToken, "id" | "createdAt">;

interface IUsersTokenRepository {
    create({
        expires,
        refreshToken,
        employeeId,
    }: ICreateUserTokenDTO): Promise<TUserToken>;

    findByUserIdAndRefreshToken(employeeId: string): Promise<UserToken>;

    deleteById(employeeId: string): Promise<void>;
}

export { IUsersTokenRepository };
