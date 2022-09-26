import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { bookreleaseYear, validisbn } from "../../validators/BookValidators";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            author,
            title,
            releaseYear,
            bannerUrl,
            synopsis,
            loanRate,
            pages,
            publisher,
            isbn,
        } = request.body;
        if(!validisbn(isbn)){
            throw new AppError("ISBN inválido", 422)
        }
        if(!bookreleaseYear(releaseYear)) throw new AppError("Ano de Lançamento Inválido", 422)
        const createBookUseCase = container.resolve(CreateBookUseCase);

        await createBookUseCase.execute({
            author,
            title,
            releaseYear: new Date(releaseYear),
            bannerUrl,
            synopsis,
            loanRate,
            pages,
            publisher,
            isbn,
        });

        return response.status(201).send();
    }
}

export { CreateBookController };
