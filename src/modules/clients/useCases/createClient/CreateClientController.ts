import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { ...data } = request.body;

        const createClientUseCase = container.resolve(CreateClientUseCase)

        try {
            await createClientUseCase.execute(data as ICreateClientDTO);

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.',
            });
        }
    }


}

export { CreateClientController }