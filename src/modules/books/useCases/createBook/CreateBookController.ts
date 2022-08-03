import { Request, response, Response } from "express";
import { container } from "tsyringe";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { author, title, releaseYear } = request.body;

        const createBookUseCase = container.resolve(CreateBookUseCase);

        await createBookUseCase.execute({
            author,
            title,
            releaseYear,
        });

        return response.status(201).send();
    }
}

export { CreateBookController };
