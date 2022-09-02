import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, ...fields } = request.body;

        const updateBookUseCase = container.resolve(UpdateBookUseCase);

        await updateBookUseCase.execute(id, fields);

        return response.status(201).send();
    }
}

export { UpdateBookController };