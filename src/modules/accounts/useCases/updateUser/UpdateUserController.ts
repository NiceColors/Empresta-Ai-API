import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, ...data } = request.body;
        if (!emailVal(data.email)) {
            throw new AppError("Email mal formatado", 422);
        }
        if (!passwdVal(data.password)) {
            throw new AppError("Senha inválida", 422);
        }
        if (!nameVal(data.name)) {
            throw new AppError("Nome em formato inválido", 422);
        }
        /*if (!birthVal(data.birthdate)) {
            throw new AppError("Data de nascimento inválida", 422);
        }*/
        if (!formatCPF(data.cpf)) {
            throw new AppError("CPF inválido", 422);
        }
        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const updatedUser = await updateUserUseCase.execute({ id, data });

        return response.json(updatedUser);
    }
}

export { UpdateUserController };
