import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListEmployeersUseCase } from "./ListEmployeersUseCase";

class ListEmployeersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listEmployeersUseCase = container.resolve(ListEmployeersUseCase);
        const all = await listEmployeersUseCase.execute();
        return response.json(all);
    }
}

export { ListEmployeersController };
