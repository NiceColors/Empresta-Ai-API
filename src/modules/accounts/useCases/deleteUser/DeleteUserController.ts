import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, ids } = request.body ?? request.query;

        console.log(request.body)

        const deleteUserUseCase = container.resolve(DeleteUserUseCase);
        const deletedUser = await deleteUserUseCase.execute({ id, ids });

        return response.json(deletedUser);
    }
}

export { DeleteUserController };
