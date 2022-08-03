import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListUsersUseCase);
        const all = await listCategoriesUseCase.execute();
        return res.json(all);
    }
}

export { ListUsersController };
