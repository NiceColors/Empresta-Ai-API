import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password, name, permissions, cpf, birthdate, role } =
            request.body;
            if(!emailVal(email)){
                throw new AppError("Email mal formatado", 422);
            }
            if(!passwdVal(password)){
                throw new AppError("Senha inválida porra", 422);
            }
            if(!nameVal(name)){
                throw new AppError("Nome em formato inválido", 422);
            }
            /*if(!birthVal(new Date(birthdate))){
                throw new AppError("Data de nascimento inválida", 422);
            }*/
            if(!formatCPF(cpf)){
                throw new AppError("CPF inválido", 422);
            }

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
