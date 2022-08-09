import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {isbn} = request.body;
        const deleteBookUseCase = container.resolve(DeleteBookUseCase);

        const deletedBook = await deleteBookUseCase.execute(isbn);

        return response.json(deletedBook);
    }
}

export { DeleteBookController };
