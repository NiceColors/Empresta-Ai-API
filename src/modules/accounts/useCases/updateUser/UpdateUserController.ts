import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, ...data } = request.body;
        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const updatedUser = await updateUserUseCase.execute({ id, data });

        return response.json(updatedUser);
    }
}

export { UpdateUserController };
