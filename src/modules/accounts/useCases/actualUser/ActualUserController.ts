import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { emailVal, formatCPF, nameVal, passwdVal } from "../../validators/validators";

import { ActualUserUseCase } from "./ActualUserUseCase";

class ActualUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.user

        if (!id) throw new AppError("Usuário não existe", 401)

        const actualUserUseCase = container.resolve(ActualUserUseCase);
        const user = await actualUserUseCase.execute(id);

        return response.json(user);
    }

}

export { ActualUserController };
