import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListClientsUseCase } from "./ListClientsUseCase";

class ListClientsController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { limit, page, query } = request.query;

        const all = await container.resolve(ListClientsUseCase).execute({
            page: parseInt(page as string) || 0,
            limit: parseInt(limit as string) || 8,
            query: query as string
        });

        return response.json(all);
    }
}

export { ListClientsController };