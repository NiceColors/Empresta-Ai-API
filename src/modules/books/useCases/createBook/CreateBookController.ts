import { Request, response, Response } from "express";
import { container } from "tsyringe";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            author,
            title,
            releaseYear,
            bannerUrl,
            rent,
            synopsis,
            pages,
            publisher,
            isbn,
        } = request.body;

        const createBookUseCase = container.resolve(CreateBookUseCase);

        await createBookUseCase.execute({
            author,
            title,
            releaseYear,
            bannerUrl,
            rent,
            synopsis,
            pages,
            publisher,
            isbn,
        });

        return response.status(201).send();
    }
}

export { CreateBookController };
