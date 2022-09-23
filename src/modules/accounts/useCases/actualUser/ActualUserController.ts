import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { emailVal, formatCPF, nameVal, passwdVal } from "../../validators/validators";

import { ActualUserUseCase } from "./ActualUserUseCase";

class ActualUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.user

        if (!id) throw new AppError("Usuário não existe", 401)
        if(!emailVal(request.body.email)){
            throw new AppError("Email mal formatado", 422);
        }
        if(!passwdVal(request.body.password)){
            throw new AppError("Senha inválida", 422);
        }
        if(!nameVal(request.body.name)){
            throw new AppError("Nome em formato inválido", 422);
        }
        /*if(!birthVal(request.body.birthdate)){
            throw new AppError("Data de nascimento inválida", 422);
        }*/
        if(!formatCPF(request.body.cpf)){
            throw new AppError("CPF inválido", 422);
        }
        const actualUserUseCase = container.resolve(ActualUserUseCase);
        const user = await actualUserUseCase.execute(id);

        return response.json(user);
    }

}

export { ActualUserController };
