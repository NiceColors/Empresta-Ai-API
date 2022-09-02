import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

class UpdateClientController {
    async handle(request: Request, response: Response) {

        const {
            id,
            name,
            cpf,
            birthdate } = request.body;
        const updateClientUseCase = container.resolve(UpdateClientUseCase);
        await updateClientUseCase.execute({
            id,
            name,
            cpf,
            birthdate
        });
        return response.status(204).send();
    }
}

export { UpdateClientController }