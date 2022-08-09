import { Request, Response } from "express";
import { container } from "tsyringe";

import { ActualUserUseCase } from "./ActualUserUseCase";

class ActualUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.user


        const actualUserUseCase = container.resolve(ActualUserUseCase);
        const user = await actualUserUseCase.execute(id);
        return response.json(user);
    }

}

export { ActualUserController };
