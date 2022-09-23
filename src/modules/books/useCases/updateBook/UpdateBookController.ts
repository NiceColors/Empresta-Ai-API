import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const url = request.url.replace('/', '')

        const { ...fields } = request.body || request.query || request.params

        const id = url ?? fields.id

        const updateBookUseCase = container.resolve(UpdateBookUseCase);
        fields.releaseYear = new Date(fields.releaseYear);
        await updateBookUseCase.execute(id, fields);

        return response.status(201).send();
    }
}

export { UpdateBookController };