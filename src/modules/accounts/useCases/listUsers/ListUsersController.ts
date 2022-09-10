import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listUsersUseCase = container.resolve(ListUsersUseCase);
        const { limit, page, query } = request.query;

        const all = await listUsersUseCase.execute({
            page: parseInt(page as string) || 0,
            limit: parseInt(limit as string) || 8,
            query: query as string
        });

        return response.json(all);
    }

}

export { ListUsersController };
