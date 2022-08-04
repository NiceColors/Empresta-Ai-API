import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListUsersUseCase);
        const all = await listCategoriesUseCase.execute();
        return response.json(all);
    }
}

export { ListUsersController };
