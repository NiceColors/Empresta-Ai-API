import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListClientsUseCase } from "./ListClientsUseCase";

class ListClientsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const all = await container.resolve(ListClientsUseCase).execute();

        return response.json(all);
    }
}

export { ListClientsController };