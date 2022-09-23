import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { emailVal, passwdVal } from "../../validators/validators";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;

        console.log(password)

        if (!emailVal(request.body.email)) {
            throw new AppError("Email mal formatado", 422);
        }
        // if (!passwdVal(request.body.password)) {
        //     throw new AppError("Senha inválida", 422);
        // }
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        const token = await authenticateUserUseCase.execute({
            password,
            email,
        });

        return response.json(token);
    }
}

export { AuthenticateUserController };
