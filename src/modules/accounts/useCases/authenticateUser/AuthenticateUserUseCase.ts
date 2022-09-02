import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IEmployeeRepository } from "../../repositories/IEmployeersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        email: string;
        name: string;
        permissions: string;
        role: string;
    };

    token: string;
    refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("EmployeersRepository")
        private usersRepository: IEmployeeRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const { permissions, role, name } = user;
        const d = new Date();
        d.setDate(d.getDate() + 30);

        const {
            secretToken,
            expiresIn,
            secretRefreshToken,
            expiresInRefreshToken,
        } = auth;

        if (!user) throw new AppError("Email ou senha incorretos");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new AppError("Email ou senha incorretos");

        const token = sign({ email, permissions, role, name }, secretToken, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        const refreshToken = sign(
            { email, permissions, role, name },
            secretRefreshToken,
            {
                subject: user.id,
                expiresIn: expiresInRefreshToken,
            }
        );

        await this.usersTokenRepository.create({
            expires: d,
            refreshToken,
            employeeId: user.id,
        });

        return {
            token,
            refreshToken,
            user: { email, permissions, role, name },
        };
    }
}

export { AuthenticateUserUseCase };
