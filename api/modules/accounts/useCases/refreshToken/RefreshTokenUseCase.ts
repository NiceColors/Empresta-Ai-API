import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository
    ) { }

    async execute(token: string): Promise<string | Response> {

        console.log('refreshToken:', token)

        const { email, sub: userId } = verify(
            token,
            auth.secretRefreshToken
        ) as IPayload;

        const userToken =
            await this.usersTokenRepository.findByUserIdAndRefreshToken(userId);

        if (!userToken) throw new AppError("Refresh Token does not exists");

        await this.usersTokenRepository.deleteById(userToken.id);

        const refreshToken = sign({ email }, auth.secretRefreshToken, {
            subject: userId,
            expiresIn: auth.expiresInRefreshToken,
        });

        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        await this.usersTokenRepository.create({
            expires,
            refreshToken,
            employeeId: userId,
        });

        const newToken = sign({ email }, auth.secretToken, {
            subject: userId,
            expiresIn: auth.expiresIn,
        });

        return newToken;
    }
}

export { RefreshTokenUseCase };
