import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListLoansUseCase } from "./ListLoansUseCase";

class ListLoansController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { limit, page, query } = request.query;

        const listLoansUseCase = container.resolve(ListLoansUseCase);

        const loans = await listLoansUseCase
            .execute({
                page: parseInt(page as string) || 0,
                limit: parseInt(limit as string) || 2,
                query: query as string
            });

        return response.json(loans);
    }


}

export { ListLoansController }