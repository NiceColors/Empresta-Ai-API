import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = request.url.replace('/', '')

        const { isbn } = request.body || request.query || request.params

        const deleteBookUseCase = container.resolve(DeleteBookUseCase);

        const deletedBook = await deleteBookUseCase.execute({ isbn, id });

        return response.json(deletedBook);
    }
}

export { DeleteBookController };
