import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password, name, permissions, cpf, birthdate, role } =
            request.body;


        console.log(email, password, name, permissions, cpf, birthdate, role)

        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute({
            email,
            password,
            name,
            permissions,
            cpf,
            birthdate,
            role,
        });

        return response.status(201).send({
            message: "Usuário criado com sucesso",
        });
    }
}

export { CreateUserController };
