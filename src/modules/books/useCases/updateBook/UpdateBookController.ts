import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, ...fields } = request.body || request.query;

        const updateBookUseCase = container.resolve(UpdateBookUseCase);
        fields.releaseYear = new Date(fields.releaseYear);
        await updateBookUseCase.execute(id, fields);

        return response.status(201).send();
    }
}

export { UpdateBookController };