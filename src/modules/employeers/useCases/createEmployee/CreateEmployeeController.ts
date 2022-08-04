import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

class CreateEmployeeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { role, permissions, name, cpf, birthdate }: ICreateEmployeeDTO =
            request.body;

        const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

        const data = {
            role,
            permissions,
            name,
            cpf,
            birthdate,
        };

        await createEmployeeUseCase.execute(data);

        return response.status(201).send({
            data,
            message: "Funcionário criado com sucesso",
        });
    }
}

export { CreateEmployeeController };
