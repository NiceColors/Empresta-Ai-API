import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListBooksUseCase } from "./ListBooksUseCase";


class ListBooksController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { limit, page, query } = request.query;

        const listBooksUseCase = container.resolve(ListBooksUseCase);

        const books = await listBooksUseCase
            .execute({
                page: parseInt(page as string) || 0,
                limit: parseInt(limit as string) || 2,
                query: query as string
            });

        return response.json(books);
    }
}

export { ListBooksController };
